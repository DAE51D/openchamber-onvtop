---
name: onvtop-install
description: Install or troubleshoot the onvtop GPU/model-process extension in OpenChamber and its nvstats-service dependency on Linux. Use whenever someone asks an AI agent to install onvtop from GitHub or a local folder, or connect it to local GPU telemetry.
---

# onvtop install skill

Set up the shared telemetry daemon and the OpenChamber extension for the user who runs the OpenChamber host service. Do not assume a particular username, service account, home directory, or machine.

## 1. Install nvstats-service

Follow the [nvstats-service install skill](https://github.com/DAE51D/nvstats-service/blob/main/SKILL.md). Install it as the current desktop/OpenChamber user, not as root. The daemon and OpenChamber host service must share the same user's session D-Bus. Ask before installing packages or enabling the optional cross-user `CAP_SYS_PTRACE` helper.

## 2. Add the extension

- In OpenChamber, open **Settings → Extensions**.
- For the released extension, paste `https://github.com/DAE51D/openchamber-onvtop` and choose **Add**.
- For a local development checkout, paste that checkout's absolute folder path instead. Folder installs run directly from the folder; do not edit `extensions.json` by hand.
- Approve the **Run a local service** permission. onvtop needs it to call `busctl` and read the local nvstats D-Bus sample.

## 3. Verify

Confirm `nvstats.service` is active for the same user as the OpenChamber host. Confirm onvtop reports live telemetry and displays model cards when supported inference processes are running. The cards are read-only: do not call nvstats process-control methods or add kill/restart controls.

The lightweight Linux matcher covers llama.cpp, Ollama, vLLM, SGLang, and Hugging Face TGI launchers. It does not inspect Docker containers or query desktop-app APIs. Some runtimes expose model-level data but not per-model CPU/GPU process counters; show unavailable fields honestly rather than inferring them. Avoid logging or pasting full process arguments because they can contain credentials.

## Uninstall

Remove onvtop through **Settings → Extensions**. Do not uninstall nvstats if another client such as knvtop still uses it.
