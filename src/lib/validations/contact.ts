import { z } from 'zod';
import { extractAustralianPostcode } from '@/lib/australian-address';

export const postcodeSchema = z.object({
  postcode: z
    .string()
    .regex(/^[0-9]{4}$/, 'Please enter a valid 4-digit Australian postcode'),
});

/** Hero explore field — full address label or postcode with AU postcode present. */
export const exploreSearchSchema = z.object({
  location: z
    .string()
    .min(2, 'Enter an address or postcode')
    .refine(
      (val) => extractAustralianPostcode(val) !== null,
      'Select an address from the list or include a valid 4-digit postcode',
    ),
});

export type ExploreSearchFormValues = z.infer<typeof exploreSearchSchema>;

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long'),
  contactNumber: z
    .string()
    .regex(
      /^(\+61|0)[2-478](?:[ -]?[0-9]){8}$/,
      'Please enter a valid Australian phone number'
    ),
  email: z.string().email('Please enter a valid email address'),
  currentAddress: z
    .string()
    .min(5, 'Please enter your full address')
    .max(200, 'Address is too long'),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  termsAccepted: z.boolean().refine((v) => v === true, {
    message: 'You must accept the Terms and Conditions',
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type PostcodeFormValues = z.infer<typeof postcodeSchema>;
