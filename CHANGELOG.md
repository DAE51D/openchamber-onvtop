# Changelog

## 1.2.0 — 2026-11-02

- Add read-only model cards with per-process CPU/GPU/memory statistics and launch flags where available.
- Detect SGLang and Hugging Face TGI, and recognize vLLM's CLI and Python-module launch forms.
- Redact values of common credential-bearing flags in displayed arguments.
- Add the repository install skill and document agent-assisted setup.

## 1.1.0 — 2026-11-02

- First public onvtop release.
- Uses the standalone nvstats-service D-Bus API (`com.daevid.nvstats`); no Plasma widget installation is required.
- Shows a clear unavailable state when the shared daemon is not installed or running.
- Adds a GTT-focused multi-line GPU panel, shared/system memory details, persistent line toggles, and a compact Work Status graph.
