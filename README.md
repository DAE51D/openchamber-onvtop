# onvtop

GPU-focused OpenChamber rail panel and compact Work Status graph, powered by the standalone [knvtop-service](https://github.com/DAE51D/knvtop-service) daemon.

onvtop reads the latest `com.daevid.knvtop.Sample.Get()` sample from the daemon user's D-Bus session. It does not poll GPU tools or duplicate the daemon's sampling. The panel shows GPU utilization, shared GTT memory, temperature, power, CPU and system RAM. Its graph plots GPU utilization, GTT, temperature, power and CPU; system RAM is shown separately and is never presented as GPU RAM. Click a graph-backed card or legend label to toggle its line. Visibility preferences are saved and shared with the Work Status graph.

knvtop reports GTT in MiB and system RAM in bytes; onvtop converts both to GiB for display.

## Requirements

- Linux host with `knvtop-service` installed and running for the same user as the OpenChamber host service.
- `busctl` available on `PATH` (provided by systemd on typical Linux distributions).

You do **not** need to install the knvtop Plasma widget. Install the shared daemon once; both knvtop and onvtop can use it. A web/server OpenChamber instance running under a different account cannot read another user's D-Bus session, so install the daemon for the account that runs that OpenChamber server.

## Install the shared daemon

```sh
git clone https://github.com/DAE51D/knvtop-service.git
cd knvtop-service
./install.sh
```

The installer checks for Python D-Bus/GLib bindings, installs the user service, and starts it. See the [knvtop-service README](https://github.com/DAE51D/knvtop-service#install) for distro dependencies and optional cross-user GPU process statistics.

## Install from GitHub

In OpenChamber, open **Settings → Extensions**, paste the repository URL, and choose **Add**:

```text
https://github.com/DAE51D/openchamber-onvtop
```

Approve the **Run a local service** permission, which allows the extension to run `busctl` and read the shared daemon's D-Bus sample. The panel appears on the rail; the compact graph is available in **Work Status** (enable **GPU · onvtop** in its section chooser if hidden). If the daemon is not running, onvtop reports that clearly rather than showing zeroes as live data.

## Install a local development folder

Use the absolute path to your clone in **Settings → Extensions → Add**. Folder installs run directly from that folder, so rebuilds can be tested without pushing. Do not edit OpenChamber's `extensions.json` by hand.

## Build and verify

Requires [Bun](https://bun.sh/):

```sh
bun install
bun run check
```

To smoke-test against a live knvtop-service daemon on the current session bus:

```sh
bun run smoke
```

The extension service reads and caches the latest D-Bus sample once per second, then serves it to the sandboxed panel and Work Status frame through OpenChamber's local service bridge.
