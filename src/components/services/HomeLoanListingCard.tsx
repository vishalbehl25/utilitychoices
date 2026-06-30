import { FillImage } from '@/components/ui/ContainedImage';
import Link from 'next/link';
import type { HomeLoanProduct } from '@/data/home-loans';
import { getHomeLoanImageUrl } from '@/lib/home-loan-image';
import { cn } from '@/lib/cn';

interface HomeLoanListingCardProps {
  loan: HomeLoanProduct;
  className?: string;
}

function MetricColumn({
  id,
  label,
  children,
  className,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        'min-w-0 max-lg:border-b max-lg:border-brand-border-light max-lg:pb-3.5 max-lg:last:border-b-0 max-lg:last:pb-0 max-[374px]:pb-3',
        className,
      )}
    >
      <p className="text-xs font-bold text-brand-dark max-[374px]:text-[11px] lg:text-sm">
        {label}
      </p>
      <div className="mt-1.5 text-xs font-normal leading-snug text-brand-dark max-[374px]:mt-1 max-[374px]:text-[11px] lg:text-sm">
        {children}
      </div>
    </div>
  );
}

export function HomeLoanListingCard({
  loan,
  className,
}: HomeLoanListingCardProps) {
  const detailHref = `/items/${loan.slug}`;
  const logoUrl = getHomeLoanImageUrl(loan.slug);
  const baseId = `home-loan-${loan.listingId ?? loan.slug}`;

  return (
    <article id={baseId} className={cn('home-loan-listing-card', className)}>
      <div
        id={`${baseId}-inner`}
        className="p-4 max-md:p-3.5 max-[374px]:p-3 md:max-lg:p-4 lg:p-6"
      >
        <div
          id={`${baseId}-header`}
          className="mb-5 border-b border-brand-border-light pb-4 max-md:mb-4 max-md:pb-3 max-[374px]:mb-3.5 max-[374px]:pb-2.5 lg:flex lg:flex-wrap lg:items-center lg:gap-4"
        >
          <div
            id={`${baseId}-header-main`}
            className="flex min-w-0 flex-col items-start gap-2 max-[374px]:gap-1.5 lg:contents"
          >
            <div
              id={`${baseId}-logo-wrap`}
              className="relative h-10 w-[112px] shrink-0 max-[374px]:h-9 max-[374px]:w-[100px] sm:h-12 sm:w-[150px]"
            >
              {logoUrl ? (
                <FillImage
                  src={logoUrl}
                  alt={`${loan.lender} logo`}
                  className="object-contain object-left"
                  sizes="150px"
                />
              ) : (
                <span className="text-sm font-bold text-brand-primary">
                  {loan.lender}
                </span>
              )}
            </div>
            <h3
              id={`${baseId}-title`}
              className="w-full min-w-0 text-[15px] font-bold leading-snug text-brand-dark max-[374px]:text-sm lg:flex-1 lg:text-lg"
            >
              {loan.name}
            </h3>
          </div>
          <div
            id={`${baseId}-actions`}
            className="mt-3 flex w-full flex-row items-stretch gap-2.5 max-md:mt-3 max-[374px]:mt-2.5 max-[374px]:gap-2 lg:mt-0 lg:ml-auto lg:w-auto lg:flex-col lg:items-center lg:gap-2"
          >
            <Link
              id={`${baseId}-compare`}
              href="/enquiry"
              className="inline-flex min-h-[44px] flex-1 cursor-pointer items-center justify-center rounded-md bg-brand-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark max-[374px]:min-h-[40px] max-[374px]:px-3 max-[374px]:text-[13px] lg:min-h-0 lg:min-w-[120px] lg:flex-none lg:px-6"
            >
              Compare
            </Link>
            <Link
              id={`${baseId}-read-more`}
              href={detailHref}
              className="inline-flex min-h-[44px] flex-1 cursor-pointer items-center justify-center rounded-md border border-brand-border-light bg-white px-4 py-2.5 text-sm font-bold text-brand-primary transition-colors hover:border-brand-primary hover:bg-brand-cream/30 max-[374px]:min-h-[40px] max-[374px]:px-3 max-[374px]:text-[13px] lg:min-h-0 lg:flex-none lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:hover:bg-transparent lg:hover:underline"
            >
              Read More
            </Link>
          </div>
        </div>

        <div
          id={`${baseId}-metrics`}
          className="grid grid-cols-2 gap-x-3 gap-y-0 max-md:pt-1 max-[374px]:gap-x-2.5 md:grid-cols-2 md:gap-x-4 md:gap-y-5 lg:grid-cols-4 lg:gap-6"
        >
          <MetricColumn id={`${baseId}-interest`} label="Interest Rates">
            {loan.interestRate}
          </MetricColumn>
          <MetricColumn id={`${baseId}-reward`} label="Reward Point">
            {loan.rewardPoints}
          </MetricColumn>
          <MetricColumn
            id={`${baseId}-important`}
            label="Important"
            className="max-lg:col-span-2"
          >
            <p>Application: {loan.applicationFee}</p>
            <p className="mt-0.5">Ongoing: {loan.ongoingFee}</p>
          </MetricColumn>
          <MetricColumn
            id={`${baseId}-loan-fee`}
            label="Loan Fee"
            className="max-lg:col-span-2 max-lg:rounded-[10px] max-lg:border max-lg:border-white/60 max-lg:bg-white/35 max-lg:px-3 max-lg:py-3 max-lg:backdrop-blur-md max-[374px]:px-2.5 max-[374px]:py-2.5 lg:col-span-1 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
          >
            <p className="text-base font-bold text-brand-dark max-[374px]:text-[15px] lg:text-lg">
              {loan.loanFee}
            </p>
          </MetricColumn>
        </div>
      </div>
    </article>
  );
}
