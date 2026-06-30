import { cn } from '@/lib/cn';
import {
  ProcessStepArrowIcon,
  ProcessStepIllustrationIcon,
  ProcessStepThumbsIcon,
  type ProcessStepIllustration,
} from '@/components/home/ProcessStepIcons';

/** Live Wix `wixui-box` — 226×258 (Select/Switch/Save) */
export const PROCESS_STEP_CARD_WIDTH = 226;
export const PROCESS_STEP_CARD_HEIGHT = 258;
/** Explore card only — 20% shorter than standard */
export const PROCESS_STEP_EXPLORE_CARD_HEIGHT = Math.round(
  PROCESS_STEP_CARD_HEIGHT * 0.8
);

export interface ProcessStepCardProps {
  id: string;
  title: string;
  description: string;
  topLeft: 'arrow' | 'thumbs';
  illustration: ProcessStepIllustration;
  /** Wix arrow offset: Explore/Switch 14px, Select 16px */
  arrowLeft?: '14px' | '16px';
  /** Shorter card (Explore only) */
  compact?: boolean;
}

export function ProcessStepCard({
  id,
  title,
  description,
  topLeft,
  illustration,
  arrowLeft = '14px',
  compact = false,
}: ProcessStepCardProps) {
  return (
    <article
      id={id}
      className={cn(
        'process-step-card relative box-border w-full max-w-full shrink-0 rounded-[12px] md:max-lg:max-w-none lg:max-w-[226px] lg:rounded-[20px]',
        'border border-brand-border-subtle bg-brand-off-white',
        compact
          ? 'h-[96px] max-[374px]:h-[88px] md:max-lg:h-[140px] lg:h-[206px]'
          : 'h-[118px] max-[374px]:h-[108px] md:max-lg:h-[170px] lg:h-[258px]'
      )}
    >
      {/* Top-left: arrow (cards 1–3) or thumbs (Save) */}
      <div
        id={`${id}-top-left`}
        className={cn(
          'absolute z-20',
          topLeft === 'arrow'
            ? cn(
                'left-[6px] top-[8px] md:max-lg:top-[12px] lg:top-[18px]',
                arrowLeft === '16px' ? 'lg:left-4' : 'lg:left-[14px]'
              )
            : 'left-[6px] top-[9px] lg:left-[15px] lg:top-[21px]'
        )}
      >
        {topLeft === 'arrow' ? (
          <ProcessStepArrowIcon className="h-[12px] w-[18px] md:max-lg:h-[16px] md:max-lg:w-[24px] lg:h-[21px] lg:w-[32px]" />
        ) : (
          <ProcessStepThumbsIcon className="h-3 w-3 md:max-lg:h-4 md:max-lg:w-5 lg:h-[25px] lg:w-6" />
        )}
      </div>

      {/* Top-right: step illustration */}
      <div
        id={`${id}-icon`}
        className="absolute right-1 top-1.5 z-10 md:max-lg:right-2 md:max-lg:top-2 lg:right-[13px] lg:top-3"
      >
        <ProcessStepIllustrationIcon
          type={illustration}
          className="h-7 w-7 md:max-lg:h-8 md:max-lg:w-10 lg:h-[35px] lg:w-[45px]"
        />
      </div>

      {/* Vertical step title */}
      <div
        id={`${id}-title-rail`}
        className={cn(
          'absolute left-0 flex w-7 items-center justify-center md:max-lg:w-9 lg:w-[52px]',
          compact
            ? 'bottom-[26px] top-[28px] md:max-lg:bottom-[36px] md:max-lg:top-[38px] lg:bottom-[50px] lg:top-[53px]'
            : 'bottom-[32px] top-[34px] md:max-lg:bottom-[44px] md:max-lg:top-[46px] lg:bottom-[63px] lg:top-[66px]'
        )}
      >
        <span
          id={`${id}-title`}
          className="text-[11px] font-bold leading-none text-brand-dark md:max-lg:text-[16px] lg:text-[26px]"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </span>
      </div>

      {/* Body copy */}
      <p
        id={`${id}-desc`}
        className={cn(
          'absolute left-6 right-8 text-left text-[7px] font-bold leading-[1.2] text-brand-muted max-[374px]:left-5 max-[374px]:right-7 max-[374px]:text-[6.5px] sm:left-7 sm:text-[9px]',
          'md:max-lg:left-8 md:max-lg:right-4 md:max-lg:text-[11px] lg:left-[50px] lg:right-3 lg:text-[16px] lg:leading-[1.35]',
          compact
            ? 'bottom-[26px] md:max-lg:bottom-[36px] lg:bottom-[50px]'
            : 'bottom-[32px] md:max-lg:bottom-[44px] lg:bottom-[63px]'
        )}
      >
        {description}
      </p>
    </article>
  );
}
