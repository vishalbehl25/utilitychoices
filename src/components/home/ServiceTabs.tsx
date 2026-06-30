'use client';

import Link from 'next/link';
import { ContainedImage } from '@/components/ui/ContainedImage';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { cn } from '@/lib/cn';
import { SERVICE_TAB_ICONS } from '@/data/partners';
import { useAppDispatch } from '@/hooks/redux';
import { setSelectedService } from '@/redux/features/postcode/postcodeSlice';
import {
  getServiceKeyFromHref,
  getServiceKeyFromPathname,
} from '@/lib/service-keys';

function hrefSlug(href: string): string {
  if (href === '/') return 'home';
  return href.slice(1).replace(/\//g, '-');
}

function TabCard({
  tab,
  isActive,
}: {
  tab: (typeof SERVICE_TAB_ICONS)[number];
  isActive: boolean;
}) {
  return (
    <div
      id={`service-tab-card-${hrefSlug(tab.href)}`}
      className={cn(
        'flex w-full max-w-full flex-col items-center rounded-[10px] border border-brand-border bg-white px-1.5 pb-2 pt-2.5 transition-all duration-200 max-[374px]:px-1 sm:max-w-[130px] sm:px-2 sm:pb-2.5 sm:pt-3',
        'hover:border-brand-border-subtle hover:shadow-[0_2px_8px_rgba(16,25,33,0.08)]',
        isActive &&
          'border-brand-primary shadow-[0_2px_8px_rgba(0,97,184,0.12)]'
      )}
    >
      <ContainedImage
        src={tab.url}
        alt={`${tab.label} | Utility Choice`}
        width={52}
        height={53}
        className="max-h-10 max-w-10 object-contain max-[374px]:max-h-9 max-[374px]:max-w-9 sm:max-h-[53px] sm:max-w-[52px]"
        unoptimized
      />
      <h2
        className={cn(
          'mt-1.5 text-center text-[12px] font-bold leading-tight max-[374px]:text-[11px] sm:mt-2 sm:text-[16px]',
          isActive
            ? 'text-brand-primary'
            : 'text-brand-dark group-hover:text-brand-primary'
        )}
      >
        {tab.label === 'Solar'
          ? 'Solar'
          : tab.label === 'NBN'
            ? 'NBN'
            : tab.label}
      </h2>
    </div>
  );
}

export function ServiceTabs() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const key = getServiceKeyFromPathname(pathname);
    if (key) {
      dispatch(setSelectedService(key));
    }
  }, [pathname, dispatch]);

  return (
    <div
      id="service-tabs-grid"
      className="grid w-full grid-cols-2 gap-2 max-[374px]:gap-1.5 sm:grid-cols-3 sm:gap-3 md:max-lg:grid-cols-3 md:max-lg:gap-3 lg:flex lg:w-full lg:max-w-[min(var(--site-width),var(--site-vw))] lg:justify-between lg:gap-0 lg:px-[18px]"
    >
      {SERVICE_TAB_ICONS.map((tab) => {
        const tabKey = getServiceKeyFromHref(tab.href);
        const isActive =
          pathname === tab.href || pathname.startsWith(`${tab.href}/`);

        return (
          <Link
            id={`service-tab-${hrefSlug(tab.href)}`}
            key={tab.label}
            href={tab.href}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => tabKey && dispatch(setSelectedService(tabKey))}
            className="group flex w-full cursor-pointer justify-center md:max-lg:w-full lg:block lg:w-[130px] lg:shrink-0"
          >
            <TabCard tab={tab} isActive={isActive} />
          </Link>
        );
      })}
    </div>
  );
}
