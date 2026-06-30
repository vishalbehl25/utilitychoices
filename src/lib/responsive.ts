/** Width helpers — mobile ≤767px, tablet 768–1023px (`md:max-lg:`), laptop/desktop ≥1024px (`lg:`) */

/** Horizontal padding from `--site-px` (1rem mobile, 0.75rem ≤374px) */
export const sitePadClass =
  'max-md:px-[var(--site-px)] md:max-lg:px-[var(--site-px)] lg:px-0';

export const siteWidthClass =
  'mx-auto box-border w-full max-w-full max-md:px-[var(--site-px)] md:max-lg:px-[var(--site-px)] lg:max-w-[min(var(--site-width),var(--site-vw))] lg:px-0';

export const siteInnerWidthClass =
  'mx-auto box-border w-full max-w-full max-md:px-[var(--site-px)] md:max-lg:px-[var(--site-px)] lg:max-w-[min(var(--site-inner-width),var(--site-vw))] lg:px-0';

/** Stack on narrow phones; row from `sm` up until desktop layout at `md` */
export const mobileStackClass = 'max-[374px]:flex-col max-[374px]:items-stretch';
