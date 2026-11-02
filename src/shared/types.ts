// The /stats contract between the service and the panel.

export type GpuSample = {
  util: number | null;
  mem_used: number | null; // MiB (same units returned by amd-smi/nvidia-smi)
  mem_total: number | null; // MiB
  temp: number | null; // °C
  power_w: number | null; // W
  power_cap_w: number | null; // W
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
  ollama_models: OllamaModel[];
};

export type Sample = {
  gpu: GpuSample;
  sys: SysSample;
  llm: LlmSample;
};

export type HistorySeries = {
  util: (number | null)[];
  mem: (number | null)[]; // percentage 0-100
  temp: (number | null)[];
  power: (number | null)[];
  cpu: (number | null)[];
};

export type Stats = {
  sample: Sample;
  history: HistorySeries;
  timestamp: number;
  sourceAvailable: boolean;
};

export const HISTORY_LENGTH = 21; // match knvtop's 21-point graph window
export const SAMPLE_INTERVAL_MS = 1000; // knvtop samples once per second
