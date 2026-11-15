// Continuous-scroll geometry shared by the panel and the status strip.
//
// Every history point carries the time the service sampled it. A point is drawn
// at x = right edge - age * pixels-per-second, and age keeps growing between
// polls, so the whole line slides left smoothly instead of jumping once per
// poll. The newest value is held flat out to the right edge.

export type ScrollOptions = {
  width: number; // viewBox width
  height: number; // viewBox height
  pad: number;
  max: number; // value mapped to the top
  windowSec: number; // seconds of history across the full width
};

export type ChartPoint = { x: number; y: number };

export function scrollPoints(
  values: (number | null)[],
  times: number[],
  lastTimestamp: number,
  sinceReceiveMs: number,
  o: ScrollOptions,
): ChartPoint[] {
  const n = values.length;
  // Older payloads have no times: assume one point per second ending at lastTimestamp.
  const ts = times.length === n ? times : values.map((_, i) => lastTimestamp - (n - 1 - i) * 1000);
  const usable = o.width - 2 * o.pad;
  const points: ChartPoint[] = [];
  let lastValue: number | null = null;
  for (let i = 0; i < n; i++) {
    const value = values[i];
    if (value === null) continue;
    const ageSec = (lastTimestamp - ts[i] + sinceReceiveMs) / 1000;
    const x = o.width - o.pad - (ageSec / o.windowSec) * usable;
    const clamped = Math.min(Math.max(value, 0), o.max);
    points.push({ x, y: o.height - o.pad - (clamped / o.max) * (o.height - 2 * o.pad) });
    lastValue = value;
  }
  // Keep only one point beyond the left edge: the line then runs off-screen and is
  // clipped by the SVG, so its left end slides out instead of snapping.
  const firstVisible = points.findIndex((p) => p.x >= 0);
  const from = firstVisible < 0 ? Math.max(0, points.length - 1) : Math.max(0, firstVisible - 1);
  points.splice(0, from);
  if (points.length && lastValue !== null) {
    const edge = o.width - o.pad;
    const tail = points[points.length - 1];
    if (tail.x < edge) points.push({ x: edge, y: tail.y });
  }
  return points;
}

export const toPolyline = (pts: ChartPoint[]): string => pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

export const areaPolygon = (pts: ChartPoint[], height: number): string =>
  `${pts[0].x.toFixed(1)},${height} ${toPolyline(pts)} ${pts[pts.length - 1].x.toFixed(1)},${height}`;
