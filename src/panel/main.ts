import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import { COLORS } from '../shared/colors.ts';
import { type HistorySeries, type Sample, type Stats, HISTORY_LENGTH } from '../shared/types.ts';
import {
  parseSeriesVisibility,
  SERIES_KEYS,
  SERIES_VISIBILITY_STORAGE_KEY,
  type SeriesKey,
  type SeriesVisibility,
} from '../shared/series.ts';

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');

// ----- Style -----
const CSS = `
html, body {
  margin: 0;
  padding: 0;
  background: var(--oc-bg);
  color: var(--oc-fg);
  font: 12px/1.4 var(--oc-font);
  min-height: 100%;
}
#root {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px;
  min-height: 100%;
}
.section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
h2 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--oc-fg);
}
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  background: color-mix(in srgb, var(--oc-fg) 4%, transparent);
  border: 1px solid color-mix(in srgb, var(--series-color) 70%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--series-color) 8%, transparent);
  border-radius: 8px;
}
.stat[aria-pressed] {
  appearance: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.stat[aria-pressed="false"] { opacity: .48; border-style: dashed; }
.stat[aria-pressed="true"]:hover { background: color-mix(in srgb, var(--series-color) 9%, transparent); }
.stat:focus-visible, .legend-item:focus-visible { outline: 2px solid var(--series-color, var(--oc-primary)); outline-offset: 2px; }
.stat-label {
  font-size: 11px;
  color: var(--oc-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.stat-value {
  font-size: 20px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.stat-unit {
  font-size: 11px;
  color: var(--oc-muted);
  font-weight: 400;
}
.mem-detail {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px 12px;
  font-size: 11px;
  color: var(--oc-muted);
  padding: 0 4px;
}
.chart-container {
  background: color-mix(in srgb, var(--oc-fg) 4%, transparent);
  border-radius: 8px;
  padding: 10px;
  position: relative;
}
.chart {
  width: 100%;
  height: 100px;
  display: block;
}
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 11px;
  color: var(--oc-muted);
  padding-top: 6px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  appearance: none;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  padding: 2px 0;
  cursor: pointer;
}
.legend-item[aria-pressed="false"] { opacity: .38; text-decoration: line-through; }
.legend-item[aria-pressed="true"]:hover { color: var(--oc-fg); }
.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}
.status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--oc-muted);
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6b7280;
}
.status-dot.ok {
  background: #22c55e;
}
.status-dot.error {
  background: #ef4444;
}
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: var(--oc-muted);
}
.error-banner {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 10px;
  color: #ef4444;
  font-size: 12px;
}
`;

const style = document.createElement('style');
style.textContent = CSS;
document.head.append(style);

// ----- Chart colors -----
// ----- Formatting -----
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
};

const formatPercent = (pct: number | null): string => {
  if (pct === null) return '–';
  return `${pct.toFixed(0)}%`;
};

const formatTemp = (temp: number | null): string => {
  if (temp === null) return '–';
  return `${temp.toFixed(0)}°`;
};

const formatWatts = (w: number | null): string => {
  if (w === null) return '–';
  return `${w.toFixed(0)} W`;
};

// ----- Multi-line sparkline chart -----
const SERIES_LABELS = {
  util: 'GPU Util',
  mem: 'GTT',
  temp: 'Temp',
  power: 'Power',
  cpu: 'CPU',
};

// Match knvtop's 0..100 scales; power history is normalized in the service.
const seriesMax = {
  util: 100,
  mem: 100,
  temp: 100, // will be clamped
  power: 100, // normalized to power cap or max seen
  cpu: 100,
};

function drawChart(history: HistorySeries, visible: SeriesVisibility): void {
  const svg = document.getElementById('chart-svg') as SVGSVGElement | null;
  if (!svg) return;

  // Clear existing
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  // SVG coordinates must use viewBox units, not CSS pixels. Mixing the two
  // left the trace ending halfway across narrow rail panels.
  const width = 300;
  const height = 100;
  const pad = 2;

  const xOf = (index: number, count: number) => {
    if (count <= 1) return width / 2;
    return pad + ((HISTORY_LENGTH - count + index) / (HISTORY_LENGTH - 1)) * (width - 2 * pad);
  };

  const yOf = (value: number, max: number) => {
    const clamped = Math.min(Math.max(value, 0), max);
    return height - pad - (clamped / max) * (height - 2 * pad);
  };

  // Draw grid lines at 25%, 50%, 75%
  const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  for (const frac of [0.25, 0.5, 0.75]) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '0');
    line.setAttribute('x2', String(width));
    line.setAttribute('y1', String(height * frac));
    line.setAttribute('y2', String(height * frac));
    line.setAttribute('stroke', 'var(--oc-border)');
    line.setAttribute('stroke-width', '0.5');
    line.setAttribute('opacity', '0.3');
    gridGroup.appendChild(line);
  }
  svg.appendChild(gridGroup);

  // Draw each series
  for (const key of SERIES_KEYS) {
    if (!visible[key]) continue;
    const values = history[key];
    const color = COLORS[key];
    const max = seriesMax[key];

    // Build path
    const points: string[] = [];
    values.forEach((value, index) => {
      if (value === null) return;
      const x = xOf(index, values.length);
      const y = yOf(value, max);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    });

    if (points.length < 2) continue;

    // Draw the fill first so it never washes out the crisp line.
    const firstX = points[0].split(',')[0];
    const lastX = points[points.length - 1].split(',')[0];
    const area = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    area.setAttribute('points', `${firstX},${height} ${points.join(' ')} ${lastX},${height}`);
    area.setAttribute('fill', color);
    area.setAttribute('opacity', '0.08');
    svg.appendChild(area);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    path.setAttribute('points', points.join(' '));
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('opacity', '0.95');
    svg.appendChild(path);
  }
}

