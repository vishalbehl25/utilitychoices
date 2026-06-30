'use client';

import {
  getCmsEventUrl,
  getCmsTrackUrl,
  getPublicCmsProject,
  VISITOR_ID_KEY,
} from '@/lib/cms/config';
import type { ContactClickChannel, CmsFormSubmissionMeta } from '@/lib/cms/types';

export function getVisitorId(): string {
  if (typeof window === 'undefined') {
    return 'server';
  }

  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

function postJson(url: string, body: Record<string, unknown>): void {
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch((error) => {
    console.warn('[cms-tracking] request failed:', error);
  });
}

export function trackPageView(path: string): void {
  postJson(getCmsTrackUrl(true), {
    userId: getVisitorId(),
    path,
  });
}

export function trackContactClick(
  channel: ContactClickChannel,
  path?: string,
): void {
  const currentPath =
    path ?? (typeof window !== 'undefined' ? window.location.pathname : '/');

  postJson(getCmsEventUrl(true), {
    type: 'contact_click',
    userId: getVisitorId(),
    path: currentPath,
    metadata: { channel, project: getPublicCmsProject() },
  });
}

export function trackFormSubmission(meta: CmsFormSubmissionMeta): void {
  const currentPath =
    meta.path ??
    (typeof window !== 'undefined' ? window.location.pathname : '/');

  postJson(getCmsEventUrl(true), {
    type: 'form_submission',
    userId: meta.userId ?? getVisitorId(),
    path: currentPath,
    metadata: {
      formName: meta.formName,
      email: meta.email,
      subscribe: meta.subscribe ?? false,
      project: getPublicCmsProject(),
    },
  });
}
