import type { ServiceType } from '@/redux/features/contact/contactSlice';

export type EnquirySourcePage = 'enquiry' | 'call-contact';
export type LocationSource = 'gps' | 'ip';

export interface EnquiryGeoData {
  country: string;
  region: string;
  city: string;
  latitude: string;
  longitude: string;
}

export interface EnquiryRecord {
  leadId: string;
  submittedAt: string;
  sourcePage: EnquirySourcePage;
  fullName: string;
  email: string;
  contactNumber: string;
  currentAddress: string;
  services: ServiceType[];
  serviceLabels: string[];
  termsAccepted: boolean;
  consentText: string;
  locationSource: LocationSource;
  ipAddress: string;
  userAgent: string;
  browser: string;
  operatingSystem: string;
  country: string;
  region: string;
  city: string;
  latitude: string;
  longitude: string;
  detectedAddress?: string;
  submissionTimeZone?: string;
}

export interface ClientSubmissionMetadata {
  locationSource?: LocationSource;
  ipAddress?: string;
  userAgent?: string;
  browser?: string;
  operatingSystem?: string;
  city?: string;
  country?: string;
  region?: string;
  latitude?: string;
  longitude?: string;
  detectedAddress?: string;
  timeZone?: string;
}

export interface ResolvedEnquiryMetadata {
  locationSource: LocationSource;
  ipAddress: string;
  userAgent: string;
  browser: string;
  operatingSystem: string;
  country: string;
  region: string;
  city: string;
  latitude: string;
  longitude: string;
  detectedAddress?: string;
  submissionTimeZone: string;
}

export interface ContactSubmissionPayload {
  fullName: string;
  contactNumber: string;
  email: string;
  currentAddress: string;
  services: string[];
  termsAccepted: boolean;
  sourcePage: EnquirySourcePage;
  clientMetadata?: ClientSubmissionMetadata;
}
