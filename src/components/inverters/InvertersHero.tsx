'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { FullBleedSection } from '@/components/layout/PageContainer';
import { PostcodeSearch } from '@/components/forms/PostcodeSearch';
import { PostcodeListingTools } from '@/components/services/PostcodeListingTools';
import { InvertersHeroIllustration } from '@/components/inverters/InvertersHeroIllustration';
import { cn } from '@/lib/cn';
import { siteInnerWidthClass } from '@/lib/responsive';

const HERO_DESCRIPTION =
  'Utility Choice offers a diverse selection of solar inverters. Below, you can explore and compare some of the most popular models. Your choice will primarily depend on your power supply type, which generally falls into two categories: single-phase and three-phase solar inverters.';

export function InvertersHero() {
  return (
    <FullBleedSection
      id="inverters-hero"
      className="overflow-x-clip bg-hero-gradient pb-8 sm:pb-10 md:pb-12"
    >
      <div className="relative z-30 md:min-h-[440px]">
        <div
          id="inverters-hero-illustration"
          className="pointer-events-none absolute right-0 top-6 z-10 hidden w-[min(40%,380px)] max-w-[320px] md:block lg:right-2 lg:max-w-[360px]"
          aria-hidden
        >
          <InvertersHeroIllustration />
        </div>

        <div className="relative z-20 max-w-[640px]">
          <h1
            id="inverters-hero-heading"
            className="mb-4 mt-4 text-[28px] font-bold leading-[1.3] text-brand-dark max-[374px]:text-[24px] sm:mb-6 sm:mt-6 sm:text-[36px] md:mb-8 md:mt-10 md:text-[44px] md:leading-[1.35] lg:text-[48px]"
          >
            Choose and compare Inverters.
          </h1>
          <p
            id="inverters-hero-description"
            className="mb-6 max-w-xl text-base font-light leading-relaxed text-brand-muted sm:mb-8 sm:text-lg"
          >
            {HERO_DESCRIPTION}
          </p>

          <div
            id="inverters-hero-illustration-mobile"
            className="pointer-events-none relative z-10 mx-auto mb-6 flex w-full max-w-[300px] justify-center md:hidden"
            aria-hidden
          >
            <InvertersHeroIllustration />
          </div>

          <div id="inverters-hero-postcode" className="relative z-30">
            <Suspense fallback={null}>
              <PostcodeListingTools />
            </Suspense>
            <div className="mt-4 overflow-visible">
              <PostcodeSearch
                serviceKey="inverter"
                buttonLabel="Compare"
                variant="solar"
                redirectToEnquiry
                placeholder="3000"
                inputId="inverters-postcode-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        id="inverters-switch-cta"
        className={cn(
          siteInnerWidthClass,
          'relative z-10 mt-10 flex flex-col items-center justify-between gap-6 pt-2 sm:flex-row sm:gap-8 md:mt-12 md:pt-4'
        )}
      >
        <h2 className="max-w-xl text-center text-xl font-normal leading-snug text-brand-dark sm:text-left sm:text-2xl md:text-[28px]">
          It&apos;s better to switch rather than to burn your wallet
        </h2>
        <Link
          href="/enquiry"
          className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[8px] bg-brand-accent-bright px-10 py-3.5 text-base font-bold text-white shadow-[0_4px_14px_rgba(255,98,0,0.3)] transition-transform hover:scale-[1.02] sm:px-12 sm:py-4 sm:text-lg"
        >
          Switch Now
        </Link>
      </div>
    </FullBleedSection>
  );
}
