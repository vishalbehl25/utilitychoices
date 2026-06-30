import { SERVICE_TABS } from '@/constants/navigation';

export function getServiceKeyFromHref(href: string): string | undefined {
  return SERVICE_TABS.find((t) => t.href === href)?.key;
}

export function getServiceHrefFromKey(key: string): string | undefined {
  return SERVICE_TABS.find((t) => t.key === key)?.href;
}

/** First path segment, e.g. `/credit-cards/foo` → `/credit-cards` */
export function getBaseServicePath(pathname: string): string {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment ? `/${segment}` : '/';
}

export function getServiceKeyFromPathname(pathname: string): string | undefined {
  return getServiceKeyFromHref(getBaseServicePath(pathname));
}
