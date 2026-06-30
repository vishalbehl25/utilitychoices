'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ContainedImage, FillImage } from '@/components/ui/ContainedImage';
import { Play } from 'lucide-react';
import { AboutBrandMark } from '@/components/home/AboutBrandMark';
import { AboutCardLabel } from '@/components/home/AboutCardLabel';
import { SectionContainer } from '@/components/layout/PageContainer';
import { cn } from '@/lib/cn';
import { siteInnerWidthClass } from '@/lib/responsive';
import {
  TRUST_BADGES,
  PARTNER_CATEGORIES,
  CREDIT_CARD_PARTNERS,
  HOME_LOAN_PARTNERS,
  PERSONAL_LOAN_PARTNERS,
  SOLAR_PARTNERS,
  NBN_PARTNERS,
  INVERTER_PARTNERS,
  SERVICE_TAB_ICONS,
} from '@/data/partners';

function hrefSlug(href: string): string {
  if (href === '/') return 'home';
  return href.slice(1).replace(/\//g, '-');
}

export function ExpertConnectBanner() {
  return (
    <SectionContainer
      id="trust-section"
      className="bg-section-cream py-8 md:py-10 "
    >
      <div
        id="trust-section-inner"
        className="flex flex-col lg:flex-row items-center justify-between gap-8"
      >
        <h2
          id="trust-heading"
          className="max-w-[540px] text-center text-xl font-normal leading-snug text-brand-dark max-[374px]:text-lg sm:text-2xl md:text-3xl lg:text-[32px] lg:text-left"
        >
          We are the{' '}
          <span className="font-extrabold text-brand-accent-bright">
            Best Utility Market Place
          </span>{' '}
          in Australia 🇦🇺
        </h2>

        <div
          id="trust-badges"
          className="flex w-full max-w-lg flex-wrap items-center justify-center gap-2 sm:gap-3 md:max-lg:flex-wrap md:max-lg:max-w-none md:max-lg:gap-3 lg:max-w-none lg:flex-nowrap lg:gap-4"
        >
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.name}
              id={`trust-badge-${badge.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative aspect-[140/76] w-[80px] shrink-0 transition-transform hover:scale-105 max-[374px]:w-[72px] sm:w-[120px] md:w-[130px]"
            >
              <FillImage
                src={badge.url}
                alt={badge.alt}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

export function MarketplaceBadge() {
  return null;
}

export function TrustBadges() {
  return null;
}

const LOGO_SCALES: Record<string, string> = {
  'American Express': 'scale-[1.25]',
  'Defence Bank': 'scale-[1.3]',
  Bankwest: 'scale-[1.2]',
  'Bank Australia': 'scale-[1.25]',
  HSBC: 'scale-[1.2]',
  Sunboost: 'scale-[1.15]',
  Goodwe: 'scale-[1.15]',
  SunGrow: 'scale-[1.15]',
  Growatt: 'scale-[1.15]',
  'Bendigo Bank': 'scale-[1.50]',
};

export function PartnerLogos() {
  const [activeCategory, setActiveCategory] = useState<string>('Credit Card');

  const getLogosForCategory = (cat: string) => {
    switch (cat) {
      case 'Credit Card':
        return CREDIT_CARD_PARTNERS;
      case 'Home Loan':
        return HOME_LOAN_PARTNERS;
      case 'Personal Loan':
        return PERSONAL_LOAN_PARTNERS;
      case 'Solar':
        return SOLAR_PARTNERS;
      case 'NBN':
        return NBN_PARTNERS;
      case 'Inverter':
        return INVERTER_PARTNERS;
      default:
        return CREDIT_CARD_PARTNERS;
    }
  };

  const activeLogos = getLogosForCategory(activeCategory);

  return (
    <SectionContainer id="partners-section" className="bg-white py-12 md:py-16">
      <h2
        id="partners-heading"
        className="mb-5 text-center text-2xl font-bold text-brand-dark max-[374px]:text-xl sm:mb-6 sm:text-3xl md:text-4xl lg:text-[40px]"
      >
        Our Partner&apos;s{' '}
        <span className="text-brand-accent-bright">Partner</span>
      </h2>

      <div
        id="partners-category-tabs"
        className="mb-6 flex flex-wrap justify-center gap-1.5 max-[374px]:gap-1 sm:mb-8 sm:gap-2 md:gap-3"
      >
        {PARTNER_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              id={`partner-tab-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'site-pill-tab text-xs font-semibold max-[374px]:px-2.5 max-[374px]:py-1.5 sm:text-sm md:text-base',
                isActive ? 'site-pill-tab-active' : 'site-pill-tab-inactive'
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div
        id="partners-logo-grid"
        className="rounded-[20px] border border-brand-border-light bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.015)] transition-all duration-300 max-[374px]:p-3 sm:p-6 md:p-10"
      >
        <div
          id="partners-logo-grid-inner"
          className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6"
        >
          {activeLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${activeCategory}-${i}`}
              id={`partner-logo-${logo.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex h-20 w-full items-center justify-center rounded-[12px] border border-brand-border-muted bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-all duration-300 hover:border-brand-primary/40 hover:scale-[1.03] hover:shadow-[0_4px_12px_rgba(28,98,175,0.08)]"
            >
              <ContainedImage
                src={logo.url}
                alt={logo.name}
                width={120}
                height={48}
                className={cn(
                  'max-h-[40px] max-w-[100px] object-contain transition-transform sm:max-h-[48px] sm:max-w-[120px]',
                  LOGO_SCALES[logo.name] || ''
                )}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

export function ValueProposition() {
  return null;
}

export function VideoSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const videos = [
    {
      id: 'SnVWaRSDn4c',
      title: 'Energy bill hikes — 9 News Australia',
      thumbnailImage: '/assets/videos/energy-bills-thumbnail.jpg',
    },
    {
      id: 'dNElZ_FYwNA',
      title: 'Cost of living — 7 News Australia',
      thumbnailImage: '/assets/videos/cost-of-living-thumbnail.jpg',
    },
  ];

  return (
    <SectionContainer
      id="video-section"
      className="bg-white py-16 md:py-30 lg:py-30"
    >
      <h2
        id="video-heading"
        className="mb-3 text-center text-3xl font-bold text-brand-dark md:text-4xl lg:text-[40px]"
      >
        Why you should review your bills today!
      </h2>
      <p
        id="video-description"
        className="mb-10 text-center text-base font-light text-brand-muted md:text-lg"
      >
        Check these videos and get further clarifications
      </p>

      <div
        id="video-grid"
        className={cn(
          siteInnerWidthClass,
          'grid gap-5 sm:gap-6 md:grid-cols-2'
        )}
      >
        {videos.map((vid) => {
          const isPlaying = playingId === vid.id;

          return (
            <div
              id={`video-card-${vid.id}`}
              key={vid.id}
              className="relative aspect-video w-full overflow-hidden rounded-[16px] border border-brand-border-light bg-black shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
            >
              {isPlaying ? (
                <iframe
                  id={`video-iframe-${vid.id}`}
                  src={`https://www.youtube.com/embed/${vid.id}?autoplay=1`}
                  title={vid.title}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <>
                  <FillImage
                    src={vid.thumbnailImage}
                    alt={vid.title}
                    className="object-cover"
                  />
                  <button
                    type="button"
                    id={`video-play-${vid.id}`}
                    onClick={() => setPlayingId(vid.id)}
                    className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/20 transition-colors hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-bright focus-visible:ring-offset-2"
                    aria-label={`Play ${vid.title}`}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-red-500">
                      <Play className="ml-1 h-6 w-6 fill-white" aria-hidden />
                    </span>
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}

export function AboutSection() {
  const aboutCardClass =
    'site-card relative min-w-0 overflow-hidden py-4 pl-[52px] pr-3 hover:border-brand-primary/20 max-[374px]:pl-[46px] max-[374px]:py-3.5 sm:py-6 sm:pl-14 md:py-8 md:pl-[68px] md:pr-6 lg:pl-[80px]';

  const aboutStripClass =
    'absolute bottom-0 left-0 top-0 flex w-[42px] items-center justify-center overflow-hidden border-r border-[#F0F0F0] bg-brand-light-blue/20 max-[374px]:w-[38px] sm:w-11 md:w-16 lg:w-[62px]';

  return (
    <SectionContainer
      id="about-section"
      className="overflow-x-clip bg-brand-off-white py-10 max-[374px]:py-8 md:py-20"
    >
      <div
        id="about-section-top-row"
        className={cn(
          siteInnerWidthClass,
          'mb-8 grid min-w-0 gap-6 sm:mb-12 sm:gap-10 lg:mb-16 lg:grid-cols-[52%_48%] lg:items-center lg:gap-12'
        )}
      >
        <div id="about-section-text" className="min-w-0 text-left">
          <h2
            id="about-heading"
            className="mb-4 text-2xl font-bold text-brand-dark max-[374px]:text-[1.65rem] sm:mb-6 sm:text-3xl md:text-4xl lg:text-[42px]"
          >
            About <span className="text-brand-accent-bright">Us</span>
          </h2>
          <p
            id="about-description"
            className="mb-4 text-sm font-light leading-relaxed text-brand-muted sm:mb-6 sm:text-base md:text-lg"
          >
            Utility Choice is an Australian marketplace that connects consumers
            with trusted brokers and specialised service providers, enabling
            them to find the best deals and save money. With over a decade in
            the market, we&apos;ve assisted more than 45,000+ customers in
            exploring, comparing, selecting, switching, and enjoying optimal
            utility services.
          </p>
          <p
            id="about-tagline"
            className="text-base !font-bold italic leading-snug text-brand-dark sm:text-lg md:text-xl lg:whitespace-nowrap"
          >
            Let us do the hard work while you enjoy the savings!
          </p>
        </div>

        <div
          id="about-brand-mark"
          className="flex min-w-0 justify-center lg:justify-end"
        >
          <AboutBrandMark />
        </div>
      </div>

      <div
        id="about-cards-grid"
        className={cn(
          siteInnerWidthClass,
          'mt-6 grid min-w-0 grid-cols-1 gap-4 sm:mt-8 sm:gap-5 md:mt-10 md:grid-cols-2 md:gap-6'
        )}
      >
        <div id="about-vision" className={aboutCardClass}>
          <div id="about-vision-title-strip" className={aboutStripClass}>
            <AboutCardLabel label="Our Mission" />
          </div>
          <div id="about-vision-content" className="min-w-0 text-left">
            <p className="text-[13px] font-normal leading-relaxed text-brand-muted max-[374px]:text-xs sm:text-sm md:text-base">
              We envision a marketplace where every consumer can effortlessly
              explore, compare, and select utility services that best fit their
              needs, leading to enhanced satisfaction and financial well-being.
            </p>
          </div>
        </div>

        <div id="about-mission" className={aboutCardClass}>
          <div id="about-mission-title-strip" className={aboutStripClass}>
            <AboutCardLabel label="Our Vision" />
          </div>
          <div id="about-mission-content" className="min-w-0 text-left">
            <p className="text-[13px] font-normal leading-relaxed text-brand-muted max-[374px]:text-xs sm:text-sm md:text-base">
              Our mission is to empower consumers by providing access to a
              diverse range of utility deals, ensuring they can make informed
              choices that lead to significant savings. We are committed to
              continuously expanding our network of trusted brokers and
              rigorously researching their portfolios to offer our users an
              ever-growing selection of options.
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

const BOTTOM_SERVICES = [
  SERVICE_TAB_ICONS[3],
  SERVICE_TAB_ICONS[4],
  SERVICE_TAB_ICONS[5],
  SERVICE_TAB_ICONS[0],
  SERVICE_TAB_ICONS[1],
  SERVICE_TAB_ICONS[2],
].map((tab) => ({
  label: tab.label,
  href: tab.href,
  image: tab.url,
}));

export function BottomCTA() {
  return (
    <SectionContainer id="bottom-cta" className="bg-white py-14 md:py-20 ">
      <div
        id="bottom-cta-inner"
        className={cn(
          siteInnerWidthClass,
          'grid gap-8 sm:gap-12 lg:grid-cols-2 lg:items-center'
        )}
      >
        <div id="bottom-cta-text" className="text-left">
          <h2
            id="bottom-cta-heading"
            className="mb-6 text-2xl font-extrabold leading-tight text-brand-dark max-[374px]:text-[1.375rem] sm:text-[1.75rem] md:text-3xl lg:text-[2.125rem]"
          >
            <span className="block md:max-lg:whitespace-normal lg:whitespace-nowrap">
              It&apos;s better to explore before
            </span>
            <span className="block text-brand-accent-bright">
              you pay more.
            </span>
          </h2>
          <div id="bottom-cta-connect-wrap">
            <Link
              id="bottom-cta-connect-btn"
              href="/enquiry"
              className="site-connect-btn"
            >
              Connect Now
            </Link>
          </div>
        </div>

        <div
          id="bottom-cta-services"
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5"
        >
          {BOTTOM_SERVICES.map((s) => (
            <Link
              id={`bottom-cta-service-${hrefSlug(s.href)}`}
              key={s.href}
              href={s.href}
              className="site-card-interactive group p-3.5 text-center"
            >
              <div
                id={`bottom-cta-service-icon-${hrefSlug(s.href)}`}
                className="mb-2 flex h-[52px] items-center justify-center"
              >
                <ContainedImage
                  src={s.image}
                  alt={`${s.label} | Utility Choice`}
                  width={100}
                  height={52}
                  className="max-h-[48px] object-contain transition-transform group-hover:scale-105"
                  unoptimized
                />
              </div>
              <span className="text-xs font-bold leading-tight text-brand-dark transition-colors group-hover:text-brand-primary md:text-sm">
                {s.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
