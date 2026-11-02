export const SERIES_KEYS = ['util', 'mem', 'temp', 'power', 'cpu'] as const;
export type SeriesKey = (typeof SERIES_KEYS)[number];
export type SeriesVisibility = Record<SeriesKey, boolean>;
export const SERIES_VISIBILITY_STORAGE_KEY = 'seriesVisibilityV1';
export const DEFAULT_SERIES_VISIBILITY: SeriesVisibility = {
  util: true,
  mem: true,
  temp: true,
  power: true,
  cpu: true,
};

export const parseSeriesVisibility = (value: unknown): SeriesVisibility => {
  const visibility = { ...DEFAULT_SERIES_VISIBILITY };
  if (!value || typeof value !== 'object' || Array.isArray(value)) return visibility;
  for (const key of SERIES_KEYS) {
    const stored = (value as Record<string, unknown>)[key];
    if (typeof stored === 'boolean') visibility[key] = stored;
  }
  return visibility;
};

export const percentOf = (value: number | null, total: number | null): number | null =>
  value === null || total === null || total <= 0 ? null : (value / total) * 100;

export const powerPercent = (watts: number | null, capWatts: number | null): number | null =>
  watts === null ? null : Math.min(100, (watts * 100) / (capWatts || 100));
