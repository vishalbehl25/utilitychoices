'use client';

import { ServiceTabs } from './ServiceTabs';
import { PostcodeSearch } from '@/components/forms/PostcodeSearch';
import { HeroLottieAnimation } from './HeroLottieAnimation';
import { FullBleedSection } from '@/components/layout/PageContainer';

/** Wix hero htmlComp artboard — same proportions as desktop */
const HERO_ILLUSTRATION_WIDTH = 326;
const HERO_ILLUSTRATION_HEIGHT = 398;

export function HeroSection() {
  return (
    <FullBleedSection
      id="hero-section"
      className="overflow-x-clip bg-hero-gradient pb-10 sm:pb-12 max-md:py-8 md:py-0"
      innerClassName="max-w-full lg:px-0"
    >
      <div id="hero-content-row" className="relative lg:min-h-[641px]">
        {/* Desktop/laptop — unchanged */}
        <div
          id="hero-illustration"
          className="pointer-events-none absolute right-[19px] top-[-70px] z-20 hidden h-[398px] w-[326px] items-center justify-center overflow-hidden lg:flex"
        >
          <HeroLottieAnimation className="h-[300px] w-[300px]" />
        </div>

        <h1
          id="hero-heading"
          className="relative z-10 mb-6 mt-4 max-w-[640px] text-[28px] font-bold leading-[1.3] text-brand-dark max-[374px]:text-[24px] sm:mb-8 sm:mt-6 sm:text-[40px] sm:leading-[1.35] md:max-lg:mb-8 md:max-lg:mt-8 md:max-lg:text-[36px] lg:mb-[60px] lg:mt-[60px] lg:text-[52px] lg:leading-[1.5]"
        >
          <span className="block font-normal">Explore, Select &amp; get</span>
          <span className="mt-1.5 block">
            <span className="inline-block bg-brand-accent-bright px-2 py-0.5 font-bold text-white">
              Best
            </span>{' '}
            <span className="font-bold text-brand-accent-bright">
              Utility Deals.
            </span>
          </span>
        </h1>

        <div
          id="hero-illustration-mobile"
          className="pointer-events-none relative z-10 mx-auto mb-6 flex w-full justify-center lg:hidden"
          aria-hidden
        >
          <div
            className="relative w-full max-w-[min(326px,100%)] overflow-hidden"
            style={{
              aspectRatio: `${HERO_ILLUSTRATION_WIDTH} / ${HERO_ILLUSTRATION_HEIGHT}`,
            }}
          >
            <HeroLottieAnimation className="absolute inset-0 size-full" />
          </div>
        </div>

        <div
          id="hero-search"
          className="relative z-40 mb-2 overflow-visible py-4 sm:py-6 md:mb-[10px] md:py-4"
        >
          <PostcodeSearch redirectToEnquiry />
        </div>

        <div id="category-grid" className="relative z-0 py-4 sm:py-6 md:py-4">
          <ServiceTabs />
        </div>

        <div
          id="hero-expert-connect"
          className="relative z-10 mt-6 text-center lg:mt-10"
        >
          <p className="mt-4 text-lg font-bold leading-[1.35] text-brand-dark max-[374px]:text-base sm:mt-6 sm:text-2xl md:max-lg:mt-8 md:max-lg:text-2xl lg:mt-20 lg:text-[30px]">
            Choose &amp; Connect with our{' '}
            <span className="cursor-pointer font-bold text-[#0061b8]">
              expert for free
            </span>
          </p>
        </div>
      </div>
    </FullBleedSection>
  );
}
