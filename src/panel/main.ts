import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import { COLORS } from '../shared/colors.ts';
import { collectLlmCards, displayFlags, engineLabel, type LlmCard } from '../shared/llm.ts';
import { type HistorySeries, type Sample, type Stats, HISTORY_LENGTH } from '../shared/types.ts';
import {
  parseSeriesVisibility,
  SERIES_KEYS,
  SERIES_VISIBILITY_STORAGE_KEY,
  type SeriesKey,
  type SeriesVisibility,
} from '../shared/series.ts';
import {
  LOCAL_SOURCE_ID,
  normalizeRemoteHost,
  parseSourceConfig,
  serviceSource,
  SOURCE_CONFIG_STORAGE_KEY,
  type RemoteSource,
  type SourceConfig,
} from '../shared/sources.ts';

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
.source-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}
.source-controls label { color: var(--oc-muted); white-space: nowrap; }
.source-controls button, .source-dialog input, .source-dialog button {
  color: var(--oc-fg);
  font: inherit;
}
.source-dialog input {
  min-width: 0;
  padding: 6px 8px;
  color: var(--oc-fg);
  background: color-mix(in srgb, var(--oc-fg) 5%, transparent);
  border: 1px solid var(--oc-border);
  border-radius: 6px;
}
.source-controls button, .source-dialog button {
  padding: 6px 9px;
  color: var(--oc-fg);
  background: color-mix(in srgb, var(--oc-fg) 5%, transparent);
  border: 1px solid var(--oc-border);
  border-radius: 6px;
  cursor: pointer;
}
.source-controls button:hover, .source-dialog button:hover { background: color-mix(in srgb, var(--oc-fg) 10%, transparent); }
.source-controls button:focus-visible,
.source-dialog input:focus-visible, .source-dialog button:focus-visible { outline: 2px solid var(--oc-primary); outline-offset: 2px; }
.source-picker { position: relative; flex: 1; min-width: 0; }
.source-picker-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  min-width: 0;
  text-align: left;
}
.source-picker-trigger[aria-expanded="true"] { border-color: var(--oc-primary); }
.source-picker-value { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.source-picker-chevron { flex: none; color: var(--oc-muted); transition: transform .15s ease; }
.source-picker-trigger[aria-expanded="true"] .source-picker-chevron { transform: rotate(180deg); }
.source-picker-menu {
  position: absolute;
  z-index: 20;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 240px;
  overflow: auto;
  padding: 4px;
  background: var(--oc-bg);
  border: 1px solid var(--oc-border);
  border-radius: 8px;
  box-shadow: 0 10px 28px rgba(0,0,0,.4);
}
.source-picker-menu[hidden] { display: none; }
.source-picker-option {
  display: block;
  width: 100%;
  padding: 7px 9px !important;
  border: 0 !important;
  border-radius: 5px !important;
  background: transparent !important;
  color: var(--oc-fg) !important;
  text-align: left;
}
.source-picker-option:hover, .source-picker-option:focus-visible { background: color-mix(in srgb, var(--oc-fg) 9%, transparent) !important; }
.source-picker-option[aria-selected="true"] { background: color-mix(in srgb, var(--oc-primary) 20%, transparent) !important; }
.source-picker-option small { display: block; margin-top: 1px; color: var(--oc-muted); font-size: 10px; }
.source-picker-option:disabled { opacity: .46; cursor: not-allowed; }
.source-picker-option:disabled:hover { background: transparent !important; }
.source-dialog {
  width: min(440px, calc(100vw - 32px));
  max-width: calc(100vw - 32px);
  padding: 16px;
  color: var(--oc-fg);
  background: var(--oc-bg);
  border: 1px solid var(--oc-border);
  border-radius: 10px;
  box-shadow: 0 16px 48px rgba(0,0,0,.35);
}
.source-dialog *, .source-controls * { box-sizing: border-box; }
.source-dialog::backdrop { background: rgba(0,0,0,.55); }
.source-dialog h2 { margin: 0 0 4px; }
.source-dialog .dialog-help, .source-dialog .dialog-error { color: var(--oc-muted); font-size: 11px; }
.source-dialog .dialog-error { min-height: 1.4em; color: #ef4444; }
.server-list { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; }
.server-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 7px; background: color-mix(in srgb, var(--oc-fg) 4%, transparent); border-radius: 6px; }
.server-row-info { display: flex; flex-direction: column; min-width: 0; gap: 1px; }
.server-row-info strong, .server-row-info small { overflow-wrap: anywhere; }
.server-row-info small { color: var(--oc-muted); font-size: 10px; }
.server-actions { display: flex; flex: none; gap: 4px; }
.server-actions .icon-button { display: grid; place-items: center; width: 32px; height: 32px; padding: 0; }
.icon-button svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.server-actions .delete-button { color: var(--oc-muted); }
.server-actions .delete-button:hover { color: #ef4444; }
.add-server { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 7px; margin-top: 10px; }
.add-server input { width: 100%; min-width: 0; }
.add-server input[name="name"] { grid-column: 1 / -1; }
.add-server input[name="host"] { grid-column: 1; }
.add-server button[type="button"]:not(.cancel-edit) { grid-column: 2; }
.add-server .cancel-edit { grid-column: 1 / -1; justify-self: end; }
.add-server .cancel-edit[hidden] { display: none; }
.dialog-actions { display: flex; justify-content: flex-end; margin-top: 12px; }
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
.status span { min-width: 0; overflow-wrap: anywhere; }
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
.llm-section[hidden] { display: none; }
.llm-list { display: flex; flex-direction: column; gap: 8px; }
.llm-card {
  --engine-color: var(--oc-primary);
  min-width: 0;
  padding: 9px;
  background: color-mix(in srgb, var(--oc-fg) 4%, transparent);
  border: 1px solid color-mix(in srgb, var(--engine-color) 65%, transparent);
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--engine-color) 7%, transparent);
}
.llm-title { color: var(--engine-color); font-weight: 650; overflow-wrap: anywhere; }
.llm-stats, .llm-meta { color: var(--oc-muted); font-size: 11px; overflow-wrap: anywhere; }
.llm-flags { display: flex; flex-wrap: wrap; gap: 3px 8px; margin-top: 5px; }
.llm-flag { max-width: 100%; overflow-wrap: anywhere; font: 10px/1.35 var(--oc-mono, monospace); }
.llm-flag-key { color: var(--oc-muted); }
.llm-flag-value { color: var(--oc-fg); }
.llm-empty { color: var(--oc-muted); font-size: 11px; }
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

