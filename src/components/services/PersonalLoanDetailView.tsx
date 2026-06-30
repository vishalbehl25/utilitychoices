import { FillImage } from '@/components/ui/ContainedImage';
import Link from 'next/link';
import type { PersonalLoanDetail } from '@/data/personal-loan-details';
import { cn } from '@/lib/cn';
import { siteInnerWidthClass } from '@/lib/responsive';

interface PersonalLoanDetailViewProps {
  loan: PersonalLoanDetail;
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
          <span className="shrink-0 text-sm font-bold text-brand-dark">
            {label}
          </span>
          <span className="min-w-0 text-right text-sm text-brand-muted">
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
      className="flex flex-col items-center justify-center px-4 py-4 md:py-5"
    >
      <p className="text-xs font-normal text-brand-muted md:text-sm">{label}</p>
      <p className="mt-1.5 text-center text-base font-bold text-brand-dark md:text-lg">
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

function FeatureList({
  id,
  items,
}: {
  id: string;
  items: { title: string; description: string }[];
}) {
  return (
    <ul
      id={id}
      className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-brand-dark marker:text-brand-dark md:text-base"
    >
      {items.map((item) => (
        <li key={item.title}>
          <span className="font-bold text-brand-dark">{item.title}</span>
          {item.description ? (
            <>
              {' – '}
              {item.description}
            </>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function PersonalLoanDetailView({ loan }: PersonalLoanDetailViewProps) {
  const pageId = `personal-loan-detail-${loan.slug}`;

  return (
    <div id={pageId} className={cn(siteInnerWidthClass, 'pb-16 pt-6 md:pt-8')}>
      <Link
        id={`${pageId}-back-link`}
        href="/personal-loan"
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
            {loan.name}
          </h1>

          <p
            id={`${pageId}-summary`}
            className="mb-6 text-sm leading-relaxed text-brand-muted md:text-base"
          >
            {loan.summary}
          </p>

          {loan.keyFeatures.length > 0 && (
            <div id={`${pageId}-key-features`}>
              <p className="mb-3 text-sm font-bold text-brand-dark md:text-base">
                {loan.keyFeaturesHeading}
              </p>
              <FeatureList
                id={`${pageId}-key-features-list`}
                items={loan.keyFeatures}
              />
            </div>
          )}
        </div>

        <aside
          id={`${pageId}-summary-card`}
          className="overflow-hidden rounded-[12px] border border-brand-dark/25 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] lg:sticky lg:top-24"
        >
          <div
            id={`${pageId}-image-wrap`}
            className="relative aspect-[5/3] w-full bg-white"
          >
            {loan.logo ? (
              <FillImage
                src={loan.logo}
                alt={loan.lender}
                className="rounded-t-[12px] object-contain object-center p-5"
                sizes="(max-width: 1024px) 100vw, 320px"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm font-semibold text-brand-primary">
                {loan.lender}
              </div>
            )}
          </div>

          <div
            id={`${pageId}-metrics`}
            className="divide-y divide-brand-border-light border-t border-brand-border-light"
          >
            <SummaryMetric
              id={`${pageId}-metric-interest`}
              label="Interest Rate (p.a.)"
              value={loan.interestRate}
            />
            <SummaryMetric
              id={`${pageId}-metric-comparison`}
              label="Comp. Rate (p.a.)"
              value={loan.comparisonRate}
            />
            <SummaryMetric
              id={`${pageId}-metric-min`}
              label="Min Loan Amount"
              value={loan.minLoanAmount}
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
            {loan.pros.map((item) => (
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
            {loan.cons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <section id={`${pageId}-details`} className="mb-12">
        <SectionHeading id={`${pageId}-details-heading`}>Details</SectionHeading>
        <h3 className="mb-4 text-lg font-bold text-brand-dark md:text-xl">
          Product Details
        </h3>
        <SpecDataCard
          id={`${pageId}-details-product-card`}
          rows={loan.productDetails}
          className="max-w-2xl"
        />
      </section>

      <section id={`${pageId}-how-it-works`} className="mb-12">
        <h2
          id={`${pageId}-how-heading`}
          className="mb-4 text-lg font-bold text-brand-dark md:text-xl"
        >
          {loan.howItWorksHeading}
        </h2>
        <p className="text-sm leading-relaxed text-brand-muted md:text-base">
          {loan.howItWorks}
        </p>
      </section>

      <section id={`${pageId}-eligibility`} className="mb-12">
        <SectionHeading id={`${pageId}-eligibility-heading`}>
          Eligibility criteria
        </SectionHeading>
        {loan.eligibilityIntro && (
          <p className="mb-4 text-sm leading-relaxed text-brand-muted md:text-base">
            {loan.eligibilityIntro}
          </p>
        )}
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-brand-muted md:text-base">
          {loan.eligibility.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {loan.howToApply && (
        <section id={`${pageId}-how-to-apply`} className="mb-12">
          <SectionHeading id={`${pageId}-apply-heading`}>
            How to Apply
          </SectionHeading>
          <p className="text-sm leading-relaxed text-brand-muted md:text-base">
            {loan.howToApply}
          </p>
        </section>
      )}

      <section id={`${pageId}-features`} className="mb-8">
        <SectionHeading id={`${pageId}-features-heading`}>
          Features of this loan
        </SectionHeading>
        {loan.featuresTitle && !loan.featuresSections?.length && (
          <h3 className="mb-3 text-base font-bold text-brand-dark md:text-lg">
            {loan.featuresTitle}
          </h3>
        )}
        {loan.featuresIntro && (
          <p className="mb-4 text-sm leading-relaxed text-brand-muted md:text-base">
            {loan.featuresIntro}
          </p>
        )}
        {loan.featuresSections?.map((section) => (
          <div key={section.heading} className="mb-6 last:mb-0">
            <h3 className="mb-3 text-base font-bold text-brand-dark md:text-lg">
              {section.heading}
            </h3>
            {section.paragraphs?.map((para) => (
              <p
                key={para}
                className="mb-4 text-sm leading-relaxed text-brand-muted md:text-base"
              >
                {para}
              </p>
            ))}
            {section.items && section.items.length > 0 && (
              <FeatureList
                id={`${pageId}-features-${section.heading}`}
                items={section.items}
              />
            )}
          </div>
        ))}
        {loan.features.length > 0 && (
          <FeatureList id={`${pageId}-features-list`} items={loan.features} />
        )}
      </section>
    </div>
  );
}
