// src/service/main.ts
import http from "node:http";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

// src/shared/types.ts
var HISTORY_LENGTH = 21;
var SAMPLE_INTERVAL_MS = 1000;

// src/shared/series.ts
var percentOf = (value, total) => value === null || total === null || total <= 0 ? null : value / total * 100;
var powerPercent = (watts, capWatts) => watts === null ? null : Math.min(100, watts * 100 / (capWatts || 100));

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
  cpu: []
};
var lastSample = null;
var lastTimestamp = 0;
var errorCount = 0;
var lastError = "waiting for nvstats-service";
var sourceAvailable = false;
function push(series, value) {
  series.push(value);
  while (series.length > HISTORY_LENGTH) {
    series.shift();
  }
}
async function fetchSample() {
  try {
    const uid = process.getuid?.();
    if (uid === undefined)
      throw new Error("nvstats D-Bus requires a Linux user session");
    const { stdout } = await execFileAsync("busctl", [
      `--address=unix:path=/run/user/${uid}/bus`,
      "call",
      "com.daevid.nvstats",
      "/com/daevid/nvstats",
      "com.daevid.nvstats.Sample",
      "Get"
    ], { timeout: 5000, maxBuffer: 1024 * 1024 });
    const encoded = stdout.trim().replace(/^s\s+/, "");
    const data = JSON.parse(JSON.parse(encoded));
    if (!data.gpu || !data.sys) {
      throw new Error("malformed nvstats response");
    }
    const rawLlm = data.llm ?? {};
    const list = (key) => Array.isArray(rawLlm[key]) ? rawLlm[key] : [];
    return {
      gpu: data.gpu,
      sys: data.sys,
      llm: {
        llama: list("llama"),
        ollama: list("ollama"),
        vllm: list("vllm"),
        sglang: list("sglang"),
        tgi: list("tgi"),
        ollama_models: list("ollama_models")
      }
    };
  } catch (e) {
    return null;
  }
}
async function tick() {
  const sample = await fetchSample();
  if (sample) {
    errorCount = 0;
    lastError = "";
    sourceAvailable = true;
    lastSample = sample;
    lastTimestamp = Date.now();
    const memPct = percentOf(sample.gpu.mem_used, sample.gpu.mem_total);
    push(history.util, sample.gpu.util);
    push(history.mem, memPct);
    push(history.temp, sample.gpu.temp);
    const powerPct = powerPercent(sample.gpu.power_w, sample.gpu.power_cap_w);
    push(history.power, powerPct);
    push(history.cpu, sample.sys.cpu);
  } else {
    errorCount++;
    lastError = "nvstats-service is unavailable";
    sourceAvailable = false;
    push(history.util, null);
    push(history.mem, null);
    push(history.temp, null);
    push(history.power, null);
    push(history.cpu, null);
  }
}
var send = (res, status, body) => {
  const json = JSON.stringify(body);
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(json);
};
var server = http.createServer((req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) {
    send(res, 401, { error: "unauthorized" });
    return;
  }
  const { pathname } = new URL(req.url ?? "/", "http://127.0.0.1");
  if (pathname === "/health") {
    send(res, sourceAvailable ? 200 : 503, { ok: sourceAvailable, error: sourceAvailable ? null : lastError });
    return;
  }
  if (pathname === "/stats" && req.method === "GET") {
    const stats = {
      sample: lastSample ?? {
        gpu: { util: null, mem_used: null, mem_total: null, temp: null, power_w: null, power_cap_w: null },
        sys: { ram_used: 0, ram_total: 0, swap_used: 0, swap_total: 0, load1: 0, load5: 0, load15: 0, cpu: null },
        llm: { llama: [], ollama: [], vllm: [], sglang: [], tgi: [], ollama_models: [] }
      },
      history,
      timestamp: lastTimestamp,
      sourceAvailable
    };
    send(res, 200, stats);
    return;
  }
  send(res, 404, { error: "not-found" });
});
tick().then(() => {
  setInterval(tick, SAMPLE_INTERVAL_MS);
});
var shutdown = () => {
  server.close();
  process.exit(0);
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
server.listen(port, "127.0.0.1");
console.log(`onvtop service listening on 127.0.0.1:${port}, reading nvstats over D-Bus`);
