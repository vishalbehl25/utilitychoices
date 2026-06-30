import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import {
  buildEnquiryRecord,
  createLeadId,
} from '@/lib/enquiry/build-enquiry-record';
import { generateEnquiryPdf } from '@/lib/enquiry/generate-enquiry-pdf';
import { saveEnquiry } from '@/lib/enquiry/save-enquiry';
import {
  EnquiryEmailConfigError,
  isEnquiryEmailConfigured,
  sendEnquiryEmail,
} from '@/lib/enquiry/send-enquiry-email';
import { contactSubmissionSchema } from '@/lib/validations/contact-submission';
import { syncContactSubmissionToCms } from '@/lib/cms/leads';

async function syncSubmissionToCms(
  data: Awaited<ReturnType<typeof contactSubmissionSchema.parse>>,
  record?: Awaited<ReturnType<typeof buildEnquiryRecord>>,
): Promise<void> {
  try {
    await syncContactSubmissionToCms(data, record);
  } catch (error) {
    console.error('[contact] CMS sync failed:', error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSubmissionSchema.parse(body);

    if (data.sourcePage === 'enquiry') {
      if (!isEnquiryEmailConfigured()) {
        return NextResponse.json(
          {
            success: false,
            message:
              'Enquiry email is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and ENQUIRY_EMAIL_FROM in your environment.',
          },
          { status: 503 }
        );
      }

      const record = await buildEnquiryRecord(data, request);
      await saveEnquiry(record);

      try {
        const pdf = await generateEnquiryPdf(record);
        await sendEnquiryEmail(record, pdf);
      } catch (error) {
        console.error('[enquiry] PDF/email delivery failed:', {
          leadId: record.leadId,
          error,
        });

        const message =
          error instanceof EnquiryEmailConfigError
            ? error.message
            : 'Your enquiry was saved but notification delivery failed. Please try again or contact support.';

        return NextResponse.json(
          {
            success: false,
            message,
            leadId: record.leadId,
          },
          { status: 500 }
        );
      }

      await syncSubmissionToCms(data, record);

      return NextResponse.json({
        success: true,
        message: 'Your enquiry has been submitted successfully.',
        leadId: record.leadId,
        data: {
          name: data.fullName,
          email: data.email,
          services: data.services,
        },
      });
    }

    const leadId = createLeadId();
    const record = await buildEnquiryRecord(data, request);

    await syncSubmissionToCms(data, record);

    return NextResponse.json({
      success: true,
      message: 'Your enquiry has been submitted successfully.',
      leadId,
      data: {
        name: data.fullName,
        email: data.email,
        services: data.services,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.issues },
        { status: 400 }
      );
    }
    console.error('[contact] Unexpected submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
