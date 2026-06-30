import { FillImage } from '@/components/ui/ContainedImage';
import Link from 'next/link';
import type { PersonalLoanProduct } from '@/data/personal-loans';
import { getPersonalLoanImageUrl } from '@/lib/personal-loan-image';
import { cn } from '@/lib/cn';

interface PersonalLoanListingCardProps {
  loan: PersonalLoanProduct;
  className?: string;
}

function MetricCell({
  id,
  label,
  value,
}: {
  id: string;
  label: string;
  value: string;
}) {
  return (
    <div id={id} className="min-w-0 flex-1">
      <p className="text-xs font-bold text-brand-dark md:text-sm">{label}</p>
      <p className="mt-1 text-xs font-normal leading-snug text-brand-dark md:text-sm">
        {value}
      </p>
    </div>
  );
}

export function PersonalLoanListingCard({
  loan,
  className,
}: PersonalLoanListingCardProps) {
  const detailHref = `/personal-loan-1/${loan.slug}`;
  const imageUrl = loan.logo ?? getPersonalLoanImageUrl(loan.slug);
  const baseId = `personal-loan-${loan.slug}`;

  return (
    <article id={baseId} className={cn('site-card overflow-hidden', className)}>
      <div id={`${baseId}-inner`} className="p-4 md:p-6">
        <div
          id={`${baseId}-header`}
          className="mb-5 flex flex-wrap items-center gap-4"
        >
          <div
            id={`${baseId}-logo-wrap`}
            className="relative h-12 w-[140px] shrink-0 sm:h-14 sm:w-[154px]"
          >
            {imageUrl ? (
              <FillImage
                src={imageUrl}
                alt={`${loan.lender} logo`}
                className="object-contain object-left"
                sizes="154px"
              />
            ) : (
              <span className="text-sm font-bold text-brand-primary">
                {loan.lender}
              </span>
            )}
          </div>
          <h3
            id={`${baseId}-title`}
            className="min-w-0 flex-1 text-base font-bold leading-snug text-brand-dark md:text-lg"
          >
            {loan.name}
          </h3>
        </div>

        <div
          id={`${baseId}-metrics`}
          className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-3"
        >
          <MetricCell
            id={`${baseId}-metric-interest`}
            label="Interest Rates"
            value={loan.interestRate}
          />
          <MetricCell
            id={`${baseId}-metric-comparison`}
            label="Comparison Rate"
            value={loan.comparisonRate}
          />
          <MetricCell
            id={`${baseId}-metric-service-fee`}
            label="Service fee"
            value={loan.serviceFee}
          />
          <MetricCell
            id={`${baseId}-metric-repayment`}
            label="Repayment Cal."
            value={loan.repayment}
          />
          <MetricCell
            id={`${baseId}-metric-loan-fee`}
            label="Loan Fee"
            value={loan.loanFee}
          />
        </div>

        <div
          id={`${baseId}-actions`}
          className="mt-5 flex flex-wrap items-center justify-end gap-4"
        >
          <Link
            id={`${baseId}-read-more`}
            href={detailHref}
            className="cursor-pointer text-sm font-bold text-brand-primary hover:underline"
          >
            Read More
          </Link>
          <Link
            id={`${baseId}-compare`}
            href="/enquiry"
            className="inline-flex min-w-[120px] cursor-pointer items-center justify-center rounded-md bg-brand-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
          >
            Compare
          </Link>
        </div>
      </div>
    </article>
  );
}
