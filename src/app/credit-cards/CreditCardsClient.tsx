'use client';

import { Suspense, useMemo, useState } from 'react';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { PageContainer } from '@/components/layout/PageContainer';
import { ServiceOrangeHero } from '@/components/services/ServiceOrangeHero';
import { CreditCardsFilterPanel } from '@/components/services/CreditCardsFilterPanel';
import { CreditCardListingCard } from '@/components/services/CreditCardListingCard';
import { PostcodeListingTools } from '@/components/services/PostcodeListingTools';
import { creditCardDetails } from '@/data/credit-card-details';

const INTEREST_RATE_OPTIONS = [
  '12.99',
  '13.99',
  '19.99',
  '20.24',
  '20.74',
  '20.99',
  '23.99',
  '26.3',
  '0',
];

const CHARGE_OPTIONS = [
  '$0',
  '$55',
  '$59',
  '$99',
  '$149',
  '$195',
  '$295',
  '$375',
  '$395',
  '$440',
  '$450',
  '$1,200',
];

const PAGE_DESCRIPTION =
  'Explore and select from 50+ credit cards and find the one that best suits your needs. Need help? Contact us for expert guidance and personalized recommendations.';

export default function CreditCardsClient() {
  const [company, setCompany] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [charges, setCharges] = useState('');

  const companyOptions = useMemo(
    () => [...new Set(creditCardDetails.map((c) => c.company))].sort(),
    []
  );

  const filtered = creditCardDetails.filter((card) => {
    if (company && card.company !== company) return false;
    if (interestRate && card.interestRate !== interestRate) return false;
    if (charges && !card.charges.includes(charges)) return false;
    return true;
  });

  return (
    <SiteLayout>
      <div id="credit-cards-page">
        <ServiceOrangeHero
          id="credit-cards-hero"
          title="Credit Card"
          description={PAGE_DESCRIPTION}
        />

        <PageContainer
          id="credit-cards-main"
          className="relative z-10 -mt-8 pb-12 md:-mt-10 md:pb-16"
        >
          <CreditCardsFilterPanel
            company={company}
            interestRate={interestRate}
            charges={charges}
            companyOptions={companyOptions}
            interestRateOptions={INTEREST_RATE_OPTIONS}
            chargeOptions={CHARGE_OPTIONS}
            onCompanyChange={setCompany}
            onInterestRateChange={setInterestRate}
            onChargesChange={setCharges}
          />

          <div id="credit-cards-postcode-tools">
            <Suspense fallback={null}>
              <PostcodeListingTools />
            </Suspense>
          </div>

          <div
            id="credit-cards-listing"
            className="mt-6 flex flex-col gap-4 md:mt-8 md:gap-5"
          >
            {filtered.map((card) => (
              <CreditCardListingCard key={card.slug} card={card} />
            ))}
          </div>

          {filtered.length === 0 ? (
            <p
              id="credit-cards-empty"
              className="mt-8 text-center text-brand-muted"
            >
              No cards match your filters. Try adjusting your selection.
            </p>
          ) : null}
        </PageContainer>
      </div>
    </SiteLayout>
  );
}
