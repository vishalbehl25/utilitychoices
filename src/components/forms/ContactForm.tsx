'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { selectPostcode } from '@/redux/features/postcode/postcodeSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/cn';
import type { ServiceType } from '@/redux/features/contact/contactSlice';
import { FormSuccessModal } from '@/components/forms/FormSuccessModal';
import { submitContactForm } from '@/services/api/contactService';
import { ENQUIRY_CONTENT_WIDTH_PX } from '@/constants/enquiry';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  contactNumber: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^[\d\s+()-]+$/, 'Invalid phone number'),
  email: z.string().email('Please enter a valid email'),
  currentAddress: z.string().min(5, 'Please enter your address'),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  termsAccepted: z
    .boolean()
    .refine((v) => v, 'You must accept Terms and Conditions'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const SERVICE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: 'credit-card', label: 'Credit Card' },
  { value: 'nbn', label: 'N.B.N.' },
  { value: 'inverter', label: 'Inverter' },
  { value: 'Inverters', label: 'Solar Panel' },
  { value: 'personal-loan', label: 'Personal Loan' },
  { value: 'home-loan', label: 'Home Loan' },
];

interface ContactFormProps {
  variant?: 'enquiry' | 'call-contact';
}

export function ContactForm({ variant = 'enquiry' }: ContactFormProps) {
  const [successOpen, setSuccessOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { addressLabel, postcode } = useAppSelector(selectPostcode);
  const insuranceOption =
    variant === 'enquiry'
      ? { value: 'health-insurance' as ServiceType, label: 'Health Insurance' }
      : { value: 'life-insurance' as ServiceType, label: 'Life Insurance' };

  const allServices = [...SERVICE_OPTIONS, insuranceOption];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      contactNumber: '',
      email: '',
      currentAddress: '',
      services: [],
      termsAccepted: false,
    },
  });

  const selectedServices = watch('services');
  const termsAccepted = watch('termsAccepted');

  useEffect(() => {
    if (variant !== 'enquiry') return;
    const prefillAddress = addressLabel || postcode;
    if (prefillAddress) {
      setValue('currentAddress', prefillAddress, { shouldValidate: false });
    }
  }, [variant, addressLabel, postcode, setValue]);

  const toggleService = (value: string) => {
    const current = selectedServices ?? [];
    const updated = current.includes(value)
      ? current.filter((s) => s !== value)
      : [...current, value];
    setValue('services', updated, { shouldValidate: true });
  };

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitError(null);
    try {
      await submitContactForm({
        ...data,
        services: data.services as ServiceType[],
        sourcePage: variant,
      });
      reset();
      setSuccessOpen(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Submission failed. Please try again.',
      );
    }
  };

  const formId =
    variant === 'call-contact' ? 'call-contact-form' : 'enquiry-form';

  return (
    <>
    <form
      id={formId}
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'mx-auto w-full',
        variant === 'enquiry' ? 'space-y-10' : 'max-w-2xl space-y-8'
      )}
      style={
        variant === 'enquiry'
          ? { maxWidth: ENQUIRY_CONTENT_WIDTH_PX }
          : undefined
      }
    >
      <div id={`${formId}-intro`}>
        <h1 className="site-page-title mb-2">
          {variant === 'call-contact'
            ? 'Before connecting us, just choose the list of services you want to compare'
            : 'Contact With Us'}
        </h1>
        <h2 className="text-xl font-semibold text-brand-primary md:text-2xl">
          Get Expert Advice – No Fees, No Obligations!
        </h2>
        <p className="mt-2 text-brand-dark/70">
          Connect with our experts for free! Neither we nor Utility
          Choice&apos;s experts charge any fees.
        </p>
      </div>

      <div id={`${formId}-personal-details`} className="space-y-4">
        <h3 className="font-semibold">
          Correct detail for perfect comparison for you
        </h3>
        <div
          id={`${formId}-personal-fields`}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div id={`${formId}-field-full-name`}>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              {...register('fullName')}
              error={!!errors.fullName}
              className="mt-1"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div id={`${formId}-field-contact-number`}>
            <Label htmlFor="contactNumber">
              Contact Number
              {variant === 'call-contact' ? ' (for future refrence)' : ''}
            </Label>
            <Input
              id="contactNumber"
              {...register('contactNumber')}
              error={!!errors.contactNumber}
              className="mt-1"
            />
            {errors.contactNumber && (
              <p className="mt-1 text-sm text-red-500">
                {errors.contactNumber.message}
              </p>
            )}
          </div>
          <div id={`${formId}-field-email`}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              error={!!errors.email}
              className="mt-1"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div id={`${formId}-field-address`}>
            <Label htmlFor="currentAddress">Current Address</Label>
            <Input
              id="currentAddress"
              {...register('currentAddress')}
              error={!!errors.currentAddress}
              className="mt-1"
            />
            {errors.currentAddress && (
              <p className="mt-1 text-sm text-red-500">
                {errors.currentAddress.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div id={`${formId}-services`} className="space-y-4">
        <h3 className="font-semibold">Explore our Utility Services</h3>
        <div id={`${formId}-services-options`} className="flex flex-wrap gap-3">
          {allServices.map((service) => (
            <button
              key={service.value}
              id={`${formId}-service-${service.value}`}
              type="button"
              onClick={() => toggleService(service.value)}
              className={cn(
                'site-pill-tab',
                selectedServices?.includes(service.value)
                  ? 'site-pill-tab-active border-brand-primary bg-brand-primary'
                  : 'site-pill-tab-inactive'
              )}
            >
              {service.label}
            </button>
          ))}
        </div>
        {errors.services && (
          <p className="text-sm text-red-500">{errors.services.message}</p>
        )}
      </div>

      <div id={`${formId}-terms`} className="flex items-start gap-3">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) =>
            setValue('termsAccepted', checked === true, {
              shouldValidate: true,
            })
          }
        />
        <Label htmlFor="terms" className="text-sm leading-relaxed">
          I Understand, Utility Choice partners with a range of trusted Utility
          brokers, and partners to recommend competitive utility plans. I have
          read and accepted the{' '}
          <Link href="/privacy-policy" className="text-brand-primary underline">
            Terms and Conditions and Privacy Policy
          </Link>
          .
        </Label>
      </div>
      {errors.termsAccepted && (
        <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>
      )}

      <p id={`${formId}-consent-note`} className="text-sm text-brand-dark/70">
        By clicking the &apos;Connect Now&apos; button, I hereby confirm my
        interest in receiving communication via phone or SMS regarding the
        services offered from utility choice partners.
      </p>

      {submitError ? (
        <p
          id={`${formId}-submit-error`}
          role="alert"
          className="text-sm text-red-500"
        >
          {submitError}
        </p>
      ) : null}

      <div
        className={cn(
          variant === 'enquiry' && 'flex justify-center pt-2'
        )}
      >
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? 'Submitting...' : 'Connect Now'}
        </Button>
      </div>

    </form>
    <FormSuccessModal open={successOpen} onOpenChange={setSuccessOpen} />
    </>
  );
}
