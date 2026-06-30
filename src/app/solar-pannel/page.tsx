import type { Metadata } from 'next';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { SectionContainer } from '@/components/layout/PageContainer';
import { ExpertConnectBanner } from '@/components/home/HomeSections';
import { SolarHero } from '@/components/solar/SolarHero';
import { SolarPackageCard } from '@/components/solar/SolarPackageCard';
import { SolarSwitchBanner } from '@/components/solar/SolarSwitchBanner';
import { SolarPartnersSection } from '@/components/solar/SolarPartnersSection';
import { SolarHowItWorks } from '@/components/solar/SolarHowItWorks';
import { SolarFaqSection } from '@/components/solar/SolarFaqSection';
import { SOLAR_PACKAGES } from '@/data/solar';
import { PAGE_METADATA } from '@/constants/metadata';

export const metadata: Metadata = PAGE_METADATA.solar;

export default function SolarPage() {
  return (
    <SiteLayout>
      <div id="solar-page">
        <SolarHero />

        <SectionContainer
          id="solar-packages-section"
          className="bg-section-cream py-12 md:py-16"
        >
          <h2 className="mb-2 text-center text-2xl font-bold text-brand-dark sm:text-3xl md:text-4xl">
            Choose from a variety of available sizes!
          </h2>
          <p className="mb-10 text-center text-base font-light text-brand-muted sm:mb-12">
            Compare and choose your ideal solar packages
          </p>

          <div
            id="solar-packages"
            className="grid gap-6 md:grid-cols-3 md:gap-8"
          >
            {SOLAR_PACKAGES.map((pkg) => (
              <SolarPackageCard key={pkg.size} {...pkg} />
            ))}
          </div>
        </SectionContainer>

        <SolarSwitchBanner />
        <SolarPartnersSection />
        <SolarHowItWorks />
        <ExpertConnectBanner />
        <SolarFaqSection />
      </div>
    </SiteLayout>
  );
}
