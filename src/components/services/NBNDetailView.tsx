'use client';

import { useState } from 'react';
import { FillImage } from '@/components/ui/ContainedImage';
import Link from 'next/link';
import type { NBNPlanDetail } from '@/data/nbn-plan-details';
import { getNBNProviderLogo } from '@/lib/nbn-image';
import { cn } from '@/lib/cn';
import { siteInnerWidthClass } from '@/lib/responsive';

type NBNDetailTab = 'plan-info' | 'cost' | 'bundles';

const TABS: { id: NBNDetailTab; label: string }[] = [
  { id: 'plan-info', label: 'Plan Info' },
  { id: 'cost', label: 'Cost' },
  { id: 'bundles', label: 'Bundles' },
];

interface NBNDetailViewProps {
  plan: NBNPlanDetail;
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
          className="flex flex-col gap-1.5 px-4 py-3.5 max-md:gap-2 max-md:py-3 max-[374px]:px-3 max-[374px]:py-2.5 md:flex-row md:items-center md:justify-between md:gap-4 md:px-6 md:py-4"
        >
          <span className="shrink-0 text-sm font-bold text-brand-dark max-[374px]:text-[13px] md:font-normal">
            {label}
          </span>
          <span className="min-w-0 text-sm font-bold leading-snug text-brand-dark max-md:text-left max-[374px]:text-[13px] md:text-right">
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
      className="flex flex-col items-center justify-center px-3 py-3.5 max-md:py-3 max-[374px]:px-2 max-[374px]:py-2.5 md:px-4 md:py-5"
    >
      <p className="text-center text-[11px] font-normal leading-snug text-brand-muted max-[374px]:text-[10px] md:text-sm">
        {label}
      </p>
      <p className="mt-1 text-center text-base font-bold text-brand-dark max-[374px]:mt-0.5 max-[374px]:text-sm md:mt-1.5 md:text-xl">
        {value}
      </p>
    </div>
  );
}

export function NBNDetailView({ plan }: NBNDetailViewProps) {
  const [activeTab, setActiveTab] = useState<NBNDetailTab>('plan-info');
  const pageId = `nbn-detail-${plan.slug}`;
  const logoUrl = getNBNProviderLogo(plan.company);

  const tabRows =
    activeTab === 'plan-info'
      ? plan.planInfo
      : activeTab === 'cost'
        ? plan.cost
        : plan.bundles;

  return (
    <div
      id={pageId}
      className={cn(
        siteInnerWidthClass,
        'pb-12 pt-5 max-md:pb-12 max-md:pt-5 max-[374px]:pb-10 max-[374px]:pt-4 md:pb-16 md:pt-8',
      )}
    >
      <Link
        id={`${pageId}-back`}
        href="/nbn"
        className="mb-4 inline-flex min-h-[44px] items-center gap-1 text-sm text-brand-muted transition-colors hover:text-brand-primary max-md:mb-4 max-[374px]:mb-3 max-[374px]:min-h-0 max-[374px]:text-[13px] md:mb-6"
      >
        &lt; Back
      </Link>

      <h1
        id={`${pageId}-title`}
        className="mb-4 text-xl font-bold leading-snug text-brand-dark max-md:mb-4 max-[374px]:mb-3 max-[374px]:text-lg md:mb-6 md:text-3xl lg:text-4xl"
      >
        {plan.name}
      </h1>

      <div
        id={`${pageId}-tabs`}
        className="mb-5 -mx-[var(--site-px)] flex gap-2 overflow-x-auto px-[var(--site-px)] pb-1 max-md:mb-5 max-[374px]:mb-4 max-[374px]:gap-1.5 md:mx-0 md:mb-6 md:flex-wrap md:overflow-visible md:px-0 md:pb-0 md:gap-4"
        role="tablist"
        aria-label="Plan details"
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
                'site-pill-tab shrink-0 text-sm font-semibold max-[374px]:px-3 max-[374px]:py-1.5 max-[374px]:text-xs md:shrink md:text-base',
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
        className="grid gap-5 max-md:gap-5 max-[374px]:gap-4 lg:grid-cols-[1fr_min(300px,32%)] lg:items-start lg:gap-10 xl:gap-12"
      >
        <aside
          id={`${pageId}-sidebar`}
          className="order-1 overflow-hidden rounded-[12px] border border-brand-dark/20 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] lg:order-2 lg:sticky lg:top-24"
        >
          <div
            id={`${pageId}-logo-wrap`}
            className="border-b border-brand-border-light bg-white p-3.5 max-md:p-3.5 max-[374px]:p-3 md:p-5"
          >
            <div className="relative mx-auto aspect-[5/2] max-w-[180px] max-md:max-w-[180px] max-[374px]:max-w-[150px] md:max-w-[220px]">
              {logoUrl ? (
                <FillImage
                  src={logoUrl}
                  alt={`${plan.company} logo`}
                  className="object-contain object-center"
                  sizes="220px"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm font-bold text-brand-primary">
                  {plan.company}
                </div>
              )}
            </div>
          </div>

          <div
            id={`${pageId}-sidebar-metrics`}
            className="grid grid-cols-1 divide-y divide-brand-border-light min-[375px]:grid-cols-3 min-[375px]:divide-x min-[375px]:divide-y-0 lg:grid-cols-1 lg:divide-x-0 lg:divide-y"
          >
            <SummaryMetric
              id={`${pageId}-metric-download`}
              label="Download Speed (Mbps)"
              value={plan.sidebarDownloadMbps}
            />
            <SummaryMetric
              id={`${pageId}-metric-upload`}
              label="Upload Speed (Mbps)"
              value={plan.sidebarUploadMbps}
            />
            <SummaryMetric
              id={`${pageId}-metric-data`}
              label="Data Allowances"
              value={plan.dataAllowance}
            />
          </div>
        </aside>

        <div
          id={`${pageId}-panel`}
          className="order-2 min-w-0 lg:order-1"
          role="tabpanel"
          aria-labelledby={`${pageId}-tab-${activeTab}`}
        >
          <SpecTable id={`${pageId}-spec-table`} rows={tabRows} />
        </div>
      </div>
    </div>
  );
}
