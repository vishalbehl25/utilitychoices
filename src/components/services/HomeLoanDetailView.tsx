'use client';

import { useState } from 'react';
import { FillImage } from '@/components/ui/ContainedImage';
import Link from 'next/link';
import type { HomeLoanDetail } from '@/data/home-loan-details';
import { getHomeLoanImageUrl } from '@/lib/home-loan-image';
import { cn } from '@/lib/cn';
import { siteInnerWidthClass } from '@/lib/responsive';

type HomeLoanDetailTab = 'details' | 'fees' | 'pros-cons';

const TABS: { id: HomeLoanDetailTab; label: string }[] = [
  { id: 'details', label: 'Details' },
  { id: 'fees', label: 'Fees' },
  { id: 'pros-cons', label: 'Pros & Cons' },
];

interface HomeLoanDetailViewProps {
  loan: HomeLoanDetail;
}

function SpecTable({
  id,
  rows,
}: {
  id: string;
  rows: Record<string, string>;
}) {
  const entries = Object.entries(rows);
  if (entries.length === 0) return null;

  return (
    <div
      id={id}
      className="site-card divide-y divide-brand-border-light overflow-hidden"
    >
      {entries.map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col items-stretch gap-1 px-4 py-3.5 max-md:px-3.5 max-md:py-3 max-[374px]:px-3 max-[374px]:py-2.5 md:flex-row md:items-center md:justify-between md:gap-4 md:px-6 md:py-4"
        >
          <span className="shrink-0 text-sm text-brand-dark max-[374px]:text-xs">
            {label}
          </span>
          <span className="min-w-0 break-words text-left text-sm font-bold text-brand-dark max-[374px]:text-xs md:text-right">
            {value}
          </span>
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
      className="flex flex-col items-center justify-center px-4 py-4 max-[374px]:px-3 max-[374px]:py-3 md:py-5"
    >
      <p className="text-center text-xs font-normal text-brand-muted max-[374px]:text-[11px] md:text-sm">
        {label}
      </p>
      <p className="mt-1.5 text-center text-lg font-bold text-brand-dark max-[374px]:text-base md:text-xl">
        {value}
      </p>
    </div>
  );
}

function BulletList({
  id,
  items,
  markerClass,
}: {
  id: string;
  items: string[];
  markerClass: string;
}) {
  if (items.length === 0) {
    return (
      <p id={id} className="text-sm text-brand-muted">
        No items listed for this product.
      </p>
    );
  }
  return (
    <ul
      id={id}
      className={cn(
        'list-disc space-y-3 pl-5 text-sm leading-relaxed text-brand-dark max-[374px]:space-y-2 max-[374px]:pl-4 max-[374px]:text-[13px] md:text-base',
        markerClass,
      )}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function HomeLoanDetailView({ loan }: HomeLoanDetailViewProps) {
  const [activeTab, setActiveTab] = useState<HomeLoanDetailTab>('details');
  const pageId = `home-loan-detail-${loan.slug}`;
  const logoUrl = loan.logo ?? getHomeLoanImageUrl(loan.slug);

  return (
    <div
      id={pageId}
      className={cn(
        siteInnerWidthClass,
        'pb-16 pt-6 max-md:pb-12 max-[374px]:pb-10 md:pt-8',
      )}
    >
      <Link
        id={`${pageId}-back`}
        href="/items"
        className="mb-6 inline-flex items-center gap-1 text-sm text-brand-muted transition-colors hover:text-brand-primary max-[374px]:mb-4"
      >
        &lt; Back
      </Link>

      <h1
        id={`${pageId}-title`}
        className="mb-6 text-2xl font-bold leading-tight text-brand-dark max-[374px]:mb-4 max-[374px]:text-xl md:mb-6 md:text-3xl lg:text-4xl"
      >
        {loan.name}
      </h1>

      <div
        id={`${pageId}-tabs`}
        className="mb-6 -mx-[var(--site-px)] flex gap-2.5 overflow-x-auto overflow-y-hidden px-[var(--site-px)] pb-1 scrollbar-none max-md:flex-nowrap md:mx-0 md:mb-6 md:flex-wrap md:gap-4 md:overflow-visible md:px-0"
        role="tablist"
        aria-label="Home loan details"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`${pageId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${pageId}-panel`}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'site-pill-tab shrink-0 text-sm font-semibold max-[374px]:px-3 max-[374px]:py-1.5 max-[374px]:text-xs md:text-base',
                isActive ? 'site-pill-tab-active' : 'site-pill-tab-inactive',
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${pageId}-layout`}
        className="grid gap-6 max-md:gap-6 md:gap-8 lg:grid-cols-[1fr_min(300px,32%)] lg:items-start lg:gap-10 xl:gap-12"
      >
        <div
          id={`${pageId}-panel`}
          role="tabpanel"
          aria-labelledby={`${pageId}-tab-${activeTab}`}
          className="min-w-0"
        >
          {activeTab === 'details' && (
            <SpecTable id={`${pageId}-details-table`} rows={loan.details} />
          )}
          {activeTab === 'fees' && (
            <SpecTable id={`${pageId}-fees-table`} rows={loan.fees} />
          )}
          {activeTab === 'pros-cons' && (
            <div id={`${pageId}-pros-cons`} className="space-y-8 max-md:space-y-6">
              <div>
                <h2 className="credit-card-pros-heading mb-4 text-xl font-bold max-[374px]:mb-3 max-[374px]:text-lg md:text-2xl">
                  Pros
                </h2>
                <BulletList
                  id={`${pageId}-pros-list`}
                  items={loan.pros}
                  markerClass="marker:text-[#2d8a4e]"
                />
              </div>
              <div>
                <h2 className="credit-card-cons-heading mb-4 text-xl font-bold max-[374px]:mb-3 max-[374px]:text-lg md:text-2xl">
                  Cons
                </h2>
                <BulletList
                  id={`${pageId}-cons-list`}
                  items={loan.cons}
                  markerClass="marker:text-brand-accent"
                />
              </div>
            </div>
          )}
        </div>

        <aside
          id={`${pageId}-sidebar`}
          className="w-full min-w-0 overflow-hidden rounded-[12px] border border-brand-dark/20 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] lg:sticky lg:top-24"
        >
          <div
            id={`${pageId}-logo-wrap`}
            className="border-b border-brand-border-light bg-white p-4 max-[374px]:p-3 md:p-5"
          >
            <div className="relative mx-auto aspect-[5/2] w-full max-w-[220px]">
              {logoUrl ? (
                <FillImage
                  src={logoUrl}
                  alt={`${loan.lender} logo`}
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 220px"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm font-bold text-brand-primary">
                  {loan.lender}
                </div>
              )}
            </div>
          </div>

          <div
            id={`${pageId}-sidebar-metrics`}
            className="divide-y divide-brand-border-light"
          >
            <SummaryMetric
              id={`${pageId}-metric-loan-fee`}
              label="Loan Fee"
              value={loan.sidebarLoanFee}
            />
            <SummaryMetric
              id={`${pageId}-metric-interest`}
              label="Interest Rate"
              value={loan.sidebarInterestRate}
            />
            <SummaryMetric
              id={`${pageId}-metric-tenure`}
              label="Max loan tenure"
              value={loan.sidebarMaxTenure}
            />
          </div>
        </aside>
      </div>

      <p
        id={`${pageId}-rates-disclaimer`}
        className="mt-8 text-xs leading-relaxed text-brand-muted max-md:mt-6"
      >
        Rates and fees shown are indicative (June 2026) from the lender&apos;s
        published information. Confirm your personalised rate, comparison rate,
        and fees with the lender before applying.
      </p>
    </div>
  );
}
