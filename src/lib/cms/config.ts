const DEFAULT_API_URL = 'http://localhost:3001';
const DEFAULT_PROJECT = 'utility_choice';

export function getServerCmsApiUrl(): string {
  return (process.env.Z4SERVER_API_URL ?? DEFAULT_API_URL).replace(/\/$/, '');
}

export function getServerCmsProject(): string {
  return process.env.Z4SERVER_PROJECT ?? DEFAULT_PROJECT;
}

export function getPublicCmsApiUrl(): string {
  if (typeof window !== 'undefined') {
    return (
      process.env.NEXT_PUBLIC_Z4SERVER_API_URL ?? DEFAULT_API_URL
    ).replace(/\/$/, '');
  }
  return getServerCmsApiUrl();
}

export function getPublicCmsProject(): string {
  return process.env.NEXT_PUBLIC_Z4SERVER_PROJECT ?? DEFAULT_PROJECT;
}

export function getCmsTrackUrl(isClient = false): string {
  const base = isClient ? getPublicCmsApiUrl() : getServerCmsApiUrl();
  const project = isClient ? getPublicCmsProject() : getServerCmsProject();
  return `${base}/api/${project}/track`;
}

export function getCmsEventUrl(isClient = false): string {
  const base = isClient ? getPublicCmsApiUrl() : getServerCmsApiUrl();
  const project = isClient ? getPublicCmsProject() : getServerCmsProject();
  return `${base}/api/${project}/event`;
}

export function getCmsLeadsUrl(): string {
  return `${getServerCmsApiUrl()}/api/${getServerCmsProject()}/leads`;
}

export const VISITOR_ID_KEY = 'utility_choice_visitor_id';
