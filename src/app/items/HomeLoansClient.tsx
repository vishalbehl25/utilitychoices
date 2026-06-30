'use client';

import { Suspense, useMemo, useState } from 'react';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { PageContainer } from '@/components/layout/PageContainer';
import { ServiceOrangeHero } from '@/components/services/ServiceOrangeHero';
import { HomeLoansFilterPanel } from '@/components/services/HomeLoansFilterPanel';
import { HomeLoanListingCard } from '@/components/services/HomeLoanListingCard';
import { PostcodeListingTools } from '@/components/services/PostcodeListingTools';
import {
  homeLoans,
  homeLoanFeeFilters,
  homeLoanInterestRateFilters,
  homeLoanMaxAmountFilters,
  matchesMaxLoanAmountFilter,
} from '@/data/home-loans';

const PAGE_DESCRIPTION =
  'Get daily updated comparisons of 40+ home loan options, rated on interest rates, fees, offset features, and more. Need help? Contact us for expert guidance and personalized recommendations.';

export default function HomeLoansClient() {
  const [interestRate, setInterestRate] = useState('');
  const [loanFee, setLoanFee] = useState('');
  const [maxLoanAmount, setMaxLoanAmount] = useState('');

  const filtered = useMemo(
    () =>
      homeLoans.filter((loan) => {
        if (interestRate && loan.interestRate !== interestRate) return false;
        if (loanFee && loan.loanFee !== loanFee) return false;
        if (!matchesMaxLoanAmountFilter(loan.loanFee, maxLoanAmount)) {
          return false;
        }
        return true;
      }),
    [interestRate, loanFee, maxLoanAmount]
  );

  return (
    <SiteLayout>
      <div id="home-loan-page">
        <ServiceOrangeHero
          id="home-loan-hero"
          title="Home Loan"
          description={PAGE_DESCRIPTION}
        />

        <PageContainer
          id="home-loan-main"
          className="relative z-10 -mt-8 overflow-visible pb-12 max-md:overflow-visible max-md:pb-10 max-[374px]:pb-8 md:-mt-10 md:pb-16"
        >
          <HomeLoansFilterPanel
            interestRate={interestRate}
            loanFee={loanFee}
            maxLoanAmount={maxLoanAmount}
            interestRateOptions={homeLoanInterestRateFilters}
            loanFeeOptions={homeLoanFeeFilters}
            maxLoanAmountOptions={homeLoanMaxAmountFilters}
            onInterestRateChange={setInterestRate}
            onLoanFeeChange={setLoanFee}
            onMaxLoanAmountChange={setMaxLoanAmount}
          />

          <div
            id="home-loan-postcode-tools"
            className="mt-6 max-md:mt-5 max-[374px]:mt-4"
          >
            <Suspense fallback={null}>
              <PostcodeListingTools />
            </Suspense>
          </div>

          <div
            id="home-loan-listing"
            className="mt-6 flex flex-col gap-4 max-md:mt-5 max-md:gap-3.5 max-[374px]:mt-4 max-[374px]:gap-3 md:mt-8 md:gap-5"
          >
            {filtered.map((loan) => (
              <HomeLoanListingCard
                key={loan.listingId ?? loan.slug}
                loan={loan}
              />
            ))}
          </div>

          {filtered.length === 0 ? (
            <p
              id="home-loan-empty"
              className="mt-8 text-center text-brand-muted"
            >
              No home loans match your filters. Try adjusting your selection.
            </p>
          ) : null}
        </PageContainer>
      </div>
    </SiteLayout>
  );
}
