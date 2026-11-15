// The /stats contract between the service and the panel.

export type GpuSample = {
  util: number | null;
  mem_used: number | null; // MiB (same units returned by amd-smi/nvidia-smi)
  mem_total: number | null; // MiB
  temp: number | null; // °C
  power_w: number | null; // W
  power_cap_w: number | null; // W
};

// Only present on hosts with an NPU. `readable: false` means the chip exists but
// cannot be read (shown as N/A); `util` is an activity estimate (see nvstats-service).
export type NpuSample = {
  present: boolean;
  readable: boolean;
  reason?: string | null;
  name?: string | null;
  util: number | null;
  tasks?: number | null;
  clock_mhz?: number | null;
};

export type SysSample = {
  ram_used: number; // bytes
  ram_total: number; // bytes
  swap_used: number; // bytes
  swap_total: number; // bytes
  load1: number;
  load5: number;
  load15: number;
  cpu: number | null; // %
};

export type LlmProcess = {
  pid: number;
  engine?: string;
  name?: string;
  user?: string;
  model?: string | null;
  alias?: string | null;
  subcmd?: string | null;
  ngl?: string | null;
  ctx?: string | null;
  parallel?: string | null;
  port?: string | null;
  argv?: string[];
  gpu_pct?: number | null;
  vram_kb?: number | null;
  cpu_pct?: number | null;
  rss_kb?: number | null;
  threads?: number | null;
  type?: string[];
};

export type OllamaModel = {
  name: string;
  model?: string | null;
  size?: number | null;
  size_vram?: number | null;
  quantization?: string | null;
  parameter_size?: string | null;
};

export type LlmSample = {
  llama: LlmProcess[];
  ollama: LlmProcess[];
  vllm: LlmProcess[];
  sglang: LlmProcess[];
  tgi: LlmProcess[];
  flm: LlmProcess[];
  ollama_models: OllamaModel[];
};

export type Sample = {
  gpu: GpuSample;
  npu?: NpuSample | null;
  sys: SysSample;
  llm: LlmSample;
};

export type HistorySeries = {
  util: (number | null)[];
  mem: (number | null)[]; // percentage 0-100
  temp: (number | null)[];
  power: (number | null)[];
  cpu: (number | null)[];
  npu: (number | null)[];
  times: number[]; // service-side sample time (ms) of each point, same length as every series
};

export type Stats = {
  sample: Sample;
  history: HistorySeries;
  timestamp: number;
  sourceAvailable: boolean;
  sourceLabel: string;
  sourceError: string | null;
  localSourceAvailable: boolean;
  localSourceReason: string | null;
};

export const HISTORY_LENGTH = 21; // match knvtop's 21-point graph window
// Points kept beyond the visible window so a line always continues off the left edge
// (the SVG clips it) instead of its end jumping when the oldest point is dropped.
export const HISTORY_POINTS = HISTORY_LENGTH + 4;
export const SAMPLE_INTERVAL_MS = 1000; // knvtop samples once per second
