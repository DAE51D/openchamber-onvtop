# Changelog

## Unreleased

- Show read-only model cards with per-process CPU/GPU/memory stats and launch flags for supported inference engines.
- Add lightweight process detection for SGLang and Hugging Face TGI; improve vLLM launch-form detection.
- Document AI-assisted installation with a repository `SKILL.md`.

## 1.1.0 — 2026-11-02

- First public onvtop release.
- Uses the standalone nvstats-service D-Bus API (`com.daevid.nvstats`); no Plasma widget installation is required.
- Shows a clear unavailable state when the shared daemon is not installed or running.
- Adds a GTT-focused multi-line GPU panel, shared/system memory details, persistent line toggles, and a compact Work Status graph.