const llmSection = document.createElement('section');
llmSection.className = 'section llm-section';
const llmHeading = document.createElement('h2');
llmHeading.textContent = 'LLM processes';
const llmList = document.createElement('div');
llmList.className = 'llm-list';
llmSection.append(llmHeading, llmList);

// ----- Source selection and remote server management -----
let sourceConfig: SourceConfig = parseSourceConfig(undefined);
let sourceUpdateQueue: Promise<void> = Promise.resolve();
let sourceConfigurationError = '';
let localSourceAvailable = false;
let localSourceReason = 'Checking local D-Bus…';

const sourceControls = document.createElement('div');
sourceControls.className = 'source-controls';
const sourceLabel = document.createElement('label');
sourceLabel.htmlFor = 'source-picker-trigger';
sourceLabel.textContent = 'Source';
const sourcePicker = document.createElement('div');
sourcePicker.className = 'source-picker';
const sourcePickerButton = document.createElement('button');
sourcePickerButton.id = 'source-picker-trigger';
sourcePickerButton.type = 'button';
sourcePickerButton.className = 'source-picker-trigger';
sourcePickerButton.setAttribute('role', 'combobox');
sourcePickerButton.setAttribute('aria-label', 'Telemetry source');
sourcePickerButton.setAttribute('aria-haspopup', 'listbox');
sourcePickerButton.setAttribute('aria-expanded', 'false');
sourcePickerButton.disabled = true;
const sourcePickerValue = document.createElement('span');
sourcePickerValue.className = 'source-picker-value';
const sourcePickerChevron = document.createElement('span');
sourcePickerChevron.className = 'source-picker-chevron';
sourcePickerChevron.setAttribute('aria-hidden', 'true');
sourcePickerChevron.textContent = '⌄';
sourcePickerButton.append(sourcePickerValue, sourcePickerChevron);
const sourcePickerMenu = document.createElement('div');
sourcePickerMenu.className = 'source-picker-menu';
sourcePickerMenu.id = 'source-picker-options';
sourcePickerMenu.setAttribute('role', 'listbox');
sourcePickerMenu.setAttribute('aria-label', 'Telemetry sources');
sourcePickerMenu.hidden = true;
sourcePickerButton.setAttribute('aria-controls', sourcePickerMenu.id);
sourcePicker.append(sourcePickerButton, sourcePickerMenu);
const manageSourcesButton = document.createElement('button');
manageSourcesButton.type = 'button';
manageSourcesButton.textContent = 'Manage';
manageSourcesButton.setAttribute('aria-label', 'Manage remote servers');
sourceControls.append(sourceLabel, sourcePicker, manageSourcesButton);

