// Process control (kill / restart) helpers shared by the service and panel.
import type { LlmProcess, LlmSample, Sample } from './types.ts';

export type ProcessAction = 'kill' | 'restart';

export const PROCESS_ACTIONS: readonly ProcessAction[] = ['kill', 'restart'];

export type ProcessResult = { ok: boolean; message: string };

export function isProcessAction(value: unknown): value is ProcessAction {
  return typeof value === 'string' && (PROCESS_ACTIONS as readonly string[]).includes(value);
}

// Same bounds nvstats-service enforces (pid <= 1 is refused), plus integer-ness.
export function parsePid(value: unknown): number | null {
  const pid = typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : value;
  return typeof pid === 'number' && Number.isSafeInteger(pid) && pid > 1 ? pid : null;
}

// busctl prints a (b, s) reply as: bs true "message"   (message C-escaped)
export function parseBusctlReply(stdout: string): ProcessResult {
  const match = /^bs\s+(true|false)\s+"((?:[^"\\]|\\.)*)"\s*$/.exec(stdout.trim());
  if (!match) throw new Error('unexpected reply from nvstats-service');
  const message = match[2].replace(/\\(.)/g, (_, c: string) => (c === 'n' ? '\n' : c));
  return { ok: match[1] === 'true', message };
}

export function llmProcesses(llm: LlmSample): LlmProcess[] {
  return [llm.llama, llm.ollama, llm.vllm, llm.sglang, llm.tgi, llm.flm].flatMap((list) => list ?? []);
}

// Mirrors knvtop: kill when we can kill anyone (passwordless sudo) or own the process.
export function canKill(sample: Sample, process: LlmProcess): boolean {
  return !!sample.can_kill_all || (!!sample.current_user && process.user === sample.current_user);
}

// Restart needs the process to live in a systemd unit; system units need sudo.
export function canRestart(sample: Sample, process: LlmProcess): boolean {
  if (!process.unit) return false;
  return process.unit.startsWith('user:') || !!sample.can_kill_all;
}
