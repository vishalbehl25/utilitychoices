import { mapServiceLabels } from '@/lib/enquiry/constants';
import { buildEnquirySummaryMessage } from '@/lib/enquiry/build-enquiry-summary';
import type { EnquiryRecord } from '@/lib/enquiry/types';
import type { ServiceType } from '@/redux/features/contact/contactSlice';
import { getCmsEventUrl, getCmsLeadsUrl } from '@/lib/cms/config';
import type { CmsLeadPayload, CmsFormSubmissionMeta } from '@/lib/cms/types';
import type { ContactSubmissionInput } from '@/lib/validations/contact-submission';

function buildLeadMessage(data: ContactSubmissionInput): string {
  const serviceLabels = mapServiceLabels(data.services as ServiceType[]);
  return [
    `Source: ${data.sourcePage}`,
    `Services: ${serviceLabels.join(', ')}`,
    `Address: ${data.currentAddress}`,
    `Terms Accepted: ${data.termsAccepted ? 'Yes' : 'No'}`,
  ].join('\n');
}

export function buildCmsLeadPayload(
  data: ContactSubmissionInput,
  record?: EnquiryRecord,
): CmsLeadPayload {
  const serviceLabels = mapServiceLabels(data.services as ServiceType[]);

  return {
    name: data.fullName,
    email: data.email,
    phone: data.contactNumber,
    subject: serviceLabels.join(', '),
    message: record ? buildEnquirySummaryMessage(record) : buildLeadMessage(data),
  };
}

export async function syncLeadToCms(
  data: ContactSubmissionInput,
  record?: EnquiryRecord,
): Promise<void> {
  const payload = buildCmsLeadPayload(data, record);

  const response = await fetch(getCmsLeadsUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `CMS lead sync failed (${response.status})${text ? `: ${text}` : ''}`,
    );
  }
}

export async function syncFormSubmissionEvent(
  meta: CmsFormSubmissionMeta,
): Promise<void> {
  const response = await fetch(getCmsEventUrl(false), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'form_submission',
      userId: meta.userId,
      path: meta.path ?? `/${meta.formName}`,
      metadata: {
        formName: meta.formName,
        email: meta.email,
        subscribe: meta.subscribe ?? false,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(
      `CMS form event sync failed (${response.status})${text ? `: ${text}` : ''}`,
    );
  }
}

export async function syncContactSubmissionToCms(
  data: ContactSubmissionInput,
  record?: EnquiryRecord,
): Promise<void> {
  await Promise.all([
    syncLeadToCms(data, record),
    syncFormSubmissionEvent({
      formName: data.sourcePage,
      email: data.email,
      path: `/${data.sourcePage}`,
    }),
  ]);
}

export { buildEnquirySummaryMessage };
