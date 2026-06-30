'use client';

import { Suspense } from 'react';
import { FullBleedSection } from '@/components/layout/PageContainer';
import { PostcodeSearch } from '@/components/forms/PostcodeSearch';
import { PostcodeListingTools } from '@/components/services/PostcodeListingTools';
import { SolarHeroIllustration } from '@/components/solar/SolarHeroIllustration';

const HERO_DESCRIPTION =
  'Thinking about installing a solar system at home? Utility Choice offers a variety of solar panels, inverters, and batteries tailored to suit different household and energy requirements.';

export function SolarHero() {
  return (
    <FullBleedSection
      id="solar-hero"
      className="overflow-x-clip bg-hero-gradient pb-10 sm:pb-12 md:pb-14"
    >
      <div className="relative md:min-h-[480px]">
        <div
          id="solar-hero-illustration"
          className="pointer-events-none absolute right-0 top-2 z-10 hidden w-[min(38%,380px)] max-w-[280px] md:block lg:right-4 lg:max-w-[320px]"
          aria-hidden
        >
          <SolarHeroIllustration />
        </div>

        <div className="relative z-20 max-w-[640px]">
          <h1
            id="solar-hero-heading"
            className="mb-4 mt-4 text-[28px] font-bold leading-[1.3] text-brand-dark max-[374px]:text-[24px] sm:mb-6 sm:mt-6 sm:text-[36px] md:mb-8 md:mt-10 md:text-[44px] md:leading-[1.35] lg:text-[48px]"
          >
            Choose the Perfect Solar Solution for Your Home
          </h1>
          <p
            id="solar-hero-description"
            className="mb-6 max-w-xl text-base font-light leading-relaxed text-brand-muted sm:mb-8 sm:text-lg"
          >
            {HERO_DESCRIPTION}
          </p>

          <div
            id="solar-hero-illustration-mobile"
            className="pointer-events-none relative z-10 mx-auto mb-6 flex w-full max-w-[320px] justify-center md:hidden"
            aria-hidden
          >
            <SolarHeroIllustration />
          </div>

          <div id="solar-hero-postcode" className="relative z-30">
            <Suspense fallback={null}>
              <PostcodeListingTools />
            </Suspense>
            <div className="mt-4 overflow-visible">
              <PostcodeSearch
                serviceKey="solar"
                buttonLabel="Compare"
                variant="solar"
                redirectToEnquiry
                placeholder="3000"
                inputId="solar-postcode-input"
              />
            </div>
          </div>
        </div>
      </div>
    </FullBleedSection>
  );
}
