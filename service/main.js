// src/service/main.ts
import http from "node:http";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

// src/shared/types.ts
var HISTORY_LENGTH = 21;
var HISTORY_POINTS = HISTORY_LENGTH + 4;
var SAMPLE_INTERVAL_MS = 1000;

// src/shared/series.ts
var percentOf = (value, total) => value === null || total === null || total <= 0 ? null : value / total * 100;
var powerPercent = (watts, capWatts) => watts === null ? null : Math.min(100, watts * 100 / (capWatts || 100));

// src/shared/process.ts
var PROCESS_ACTIONS = ["kill", "restart"];
function isProcessAction(value) {
  return typeof value === "string" && PROCESS_ACTIONS.includes(value);
}
function parsePid(value) {
  const pid = typeof value === "string" && /^\d+$/.test(value) ? Number(value) : value;
  return typeof pid === "number" && Number.isSafeInteger(pid) && pid > 1 ? pid : null;
}
function parseBusctlReply(stdout) {
  const match = /^bs\s+(true|false)\s+"((?:[^"\\]|\\.)*)"\s*$/.exec(stdout.trim());
  if (!match)
    throw new Error("unexpected reply from nvstats-service");
  const message = match[2].replace(/\\(.)/g, (_, c) => c === "n" ? `
` : c);
  return { ok: match[1] === "true", message };
}
function llmProcesses(llm) {
  return [llm.llama, llm.ollama, llm.vllm, llm.sglang, llm.tgi, llm.flm].flatMap((list) => list ?? []);
}

