import { describe, expect, test } from 'bun:test';
import { canKill, canRestart, isProcessAction, parseBusctlReply, parsePid } from './process.ts';
import type { Sample } from './types.ts';

const sample = (extra: Partial<Sample>): Sample => ({
  gpu: { util: null, mem_used: null, mem_total: null, temp: null, power_w: null, power_cap_w: null },
  sys: { ram_used: 0, ram_total: 0, swap_used: 0, swap_total: 0, load1: 0, load5: 0, load15: 0, cpu: null },
  llm: { llama: [], ollama: [], vllm: [], sglang: [], tgi: [], flm: [], ollama_models: [] },
  ...extra,
});

describe('process control helpers', () => {
  test('parsePid accepts positive integers above 1 only', () => {
    expect(parsePid(1234)).toBe(1234);
    expect(parsePid('1234')).toBe(1234);
    for (const bad of [0, 1, -5, 1.5, 'abc', '12 34', null, undefined, NaN]) expect(parsePid(bad)).toBeNull();
  });

  test('isProcessAction', () => {
    expect(isProcessAction('kill')).toBe(true);
    expect(isProcessAction('restart')).toBe(true);
    expect(isProcessAction('stop')).toBe(false);
  });

  test('parseBusctlReply reads the (b, s) reply', () => {
    expect(parseBusctlReply('bs true ""\n')).toEqual({ ok: true, message: '' });
    expect(parseBusctlReply('bs true "restarting llama-server.service"')).toEqual({
      ok: true,
      message: 'restarting llama-server.service',
    });
    expect(parseBusctlReply('bs false "process not found"')).toEqual({ ok: false, message: 'process not found' });
    expect(() => parseBusctlReply('garbage')).toThrow();
  });

  test('kill is allowed for own processes or with can_kill_all', () => {
    const own = { pid: 10, user: 'me' };
    const other = { pid: 11, user: 'root' };
    expect(canKill(sample({ current_user: 'me' }), own)).toBe(true);
    expect(canKill(sample({ current_user: 'me' }), other)).toBe(false);
    expect(canKill(sample({ current_user: 'me', can_kill_all: true }), other)).toBe(true);
    expect(canKill(sample({}), own)).toBe(false);
  });

  test('restart needs a unit; system units need can_kill_all', () => {
    expect(canRestart(sample({}), { pid: 10 })).toBe(false);
    expect(canRestart(sample({}), { pid: 10, unit: 'user:x.service' })).toBe(true);
    expect(canRestart(sample({}), { pid: 10, unit: 'system:x.service' })).toBe(false);
    expect(canRestart(sample({ can_kill_all: true }), { pid: 10, unit: 'system:x.service' })).toBe(true);
  });
});
