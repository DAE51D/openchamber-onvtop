export type RemoteSource = {
  id: string;
  label: string;
  host: string;
};

export type SourceConfig = {
  selectedSourceId: string;
  remoteSources: RemoteSource[];
};

export type ServiceSource =
  | { mode: 'local' }
  | { mode: 'remote'; label: string; host: string };

export const SOURCE_CONFIG_STORAGE_KEY = 'sourceConfigV1';
export const LOCAL_SOURCE_ID = 'local';
export const DEFAULT_REMOTE_SOURCES: RemoteSource[] = [
  { id: 'evo-x2', label: 'evo-x2.home.lan', host: 'evo-x2.home.lan' },
  { id: 'proxmox', label: 'proxmox.home.lan', host: 'proxmox.home.lan' },
];

const HOST_PATTERN = /^(?=.{1,253}$)(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)(?:\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*\.?$/;
const ID_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;

export function normalizeRemoteHost(value: string): string {
  const host = value.trim().replace(/\.$/, '').toLowerCase();
  if (!HOST_PATTERN.test(host)) {
    throw new Error('Enter a hostname or IPv4 address only (no http://, port, or path).');
  }
  return host;
}

export function remoteSampleUrl(value: string): string {
  return `http://${normalizeRemoteHost(value)}:8039/api/v1/sample?full=1`;
}

function parseRemoteSource(value: unknown): RemoteSource | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const source = value as Record<string, unknown>;
  if (typeof source.id !== 'string' || !ID_PATTERN.test(source.id)) return null;
  if (typeof source.label !== 'string' || source.label.trim().length < 1 || source.label.length > 80) return null;
  if (typeof source.host !== 'string') return null;
  try {
    return {
      id: source.id,
      label: source.label.trim(),
      host: normalizeRemoteHost(source.host),
    };
  } catch {
    return null;
  }
}

export function parseSourceConfig(value: unknown): SourceConfig {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { selectedSourceId: LOCAL_SOURCE_ID, remoteSources: DEFAULT_REMOTE_SOURCES.map((source) => ({ ...source })) };
  }

  const stored = value as Record<string, unknown>;
  const remoteSources: RemoteSource[] = [];
  const ids = new Set<string>();
  const hosts = new Set<string>();
  if (Array.isArray(stored.remoteSources)) {
    for (const rawSource of stored.remoteSources.slice(0, 50)) {
      const source = parseRemoteSource(rawSource);
      if (!source || ids.has(source.id) || hosts.has(source.host)) continue;
      remoteSources.push(source);
      ids.add(source.id);
      hosts.add(source.host);
    }
  }

  const selectedSourceId = typeof stored.selectedSourceId === 'string'
    && (stored.selectedSourceId === LOCAL_SOURCE_ID || ids.has(stored.selectedSourceId))
    ? stored.selectedSourceId
    : LOCAL_SOURCE_ID;

  return { selectedSourceId, remoteSources };
}

export function serviceSource(config: SourceConfig): ServiceSource {
  if (config.selectedSourceId === LOCAL_SOURCE_ID) return { mode: 'local' };
  const source = config.remoteSources.find(({ id }) => id === config.selectedSourceId);
  if (!source) return { mode: 'local' };
  return { mode: 'remote', label: source.label, host: normalizeRemoteHost(source.host) };
}

export function sameServiceSource(left: ServiceSource, right: ServiceSource): boolean {
  if (left.mode !== right.mode) return false;
  if (left.mode === 'local' || right.mode === 'local') return true;
  return left.host === right.host;
}
