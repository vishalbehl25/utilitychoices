/** @jest-environment node */

import { generateEnquiryPdf } from '@/lib/enquiry/generate-enquiry-pdf';
import type { EnquiryRecord } from '@/lib/enquiry/types';

const sampleRecord: EnquiryRecord = {
  leadId: 'UCL1780914906846',
  submittedAt: '2026-06-03T01:53:00.000Z',
  sourcePage: 'enquiry',
  fullName: 'Peter Serle',
  email: 'peter.serle@bigpond.com',
  contactNumber: '0408033254',
  currentAddress: '78 Inverness Ave, The Basin VIC 3154, Australia',
  services: ['home-loan'],
  serviceLabels: ['Home Loan'],
  termsAccepted: true,
  consentText:
    "By clicking the 'Connect Now' button, I hereby confirm my interest in receiving communication via phone or SMS regarding the services offered from utility choice partners.",
  locationSource: 'ip',
  ipAddress: '115.129.45.102',
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36',
  browser: 'Chrome 148.0.0.0',
  operatingSystem: 'Windows 10',
  country: 'AU',
  region: 'Victoria',
  city: 'Melbourne',
  latitude: '-37.7468',
  longitude: '145.0681',
  submissionTimeZone: 'Australia/Adelaide',
};

function countPdfPages(pdf: Buffer): number {
  const matches = pdf.toString('latin1').match(/\/Type\s*\/Page\b/g);
  return matches?.length ?? 0;
}

const heavyRecord: EnquiryRecord = {
  leadId: 'UCL1780914906847',
  submittedAt: '2026-06-08T08:49:00.000Z',
  sourcePage: 'enquiry',
  fullName: 'saurabh',
  email: 'testingbysaurabh@gmail.com',
  contactNumber: '7755080089',
  currentAddress: 'saket delhi',
  services: [
    'credit-card',
    'home-loan',
    'nbn',
    'inverter',
    'Inverters',
    'personal-loan',
    'health-insurance',
  ],
  serviceLabels: [
    'Credit Card',
    'Home Loan',
    'N.B.N.',
    'Inverter',
    'Solar Panel',
    'Personal Loan',
    'Health Insurance',
  ],
  termsAccepted: true,
  consentText:
    "By clicking the 'Connect Now' button, I hereby confirm my interest in receiving communication via phone or SMS regarding the services offered from utility choice partners.",
  locationSource: 'ip',
  ipAddress: '::1',
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
  browser: 'Chrome 136.0.0.0',
  operatingSystem: 'macOS 10.15.7',
  country: 'Unknown',
  region: 'Unknown',
  city: 'Unknown',
  latitude: 'N/A',
  longitude: 'N/A',
  submissionTimeZone: 'Australia/Adelaide',
};

describe('generateEnquiryPdf', () => {
  it('returns a valid single-page PDF buffer', async () => {
    const pdf = await generateEnquiryPdf(sampleRecord);

    expect(pdf).toBeInstanceOf(Buffer);
    expect(pdf.length).toBeGreaterThan(500);
    expect(pdf.subarray(0, 4).toString('utf8')).toBe('%PDF');
    expect(countPdfPages(pdf)).toBe(1);
  }, 15000);

  it('keeps a full multi-service enquiry on one page', async () => {
    const pdf = await generateEnquiryPdf(heavyRecord);
    expect(countPdfPages(pdf)).toBe(1);
  }, 15000);
});