const sourceDialog = document.createElement('dialog');
sourceDialog.className = 'source-dialog';
sourceDialog.setAttribute('aria-labelledby', 'source-dialog-title');
const dialogTitle = document.createElement('h2');
dialogTitle.id = 'source-dialog-title';
dialogTitle.textContent = 'Remote servers';
const dialogHelp = document.createElement('div');
dialogHelp.className = 'dialog-help';
dialogHelp.textContent = 'Enter a hostname or IPv4 address. onvtop uses HTTP on port 8039 and requests the full sample.';
const serverList = document.createElement('div');
serverList.className = 'server-list';
const dialogError = document.createElement('div');
dialogError.className = 'dialog-error';
dialogError.setAttribute('role', 'alert');
const addServerForm = document.createElement('div');
addServerForm.className = 'add-server';
const serverNameInput = document.createElement('input');
serverNameInput.name = 'name';
serverNameInput.placeholder = 'Name (optional)';
serverNameInput.setAttribute('aria-label', 'Server display name');
serverNameInput.maxLength = 80;
const serverHostInput = document.createElement('input');
serverHostInput.name = 'host';
serverHostInput.placeholder = 'hostname';
serverHostInput.setAttribute('aria-label', 'Server hostname');
serverHostInput.setAttribute('autocomplete', 'off');
const addServerButton = document.createElement('button');
addServerButton.type = 'button';
addServerButton.textContent = 'Add';
const cancelEditButton = document.createElement('button');
cancelEditButton.type = 'button';
cancelEditButton.className = 'cancel-edit';
cancelEditButton.textContent = 'Cancel edit';
cancelEditButton.hidden = true;
addServerForm.append(serverNameInput, serverHostInput, addServerButton, cancelEditButton);
const dialogActions = document.createElement('div');
dialogActions.className = 'dialog-actions';
const closeDialogButton = document.createElement('button');
closeDialogButton.type = 'button';
closeDialogButton.textContent = 'Done';
dialogActions.append(closeDialogButton);
sourceDialog.append(dialogTitle, dialogHelp, serverList, dialogError, addServerForm, dialogActions);
let editingSourceId: string | null = null;

function clearServerForm(): void {
  editingSourceId = null;
  serverNameInput.value = '';
  serverHostInput.value = '';
  addServerButton.textContent = 'Add';
  cancelEditButton.hidden = true;
}

function createServerIconButton(label: string, paths: string[], extraClass = ''): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `icon-button ${extraClass}`.trim();
  button.title = label;
  button.setAttribute('aria-label', label);
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('aria-hidden', 'true');
  for (const d of paths) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    icon.append(path);
  }
  button.append(icon);
  return button;
}

function renderSourceOptions(): void {
  const options = [
    {
      id: LOCAL_SOURCE_ID,
      label: 'Local D-Bus',
      detail: localSourceAvailable ? 'This machine' : localSourceReason || 'Unavailable on this machine',
    },
    ...sourceConfig.remoteSources.map((source) => ({ id: source.id, label: source.label, detail: `${source.host}:8039` })),
  ];
  const selected = options.find(({ id }) => id === sourceConfig.selectedSourceId) ?? options[0];
  sourcePickerValue.textContent = selected.label;
  sourcePickerButton.setAttribute('aria-label', `Telemetry source: ${selected.label}`);
  sourcePickerMenu.replaceChildren();
  for (const option of options) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'source-picker-option';
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', String(option.id === selected.id));
    item.disabled = option.id === LOCAL_SOURCE_ID && !localSourceAvailable;
    if (item.disabled) item.title = option.detail;
    item.dataset.sourceId = option.id;
    const title = document.createElement('span');
    title.textContent = option.label;
    const detail = document.createElement('small');
    detail.textContent = option.detail;
    item.append(title, detail);
    item.addEventListener('click', () => {
      setSourceMenuOpen(false);
      if (sourceConfig.selectedSourceId !== option.id) {
        void saveSourceConfig({ ...sourceConfig, selectedSourceId: option.id });
      }
    });
    sourcePickerMenu.append(item);
  }
}

