import { FillImage } from '@/components/ui/ContainedImage';
import Link from 'next/link';
import type { CreditCardDetail } from '@/data/credit-card-details';
import { getCreditCardImageUrl } from '@/lib/credit-card-image';
import { cn } from '@/lib/cn';

interface CreditCardListingCardProps {
  card: CreditCardDetail;
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

export function CreditCardListingCard({
  card,
  className,
}: CreditCardListingCardProps) {
  const detailHref = `/credit-cards/${card.slug}`;
  const imageUrl = getCreditCardImageUrl(card.slug);
  const baseId = `credit-card-${card.slug}`;

  return (
    <article id={baseId} className={cn('site-card overflow-hidden', className)}>
      <div
        id={`${baseId}-inner`}
        className="flex flex-col gap-4 p-4 sm:flex-row sm:gap-5 sm:p-5 md:p-6"
      >
        <div
          id={`${baseId}-media`}
          className="flex w-full shrink-0 flex-col gap-3 sm:w-[148px] md:w-[160px]"
        >
          <div
            id={`${baseId}-image-wrap`}
            className="relative aspect-[8/5] w-full overflow-hidden rounded-md bg-white"
          >
            {imageUrl ? (
              <FillImage
                src={imageUrl}
                alt={card.name}
                className="object-contain object-center p-1"
                sizes="160px"
              />
            ) : (
              <div
                id={`${baseId}-image-placeholder`}
                className="flex h-full items-center justify-center px-2 text-center text-xs font-semibold text-brand-primary"
              >
                {card.company}
              </div>
            )}
          </div>
          <Link
            id={`${baseId}-visit-btn`}
            href="/enquiry"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-brand-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
          >
            Visit
          </Link>
        </div>

        <div id={`${baseId}-content`} className="min-w-0 flex-1">
          <div
            id={`${baseId}-header`}
            className="mb-4 flex flex-wrap items-start justify-between gap-2 border-b border-brand-border-light pb-3"
          >
            <h3
              id={`${baseId}-title`}
              className="text-base font-bold text-brand-dark md:text-lg"
            >
              {card.name}
            </h3>
            <Link
              id={`${baseId}-read-more`}
              href={detailHref}
              className="shrink-0 cursor-pointer text-sm font-bold text-brand-primary hover:underline"
            >
              Read More
            </Link>
          </div>

          <div
            id={`${baseId}-metrics`}
            className="grid grid-cols-2 gap-x-4 gap-y-4 md:max-lg:grid-cols-2 lg:grid-cols-5 lg:gap-3"
          >
            <MetricCell
              id={`${baseId}-metric-interest`}
              label="Interest Rates"
              value={card.interestRate}
            />
            <MetricCell
              id={`${baseId}-metric-bonus`}
              label="Bonus Point"
              value={card.bonusPoints}
            />
            <MetricCell
              id={`${baseId}-metric-reward`}
              label="Reward Point"
              value={card.rewardPoints}
            />
            <MetricCell
              id={`${baseId}-metric-interest-free`}
              label="Interest Free"
              value={card.interestFree}
            />
            <MetricCell
              id={`${baseId}-metric-charges`}
              label="Charges"
              value={card.charges}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
