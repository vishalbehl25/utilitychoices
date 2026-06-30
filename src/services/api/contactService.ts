import type { ContactFormData } from '@/redux/features/contact/contactSlice';
import { fetchClientSubmissionMetadata } from '@/lib/enquiry/fetch-client-metadata';
import type {
  ClientSubmissionMetadata,
  EnquirySourcePage,
} from '@/lib/enquiry/types';

export interface ContactFormSubmission extends ContactFormData {
  sourcePage: EnquirySourcePage;
  clientMetadata?: ClientSubmissionMetadata;
}

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  leadId?: string;
}

export async function submitContactForm(
  data: ContactFormSubmission,
): Promise<LeadSubmissionResponse> {
  const clientMetadata =
    data.sourcePage === 'enquiry'
      ? await fetchClientSubmissionMetadata()
      : undefined;

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      clientMetadata,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Submission failed');
  }

  return response.json();
}

export async function validatePostcode(postcode: string): Promise<boolean> {
  return /^[0-9]{4}$/.test(postcode);
}
