import { spawn } from 'node:child_process';
import { createServer } from 'node:net';

const portProbe = createServer();
await new Promise((resolve) => portProbe.listen(0, '127.0.0.1', resolve));
const address = portProbe.address();
if (!address || typeof address === 'string') throw new Error('Could not reserve a port');
const port = address.port;
await new Promise((resolve, reject) => portProbe.close((error) => error ? reject(error) : resolve()));

const token = 'onvtop-smoke-test';
const service = spawn(process.execPath, ['service/main.js'], {
  cwd: new URL('..', import.meta.url),
  env: {
    PATH: '/usr/bin:/bin',
    HOME: process.env.HOME,
    TMPDIR: '/tmp',
    LANG: 'C.UTF-8',
    OPENCHAMBER_SERVICE_PORT: String(port),
    OPENCHAMBER_SERVICE_TOKEN: token,
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let stderr = '';
service.stderr.setEncoding('utf8').on('data', (text) => { stderr += text; });

try {
  const deadline = Date.now() + 10_000;
  let stats;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        stats = await response.json();
        if (stats.sourceAvailable) break;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  if (!stats?.sourceAvailable) throw new Error(`knvtop-service D-Bus source did not become available. ${stderr}`);
  if (!stats.sample?.gpu || !stats.sample?.sys) throw new Error('Missing GPU/system sample');
  if (!Array.isArray(stats.history?.mem) || 'ram' in stats.history) throw new Error('History must graph GTT memory, not system RAM');
  if (stats.sample.gpu.mem_total < 10_000) throw new Error('Expected shared GTT memory, got a dedicated-VRAM-sized total');
  const usedGiB = (stats.sample.gpu.mem_used / 1024).toFixed(1);
  const totalGiB = (stats.sample.gpu.mem_total / 1024).toFixed(1);
  console.log(`Live knvtop sample OK: GPU ${stats.sample.gpu.util}% · GTT ${usedGiB}/${totalGiB} GiB · ${stats.sample.gpu.temp}°C`);
} finally {
  service.kill('SIGTERM');
}
