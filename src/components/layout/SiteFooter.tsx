'use client';

import Link from 'next/link';
import { ContainedImage } from '@/components/ui/ContainedImage';
import { MapPin, Mail, Phone } from 'lucide-react';
import { FOOTER_SERVICES, SITE_CONFIG } from '@/constants/navigation';
import { FOOTER_TRUST_SEALS, ISO_CERTIFICATIONS } from '@/data/partners';
import { cn } from '@/lib/cn';
import { trackContactClick } from '@/lib/cms/tracking';

function hrefSlug(href: string): string {
  if (href === '/') return 'home';
  return href.slice(1).replace(/\//g, '-');
}

function FooterDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'hidden w-px shrink-0 self-stretch bg-brand-border-light lg:block',
        className
      )}
      aria-hidden
    />
  );
}

export function SiteFooter() {
  const fullAddress = `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.locality} ${SITE_CONFIG.address.region} ${SITE_CONFIG.address.postalCode}, Australia`;
  const year = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="w-full border-t border-brand-border-light bg-white"
    >
      <div
        id="footer-inner"
        className=" mx-auto box-border w-full max-w-full px-[var(--site-px)] pt-8 max-md:pt-8 max-[374px]:pt-7 sm:pt-10 md:max-lg:max-w-full md:max-lg:pt-10 lg:max-w-[min(var(--site-width),var(--site-vw))] lg:px-5 lg:pt-14 "
      >
        {/* Top: brand | products | other links */}
        <div
          id="footer-main-grid"
          className="mb-8 flex flex-col gap-8 max-md:gap-7 max-[374px]:mb-6 max-[374px]:gap-6 lg:mb-12 lg:flex-row lg:items-stretch lg:gap-0"
        >
          <div id="footer-brand" className="min-w-0 flex-1 text-left lg:pr-10">
            <div
              id="footer-logo-wrap"
              className="mb-3 flex w-fit max-w-full flex-col max-[374px]:mb-2.5 sm:mb-4"
            >
              <Link
                id="footer-logo"
                href="/"
                className="inline-block w-fit"
                aria-label="Utility Choice Home"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/utility-choice-logo.svg"
                  alt="Utility Choice"
                  width={230}
                  height={38}
                  className="block h-[32px] w-[180px] max-w-full max-[374px]:h-[28px] max-[374px]:w-[158px] sm:h-[34px] sm:w-[200px] md:max-lg:h-[34px] md:max-lg:w-[200px] lg:h-[38px] lg:w-[230px]"
                />
              </Link>
              <p
                id="footer-tagline"
                className="mt-0.5 w-full text-right text-sm font-normal text-brand-tagline max-[374px]:text-[13px] sm:text-[17px]"
              >
                {SITE_CONFIG.tagline}
              </p>
            </div>
            <p
              id="footer-description"
              className="mb-5 max-w-[420px] text-[13px] font-normal leading-relaxed text-brand-muted max-[374px]:mb-4 max-[374px]:text-xs sm:mb-6 sm:text-sm md:text-[15px]"
            >
              By leveraging our platform, you gain access to a network of
              trusted utility brokers, ensuring you receive the most competitive
              offers available and make informed decisions. We are here to help
              you find the best deals and save on your essential services.
            </p>

            <ul
              id="footer-contact"
              className="space-y-2 max-[374px]:space-y-1.5 sm:space-y-2.5"
            >
              <li id="footer-address" className="flex items-start gap-2">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright max-[374px]:h-3.5 max-[374px]:w-3.5"
                  strokeWidth={2.25}
                />
                <span className="min-w-0 break-words text-base font-bold leading-snug text-brand-dark max-[374px]:text-sm">
                  {fullAddress}
                </span>
              </li>
              <li id="footer-email" className="flex items-start gap-2">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent-bright max-[374px]:h-3.5 max-[374px]:w-3.5"
                  strokeWidth={2.25}
                />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  onClick={() => trackContactClick('email')}
                  className="min-w-0 break-all text-base font-bold leading-snug text-brand-dark transition-colors hover:text-brand-primary max-[374px]:text-sm"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li id="footer-phone" className="flex items-center gap-2">
                <Phone
                  className="h-4 w-4 shrink-0 text-brand-accent-bright max-[374px]:h-3.5 max-[374px]:w-3.5"
                  strokeWidth={2.25}
                />
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                  onClick={() => trackContactClick('phone')}
                  className="text-lg font-bold text-brand-dark transition-colors hover:text-brand-primary max-[374px]:text-base"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
            </ul>
          </div>

          <FooterDivider />

          <div
            id="footer-links-grid"
            className="grid grid-cols-2 gap-x-5 gap-y-6 max-[374px]:gap-x-3 max-[374px]:gap-y-5 lg:contents"
          >
            <div
              id="footer-products"
              className="min-w-0 shrink-0 lg:w-[180px] lg:px-10 xl:w-[200px]"
            >
              <h3 className="mb-3 text-[15px] font-bold text-brand-dark max-[374px]:mb-2.5 max-[374px]:text-sm lg:mb-4 lg:text-base">
                Our Products
              </h3>
              <ul
                id="footer-products-list"
                className="space-y-2 max-[374px]:space-y-1.5 lg:space-y-2.5"
              >
                {FOOTER_SERVICES.map((service) => (
                  <li key={service.href}>
                    <Link
                      id={`footer-service-${hrefSlug(service.href)}`}
                      href={service.href}
                      className="inline-flex min-h-[40px] items-center text-[13px] text-brand-muted transition-colors hover:text-brand-primary max-[374px]:min-h-[36px] max-[374px]:text-xs sm:text-sm lg:min-h-0 lg:text-[15px]"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <FooterDivider />

            <div
              id="footer-other-links"
              className="min-w-0 shrink-0 lg:w-[160px] lg:pl-10 xl:w-[180px]"
            >
              <h3 className="mb-3 text-[15px] font-bold text-brand-dark max-[374px]:mb-2.5 max-[374px]:text-sm lg:mb-4 lg:text-base">
                Other links
              </h3>
              <ul
                id="footer-other-links-list"
                className="space-y-2 max-[374px]:space-y-1.5 lg:space-y-2.5"
              >
                <li>
                  <Link
                    id="footer-link-blog"
                    href="/blog"
                    className="inline-flex min-h-[40px] items-center text-[13px] text-brand-muted transition-colors hover:text-brand-primary max-[374px]:min-h-[36px] max-[374px]:text-xs sm:text-sm lg:min-h-0 lg:text-[15px]"
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    id="footer-link-terms"
                    href="/privacy-policy?tab=terms"
                    className="inline-flex min-h-[40px] items-center text-[13px] text-brand-muted transition-colors hover:text-brand-primary max-[374px]:min-h-[36px] max-[374px]:text-xs sm:text-sm lg:min-h-0 lg:text-[15px]"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    id="footer-link-privacy"
                    href="/privacy-policy?tab=privacy"
                    className="inline-flex min-h-[40px] items-center text-[13px] text-brand-muted transition-colors hover:text-brand-primary max-[374px]:min-h-[36px] max-[374px]:text-xs sm:text-sm lg:min-h-0 lg:text-[15px]"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    id="footer-link-disclaimer"
                    href="/privacy-policy?tab=disclaimer"
                    className="inline-flex min-h-[40px] items-center text-[13px] text-brand-muted transition-colors hover:text-brand-primary max-[374px]:min-h-[36px] max-[374px]:text-xs sm:text-sm lg:min-h-0 lg:text-[15px]"
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div
          id="footer-trust-seals"
          className="flex flex-wrap items-center justify-center gap-3 border-t border-brand-border-light py-6 max-[374px]:gap-2 max-[374px]:py-5 sm:gap-4 sm:py-8 md:gap-6"
        >
          {FOOTER_TRUST_SEALS.map((seal) => (
            <ContainedImage
              key={seal.name}
              src={seal.url}
              alt={seal.name}
              width={140}
              height={50}
              className="max-h-[34px] object-contain max-[374px]:max-h-[30px] sm:max-h-[40px] md:max-h-[44px]"
              unoptimized
            />
          ))}
        </div>

        {/* Compliance block */}
        <div
          id="footer-compliance"
          className="w-full rounded-[12px] bg-brand-compliance-bg p-4 text-brand-compliance-text max-[374px]:rounded-[10px] max-[374px]:p-3.5 sm:rounded-[16px] sm:p-6 md:p-8"
        >
          <div
            id="footer-compliance-header"
            className="mb-4 flex flex-col items-center justify-between gap-3 border-b border-black/10 pb-4 max-[374px]:mb-3.5 max-[374px]:gap-2.5 max-[374px]:pb-3.5 sm:mb-6 sm:flex-row sm:items-center sm:gap-4 sm:pb-6"
          >
            <span
              id="footer-copyright"
              className="text-center text-xs font-bold leading-snug text-brand-dark max-[374px]:text-[11px] sm:text-left sm:text-sm md:text-base"
            >
              Copyright @2021 - {year} by UtilityChoice
            </span>
            <div
              id="footer-iso-certs"
              className="flex shrink-0 items-center gap-3 max-[374px]:gap-2 sm:gap-4"
            >
              {ISO_CERTIFICATIONS.map((cert) => (
                <ContainedImage
                  key={cert.name}
                  src={cert.url}
                  alt={cert.name}
                  width={64}
                  height={64}
                  className="max-h-8 max-w-8 object-contain max-[374px]:max-h-7 max-[374px]:max-w-7 md:max-lg:max-h-10 md:max-lg:max-w-10 lg:max-h-12 lg:max-w-12"
                  unoptimized
                />
              ))}
            </div>
          </div>

          <p
            id="footer-disclaimer"
            className="text-center text-[11px] leading-relaxed text-brand-compliance-muted max-[374px]:text-[10px] sm:text-left sm:text-xs md:text-sm"
          >
            {SITE_CONFIG.securityDisclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