// src/shared/sources.ts
var HOST_PATTERN = /^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(?:\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*\.?$/;
function normalizeRemoteHost(value) {
  const host = value.trim().replace(/\.$/, "").toLowerCase();
  if (!HOST_PATTERN.test(host)) {
    throw new Error("Enter a hostname or IPv4 address only (no http://, port, or path).");
  }
  return host;
}
function remoteSampleUrl(value) {
  return `http://${normalizeRemoteHost(value)}:8039/api/v1/sample?full=1`;
}
function sameServiceSource(left, right) {
  if (left.mode !== right.mode)
    return false;
  if (left.mode === "local" || right.mode === "local")
    return true;
  return left.host === right.host;
}

// src/service/main.ts
var execFileAsync = promisify(execFile);
var port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
var token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? "";
if (!port || !token) {
  console.error("OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required");
  process.exit(1);
}
var history = {
  util: [],
  mem: [],
  temp: [],
  power: [],
  cpu: [],
  npu: [],
  times: []
};
var lastSample = null;
var lastTimestamp = 0;
var lastError = "waiting for nvstats-service";
var sourceAvailable = false;
var currentSource = { mode: "local" };
var sourceGeneration = 0;
var tickInFlight = false;
var localSourceAvailable = false;
var localSourceReason = typeof process.getuid === "function" ? "Checking local D-Bus…" : process.platform === "win32" ? "Unavailable on Windows" : "Linux user D-Bus is required";
var localProbeInFlight = false;
var lastLocalProbeAt = 0;
var LOCAL_PROBE_INTERVAL_MS = 15000;
function push(series, value) {
  series.push(value);
  while (series.length > HISTORY_POINTS) {
    series.shift();
  }
}
function normalizeSample(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("invalid nvstats response");
  }
  const data = value;
  if (!data.gpu || !data.sys || typeof data.gpu !== "object" || typeof data.sys !== "object") {
    throw new Error("invalid nvstats response: missing GPU or system data");
  }
  const rawLlm = data.llm && typeof data.llm === "object" ? data.llm : {};
  const list = (key) => Array.isArray(rawLlm[key]) ? rawLlm[key] : [];
  return {
    gpu: data.gpu,
    npu: data.npu && typeof data.npu === "object" ? data.npu : null,
    sys: data.sys,
    current_user: typeof data.current_user === "string" ? data.current_user : undefined,
    can_kill_all: typeof data.can_kill_all === "boolean" ? data.can_kill_all : undefined,
    llm: {
      llama: list("llama"),
      ollama: list("ollama"),
      vllm: list("vllm"),
      sglang: list("sglang"),
      tgi: list("tgi"),
      flm: list("flm"),
      ollama_models: list("ollama_models")
    }
  };
}
async function fetchLocalSample() {
  const uid = process.getuid?.();
  if (uid === undefined)
    throw new Error("Local D-Bus is only available on Linux");
  const { stdout } = await execFileAsync("busctl", [
    `--address=unix:path=/run/user/${uid}/bus`,
    "call",
    "com.daevid.nvstats",
    "/com/daevid/nvstats",
    "com.daevid.nvstats.Sample",
    "Get"
  ], { timeout: 5000, maxBuffer: 1024 * 1024 });
  const encoded = stdout.trim().replace(/^s\s+/, "");
  return normalizeSample(JSON.parse(JSON.parse(encoded)));
}
async function fetchSample(source) {
  if (source.mode === "local")
    return fetchLocalSample();
  try {
    const response = await fetch(remoteSampleUrl(source.host), { signal: AbortSignal.timeout(5000) });
    if (!response.ok)
      throw new Error(`HTTP ${response.status}`);
    return normalizeSample(await response.json());
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("HTTP "))
      throw error;
    const cause = error && typeof error === "object" ? error.cause : undefined;
    const code = cause && typeof cause === "object" ? cause.code : undefined;
    if (typeof code === "string")
      throw new Error(`${code} connecting to ${source.host}:8039`);
    if (error instanceof Error && error.name === "TimeoutError")
      throw new Error(`Timed out connecting to ${source.host}:8039`);
    throw new Error(`Could not connect to ${source.host}:8039`);
  }
}
async function runProcessAction(action, pid) {
  const uid = process.getuid?.();
  if (uid === undefined)
    throw new Error("Local D-Bus is only available on Linux");
  const { stdout } = await execFileAsync("busctl", [
    `--address=unix:path=/run/user/${uid}/bus`,
    "call",
    "com.daevid.nvstats",
    `/com/daevid/nvstats/${action}/${pid}`,
    "com.daevid.nvstats.Process",
    action === "kill" ? "Kill" : "Restart"
  ], { timeout: 15000, maxBuffer: 64 * 1024 });
  return parseBusctlReply(stdout);
}
function localUnavailableReason() {
  if (typeof process.getuid !== "function") {
    return process.platform === "win32" ? "Unavailable on Windows" : "Linux user D-Bus is required";
  }
  return "No D-Bus sample available";
}
async function probeLocalSource() {
  if (localProbeInFlight || currentSource.mode === "local")
    return;
  if (Date.now() - lastLocalProbeAt < LOCAL_PROBE_INTERVAL_MS)
    return;
  lastLocalProbeAt = Date.now();
  localProbeInFlight = true;
  try {
    await fetchLocalSample();
    localSourceAvailable = true;
    localSourceReason = "";
  } catch {
    localSourceAvailable = false;
    localSourceReason = localUnavailableReason();
  } finally {
    localProbeInFlight = false;
  }
}
function resetHistory() {
  history.util.length = 0;
  history.mem.length = 0;
  history.temp.length = 0;
  history.power.length = 0;
  history.cpu.length = 0;
  history.npu.length = 0;
  history.times.length = 0;
}
async function tick() {
  if (tickInFlight)
    return;
  tickInFlight = true;
  const source = currentSource;
  const generation = sourceGeneration;
  try {
    const sample = await fetchSample(source);
    if (generation !== sourceGeneration)
      return;
    lastError = "";
    sourceAvailable = true;
    lastSample = sample;
    lastTimestamp = Date.now();
    if (source.mode === "local") {
      localSourceAvailable = true;
      localSourceReason = "";
    }
    const memPct = percentOf(sample.gpu.mem_used, sample.gpu.mem_total);
    push(history.util, sample.gpu.util);
    push(history.mem, memPct);
    push(history.temp, sample.gpu.temp);
    const powerPct = powerPercent(sample.gpu.power_w, sample.gpu.power_cap_w);
    push(history.power, powerPct);
    push(history.cpu, sample.sys.cpu);
    push(history.npu, sample.npu?.readable ? sample.npu.util : null);
    push(history.times, lastTimestamp);
  } catch (error) {
    if (generation !== sourceGeneration)
      return;
    lastError = error instanceof Error ? error.message.slice(0, 180) : "unknown connection error";
    sourceAvailable = false;
    if (source.mode === "local") {
      localSourceAvailable = false;
      localSourceReason = localUnavailableReason();
    }
    push(history.util, null);
    push(history.mem, null);
    push(history.temp, null);
    push(history.power, null);
    push(history.cpu, null);
    push(history.npu, null);
    push(history.times, Date.now());
  } finally {
    tickInFlight = false;
  }
}
var send = (res, status, body) => {
  const json = JSON.stringify(body);
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(json);
};
async function readJsonBody(req) {
  let body = "";
  for await (const chunk of req) {
    body += typeof chunk === "string" ? chunk : chunk.toString("utf8");
    if (body.length > 4096)
      throw new Error("request body too large");
  }
  return JSON.parse(body);
}
function parseServiceSource(value) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return null;
  const input = value;
  if (input.mode === "local")
    return { mode: "local" };
  if (input.mode !== "remote" || typeof input.host !== "string" || typeof input.label !== "string")
    return null;
  try {
    const label = input.label.trim();
    if (label.length < 1 || label.length > 80)
      return null;
    return { mode: "remote", label, host: normalizeRemoteHost(input.host) };
  } catch {
    return null;
  }
}
var server = http.createServer((req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) {
    send(res, 401, { error: "unauthorized" });
    return;
  }
  const { pathname } = new URL(req.url ?? "/", "http://127.0.0.1");
  if (pathname === "/source" && req.method === "POST") {
    (async () => {
      try {
        const source = parseServiceSource(await readJsonBody(req));
        if (!source) {
          send(res, 400, { error: "invalid-source" });
          return;
        }
        const changed = !sameServiceSource(currentSource, source);
        currentSource = source;
        if (changed) {
          sourceGeneration++;
          lastSample = null;
          lastTimestamp = 0;
          sourceAvailable = false;
          lastError = "connecting";
          resetHistory();
        }
        send(res, 200, { ok: true, changed });
        if (changed)
          tick();
        if (changed && source.mode === "remote")
          probeLocalSource();
      } catch {
        if (!res.headersSent)
          send(res, 400, { error: "invalid-request" });
      }
    })();
    return;
  }
  if (pathname === "/process" && req.method === "POST") {
    (async () => {
      try {
        const body = await readJsonBody(req);
        const pid = parsePid(body?.pid);
        const action = body?.action;
        if (!isProcessAction(action) || pid === null) {
          send(res, 400, { ok: false, message: "invalid-request" });
          return;
        }
        if (currentSource.mode !== "local") {
          send(res, 200, { ok: false, message: "Process control needs the Local D-Bus source" });
          return;
        }
        if (!lastSample || !llmProcesses(lastSample.llm).some((p) => p.pid === pid)) {
          send(res, 200, { ok: false, message: "process not found" });
          return;
        }
        send(res, 200, await runProcessAction(action, pid));
        tick();
      } catch (error) {
        if (res.headersSent)
          return;
        const message = error instanceof Error ? error.message.slice(0, 180) : "request failed";
        send(res, 200, { ok: false, message });
      }
    })();
    return;
  }
  if (pathname === "/health") {
    send(res, 200, {
      ok: true,
      sourceAvailable,
      source: currentSource.mode === "local" ? "Local D-Bus" : currentSource.label,
      error: sourceAvailable ? null : lastError
    });
    return;
  }
  if (pathname === "/stats" && req.method === "GET") {
    const stats = {
      sample: lastSample ?? {
        gpu: { util: null, mem_used: null, mem_total: null, temp: null, power_w: null, power_cap_w: null },
        sys: { ram_used: 0, ram_total: 0, swap_used: 0, swap_total: 0, load1: 0, load5: 0, load15: 0, cpu: null },
        llm: { llama: [], ollama: [], vllm: [], sglang: [], tgi: [], flm: [], ollama_models: [] }
      },
      history,
      timestamp: lastTimestamp,
      sourceAvailable,
      sourceLabel: currentSource.mode === "local" ? "Local D-Bus" : currentSource.label,
      sourceError: sourceAvailable ? null : lastError,
      localSourceAvailable,
      localSourceReason: localSourceAvailable ? null : localSourceReason,
      controlAvailable: currentSource.mode === "local" && sourceAvailable
    };
    send(res, 200, stats);
    return;
  }
  send(res, 404, { error: "not-found" });
});
tick().then(() => {
  setInterval(tick, SAMPLE_INTERVAL_MS);
});
setInterval(() => void probeLocalSource(), LOCAL_PROBE_INTERVAL_MS);
var shutdown = () => {
  server.close();
  process.exit(0);
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
server.listen(port, "127.0.0.1");
console.log(`onvtop service listening on 127.0.0.1:${port}`);
