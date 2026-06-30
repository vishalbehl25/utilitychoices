import { SITE_CONFIG } from '@/constants/navigation';
import type { ServiceType } from '@/redux/features/contact/contactSlice';

export const ENQUIRY_PDF_TITLE = 'Utility Choice - Form Submission';
export const ENQUIRY_PDF_FOOTER = 'Utility Choice - Your utility Partner';
export const ENQUIRY_EMAIL_SUBJECT = 'New Enquiry From Utility Choice';
export const ENQUIRY_EMAIL_INTRO =
  'A new enquiry has been submitted from Utility Choice.';
export const ENQUIRY_SITE_URL = SITE_CONFIG.url;

export const ENQUIRY_CONSENT_TEXT =
  "By clicking the 'Connect Now' button, I hereby confirm my interest in receiving communication via phone or SMS regarding the services offered from utility choice partners.";

export const SERVICE_LABELS: Record<ServiceType, string> = {
  'credit-card': 'Credit Card',
  nbn: 'N.B.N.',
  inverter: 'Inverter',
  Inverters: 'Solar Panel',
  'personal-loan': 'Personal Loan',
  'home-loan': 'Home Loan',
  'health-insurance': 'Health Insurance',
  'life-insurance': 'Life Insurance',
};

export function mapServiceLabels(services: ServiceType[]): string[] {
  return services.map((service) => SERVICE_LABELS[service] ?? service);
}
