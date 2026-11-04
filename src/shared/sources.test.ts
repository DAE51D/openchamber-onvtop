import { describe, expect, test } from 'bun:test';

import {
  DEFAULT_REMOTE_SOURCES,
  LOCAL_SOURCE_ID,
  normalizeRemoteHost,
  parseSourceConfig,
  remoteSampleUrl,
  sameServiceSource,
  serviceSource,
} from './sources.ts';

describe('onvtop source configuration', () => {
  test('starts in local D-Bus mode with the initial remote hosts available', () => {
    const config = parseSourceConfig(undefined);
    expect(config.selectedSourceId).toBe(LOCAL_SOURCE_ID);
    expect(config.remoteSources).toEqual(DEFAULT_REMOTE_SOURCES);
  });

  test('accepts hostnames only and always uses HTTP port 8039 with the full sample', () => {
    expect(normalizeRemoteHost(' EVO-X2.HOME.LAN ')).toBe('evo-x2.home.lan');
    expect(remoteSampleUrl('evo-x2.home.lan')).toBe('http://evo-x2.home.lan:8039/api/v1/sample?full=1');
    expect(() => normalizeRemoteHost('http://evo-x2.home.lan')).toThrow();
    expect(() => normalizeRemoteHost('evo-x2.home.lan:8040')).toThrow();
    expect(() => normalizeRemoteHost('evo-x2.home.lan/path')).toThrow();
  });

  test('ignores malformed and duplicate saved servers and falls back to local', () => {
    const config = parseSourceConfig({
      selectedSourceId: 'missing',
      remoteSources: [
        { id: 'good', label: 'GPU host', host: 'gpu.home.lan' },
        { id: 'dupe', label: 'Duplicate host', host: 'GPU.HOME.LAN' },
        { id: 'bad', label: 'Bad URL', host: 'https://other.home.lan' },
      ],
    });
    expect(config.selectedSourceId).toBe(LOCAL_SOURCE_ID);
    expect(config.remoteSources).toEqual([{ id: 'good', label: 'GPU host', host: 'gpu.home.lan' }]);
  });

  test('resolves a selected remote to the service configuration', () => {
    const config = parseSourceConfig({
      selectedSourceId: 'evo-x2',
      remoteSources: DEFAULT_REMOTE_SOURCES,
    });
    expect(serviceSource(config)).toEqual({ mode: 'remote', label: 'evo-x2.home.lan', host: 'evo-x2.home.lan' });
  });

  test('treats a repeated source selection or label edit as the same data source', () => {
    expect(sameServiceSource({ mode: 'local' }, { mode: 'local' })).toBe(true);
    expect(sameServiceSource(
      { mode: 'remote', label: 'EVO-X2', host: 'evo-x2.home.lan' },
      { mode: 'remote', label: 'EVO host', host: 'evo-x2.home.lan' },
    )).toBe(true);
    expect(sameServiceSource(
      { mode: 'remote', label: 'EVO-X2', host: 'evo-x2.home.lan' },
      { mode: 'remote', label: 'Proxmox', host: 'proxmox.home.lan' },
    )).toBe(false);
  });
});
