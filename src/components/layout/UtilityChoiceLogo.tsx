import { SITE_CONFIG } from '@/constants/navigation';
import { cn } from '@/lib/cn';

interface UtilityChoiceLogoProps {
  className?: string;
}

export function UtilityChoiceLogo({ className }: UtilityChoiceLogoProps) {
  return (
    <div
      id="header-logo-wrap"
      className={cn('relative flex w-fit max-w-full shrink-0 flex-col', className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        id="header-logo-image"
        src="/assets/utility-choice-logo.svg"
        alt="Utility Choice"
        width={230}
        height={38}
        className="block h-7 w-[118px] max-w-full max-[374px]:h-6 max-[374px]:w-[118px] sm:h-8 sm:w-[170px] md:max-lg:h-8 md:max-lg:w-[170px] lg:h-[38px] lg:w-[230px]"
      />
      <p
        id="header-tagline"
        className="mt-0.5 w-full max-w-full truncate text-right text-[11px] max-md:text-[8px] font-extrabold leading-snug text-brand-tagline max-[374px]:text-[10px] sm:text-[14px] sm:whitespace-nowrap md:max-lg:text-[14px] lg:text-[16px]"
      >
        {SITE_CONFIG.tagline}
      </p>
    </div>
  );
}
