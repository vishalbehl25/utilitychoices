import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import {
  ENQUIRY_EMAIL_INTRO,
  ENQUIRY_EMAIL_SUBJECT,
} from '@/lib/enquiry/constants';
import { buildEnquirySummaryLines } from '@/lib/enquiry/build-enquiry-summary';
import { getEnquiryPdfFilename } from '@/lib/enquiry/generate-enquiry-pdf';
import type { EnquiryRecord } from '@/lib/enquiry/types';

export class EnquiryEmailConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnquiryEmailConfigError';
  }
}

function getSmtpConfig(): SMTPTransport.Options | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.ENQUIRY_EMAIL_FROM?.trim();

  if (!host || !user || !pass || !from) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === 'true';

  return {
    host,
    port,
    secure,
    auth: { user, pass },
  };
}

function getRecipients(): string[] {
  const configured = process.env.ENQUIRY_EMAIL_TO?.trim();
  const raw = configured || 'help@utilitychoice.com.au';
  return raw
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
}

function buildPlainTextBody(record: EnquiryRecord): string {
  return [
    ENQUIRY_EMAIL_INTRO,
    '',
    ...buildEnquirySummaryLines(record),
    '',
    'The full submission details are attached as a PDF.',
  ].join('\n');
}

function buildHtmlBody(record: EnquiryRecord): string {
  const summary = buildEnquirySummaryLines(record)
    .map((line) => {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) return `<p>${line}</p>`;
      const label = line.slice(0, colonIndex);
      const value = line.slice(colonIndex + 1).trim();
      return `<p><strong>${label}:</strong> ${value}</p>`;
    })
    .join('\n');

  return `
    <p>${ENQUIRY_EMAIL_INTRO}</p>
    ${summary}
    <p>The full submission details are attached as a PDF.</p>
  `.trim();
}

export function isEnquiryEmailConfigured(): boolean {
  return getSmtpConfig() !== null;
}

export async function sendEnquiryEmail(
  record: EnquiryRecord,
  pdfBuffer: Buffer,
): Promise<void> {
  const smtpConfig = getSmtpConfig();
  if (!smtpConfig) {
    throw new EnquiryEmailConfigError(
      'Email is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and ENQUIRY_EMAIL_FROM in your environment.',
    );
  }

  const from = process.env.ENQUIRY_EMAIL_FROM!.trim();
  const transporter = nodemailer.createTransport(smtpConfig);

  await transporter.sendMail({
    from,
    to: getRecipients(),
    subject: ENQUIRY_EMAIL_SUBJECT,
    text: buildPlainTextBody(record),
    html: buildHtmlBody(record),
    attachments: [
      {
        filename: getEnquiryPdfFilename(record.leadId),
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });
}
