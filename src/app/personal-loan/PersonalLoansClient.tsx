'use client';

import { Suspense, useMemo, useState } from 'react';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { PageContainer } from '@/components/layout/PageContainer';
import { ServiceOrangeHero } from '@/components/services/ServiceOrangeHero';
import { PersonalLoansFilterPanel } from '@/components/services/PersonalLoansFilterPanel';
import { PersonalLoanListingCard } from '@/components/services/PersonalLoanListingCard';
import { PostcodeListingTools } from '@/components/services/PostcodeListingTools';
import {
  personalLoans,
  personalLoanInterestRateFilters,
} from '@/data/personal-loans';

const PAGE_DESCRIPTION =
  'Compare over 70+ personal loan and find the one that best suits your needs. Need help? Contact us for expert guidance and personalized recommendations.';

function matchesInterestFilter(
  loanInterestRate: string,
  filterValue: string
): boolean {
  if (!filterValue) return true;
  return loanInterestRate.startsWith(filterValue);
}

export default function PersonalLoansClient() {
  const [interestRate, setInterestRate] = useState('');

  const filtered = useMemo(
    () =>
      personalLoans.filter((loan) =>
        matchesInterestFilter(loan.interestRate, interestRate)
      ),
    [interestRate]
  );

  return (
    <SiteLayout>
      <div id="personal-loan-page">
        <ServiceOrangeHero
          id="personal-loan-hero"
          title="Personal Loan"
          description={PAGE_DESCRIPTION}
        />

        <PageContainer
          id="personal-loan-main"
          className="relative z-10 -mt-8 pb-12 md:-mt-10 md:pb-16"
        >
          <PersonalLoansFilterPanel
            interestRate={interestRate}
            interestRateOptions={personalLoanInterestRateFilters}
            onInterestRateChange={setInterestRate}
          />

          <div id="personal-loan-postcode-tools" className="mt-6">
            <Suspense fallback={null}>
              <PostcodeListingTools />
            </Suspense>
          </div>

          <div
            id="personal-loan-listing"
            className="mt-6 flex flex-col gap-4 md:mt-8 md:gap-5"
          >
            {filtered.map((loan) => (
              <PersonalLoanListingCard key={loan.slug} loan={loan} />
            ))}
          </div>

          {filtered.length === 0 ? (
            <p
              id="personal-loan-empty"
              className="mt-8 text-center text-brand-muted"
            >
              No loans match your filters. Try adjusting your selection.
            </p>
          ) : null}
        </PageContainer>
      </div>
    </SiteLayout>
  );
}
