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

export type Sample = {
  gpu: GpuSample;
  sys: SysSample;
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
};

export const HISTORY_LENGTH = 21; // match knvtop's 21-point graph window
export const SAMPLE_INTERVAL_MS = 1000; // knvtop samples once per second
