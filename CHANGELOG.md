# Changelog

## 1.5.0 — 2026-11-16

- Add two-click **Restart** (orange) and **Kill** (red) buttons to model process cards, like knvtop. Local D-Bus source only; the remote HTTP source stays read-only. Kill is shown when nvstats can kill anyone or you own the process; Restart needs a systemd unit (system units need passwordless sudo). The service only acts on pids currently shown on a card.

## 1.4.0 — 2026-11-15

- Add optional NPU support (AMD XDNA / Ryzen AI): an NPU card, a pink graph line and legend entry, and NPU/GPU labels on model cards. Everything NPU-related is hidden on hosts without an NPU, and shows N/A when an NPU exists but cannot be read. Needs nvstats-service 1.1.0 or newer.
- Detect FastFlowLM (NPU) model processes.
- The graphs now scroll continuously between samples instead of jumping once per poll, and the left edge no longer snaps.
- Shade the area under the small Work Status graph lines, like the panel graph.
- Series, order and colors now match knvtop and turzx-nvtop (GPU, GTT, Temp, Power, CPU, NPU).

## 1.3.0 — 2026-11-03

- Add a source selector for local D-Bus or configurable remote HTTP servers on port 8039; remote mode reads the full nvstats sample.
- Add initial EVO-X2 and Proxmox remote entries and a panel UI to add/edit/remove remote hosts.
- Replace the native source dropdown with a themed picker and improve source-switch error feedback.
- Keep Local D-Bus visible but disable it when the host has no available D-Bus source; periodically recheck availability.
- Preserve graph history when the same source is reapplied; clear it only when the data source changes.

## 1.2.0 — 2026-11-02

- Add read-only model cards with per-process CPU/GPU/memory statistics and launch flags where available.
- Detect SGLang and Hugging Face TGI, and recognize vLLM's CLI and Python-module launch forms.
- Redact values of common credential-bearing flags in displayed arguments.
- Add the repository install skill and document agent-assisted setup.

## 1.1.0 - 2026-11-02

- First public onvtop release.
- Uses the standalone nvstats-service D-Bus API (`com.daevid.nvstats`); no Plasma widget installation is required.
- Shows a clear unavailable state when the shared daemon is not installed or running.
- Adds a GTT-focused multi-line GPU panel, shared/system memory details, persistent line toggles, and a compact Work Status graph.
