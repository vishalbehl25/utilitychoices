'use client';

import { Suspense, useMemo, useState } from 'react';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { PageContainer } from '@/components/layout/PageContainer';
import { ServiceOrangeHero } from '@/components/services/ServiceOrangeHero';
import { NBNFilterPanel } from '@/components/services/NBNFilterPanel';
import { NBNListingCard } from '@/components/services/NBNListingCard';
import { PostcodeListingTools } from '@/components/services/PostcodeListingTools';
import {
  nbnPlans,
  nbnPlanFilterOptions,
  nbnSpeedFilterOptions,
  NBN_PLAN_FILTER_ALL,
} from '@/data/nbn-plans';

const PAGE_DESCRIPTION =
  'Explore 40+ NBN companies and choose the perfect NBN plan for your needs. Need help? Contact us for expert guidance and personalized recommendations.';

function matchesSpeed(planSpeed: number | null, filterValue: string): boolean {
  if (!filterValue) return true;
  const selected = Number.parseInt(filterValue, 10);
  if (Number.isNaN(selected)) return true;
  return planSpeed === selected;
}

export default function NBNClient() {
  const [selectedPlan, setSelectedPlan] = useState(NBN_PLAN_FILTER_ALL);
  const [speed, setSpeed] = useState('');

  const filtered = useMemo(
    () =>
      nbnPlans.filter((plan) => {
        if (
          selectedPlan !== NBN_PLAN_FILTER_ALL &&
          plan.name !== selectedPlan
        ) {
          return false;
        }
        if (!matchesSpeed(plan.speedMbps, speed)) return false;
        return true;
      }),
    [selectedPlan, speed]
  );

  return (
    <SiteLayout>
      <div id="nbn-page">
        <ServiceOrangeHero
          id="nbn-hero"
          title="N.B.N."
          description={PAGE_DESCRIPTION}
          innerClassName="max-md:py-8 max-[374px]:py-7"
          titleClassName="max-md:text-[1.65rem] max-[374px]:text-[1.5rem]"
          descriptionClassName="max-md:mt-3 max-md:text-sm max-md:leading-relaxed max-[374px]:text-[13px]"
        />

        <PageContainer
          id="nbn-main"
          className="relative z-10 -mt-7 overflow-visible pb-10 max-md:-mt-7 max-md:overflow-visible max-md:pb-10 max-[374px]:-mt-6 max-[374px]:pb-8 md:-mt-10 md:pb-16"
        >
          <NBNFilterPanel
            selectedPlan={selectedPlan}
            speed={speed}
            planOptions={nbnPlanFilterOptions}
            speedOptions={nbnSpeedFilterOptions}
            onPlanChange={setSelectedPlan}
            onSpeedChange={setSpeed}
          />

          <div
            id="nbn-postcode-tools"
            className="mt-5 max-md:mt-5 max-[374px]:mt-4 md:mt-6"
          >
            <Suspense fallback={null}>
              <PostcodeListingTools />
            </Suspense>
          </div>

          <div
            id="nbn-listing"
            className="mt-5 flex flex-col gap-3.5 max-md:gap-3.5 max-[374px]:mt-4 max-[374px]:gap-3 md:mt-8 md:gap-5"
          >
            {filtered.map((plan) => (
              <NBNListingCard key={plan.slug} plan={plan} />
            ))}
          </div>

          {filtered.length === 0 ? (
            <p id="nbn-empty" className="mt-8 text-center text-brand-muted">
              No plans match your filters. Try adjusting your selection.
            </p>
          ) : null}
        </PageContainer>
      </div>
    </SiteLayout>
  );
}
