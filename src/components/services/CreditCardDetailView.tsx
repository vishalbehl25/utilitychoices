'use client';

import { useState } from 'react';
import { FillImage } from '@/components/ui/ContainedImage';
import Link from 'next/link';
import type { CreditCardDetail } from '@/data/credit-card-details';
import { getCreditCardImageUrl } from '@/lib/credit-card-image';
import {
  getDetailsFeesRows,
  getDetailsProductRows,
  getEligibilityRows,
  getRemainingProductDetails,
  getRewardsRows,
  isDuplicateCardBenefits,
  getSummaryParagraphsForDisplay,
  hasExpandableSummary,
  parseHowToApplySections,
  parseRatesSections,
  splitLabelledListItem,
} from '@/lib/credit-card-detail-sections';
import { cn } from '@/lib/cn';
import { siteInnerWidthClass } from '@/lib/responsive';

interface CreditCardDetailViewProps {
  card: CreditCardDetail;
}

function HowToApplyBullet({ text }: { text: string }) {
  const parts = splitLabelledListItem(text);
  if (!parts) return <>{text}</>;
  return (
    <>
      <span className="font-bold text-brand-dark">{parts.label}:</span>
      {parts.body ? <> {parts.body}</> : null}
    </>
  );
}

function SpecDataCard({
  id,
  rows,
  className,
}: {
  id: string;
  rows: Record<string, string>;
  className?: string;
}) {
  const entries = Object.entries(rows);
  if (entries.length === 0) return null;

  return (
    <div
      id={id}
      className={cn(
        'site-card divide-y divide-brand-border-light overflow-hidden',
        className
      )}
    >
      {entries.map(([label, value]) => (
        <div
          key={label}
          className="flex items-center justify-between gap-4 px-4 py-3.5 md:px-5"
        >
          <span className="text-sm font-bold text-brand-dark">{label}</span>
          <span className="text-right text-sm text-brand-muted">{value}</span>
        </div>
      ))}
    </div>
  );
}

function SummaryMetric({
  id,
  label,
  value,
}: {
  id: string;
  label: string;
  value: string;
}) {
  return (
    <div
      id={id}
      className="flex flex-col items-center justify-center px-3 py-4 md:px-4 md:py-5"
    >
      <p className="text-xs font-normal text-brand-muted md:text-sm">{label}</p>
      <p className="mt-1.5 text-base font-bold text-brand-dark md:text-lg">
        {value}
      </p>
    </div>
  );
}

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="mb-4 text-xl font-bold text-brand-dark md:text-2xl lg:text-[1.75rem]"
    >
      {children}
    </h2>
  );
}

