---
name: onvtop-install
description: Install or troubleshoot the onvtop GPU/model-process extension in OpenChamber with local D-Bus or remote nvstats-service HTTP telemetry.
---

# onvtop install skill

Set up the OpenChamber extension and choose either local D-Bus or a remote nvstats-service HTTP source. Do not assume a particular username, service account, home directory, or machine.

## 1. Install nvstats-service

Follow the [nvstats-service install skill](https://github.com/DAE51D/nvstats-service/blob/main/SKILL.md). Install it on the machine with the GPU. Local D-Bus mode requires the daemon and OpenChamber host service to share the same user's session D-Bus; remote mode does not. Ask before installing packages or enabling the optional cross-user `CAP_SYS_PTRACE` helper.

## 2. Add the extension

- In OpenChamber, open **Settings → Extensions**.
- For the released extension, paste `https://github.com/DAE51D/openchamber-onvtop` and choose **Add**.
- For a local development checkout, paste that checkout's absolute folder path instead. Folder installs run directly from the folder; do not edit `extensions.json` by hand.
- Approve the **Run a local service** permission. The service reads local D-Bus or fetches the configured remote host over HTTP.
- Below the activity graph and above **LLM processes**, choose **Local D-Bus** or a remote server. Use **Manage** to add/edit/remove hostnames; the port is fixed at 8039 and no scheme is entered. Remote mode fetches `/api/v1/sample?full=1`.
- Local D-Bus remains visible but is disabled when unavailable on the OpenChamber host; Linux hosts recheck periodically.
- Remote mode sends no nvstats authentication token. The remote HTTP endpoint must be reachable without a token and should be exposed only to a trusted LAN; full samples may include process names and arguments.

## 3. Verify

Confirm the selected source is reachable and onvtop reports live telemetry and displays model cards when supported inference processes are running. Local mode needs `nvstats.service` active for the same user as OpenChamber; remote mode needs nvstats HTTP listening on port 8039. The cards are read-only: do not call nvstats process-control methods or add kill/restart controls.

The lightweight Linux matcher covers llama.cpp, Ollama, vLLM, SGLang, and Hugging Face TGI launchers. It does not inspect Docker containers or query desktop-app APIs. Some runtimes expose model-level data but not per-model CPU/GPU process counters; show unavailable fields honestly rather than inferring them. Avoid logging or pasting full process arguments because they can contain credentials.

## Uninstall

Remove onvtop through **Settings → Extensions**. Do not uninstall nvstats if another client such as knvtop still uses it.
