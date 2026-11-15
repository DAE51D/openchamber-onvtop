import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import { COLORS } from '../shared/colors.ts';
import { areaPolygon, scrollPoints, toPolyline } from '../shared/chart.ts';
import { type HistorySeries, type Stats, HISTORY_LENGTH, SAMPLE_INTERVAL_MS } from '../shared/types.ts';
import { parseSeriesVisibility, SERIES_VISIBILITY_STORAGE_KEY, type SeriesKey, type SeriesVisibility } from '../shared/series.ts';
import { parseSourceConfig, serviceSource, SOURCE_CONFIG_STORAGE_KEY } from '../shared/sources.ts';

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');

const style = document.createElement('style');
style.textContent = `
*{box-sizing:border-box}
[data-oc-theme="dark"]{color-scheme:dark}
[data-oc-theme="light"]{color-scheme:light}
html,body{margin:0;background:transparent;color:var(--oc-fg);font:11px/1.35 var(--oc-font)}
#root{display:flex;flex-direction:column;gap:5px;padding:4px 8px}
.summary{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--oc-muted);font-variant-numeric:tabular-nums}
svg{display:block;width:100%;height:48px;overflow:hidden}
`;
document.head.append(style);

const summary = document.createElement('div');
summary.className = 'summary';
summary.textContent = 'Waiting for nvstats-service…';
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('viewBox', '0 0 300 48');
svg.setAttribute('preserveAspectRatio', 'none');
svg.setAttribute('role', 'img');
svg.setAttribute('aria-label', 'Recent GPU, GTT, temperature, power and CPU activity');
root.append(summary, svg);

const SERIES = [
  ['util', COLORS.util],
  ['mem', COLORS.mem],
  ['temp', COLORS.temp],
  ['power', COLORS.power],
  ['cpu', COLORS.cpu],
  ['npu', COLORS.npu],
] as const;

function renderChart(history: HistorySeries): void {
  svg.replaceChildren();
  const sinceReceive = performance.now() - receivedAt;
  for (const [rawKey, color] of SERIES) {
    const key = rawKey as SeriesKey;
    if (!seriesVisibility[key]) continue;
    const pts = scrollPoints(history[key], history.times ?? [], lastTimestamp, sinceReceive, {
      width: 300, height: 48, pad: 2, max: 100, windowSec: HISTORY_LENGTH - 1,
    });
    if (pts.length < 2) continue;
    // Shaded under the line, like the panel's big graph.
    const area = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    area.setAttribute('points', areaPolygon(pts, 48));
    area.setAttribute('fill', color);
    area.setAttribute('opacity', '0.08');
    svg.append(area);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    line.setAttribute('points', toPolyline(pts));
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '1.5');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke-linejoin', 'round');
    svg.append(line);
  }
}

// Redraw ~30x/s from the last payload so the lines scroll instead of jumping per poll.
let latestHistory: HistorySeries | null = null;
let lastTimestamp = 0;
let receivedAt = performance.now();
let frame = 0;
let lastFrameAt = 0;
const animate = (now: number): void => {
  frame = requestAnimationFrame(animate);
  if (now - lastFrameAt < 33 || !latestHistory) return;
  lastFrameAt = now;
  renderChart(latestHistory);
};

const formatPercent = (value: number | null): string => value === null ? '—' : `${Math.round(value)}%`;
const poll = async (): Promise<void> => {
  try {
    const result = await host.serviceRequest({ method: 'GET', path: '/stats' });
    if (result.status !== 200) throw new Error('service unavailable');
    const stats = JSON.parse(result.body) as Stats;
    if (!stats.sourceAvailable) {
      summary.textContent = `${stats.sourceLabel || 'nvstats-service'} unavailable${stats.sourceError ? ` · ${stats.sourceError}` : ''}`;
      latestHistory = null;
      svg.replaceChildren();
      return;
    }
    const { gpu, sys, npu } = stats.sample;
    const memUsed = gpu.mem_used === null ? '—' : (gpu.mem_used / 1024).toFixed(1);
    const memTotal = gpu.mem_total === null ? '—' : (gpu.mem_total / 1024).toFixed(1);
    const ramUsed = (sys.ram_used / 1073741824).toFixed(1);
    const ramTotal = (sys.ram_total / 1073741824).toFixed(1);
    const temp = gpu.temp === null ? '—' : `${Math.round(gpu.temp)}°C`;
    const power = gpu.power_w === null ? '—' : `${Math.round(gpu.power_w)}W`;
    const sourcePrefix = stats.sourceLabel && stats.sourceLabel !== 'Local D-Bus' ? `${stats.sourceLabel} · ` : '';
    summary.textContent = `${sourcePrefix}GPU ${formatPercent(gpu.util)} · GTT ${memUsed}/${memTotal} GiB · ${temp} · ${power} · CPU ${formatPercent(sys.cpu)}${npu?.present ? ` · NPU ${npu.readable ? formatPercent(npu.util) : 'N/A'}` : ''} · RAM ${ramUsed}/${ramTotal} GiB`;
    latestHistory = stats.history;
    lastTimestamp = stats.timestamp;
    receivedAt = performance.now();
  } catch {
    summary.textContent = 'nvstats-service unavailable';
    latestHistory = null;
    svg.replaceChildren();
  }
};

let timer: ReturnType<typeof setInterval> | undefined;
let seriesVisibility: SeriesVisibility = parseSeriesVisibility(undefined);
const start = (): void => {
  if (timer) return;
  if (!frame) frame = requestAnimationFrame(animate);
  void poll();
  timer = setInterval(() => void poll(), SAMPLE_INTERVAL_MS);
};
const stop = (): void => {
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
  if (timer) clearInterval(timer);
  timer = undefined;
};

host.onReady((context) => {
  applyHostReady(context, document.documentElement);
  void (async () => {
    try {
      seriesVisibility = parseSeriesVisibility(await host.storage.get(SERIES_VISIBILITY_STORAGE_KEY));
    } catch (error) {
      console.warn('Could not load onvtop graph visibility', error);
    }
    try {
      const sourceConfig = parseSourceConfig(await host.storage.get(SOURCE_CONFIG_STORAGE_KEY));
      const result = await host.serviceRequest({
        method: 'POST',
        path: '/source',
        body: JSON.stringify(serviceSource(sourceConfig)),
      });
      if (result.status !== 200) throw new Error('Could not apply telemetry source');
    } catch (error) {
      console.warn('Could not load onvtop source configuration', error);
    }
    host.setHeight(68);
    start();
  })();
});
document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' ? start() : stop());
window.addEventListener('pagehide', () => {
  stop();
  host.dispose();
});
