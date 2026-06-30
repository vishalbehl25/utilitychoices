import Link from 'next/link';
import { SectionContainer } from '@/components/layout/PageContainer';
import { cn } from '@/lib/cn';
import { siteInnerWidthClass } from '@/lib/responsive';

interface SolarSwitchBannerProps {
  id?: string;
  className?: string;
}

export function SolarSwitchBanner({
  id = 'solar-switch-banner',
  className,
}: SolarSwitchBannerProps) {
  return (
    <SectionContainer
      id={id}
      className={cn(
        'border-y border-brand-border-light bg-brand-cream py-8 md:py-10',
        className
      )}
    >
      <div
        className={cn(
          siteInnerWidthClass,
          'flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-8'
        )}
      >
        <h2 className="max-w-xl text-center text-xl font-normal leading-snug text-brand-dark sm:text-left sm:text-2xl md:text-[28px]">
          It&apos;s better to switch rather than to burn your wallet
        </h2>
        <Link
          href="/enquiry"
          className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand-accent-bright px-10 py-3.5 text-base font-bold text-white shadow-[0_4px_14px_rgba(255,98,0,0.3)] transition-transform hover:scale-[1.02] sm:px-12 sm:py-4 sm:text-lg"
        >
          Switch Now
        </Link>
      </div>
    </SectionContainer>
  );
}
