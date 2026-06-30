import {
  postcodeSchema,
  exploreSearchSchema,
  contactFormSchema,
} from '@/lib/validations/contact';
import { contactSubmissionSchema } from '@/lib/validations/contact-submission';

describe('postcodeSchema', () => {
  it('accepts valid 4-digit postcode', () => {
    const result = postcodeSchema.safeParse({ postcode: '2000' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid postcode', () => {
    const result = postcodeSchema.safeParse({ postcode: '200' });
    expect(result.success).toBe(false);
  });
});

describe('exploreSearchSchema', () => {
  it('accepts full address with postcode', () => {
    const result = exploreSearchSchema.safeParse({
      location: '124 Western Avenue, Montville QLD 4560, Australia',
    });
    expect(result.success).toBe(true);
  });

  it('accepts postcode only', () => {
    const result = exploreSearchSchema.safeParse({ location: '3000' });
    expect(result.success).toBe(true);
  });

  it('rejects text without postcode', () => {
    const result = exploreSearchSchema.safeParse({ location: 'Sydney' });
    expect(result.success).toBe(false);
  });
});

describe('contactFormSchema', () => {
  const validData = {
    fullName: 'John Smith',
    contactNumber: '0412345678',
    email: 'john@example.com',
    currentAddress: '123 Main St, Sydney NSW',
    services: ['credit-card'],
    termsAccepted: true,
  };

  it('accepts valid contact form data', () => {
    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects when terms not accepted', () => {
    const result = contactFormSchema.safeParse({ ...validData, termsAccepted: false });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = contactFormSchema.safeParse({ ...validData, email: 'invalid' });
    expect(result.success).toBe(false);
  });
});

describe('contactSubmissionSchema', () => {
  const validSubmission = {
    fullName: 'John Smith',
    contactNumber: '0412345678',
    email: 'john@example.com',
    currentAddress: '123 Main St, Sydney NSW',
    services: ['credit-card'],
    termsAccepted: true as const,
    sourcePage: 'enquiry' as const,
  };

  it('accepts enquiry submissions with sourcePage', () => {
    const result = contactSubmissionSchema.safeParse(validSubmission);
    expect(result.success).toBe(true);
  });

  it('accepts call-contact submissions', () => {
    const result = contactSubmissionSchema.safeParse({
      ...validSubmission,
      sourcePage: 'call-contact',
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing sourcePage', () => {
    const result = contactSubmissionSchema.safeParse({
      fullName: validSubmission.fullName,
      contactNumber: validSubmission.contactNumber,
      email: validSubmission.email,
      currentAddress: validSubmission.currentAddress,
      services: validSubmission.services,
      termsAccepted: validSubmission.termsAccepted,
    });
    expect(result.success).toBe(false);
  });
});