function setSourceMenuOpen(open: boolean, focusFirst = false): void {
  sourcePickerMenu.hidden = !open;
  sourcePickerButton.setAttribute('aria-expanded', String(open));
  if (open && focusFirst) sourcePickerMenu.querySelector<HTMLButtonElement>('[role="option"]')?.focus();
}

sourcePickerButton.addEventListener('click', () => {
  setSourceMenuOpen(sourcePickerMenu.hidden);
});
sourcePickerButton.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    setSourceMenuOpen(true, true);
  }
});
sourcePickerMenu.addEventListener('keydown', (event) => {
  const options = Array.from(sourcePickerMenu.querySelectorAll<HTMLButtonElement>('[role="option"]'));
  const index = options.indexOf(document.activeElement as HTMLButtonElement);
  if (event.key === 'Escape') {
    event.preventDefault();
    setSourceMenuOpen(false);
    sourcePickerButton.focus();
  } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    const delta = event.key === 'ArrowDown' ? 1 : -1;
    options[(index + delta + options.length) % options.length]?.focus();
  } else if (event.key === 'Home') {
    event.preventDefault();
    options[0]?.focus();
  } else if (event.key === 'End') {
    event.preventDefault();
    options.at(-1)?.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!sourcePicker.contains(event.target as Node)) setSourceMenuOpen(false);
});

