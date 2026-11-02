import { describe, expect, test } from 'bun:test';

import { collectLlmCards, displayFlags } from './llm.ts';
import type { LlmSample } from './types.ts';

const emptyLlm = (): LlmSample => ({
  llama: [], ollama: [], vllm: [], sglang: [], tgi: [], ollama_models: [],
});

describe('LLM process cards', () => {
  test('includes only model-serving entries with model identifiers', () => {
    const llm = emptyLlm();
    llm.llama.push({ pid: 22, model: '/models/a.gguf', alias: 'A', argv: ['llama-server'] });
    llm.vllm.push({ pid: 33, model: 'org/B', argv: ['vllm'] });
    llm.sglang.push({ pid: 44, model: 'org/C', argv: ['sglang'] });
    llm.tgi.push({ pid: 55, model: 'org/D', argv: ['text-generation-launcher'] });
    llm.ollama.push({ pid: 66, subcmd: 'serve' });
    llm.ollama_models.push({ name: 'org/E:latest', size_vram: 1024 });

    expect(collectLlmCards(llm).map(({ key, title }) => [key, title])).toEqual([
      ['ollama-model:org/E:latest', 'org/E:latest'],
      ['process:llama:22', 'A'],
      ['process:sglang:44', 'org/C'],
      ['process:tgi:55', 'org/D'],
      ['process:vllm:33', 'org/B'],
    ]);
  });

  test('formats flags and redacts common credential flags', () => {
    expect(displayFlags([
      'vllm', 'serve', 'org/model', '--port=8000', '--api-key', 'secret-value', '--tensor-parallel-size', '2',
    ])).toEqual([
      { key: 'api-key', value: '[redacted]' },
      { key: 'port', value: '8000' },
      { key: 'tensor-parallel-size', value: '2' },
    ]);
  });
});
