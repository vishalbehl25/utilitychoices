'use client';

import Link from 'next/link';
import { SectionContainer } from '@/components/layout/PageContainer';
import { AustraliaMapAnimation } from '@/components/home/AustraliaMapAnimation';
import {
  ProcessStepCard,
  type ProcessStepCardProps,
} from '@/components/home/ProcessStepCard';
import { cn } from '@/lib/cn';
import { siteWidthClass } from '@/lib/responsive';

const steps: ProcessStepCardProps[] = [
  {
    id: 'process-step-explore',
    title: 'Explore.',
    topLeft: 'arrow',
    compact: false,
    illustration: 'explore',
    description:
      'Enter your postcode with few quick details for top brokers from our pannel with highest rating.',
  },
  {
    id: 'process-step-select',
    title: 'Select.',
    topLeft: 'arrow',
    arrowLeft: '16px',
    illustration: 'select',
    description:
      'Choose the best service by comparing over 400 companies and find the perfect fit for yourself.',
  },
  {
    id: 'process-step-switch',
    title: 'Switch.',
    topLeft: 'arrow',
    illustration: 'switch',
    description:
      'Discover how much you can save by selecting a high-value plan that delivers quality without compromise.',
  },
  {
    id: 'process-step-save',
    title: 'Save.',
    topLeft: 'thumbs',
    illustration: 'save',
    description:
      'Discover how much you can save by selecting a high-value plan that delivers quality without compromise.',
  },
];

export function ProcessSteps() {
  return (
    <SectionContainer
      id="process-section"
      className="border-t border-brand-section-border bg-[#FDFBED] py-20 max-[374px]:py-8 md:py-20"
    >
      <div
        id="process-section-header"
        className={cn(
          siteWidthClass,
          'mb-6 max-md:gap-0 sm:mb-10 md:max-lg:mb-8 lg:mb-30 lg:flex lg:flex-row lg:items-center lg:gap-8'
        )}
      >
        <AustraliaMapAnimation className="hidden lg:block" />
        <div
          id="process-section-header-text"
          className="min-w-0 flex-1 text-left"
        >
          <p
            id="process-eyebrow"
            className="mb-2 text-lg font-normal leading-snug text-[#666666] max-[374px]:text-base sm:text-[1.35rem]"
          >
            Our Fellow Australians!
          </p>
          <h2
            id="process-heading"
            className="mb-4 text-[1.5rem] font-bold leading-[1.12] text-[#333333] max-[374px]:text-[1.35rem] sm:mb-8 sm:text-[2.75rem] lg:text-[3.25rem]"
          >
            Pay Less Enjoy{' '}
            <span className="text-brand-accent-bright">Moreeee.</span>
          </h2>
          <p
            id="process-description"
            className="text-[15px] font-normal leading-[1.5] text-[#666666] max-[374px]:text-sm sm:text-[17px] md:text-lg"
          >
            By leveraging our platform, you gain access to a network of trusted
            utility brokers, ensuring you receive the most competitive offers
            available and make informed decisions. We are here to help you find
            the best deals and save on your essential services.
          </p>
        </div>
      </div>

      {/* Mobile: 2×2. Desktop: 4 cards in one row */}
      <div id="process-steps-grid-wrap" className={cn(siteWidthClass, 'px-0')}>
        <div
          id="process-steps-grid"
          className={cn(
            'grid items-end gap-1 py-3 grid-cols-2 max-[374px]:gap-0.5 max-[374px]:py-2 sm:gap-2 sm:py-4',
            'md:max-lg:grid-cols-2 md:max-lg:gap-2 lg:grid-cols-4 lg:gap-3 lg:min-h-[273px] lg:py-3'
          )}
        >
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex min-w-0 w-full justify-center lg:py-2"
            >
              <ProcessStepCard {...step} />
            </div>
          ))}
        </div>
      </div>

      <div
        id="process-connect-wrap"
        className={cn(siteWidthClass, 'mt-8 px-0 sm:mt-10 md:mt-12 md:px-1')}
      >
        <Link
          id="process-connect-btn"
          href="/enquiry"
          className="block w-full cursor-pointer rounded-2xl bg-[#1a1a1a] py-3.5 text-center text-base font-bold text-white transition-colors hover:bg-brand-dark-hover max-[374px]:py-3 max-[374px]:text-sm sm:py-4 sm:text-lg"
        >
          Connect Now
        </Link>
      </div>
    </SectionContainer>
  );
}
