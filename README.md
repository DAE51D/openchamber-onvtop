# onvtop

GPU-focused OpenChamber rail panel and compact Work Status graph, powered by the existing [knvtop](https://github.com/DAE51D/knvtop) service.

onvtop reads the latest `com.daevid.knvtop.Sample.Get()` sample from the current user's D-Bus session. It does not poll GPU tools or duplicate knvtop's sampling. The panel shows GPU utilization, shared GTT memory, temperature, power, CPU and system RAM. Its graph plots GPU utilization, GTT, temperature, power and CPU; system RAM is shown separately and is never presented as GPU RAM. Click a graph-backed card or legend label to toggle its line. Visibility preferences are saved and shared with the Work Status graph.

knvtop reports GTT in MiB and system RAM in bytes; onvtop converts both to GiB for display.

## Requirements

- Linux desktop session with OpenChamber Desktop running as the same user as knvtop.
- The knvtop service installed and running on that user's session bus.
- `busctl` available on `PATH` (provided by systemd on typical Linux distributions).

The host OpenChamber service must be able to access the user's session bus. A web/server instance running under a different account cannot read another user's D-Bus session.

## Install from GitHub

In OpenChamber, open **Settings → Extensions**, paste the repository URL, and choose **Add**:

```text
https://github.com/DAE51D/openchamber-onvtop
```

Approve the **Run a local service** permission, which allows the extension to run `busctl` and read knvtop's D-Bus sample. The panel appears on the rail; the compact graph is available in **Work Status** (enable **GPU · onvtop** in its section chooser if hidden).

## Install a local development folder

Use the absolute path to your clone in **Settings → Extensions → Add**. Folder installs run directly from that folder, so rebuilds can be tested without pushing. Do not edit OpenChamber's `extensions.json` by hand.

## Build and verify

Requires [Bun](https://bun.sh/):

```sh
bun install
bun run check
```

To smoke-test against a live knvtop service on the current session bus:

```sh
bun run smoke
```

The extension service reads and caches the latest D-Bus sample once per second, then serves it to the sandboxed panel and Work Status frame through OpenChamber's local service bridge.
