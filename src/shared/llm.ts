import type { LlmProcess, LlmSample, OllamaModel } from './types.ts';

export type Engine = 'llama' | 'ollama' | 'vllm' | 'sglang' | 'tgi';

export type LlmCard = {
  key: string;
  engine: Engine;
  title: string;
  process?: LlmProcess;
  ollamaModel?: OllamaModel;
};

const ENGINE_LABELS: Record<Engine, string> = {
  llama: 'llama.cpp',
  ollama: 'Ollama',
  vllm: 'vLLM',
  sglang: 'SGLang',
  tgi: 'Hugging Face TGI',
};

export function engineLabel(engine: Engine): string {
  return ENGINE_LABELS[engine];
}

export function collectLlmCards(llm: LlmSample): LlmCard[] {
  const cards: LlmCard[] = [];
  const processEngines: Engine[] = ['llama', 'ollama', 'vllm', 'sglang', 'tgi'];

  for (const engine of processEngines) {
    for (const process of llm[engine] ?? []) {
      // Serve processes without a model identifier are not useful as model
      // cards; the loaded Ollama model list is supplied separately below.
      if (engine === 'ollama' || !process.model) continue;
      const title = process.alias || process.model;
      cards.push({
        key: `process:${engine}:${process.pid}`,
        engine,
        title,
        process,
      });
    }
  }

  for (const model of llm.ollama_models ?? []) {
    if (!model.name) continue;
    cards.push({
      key: `ollama-model:${model.name}`,
      engine: 'ollama',
      title: model.name,
      ollamaModel: model,
    });
  }

  return cards.sort((a, b) => a.key.localeCompare(b.key));
}

export type ArgFlag = { key: string; value: string };

const sensitiveFlag = /(?:api[-_]?key|token|password|secret|credential|auth)/i;

export function displayFlags(argv: string[] = []): ArgFlag[] {
  const flags: ArgFlag[] = [];
  for (let i = 1; i < argv.length; i++) {
    const token = argv[i];
    if (!/^-{1,2}(?!\d)/.test(token)) continue;

    const equals = token.indexOf('=');
    const key = (equals < 0 ? token : token.slice(0, equals)).replace(/^-+/, '');
    let value = equals < 0 ? '' : token.slice(equals + 1);
    if (equals < 0 && i + 1 < argv.length && !/^-{1,2}(?!\d)/.test(argv[i + 1])) {
      value = argv[++i];
    }
    if (sensitiveFlag.test(key) && value) value = '[redacted]';
    flags.push({ key, value });
  }
  return flags.sort((a, b) => a.key.localeCompare(b.key));
}
