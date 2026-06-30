export interface RequestMetadata {
  ipAddress: string;
  userAgent: string;
}

function normalizeIp(ip: string): string {
  const trimmed = ip.trim();
  if (trimmed.startsWith('::ffff:')) {
    return trimmed.slice(7);
  }
  return trimmed;
}

function isPrivateIp(ip: string): boolean {
  const normalized = normalizeIp(ip);
  if (!normalized || normalized === 'Unknown') return true;
  if (normalized === '::1' || normalized === '127.0.0.1' || normalized.startsWith('127.')) {
    return true;
  }
  if (normalized.startsWith('10.') || normalized.startsWith('192.168.')) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(normalized)) return true;
  if (
    normalized.startsWith('fc') ||
    normalized.startsWith('fd') ||
    normalized.startsWith('fe80')
  ) {
    return true;
  }
  return false;
}

function readHeaderIp(request: Request, name: string): string | null {
  const value = request.headers.get(name)?.trim();
  return value ? normalizeIp(value) : null;
}

export function extractClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return normalizeIp(first);
  }

  const headerNames = [
    'x-real-ip',
    'cf-connecting-ip',
    'x-vercel-forwarded-for',
    'true-client-ip',
    'x-client-ip',
  ];

  for (const name of headerNames) {
    const ip = readHeaderIp(request, name);
    if (ip) return ip;
  }

  return 'Unknown';
}

export function extractUserAgent(request: Request): string {
  return request.headers.get('user-agent')?.trim() || 'Unknown';
}

export function extractRequestMetadata(request: Request): RequestMetadata {
  const ipAddress = extractClientIp(request);
  return {
    ipAddress,
    userAgent: extractUserAgent(request),
  };
}

export function sanitizeIpAddress(ip?: string | null): string | undefined {
  const trimmed = ip?.trim();
  if (!trimmed || trimmed === 'Unknown' || isPrivateIp(trimmed)) {
    return undefined;
  }
  return trimmed;
}

export { isPrivateIp };
