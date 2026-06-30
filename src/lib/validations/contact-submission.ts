import { z } from 'zod';

const clientMetadataSchema = z
  .object({
    locationSource: z.enum(['gps', 'ip']).optional(),
    ipAddress: z.string().optional(),
    userAgent: z.string().optional(),
    browser: z.string().optional(),
    operatingSystem: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    region: z.string().optional(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    detectedAddress: z.string().optional(),
    timeZone: z.string().optional(),
  })
  .optional();

export const contactSubmissionSchema = z.object({
  fullName: z.string().min(2),
  contactNumber: z.string().min(10),
  email: z.string().email(),
  currentAddress: z.string().min(5),
  services: z.array(z.string()).min(1),
  termsAccepted: z.literal(true),
  sourcePage: z.enum(['enquiry', 'call-contact']),
  clientMetadata: clientMetadataSchema,
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
