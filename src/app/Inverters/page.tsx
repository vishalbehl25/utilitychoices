import type { Metadata } from 'next';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { ExpertConnectBanner } from '@/components/home/HomeSections';
import { InvertersHero } from '@/components/inverters/InvertersHero';
import { InvertersPartnersSection } from '@/components/inverters/InvertersPartnersSection';
import { InvertersPhaseSection } from '@/components/inverters/InvertersPhaseSection';
import { SolarFaqSection } from '@/components/solar/SolarFaqSection';
import {
  SINGLE_PHASE_INVERTERS,
  THREE_PHASE_INVERTERS,
} from '@/data/inverters';
import { PAGE_METADATA } from '@/constants/metadata';

export const metadata: Metadata = PAGE_METADATA.inverters;

export default function InvertersPage() {
  return (
    <SiteLayout>
      <div id="inverters-page">
        <InvertersHero />

        <InvertersPhaseSection
          id="inverters-single-phase"
          title="Single-phase Inverters"
          description="Single-phase power supplies are commonly found in small to medium-sized homes. A single-phase inverter is designed to connect to and export power through just one phase."
          products={SINGLE_PHASE_INVERTERS}
          variant="white"
        />

        <InvertersPhaseSection
          id="inverters-three-phase"
          title="Three-phase Inverters"
          description="Three-phase power supplies are commonly found in larger homes and commercial properties."
          products={THREE_PHASE_INVERTERS}
          variant="cream"
        />

        <InvertersPartnersSection />
        <ExpertConnectBanner />
        <SolarFaqSection />
      </div>
    </SiteLayout>
  );
}
