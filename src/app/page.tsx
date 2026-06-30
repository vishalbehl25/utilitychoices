import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { HomePostcodeRedirect } from "@/components/home/HomePostcodeRedirect";
import {
  ExpertConnectBanner,
  MarketplaceBadge,
  TrustBadges,
  PartnerLogos,
  ValueProposition,
  VideoSection,
  AboutSection,
  BottomCTA,
} from "@/components/home/HomeSections";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";
import { HOME_METADATA } from "@/constants/metadata";
import { SITE_CONFIG } from "@/constants/navigation";

export const metadata: Metadata = HOME_METADATA;

const organizationSchema = {
  "@context": "https://schema.org/",
  "@type": "LocalBusiness",
  name: "Utility Choice",
  url: SITE_CONFIG.url,
  image: `${SITE_CONFIG.url}/assets/logo.png`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "AU",
    addressLocality: "Epping",
  },
  email: SITE_CONFIG.email,
};

const websiteSchema = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  name: "Utility Choice",
  url: SITE_CONFIG.url,
};

export default function HomePage() {
  return (
    <SiteLayout>
      <div id="home-page">
      <Suspense fallback={null}>
        <HomePostcodeRedirect />
      </Suspense>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HeroSection />
      <ExpertConnectBanner />
      <MarketplaceBadge />
      <TrustBadges />
      <PartnerLogos />
      <ValueProposition />
      <ProcessSteps />
      <TestimonialsSlider />
      <VideoSection />
      <AboutSection />
      <BottomCTA />
      </div>
    </SiteLayout>
  );
}
