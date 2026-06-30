import { ENQUIRY_CONSENT_TEXT } from '@/lib/enquiry/constants';
import { formatSubmissionDateTime } from '@/lib/enquiry/format-submission-datetime';
import type { EnquiryRecord } from '@/lib/enquiry/types';

/** Shared key/value lines used by enquiry email and CMS lead sync. */
export function buildEnquirySummaryLines(record: EnquiryRecord): string[] {
  return [
    `Lead ID: ${record.leadId}`,
    `Submitted: ${formatSubmissionDateTime(record.submittedAt, record.submissionTimeZone)}`,
    `Name: ${record.fullName}`,
    `Email: ${record.email}`,
    `Contact: ${record.contactNumber}`,
    `Address: ${record.currentAddress}`,
    `Services: ${record.serviceLabels.join(', ') || 'None selected'}`,
    `Source: ${record.sourcePage}`,
    `IP Address: ${record.ipAddress}`,
    `Country: ${record.country}`,
    `Region: ${record.region}`,
    `City: ${record.city}`,
    `Latitude: ${record.latitude}`,
    `Longitude: ${record.longitude}`,
    ...(record.detectedAddress
      ? [`Detected Address: ${record.detectedAddress}`]
      : []),
    `Location Source: ${record.locationSource}`,
    `User Agent: ${record.userAgent}`,
    `Browser: ${record.browser}`,
    `Operating System: ${record.operatingSystem}`,
    ...(record.submissionTimeZone
      ? [`Time Zone: ${record.submissionTimeZone}`]
      : []),
    `Terms Accepted: ${record.termsAccepted ? 'Yes' : 'No'}`,
    `Consent: ${record.consentText || ENQUIRY_CONSENT_TEXT}`,
  ];
}

export function buildEnquirySummaryMessage(record: EnquiryRecord): string {
  return buildEnquirySummaryLines(record).join('\n');
}