export function CreditCardDetailView({ card }: CreditCardDetailViewProps) {
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const pageId = `credit-card-detail-${card.slug}`;
  const imageUrl = getCreditCardImageUrl(card.slug);

  const summaryParagraphs = getSummaryParagraphsForDisplay(
    card.summary,
    summaryExpanded
  );
  const showReadMore = hasExpandableSummary(card.summary);

  const detailsProduct = getDetailsProductRows(card);
  const detailsFees = getDetailsFeesRows(card);
  const eligibility = getEligibilityRows(card);
  const rewards = getRewardsRows(card);
  const extraDetails = getRemainingProductDetails(card);
  const howToApply = parseHowToApplySections(card.howToApply);
  const showCardBenefits = !isDuplicateCardBenefits(
    card.howToApply,
    card.cardBenefits
  );
  const ratesSections =
    card.ratesSections ?? parseRatesSections(card.ratesAndFees);

  return (
    <div id={pageId} className={cn(siteInnerWidthClass, 'pb-16 pt-6 md:pt-8')}>
      <Link
        id={`${pageId}-back-link`}
        href="/credit-cards"
        className="mb-6 inline-flex items-center gap-1 text-sm text-brand-muted transition-colors hover:text-brand-primary"
      >
        &lt; Back
      </Link>

      <div
        id={`${pageId}-hero`}
        className="mb-10 grid gap-8 lg:grid-cols-[1fr_min(320px,36%)] lg:items-start lg:gap-10 xl:gap-14"
      >
        <div id={`${pageId}-hero-text`}>
          <h1
            id={`${pageId}-title`}
            className="mb-5 text-2xl font-bold leading-tight text-brand-dark md:text-3xl lg:text-4xl"
          >
            {card.name}
          </h1>

          <div
            id={`${pageId}-summary`}
            className="space-y-4 text-sm leading-relaxed text-brand-muted md:text-base"
          >
            {summaryParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {showReadMore && (
            <button
              id={`${pageId}-read-more`}
              type="button"
              onClick={() => setSummaryExpanded((v) => !v)}
              className="mt-3 cursor-pointer text-sm font-semibold text-brand-dark underline-offset-2 hover:underline"
            >
              {summaryExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>

        <aside
          id={`${pageId}-summary-card`}
          className="credit-card-summary-card overflow-hidden rounded-[12px] border border-brand-dark/25 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] lg:sticky lg:top-24"
        >
          <div
            id={`${pageId}-image-wrap`}
            className="relative aspect-[5/3] w-full bg-white"
          >
            {imageUrl ? (
              <FillImage
                src={imageUrl}
                alt={card.name}
                className="rounded-t-[12px] object-contain object-center p-5"
                sizes="(max-width: 1024px) 100vw, 320px"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm font-semibold text-brand-primary">
                {card.company}
              </div>
            )}
          </div>

          <div
            id={`${pageId}-metrics`}
            className="grid grid-cols-2 divide-x divide-y divide-brand-border-light border-t border-brand-border-light"
          >
            <SummaryMetric
              id={`${pageId}-metric-bonus`}
              label="Bonus Point"
              value={card.bonusPoints}
            />
            <SummaryMetric
              id={`${pageId}-metric-interest`}
              label="Interest Rates"
              value={card.interestRate}
            />
            <SummaryMetric
              id={`${pageId}-metric-reward`}
              label="Reward Point"
              value={card.rewardPoints}
            />
            <SummaryMetric
              id={`${pageId}-metric-fee`}
              label="Annual fee"
              value={card.charges}
            />
          </div>
        </aside>
      </div>

      <div
        id={`${pageId}-pros-cons`}
        className="mb-12 grid gap-6 md:grid-cols-2 md:gap-8"
      >
        <div id={`${pageId}-pros`} className="site-card p-6 md:p-8">
          <h2 className="credit-card-pros-heading mb-4 text-xl font-bold md:text-2xl">
            Pros.
          </h2>
          <ul
            id={`${pageId}-pros-list`}
            className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-brand-dark marker:text-[#2d8a4e] md:text-base"
          >
            {card.pros.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div id={`${pageId}-cons`} className="site-card p-6 md:p-8">
          <h2 className="credit-card-cons-heading mb-4 text-xl font-bold md:text-2xl">
            Cons.
          </h2>
          <ul
            id={`${pageId}-cons-list`}
            className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-brand-dark marker:text-brand-accent md:text-base"
          >
            {card.cons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {card.summaryExtra && (
        <div
          id={`${pageId}-summary-extra`}
          className="mb-12 space-y-4 text-sm leading-relaxed text-brand-muted md:text-base"
        >
          {card.summaryExtra.split(/\n\n+/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {(Object.keys(detailsProduct).length > 0 ||
        Object.keys(detailsFees).length > 0) && (
        <section id={`${pageId}-details`} className="mb-12">
          <SectionHeading id={`${pageId}-details-heading`}>
            Details
          </SectionHeading>
          <div
            id={`${pageId}-details-grid`}
            className="grid gap-8 md:grid-cols-2 md:gap-10"
          >
            {Object.keys(detailsProduct).length > 0 && (
              <div id={`${pageId}-details-product`}>
                <h3 className="mb-4 text-lg font-bold text-brand-dark md:text-xl">
                  Product Details
                </h3>
                <SpecDataCard
                  id={`${pageId}-details-product-card`}
                  rows={detailsProduct}
                />
              </div>
            )}
            {Object.keys(detailsFees).length > 0 && (
              <div id={`${pageId}-details-fees`}>
                <h3 className="mb-4 text-lg font-bold text-brand-dark md:text-xl">
                  Fees &amp; Charges
                </h3>
                <SpecDataCard
                  id={`${pageId}-details-fees-card`}
                  rows={detailsFees}
                />
              </div>
            )}
          </div>
        </section>
      )}

      {(Object.keys(eligibility).length > 0 ||
        Object.keys(rewards).length > 0) && (
        <div
          id={`${pageId}-eligibility-rewards`}
          className="mb-12 grid gap-8 md:grid-cols-2 md:gap-10"
        >
          {Object.keys(eligibility).length > 0 && (
            <div id={`${pageId}-eligibility`}>
              <SectionHeading id={`${pageId}-eligibility-heading`}>
                Eligibility
              </SectionHeading>
              <SpecDataCard
                id={`${pageId}-eligibility-card`}
                rows={eligibility}
              />
            </div>
          )}
          {Object.keys(rewards).length > 0 && (
            <div id={`${pageId}-rewards`}>
              <SectionHeading id={`${pageId}-rewards-heading`}>
                Rewards
              </SectionHeading>
              <SpecDataCard id={`${pageId}-rewards-card`} rows={rewards} />
            </div>
          )}
        </div>
      )}

      {Object.keys(extraDetails).length > 0 && (
        <div id={`${pageId}-product-details`} className="mb-12">
          <SectionHeading id={`${pageId}-product-heading`}>
            Product details
          </SectionHeading>
          <SpecDataCard id={`${pageId}-product-card`} rows={extraDetails} />
        </div>
      )}

      <section id={`${pageId}-how-to-apply`} className="mb-12">
        <SectionHeading id={`${pageId}-apply-heading`}>
          How to Apply
        </SectionHeading>
        {howToApply.intro && (
          <p
            id={`${pageId}-apply-intro`}
            className="mb-6 text-sm leading-relaxed text-brand-muted md:text-base"
          >
            {howToApply.intro}
          </p>
        )}
        {howToApply.sections.map((section) => (
          <div key={section.heading} className="mb-6 last:mb-0">
            <h3 className="mb-3 text-base font-bold text-brand-dark md:text-lg">
              {section.heading}
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-brand-muted md:text-base">
              {section.items.map((item) => (
                <li key={item}>
                  <HowToApplyBullet text={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
        {howToApply.sections.length === 0 && (
          <p className="text-sm leading-relaxed text-brand-muted md:text-base">
            {card.howToApply}
          </p>
        )}
      </section>

      {showCardBenefits &&
        card.cardBenefits &&
        (() => {
          const benefits = parseHowToApplySections(card.cardBenefits);
          return (
            <section id={`${pageId}-benefits`} className="mb-12">
              <SectionHeading id={`${pageId}-benefits-heading`}>
                Card benefits
              </SectionHeading>
              {benefits.intro && (
                <p className="mb-6 text-sm leading-relaxed text-brand-muted md:text-base">
                  {benefits.intro}
                </p>
              )}
              {benefits.sections.map((section) => (
                <div key={section.heading} className="mb-6 last:mb-0">
                  <h3 className="mb-3 text-base font-bold text-brand-dark md:text-lg">
                    {section.heading}
                  </h3>
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-brand-muted md:text-base">
                    {section.items.map((item) => (
                      <li key={item}>
                        <HowToApplyBullet text={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {benefits.sections.length === 0 && (
                <p className="text-sm leading-relaxed text-brand-muted md:text-base">
                  {card.cardBenefits}
                </p>
              )}
            </section>
          );
        })()}

      {ratesSections.length > 0 && (
        <section id={`${pageId}-rates`} className="mb-8">
          <SectionHeading id={`${pageId}-rates-heading`}>
            Rates &amp; fees
          </SectionHeading>
          <div className="space-y-6">
            {ratesSections.map((section) => (
              <div
                key={section.title}
                id={`${pageId}-rate-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <h3 className="mb-2 text-base font-bold text-brand-dark md:text-lg">
                  {section.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-muted md:text-base">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
