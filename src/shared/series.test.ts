import { describe, expect, test } from 'bun:test';

import { DEFAULT_SERIES_VISIBILITY, parseSeriesVisibility, percentOf, powerPercent } from './series.ts';

describe('knvtop history scaling', () => {
  test('converts used/total values to a percentage and keeps missing readings missing', () => {
    expect(percentOf(22_528, 79_872)).toBeCloseTo(28.205, 2);
    expect(percentOf(null, 79_872)).toBeNull();
    expect(percentOf(20, 0)).toBeNull();
  });

  test('scales power against the reported cap or knvtop default and clamps at 100%', () => {
    expect(powerPercent(50, 100)).toBe(50);
    expect(powerPercent(50, null)).toBe(50);
    expect(powerPercent(120, 100)).toBe(100);
    expect(powerPercent(null, 100)).toBeNull();
  });
});

describe('saved graph visibility', () => {
  test('defaults every line on and accepts only known boolean settings', () => {
    expect(parseSeriesVisibility(undefined)).toEqual(DEFAULT_SERIES_VISIBILITY);
    expect(parseSeriesVisibility({ util: false, mem: true, unknown: false })).toEqual({
      ...DEFAULT_SERIES_VISIBILITY,
      util: false,
      mem: true,
    });
  });
});
