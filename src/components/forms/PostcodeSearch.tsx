'use client';

import { useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  exploreSearchSchema,
  type ExploreSearchFormValues,
} from '@/lib/validations/contact';
import { extractAustralianPostcode } from '@/lib/australian-address';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  setExploreLocation,
  setLocationQuery,
  setSelectedService,
  selectPostcode,
} from '@/redux/features/postcode/postcodeSlice';
import { getServiceHrefFromKey } from '@/lib/service-keys';
import { AddressAutocomplete } from '@/components/forms/AddressAutocomplete';
import { cn } from '@/lib/cn';

interface PostcodeSearchProps {
  serviceKey?: string;
  buttonLabel?: string;
  className?: string;
  variant?: 'card' | 'inline' | 'solar';
  /** Hero Explore: go to enquiry instead of service listing + postcode */
  redirectToEnquiry?: boolean;
  label?: string;
  placeholder?: string;
  inputId?: string;
  submitButtonClassName?: string;
}

export function PostcodeSearch({
  serviceKey = 'home-loan',
  buttonLabel = 'Explore',
  className,
  variant = 'card',
  redirectToEnquiry = false,
  label,
  placeholder = 'e.g., 123 street, 3000',
  inputId = 'hero-postcode-input',
  submitButtonClassName,
}: PostcodeSearchProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    postcode: storedPostcode,
    addressLabel,
    selectedService,
  } = useAppSelector(selectPostcode);

  const activeServiceKey = serviceKey ?? selectedService;
  const {
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<ExploreSearchFormValues>({
    resolver: zodResolver(exploreSearchSchema),
    mode: redirectToEnquiry ? 'onSubmit' : 'onSubmit',
    defaultValues: { location: addressLabel || storedPostcode },
  });

  const location = watch('location');

  useEffect(() => {
    const initial = addressLabel || storedPostcode;
    if (initial) {
      setValue('location', initial);
    }
  }, [addressLabel, storedPostcode, setValue]);

  const persistLocation = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const postcode = extractAustralianPostcode(trimmed);
    if (postcode) {
      dispatch(setExploreLocation({ label: trimmed, postcode }));
      return;
    }

    dispatch(setLocationQuery(trimmed));
  };

  const onSubmit = (data: ExploreSearchFormValues) => {
    if (redirectToEnquiry) {
      persistLocation(data.location);
      router.push('/enquiry');
      return;
    }

    const postcode = extractAustralianPostcode(data.location);
    if (!postcode) return;

    dispatch(setExploreLocation({ label: data.location, postcode }));
    dispatch(setSelectedService(activeServiceKey));
    const href = getServiceHrefFromKey(activeServiceKey);
    if (href) {
      router.push(`${href}?postcode=${postcode}`);
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (redirectToEnquiry) {
      clearErrors('location');
      persistLocation(location ?? '');
      router.push('/enquiry');
      return;
    }

    void handleSubmit(onSubmit)(event);
  };

  const inputStyles = {
    card: cn(
      'min-h-[42px] w-full rounded-t-[8px] border border-brand-border bg-white px-3 py-2 text-xl font-bold leading-normal text-brand-dark outline-none transition-colors sm:min-h-[46px] sm:text-2xl md:text-[26px]',
      'focus:border-brand-dark'
    ),
    inline: cn(
      'h-9 w-full border border-brand-border bg-transparent px-0 text-base font-semibold text-brand-dark outline-none sm:text-lg md:rounded-none md:border-0 md:border-b'
    ),
    solar: cn(
      'h-10 w-full border-0 border-b border-brand-border bg-transparent px-0 pb-1 pt-0.5 text-xl font-bold leading-tight text-brand-dark outline-none transition-colors placeholder:font-normal placeholder:text-brand-muted/60 focus:border-brand-primary sm:h-11 sm:text-2xl'
    ),
  };

  const cardLabel = label ?? 'Explore the market offers';
  const inlineLabel = label ?? 'Explore the market offers';

  const exploreField = (
    <AddressAutocomplete
      id={inputId}
      value={location ?? ''}
      onChange={(value) => {
        setValue('location', value, { shouldValidate: false });
        dispatch(setLocationQuery(value));
        if (redirectToEnquiry) {
          clearErrors('location');
        }
      }}
      onSelect={(suggestion) => {
        setValue('location', suggestion.label, {
          shouldValidate: !redirectToEnquiry && Boolean(suggestion.postcode),
        });
        if (suggestion.postcode) {
          dispatch(
            setExploreLocation({
              label: suggestion.label,
              postcode: suggestion.postcode,
            })
          );
          if (redirectToEnquiry) {
            clearErrors('location');
          }
        }
      }}
      placeholder={placeholder}
      error={!redirectToEnquiry && !!errors.location}
      inputClassName={
        variant === 'card'
          ? inputStyles.card
          : variant === 'solar'
            ? inputStyles.solar
            : inputStyles.inline
      }
      listClassName={
        variant === 'inline' || variant === 'solar'
          ? 'rounded-b-[8px]'
          : undefined
      }
      aria-label="Address or postcode"
    />
  );

  if (variant === 'solar') {
    const solarLabel = label ?? 'Compare with Pincode';

    return (
      <form
        id="solar-postcode-form"
        onSubmit={handleFormSubmit}
        noValidate
        className={cn('w-full max-w-[520px]', className)}
      >
        <div
          id="solar-postcode-form-card"
          className="solar-postcode-glass flex flex-col gap-4 overflow-visible px-5 py-5 sm:flex-row sm:items-center sm:gap-5 sm:px-6 sm:py-6"
        >
          <div className="relative z-50 min-w-0 flex-1 overflow-visible">
            <label
              id="solar-postcode-label"
              htmlFor={inputId}
              className="mb-1.5 block text-sm font-normal text-brand-dark"
            >
              {solarLabel}
            </label>
            {exploreField}
            {errors.location && (
              <p className="mt-1 text-xs text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>
          <button
            id="solar-postcode-submit"
            type="submit"
            className={cn(
              'h-11 w-full shrink-0 rounded-[12px] bg-brand-primary px-8 text-base font-bold text-white transition-colors hover:bg-brand-primary/90 sm:h-12 sm:min-w-[140px] sm:w-auto sm:text-lg',
              submitButtonClassName
            )}
          >
            {buttonLabel}
          </button>
        </div>
      </form>
    );
  }

  if (variant === 'inline') {
    return (
      <form
        id="hero-postcode-form"
        onSubmit={handleFormSubmit}
        noValidate
        className={cn('w-full max-w-[480px]', className)}
      >
        <div id="hero-postcode-form-inner" className="relative">
          <label
            id="hero-postcode-label"
            htmlFor={inputId}
            className="mb-1 block text-sm font-normal text-brand-muted"
          >
            {inlineLabel}
          </label>
          <div
            id="hero-postcode-input-row"
            className="flex items-start gap-3 max-md:flex-col max-md:items-stretch max-md:gap-2 md:flex-row md:items-end"
          >
            <div className="relative z-50 min-w-0 flex-1 overflow-visible">
              {exploreField}
            </div>
            <button
              id="hero-postcode-submit"
              type="submit"
              className={cn(
                'h-[38px] w-full min-w-0 shrink-0 rounded-[4px] bg-brand-dark px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark-hover max-md:mt-1 sm:min-w-[96px] sm:w-auto sm:text-base md:mt-0',
                submitButtonClassName
              )}
            >
              {buttonLabel}
            </button>
          </div>
          {!redirectToEnquiry && errors.location && (
            <p className="mt-1 text-xs text-red-500">
              {errors.location.message}
            </p>
          )}
        </div>
      </form>
    );
  }

  return (
    <form
      id="hero-postcode-form"
      onSubmit={handleFormSubmit}
      noValidate
      className={cn(
        'w-full max-md:max-w-full lg:max-w-[min(920px,var(--site-vw))]',
        className
      )}
    >
      <div
        id="hero-postcode-form-card"
        className="overflow-visible rounded-[10px] bg-white px-3 pb-4 pt-4 max-[374px]:px-2.5 sm:px-6 sm:pb-5 sm:pt-6 md:px-7 md:pb-[21px] md:pt-[29px]"
      >
        <div
          id="hero-postcode-form-row"
          className="flex flex-col gap-4 md:max-lg:flex-col md:max-lg:items-stretch lg:flex-row lg:items-end lg:gap-[18px]"
        >
          <div
            id="hero-postcode-input-wrap"
            className="relative z-50 w-full overflow-visible md:max-lg:w-full lg:w-[394px] lg:shrink-0"
          >
            <label
              id="hero-postcode-label"
              htmlFor={inputId}
              className="mb-1 block text-base font-normal leading-normal text-brand-muted"
            >
              {cardLabel}
            </label>
            {exploreField}
            {!redirectToEnquiry && errors.location && (
              <p className="mt-1 text-left text-sm text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>
          <button
            id="hero-postcode-submit"
            type="submit"
            className="h-12 w-full shrink-0 rounded-[10px] bg-brand-dark px-6 text-lg font-bold leading-none text-white transition-colors hover:bg-brand-dark-hover-alt sm:h-14 sm:text-xl md:max-lg:w-full lg:h-[61px] lg:w-[188px] lg:px-8 lg:text-[22px]"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