function renderRemoteServers(): void {
  serverList.replaceChildren();
  if (sourceConfig.remoteSources.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'dialog-help';
    empty.textContent = 'No remote servers added.';
    serverList.append(empty);
    return;
  }
  for (const source of sourceConfig.remoteSources) {
    const row = document.createElement('div');
    row.className = 'server-row';
    const info = document.createElement('div');
    info.className = 'server-row-info';
    const name = document.createElement('strong');
    name.textContent = source.label;
    const host = document.createElement('small');
    host.textContent = `${source.host}:8039`;
    info.append(name, host);
    const actions = document.createElement('div');
    actions.className = 'server-actions';
    const edit = createServerIconButton(`Edit ${source.label}`, ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z']);
    edit.addEventListener('click', () => {
      editingSourceId = source.id;
      serverNameInput.value = source.label;
      serverHostInput.value = source.host;
      addServerButton.textContent = 'Save';
      cancelEditButton.hidden = false;
      dialogError.textContent = '';
      serverHostInput.focus();
    });
    const remove = createServerIconButton(`Delete ${source.label}`, [
      'M3 6h18',
      'M8 6V4h8v2',
      'M19 6l-1 14H6L5 6',
      'M10 11v6',
      'M14 11v6',
    ], 'delete-button');
    remove.addEventListener('click', () => {
      const remoteSources = sourceConfig.remoteSources.filter(({ id }) => id !== source.id);
      const selectedSourceId = sourceConfig.selectedSourceId === source.id ? LOCAL_SOURCE_ID : sourceConfig.selectedSourceId;
      if (editingSourceId === source.id) clearServerForm();
      void saveSourceConfig({ ...sourceConfig, selectedSourceId, remoteSources });
      dialogError.textContent = '';
      renderRemoteServers();
    });
    actions.append(edit, remove);
    row.append(info, actions);
    serverList.append(row);
  }
}

function saveSourceConfig(next: SourceConfig): Promise<void> {
  sourceConfig = next;
  sourceConfigurationError = '';
  renderSourceOptions();
  renderRemoteServers();
  statusDot.className = 'status-dot';
  statusText.textContent = 'Connecting…';
  statusText.title = '';
  sourceUpdateQueue = sourceUpdateQueue.then(async () => {
    await host.storage.set(SOURCE_CONFIG_STORAGE_KEY, sourceConfig);
    const result = await host.serviceRequest({
      method: 'POST',
      path: '/source',
      body: JSON.stringify(serviceSource(sourceConfig)),
    });
    if (result.status !== 200) {
      let detail = '';
      try {
        const body = JSON.parse(result.body);
        if (typeof body.error === 'string') detail = `: ${body.error}`;
      } catch { /* non-JSON service error */ }
      if (result.status === 404) throw new Error('Onvtop service is outdated. Restart OpenChamber.');
      throw new Error(`Source request failed (HTTP ${result.status}${detail}).`);
    }
  }).catch((error: unknown) => {
    console.warn('Could not save onvtop source configuration', error);
    const message = error instanceof Error ? error.message : 'Could not change source';
    sourceConfigurationError = message;
    statusText.textContent = message;
    statusText.title = message;
    statusDot.className = 'status-dot error';
  });
  return sourceUpdateQueue;
}

manageSourcesButton.addEventListener('click', () => {
  dialogError.textContent = '';
  renderRemoteServers();
  sourceDialog.showModal();
  serverHostInput.focus();
});
closeDialogButton.addEventListener('click', () => sourceDialog.close());
sourceDialog.addEventListener('click', (event) => {
  if (event.target === sourceDialog) sourceDialog.close();
});
function saveRemoteServer(): void {
  dialogError.textContent = '';
  try {
    if (!editingSourceId && sourceConfig.remoteSources.length >= 50) throw new Error('You can add up to 50 remote servers.');
    const hostName = normalizeRemoteHost(serverHostInput.value);
    if (sourceConfig.remoteSources.some((source) => source.host === hostName && source.id !== editingSourceId)) {
      throw new Error('That host is already in the list.');
    }
    const label = serverNameInput.value.trim() || hostName;
    if (label.length > 80) throw new Error('The server name must be 80 characters or fewer.');
    if (editingSourceId) {
      const remoteSources = sourceConfig.remoteSources.map((source) => source.id === editingSourceId
        ? { ...source, label, host: hostName }
        : source);
      void saveSourceConfig({ ...sourceConfig, remoteSources });
    } else {
      const id = `remote-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      const remote: RemoteSource = { id, label, host: hostName };
      void saveSourceConfig({
        selectedSourceId: id,
        remoteSources: [...sourceConfig.remoteSources, remote],
      });
    }
    clearServerForm();
    renderRemoteServers();
    serverHostInput.focus();
  } catch (error) {
    dialogError.textContent = error instanceof Error ? error.message : 'Invalid server address.';
  }
}
addServerButton.addEventListener('click', saveRemoteServer);
for (const input of [serverNameInput, serverHostInput]) {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      saveRemoteServer();
    }
  });
}
cancelEditButton.addEventListener('click', () => {
  clearServerForm();
  dialogError.textContent = '';
});

// ----- Load -----
root.append(statusRow, statsRow, memDetail, chartSection, sourceControls, llmSection, sourceDialog);

type LlmCardView = {
  element: HTMLElement;
  title: HTMLElement;
  stats: HTMLElement;
  meta: HTMLElement;
  flags: HTMLElement;
  flagsSignature: string;
};

const llmCardViews = new Map<string, LlmCardView>();
const ENGINE_COLORS: Record<LlmCard['engine'], string> = {
  llama: COLORS.util,
  ollama: COLORS.mem,
  vllm: COLORS.temp,
  sglang: COLORS.power,
  tgi: COLORS.cpu,
};

const processPercent = (value: number | null | undefined): string =>
  value === null || value === undefined ? 'N/A' : `${value.toFixed(0)}%`;

const processMiB = (value: number | null | undefined): string =>
  value === null || value === undefined ? 'N/A' : `${(value / 1024).toFixed(0)} MiB`;

function makeLlmCardView(): LlmCardView {
  const element = document.createElement('article');
  element.className = 'llm-card';
  const title = document.createElement('div');
  title.className = 'llm-title';
  const stats = document.createElement('div');
  stats.className = 'llm-stats';
  const meta = document.createElement('div');
  meta.className = 'llm-meta';
  const flags = document.createElement('div');
  flags.className = 'llm-flags';
  element.append(title, stats, meta, flags);
  return { element, title, stats, meta, flags, flagsSignature: '' };
}

function cardMeta(card: LlmCard): string {
  const process = card.process;
  if (!process) {
    const model = card.ollamaModel;
    if (!model) return '';
    return [
      model.parameter_size && `parameters: ${model.parameter_size}`,
      model.quantization && `quant: ${model.quantization}`,
    ].filter(Boolean).join('   ·   ');
  }
  return [
    process.user && `user: ${process.user}`,
    process.ngl && `ngl: ${process.ngl}`,
    process.ctx && `ctx: ${process.ctx}`,
    process.parallel && `parallel: ${process.parallel}`,
    process.threads && `threads: ${process.threads}`,
    process.port && `port: ${process.port}`,
    `pid: ${process.pid}`,
  ].filter(Boolean).join('   ·   ');
}

function updateLlmCard(view: LlmCardView, card: LlmCard): void {
  view.element.style.setProperty('--engine-color', ENGINE_COLORS[card.engine]);
  view.title.textContent = `${engineLabel(card.engine)}  [${card.title}]`;

  if (card.process) {
    const process = card.process;
    view.stats.textContent = `GPU (proc): ${processPercent(process.gpu_pct)}   GPU MEM (proc): ${processMiB(process.vram_kb)}   CPU: ${processPercent(process.cpu_pct)}   RSS: ${processMiB(process.rss_kb)}`;
  } else if (card.ollamaModel) {
    const model = card.ollamaModel;
    const size = model.size ? formatBytes(model.size) : 'N/A';
    const vram = model.size_vram ? formatBytes(model.size_vram) : 'N/A';
    view.stats.textContent = `Model size: ${size}   GPU memory: ${vram}`;
  }

  view.meta.textContent = cardMeta(card);
  const argv = card.process?.argv ?? [];
  const flags = displayFlags(argv);
  const signature = JSON.stringify(flags);
  if (signature !== view.flagsSignature) {
    view.flags.replaceChildren();
    for (const flag of flags) {
      const item = document.createElement('span');
      item.className = 'llm-flag';
      const key = document.createElement('span');
      key.className = 'llm-flag-key';
      key.textContent = `${flag.key}: `;
      const value = document.createElement('span');
      value.className = 'llm-flag-value';
      value.textContent = flag.value || 'on';
      item.append(key, value);
      view.flags.append(item);
    }
    view.flagsSignature = signature;
  }
}

function updateLlmCards(llm: Sample['llm']): void {
  const cards = collectLlmCards(llm);
  llmSection.hidden = cards.length === 0;
  const activeKeys = new Set(cards.map(({ key }) => key));

  for (const [key, view] of llmCardViews) {
    if (activeKeys.has(key)) continue;
    view.element.remove();
    llmCardViews.delete(key);
  }

  cards.forEach((card, index) => {
    let view = llmCardViews.get(card.key);
    if (!view) {
      view = makeLlmCardView();
      llmCardViews.set(card.key, view);
    }
    updateLlmCard(view, card);
    const childAtIndex = llmList.children.item(index);
    if (childAtIndex !== view.element) llmList.insertBefore(view.element, childAtIndex);
  });
}

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
  updateLlmCards(stats.sample.llm);

  if (typeof stats.localSourceAvailable === 'boolean') {
    const available = stats.localSourceAvailable;
    const reason = stats.localSourceReason || 'Unavailable on this machine';
    if (available !== localSourceAvailable || (!available && reason !== localSourceReason)) {
      localSourceAvailable = available;
      localSourceReason = available ? '' : reason;
      renderSourceOptions();
    }
  }

  if (sourceConfigurationError) {
    statusDot.className = 'status-dot error';
    statusText.textContent = sourceConfigurationError;
    statusText.title = sourceConfigurationError;
    drawChart(stats.history, seriesVisibility);
    hasError = true;
    return;
  }

  if (!stats.sourceAvailable) {
    statusDot.className = 'status-dot error';
    statusText.textContent = `${stats.sourceLabel || 'nvstats-service'} unavailable`;
    statusText.title = stats.sourceError || 'No sample received from this source';
    drawChart(stats.history, seriesVisibility);
    hasError = true;
    return;
  }

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
  statusText.textContent = `Live · ${stats.sourceLabel || 'nvstats-service'}`;
  statusText.title = '';
  hasError = false;
}

function updateError(): void {
  statusDot.className = 'status-dot error';
  statusText.textContent = 'No data from nvstats-service';
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
  try {
    sourceConfig = parseSourceConfig(await host.storage.get(SOURCE_CONFIG_STORAGE_KEY));
    renderSourceOptions();
    sourcePickerButton.disabled = false;
    await saveSourceConfig(sourceConfig);
  } catch (error) {
    console.warn('Could not load onvtop source configuration', error);
    renderSourceOptions();
    sourcePickerButton.disabled = false;
  }
  startPolling();
  poll();
});