// ----- State -----
let currentStats: Stats | null = null;
let hasError = false;
let errorCount = 0;
let seriesVisibility = parseSeriesVisibility(undefined);

const statusDot = document.createElement('div');
statusDot.className = 'status-dot';

const statusText = document.createElement('span');
statusText.textContent = 'Connecting…';

const statusRow = document.createElement('div');
statusRow.className = 'status';
statusRow.append(statusDot, statusText);

// ----- Stats cards -----
const statUtil = document.createElement('button');
statUtil.type = 'button';
statUtil.dataset.series = 'util';
statUtil.className = 'stat';
statUtil.innerHTML = `
  <span class="stat-label">GPU Util</span>
  <span class="stat-value">–</span>
`;

const statSysRam = document.createElement('div');
statSysRam.className = 'stat';
statSysRam.innerHTML = `
  <span class="stat-label">System RAM</span>
  <span class="stat-value">–</span>
`;

const statTemp = document.createElement('button');
statTemp.type = 'button';
statTemp.dataset.series = 'temp';
statTemp.className = 'stat';
statTemp.innerHTML = `
  <span class="stat-label">Temperature</span>
  <span class="stat-value">–</span>
`;

const statPower = document.createElement('button');
statPower.type = 'button';
statPower.dataset.series = 'power';
statPower.className = 'stat';
statPower.innerHTML = `
  <span class="stat-label">Power</span>
  <span class="stat-value">–</span>
`;

const statCpu = document.createElement('button');
statCpu.type = 'button';
statCpu.dataset.series = 'cpu';
statCpu.className = 'stat';
statCpu.innerHTML = `
  <span class="stat-label">CPU</span>
  <span class="stat-value">–</span>
`;

const statGtt = document.createElement('button');
statGtt.type = 'button';
statGtt.dataset.series = 'mem';
statGtt.className = 'stat';
statGtt.innerHTML = `
  <span class="stat-label">GTT Memory</span>
  <span class="stat-value">–</span>
`;

const statsRow = document.createElement('div');
statsRow.className = 'stats-row';
statsRow.append(statUtil, statGtt, statTemp, statPower, statCpu, statSysRam);
const cardColors = [
  [statUtil, COLORS.util],
  [statSysRam, COLORS.systemRam],
  [statTemp, COLORS.temp],
  [statPower, COLORS.power],
  [statCpu, COLORS.cpu],
  [statGtt, COLORS.mem],
] as const;
for (const [card, color] of cardColors) card.style.setProperty('--series-color', color);

const memDetail = document.createElement('div');
memDetail.className = 'mem-detail';
const gttDetail = document.createElement('span');
const sysRamDetail = document.createElement('span');
memDetail.append(gttDetail, sysRamDetail);

// ----- Chart -----
const chartSection = document.createElement('div');
chartSection.className = 'section';
chartSection.innerHTML = `
  <h2>Activity</h2>
  <div class="chart-container">
    <svg id="chart-svg" class="chart" viewBox="0 0 300 100" preserveAspectRatio="none"></svg>
    <div class="legend">
      <button class="legend-item" type="button" data-series="util" style="--series-color:${COLORS.util}" aria-pressed="true"><span class="legend-dot" style="background:${COLORS.util}"></span>${SERIES_LABELS.util}</button>
      <button class="legend-item" type="button" data-series="mem" style="--series-color:${COLORS.mem}" aria-pressed="true"><span class="legend-dot" style="background:${COLORS.mem}"></span>${SERIES_LABELS.mem}</button>
      <button class="legend-item" type="button" data-series="temp" style="--series-color:${COLORS.temp}" aria-pressed="true"><span class="legend-dot" style="background:${COLORS.temp}"></span>${SERIES_LABELS.temp}</button>
      <button class="legend-item" type="button" data-series="power" style="--series-color:${COLORS.power}" aria-pressed="true"><span class="legend-dot" style="background:${COLORS.power}"></span>${SERIES_LABELS.power}</button>
      <button class="legend-item" type="button" data-series="cpu" style="--series-color:${COLORS.cpu}" aria-pressed="true"><span class="legend-dot" style="background:${COLORS.cpu}"></span>${SERIES_LABELS.cpu}</button>
    </div>
  </div>
`;

