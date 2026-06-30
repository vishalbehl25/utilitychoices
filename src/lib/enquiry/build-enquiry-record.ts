import {
  ENQUIRY_CONSENT_TEXT,
  mapServiceLabels,
} from '@/lib/enquiry/constants';
import { resolveEnquiryMetadata } from '@/lib/enquiry/resolve-enquiry-metadata';
import type {
  ContactSubmissionPayload,
  EnquiryRecord,
} from '@/lib/enquiry/types';
import type { ServiceType } from '@/redux/features/contact/contactSlice';

let lastLeadTimestamp = 0;

/** Sequential, unique lead ID: `UCL{unixMs}` (e.g. UCL1780914906846). */
export function createLeadId(): string {
  let timestamp = Date.now();
  if (timestamp <= lastLeadTimestamp) {
    timestamp = lastLeadTimestamp + 1;
  }
  lastLeadTimestamp = timestamp;
  return `UCL${timestamp}`;
}

export function normalizeGeoField(value?: string): string {
  const trimmed = value?.trim();
  return trimmed || 'Unknown';
}

export async function buildEnquiryRecord(
  data: ContactSubmissionPayload,
  request: Request
): Promise<EnquiryRecord> {
  const metadata = await resolveEnquiryMetadata(request, data.clientMetadata);
  const services = data.services as ServiceType[];

  return {
    leadId: createLeadId(),
    submittedAt: new Date().toISOString(),
    sourcePage: data.sourcePage,
    fullName: data.fullName,
    email: data.email,
    contactNumber: data.contactNumber,
    currentAddress: data.currentAddress,
    services,
    serviceLabels: mapServiceLabels(services),
    termsAccepted: data.termsAccepted,
    consentText: ENQUIRY_CONSENT_TEXT,
    locationSource: metadata.locationSource,
    ipAddress: normalizeGeoField(metadata.ipAddress),
    userAgent: metadata.userAgent,
    browser: metadata.browser,
    operatingSystem: metadata.operatingSystem,
    country: normalizeGeoField(metadata.country),
    region: normalizeGeoField(metadata.region),
    city: normalizeGeoField(metadata.city),
    latitude: metadata.latitude?.trim() || 'N/A',
    longitude: metadata.longitude?.trim() || 'N/A',
    detectedAddress: metadata.detectedAddress,
    submissionTimeZone: metadata.submissionTimeZone,
  };
}
