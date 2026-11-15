import { describe, expect, test } from 'bun:test';

import { scrollPoints } from './chart.ts';

const o = { width: 300, height: 100, pad: 2, max: 100, windowSec: 20 };

describe('scrollPoints', () => {
  test('points slide left as time passes between polls', () => {
    const values = [10, 20, 30];
    const times = [1000, 2000, 3000];
    const a = scrollPoints(values, times, 3000, 0, o);
    const b = scrollPoints(values, times, 3000, 500, o);
    expect(a[0].x).toBeGreaterThan(b[0].x);
    expect(a[0].x - b[0].x).toBeCloseTo((0.5 / 20) * 296, 5);
  });

  test('newest value is held flat to the right edge', () => {
    const pts = scrollPoints([10, 50], [1000, 2000], 2000, 400, o);
    const tail = pts[pts.length - 1];
    expect(tail.x).toBe(298);
    expect(tail.y).toBe(pts[pts.length - 2].y);
  });

  test('skips nulls; one off-screen point is kept so the left end slides out', () => {
    const pts = scrollPoints([5, null, 20, 50], [0, 1000, 59_000, 60_000], 60_000, 0, o);
    // 5 (60 s old) is the one point kept off-screen, the null is skipped, 20 is 1 s old, 50 is on the right edge.
    expect(pts.length).toBe(3);
    expect(pts[0].x).toBeLessThan(0);
    expect(pts[2].x).toBe(298);
    expect(pts[2].y).toBeCloseTo(100 - 2 - 0.5 * 96, 5);
  });

  test('left end moves continuously as the oldest point leaves', () => {
    const values = [10, 20, 30, 40];
    const times = [0, 10_000, 20_000, 30_000];
    const xs = [0, 200, 400, 600, 800].map((ms) => {
      const pts = scrollPoints(values, times, 30_000, 5_000 + ms, o);
      return pts[0].x < 0 ? 0 : pts[0].x; // where the visible line begins
    });
    // the visible line never starts further right than it did before (no snapping back)
    for (let i = 1; i < xs.length; i++) expect(xs[i]).toBeLessThanOrEqual(xs[i - 1] + 1e-9);
  });

  test('falls back to 1 s spacing when the service sent no times', () => {
    const pts = scrollPoints([1, 2, 3], [], 5000, 0, o);
    expect(pts[1].x - pts[0].x).toBeCloseTo((1 / 20) * 296, 5);
  });
});
