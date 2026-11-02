import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import { COLORS } from '../shared/colors.ts';
import { type HistorySeries, type Stats, SAMPLE_INTERVAL_MS } from '../shared/types.ts';
import { parseSeriesVisibility, SERIES_VISIBILITY_STORAGE_KEY, type SeriesKey, type SeriesVisibility } from '../shared/series.ts';

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
svg{display:block;width:100%;height:48px;overflow:visible}
`;
document.head.append(style);

const summary = document.createElement('div');
summary.className = 'summary';
summary.textContent = 'Waiting for knvtop…';
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
] as const;

function renderChart(history: HistorySeries): void {
  svg.replaceChildren();
  for (const [rawKey, color] of SERIES) {
    const key = rawKey as SeriesKey;
    if (!seriesVisibility[key]) continue;
    const values = history[key];
    if (values.length < 2) continue;
    const points = values.flatMap((value, index) => {
      if (value === null) return [];
      const x = 2 + ((21 - values.length + index) / 20) * 296;
      const y = 46 - (Math.max(0, Math.min(100, value)) / 100) * 42;
      return [`${x.toFixed(1)},${y.toFixed(1)}`];
    });
    if (points.length < 2) continue;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    line.setAttribute('points', points.join(' '));
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '1.5');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke-linejoin', 'round');
    svg.append(line);
  }
}

const formatPercent = (value: number | null): string => value === null ? '—' : `${Math.round(value)}%`;
const poll = async (): Promise<void> => {
  try {
    const result = await host.serviceRequest({ method: 'GET', path: '/stats' });
    if (result.status !== 200) throw new Error('service unavailable');
    const stats = JSON.parse(result.body) as Stats;
    if (!stats.sourceAvailable) {
      summary.textContent = 'knvtop-service unavailable · see onvtop README to install';
      svg.replaceChildren();
      return;
    }
    const { gpu, sys } = stats.sample;
    const memUsed = gpu.mem_used === null ? '—' : (gpu.mem_used / 1024).toFixed(1);
    const memTotal = gpu.mem_total === null ? '—' : (gpu.mem_total / 1024).toFixed(1);
    const ramUsed = (sys.ram_used / 1073741824).toFixed(1);
    const ramTotal = (sys.ram_total / 1073741824).toFixed(1);
    const temp = gpu.temp === null ? '—' : `${Math.round(gpu.temp)}°C`;
    const power = gpu.power_w === null ? '—' : `${Math.round(gpu.power_w)}W`;
    summary.textContent = `GPU ${formatPercent(gpu.util)} · GTT ${memUsed}/${memTotal} GiB · RAM ${ramUsed}/${ramTotal} GiB · ${temp} · ${power} · CPU ${formatPercent(sys.cpu)}`;
    renderChart(stats.history);
  } catch {
    summary.textContent = 'knvtop unavailable';
    svg.replaceChildren();
  }
};

let timer: ReturnType<typeof setInterval> | undefined;
let seriesVisibility: SeriesVisibility = parseSeriesVisibility(undefined);
const start = (): void => {
  if (timer) return;
  void poll();
  timer = setInterval(() => void poll(), SAMPLE_INTERVAL_MS * 2);
};
const stop = (): void => {
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
    host.setHeight(68);
    start();
  })();
});
document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' ? start() : stop());
window.addEventListener('pagehide', () => {
  stop();
  host.dispose();
});