// ----- Load -----
root.append(statusRow, statsRow, memDetail, chartSection);

function syncSeriesControls(): void {
  for (const control of Array.from(root!.querySelectorAll<HTMLButtonElement>('[data-series]'))) {
    const key = control.dataset.series as SeriesKey;
    const visible = seriesVisibility[key];
    control.setAttribute('aria-pressed', String(visible));
    control.classList.toggle('series-off', !visible);
    control.title = `${visible ? 'Hide' : 'Show'} ${SERIES_LABELS[key]} graph line`;
  }
}

function toggleSeries(key: SeriesKey): void {
  seriesVisibility = { ...seriesVisibility, [key]: !seriesVisibility[key] };
  syncSeriesControls();
  if (currentStats) drawChart(currentStats.history, seriesVisibility);
  void host.storage.set(SERIES_VISIBILITY_STORAGE_KEY, seriesVisibility).catch((error: unknown) => {
    console.warn('Could not save onvtop graph visibility', error);
  });
}

for (const control of Array.from(root!.querySelectorAll<HTMLButtonElement>('[data-series]'))) {
  control.addEventListener('click', () => toggleSeries(control.dataset.series as SeriesKey));
}
syncSeriesControls();

function updateUI(stats: Stats): void {
  const { gpu, sys } = stats.sample;

  // Update stat cards
  statUtil.querySelector('.stat-value')!.textContent = formatPercent(gpu.util);
  statTemp.querySelector('.stat-value')!.textContent = formatTemp(gpu.temp);
  statPower.querySelector('.stat-value')!.textContent = formatWatts(gpu.power_w);
  statCpu.querySelector('.stat-value')!.textContent = formatPercent(sys.cpu);

  // GPU memory
  const memUsedMiB = gpu.mem_used ?? 0;
  const memTotalMiB = gpu.mem_total ?? 0;
  const memPct = gpu.mem_used !== null && memTotalMiB > 0 ? (memUsedMiB / memTotalMiB) * 100 : null;
  statGtt.querySelector('.stat-value')!.textContent = formatPercent(memPct);
  const gttUsed = gpu.mem_used === null ? '—' : (memUsedMiB / 1024).toFixed(1);
  const gttTotal = gpu.mem_total === null ? '—' : (memTotalMiB / 1024).toFixed(1);
  gttDetail.textContent = `GTT ${gttUsed} / ${gttTotal} GiB`;

  // System RAM
  const ramUsed = sys.ram_used;
  const ramTotal = sys.ram_total;
  const ramPct = ramTotal > 0 ? (ramUsed / ramTotal) * 100 : null;
  statSysRam.querySelector('.stat-value')!.textContent = formatPercent(ramPct);
  sysRamDetail.textContent = `System RAM ${(ramUsed / 1073741824).toFixed(1)} / ${(ramTotal / 1073741824).toFixed(1)} GiB`;

  // Chart
  drawChart(stats.history, seriesVisibility);

  // Status
  statusDot.className = 'status-dot ok';
  statusText.textContent = 'Live';
  hasError = false;
}

function updateError(): void {
  statusDot.className = 'status-dot error';
  statusText.textContent = 'No data from knvtop';
  hasError = true;
}

// ----- Polling -----
async function poll(): Promise<void> {
  try {
    const result = await host.serviceRequest({ method: 'GET', path: '/stats' });
    const body = JSON.parse(result.body);
    if (result.status === 200) {
      currentStats = body as Stats;
      updateUI(currentStats);
      errorCount = 0;
    } else {
      throw new Error('bad response');
    }
  } catch {
    errorCount++;
    if (errorCount > 3) {
      updateError();
    }
  }
}

let pollTimer: ReturnType<typeof setInterval> | null = null;
let isPolling = false;

function startPolling(): void {
  if (pollTimer) return;
  pollTimer = setInterval(() => {
    if (!isPolling) {
      isPolling = true;
      poll().finally(() => { isPolling = false; });
    }
  }, 2000);
}

function stopPolling(): void {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}

// ----- Visibility -----
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    startPolling();
    poll();
  } else {
    stopPolling();
  }
});

window.addEventListener('pagehide', () => {
  stopPolling();
  host.dispose();
});

// ----- Init -----
host.onReady(async (ctx) => {
  applyHostReady(ctx, document.documentElement);
  try {
    seriesVisibility = parseSeriesVisibility(await host.storage.get(SERIES_VISIBILITY_STORAGE_KEY));
    syncSeriesControls();
  } catch (error) {
    console.warn('Could not load onvtop graph visibility', error);
  }
  startPolling();
  poll();
});
