'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UtilityChoiceLogo } from './UtilityChoiceLogo';
import { NAV_ITEMS } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { trackContactClick } from '@/lib/cms/tracking';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  setMobileMenuOpen,
  selectMobileMenuOpen,
} from '@/redux/features/ui/uiSlice';

const MOBILE_MENU_EMAIL = 'Help@utilitychoice.com';
/** Always show header when within this distance from the top. */
const HEADER_TOP_THRESHOLD = 8;
/** Minimum scroll delta before toggling hide/show (avoids jitter). */
const HEADER_SCROLL_DELTA = 10;

function hrefSlug(href: string): string {
  if (href === '/') return 'home';
  return href.slice(1).replace(/\//g, '-');
}

function isNavActive(pathname: string, href: string) {
  return href === '/'
    ? pathname === '/'
    : pathname === href || pathname.startsWith(`${href}/`);
}

function MenuDotIcon() {
  return (
    <svg viewBox="0 0 200 200" className="h-5 w-5" aria-hidden>
      <circle cx="100" cy="100" r="80" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 600 592"
      className="h-5 w-5"
      aria-hidden
      fill="currentColor"
    >
      <path d="M531.936 536.904L323.094 328.063 114.253 536.904l-32.064-32.062L291.032 296 82.189 87.157l32.064-32.061 208.842 208.842L531.936 55.096 564 87.157 355.155 296 564 504.842l-32.064 32.062z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-6 w-6"
      aria-hidden
      fill="currentColor"
    >
      <path d="M159.449 180c-.634 0-1.26-.028-1.88-.084-23.876-2.589-47.047-10.815-67.108-23.8-18.6-11.798-34.717-27.886-46.564-46.495-13.03-20.074-21.274-43.307-23.811-67.147-1.027-11.366 7.334-21.371 18.631-22.39a20.688 20.688 0 0 1 1.839-.083h22.441l.2-.001c10.15 0 18.89 7.56 20.321 17.663a90.246 90.246 0 0 0 4.936 19.805c2.813 7.467.996 15.971-4.631 21.655l-6.441 6.426a114.027 114.027 0 0 0 36.943 36.871l6.414-6.404c5.713-5.642 14.238-7.457 21.73-4.642a90.695 90.695 0 0 0 19.778 4.916c10.37 1.462 17.968 10.383 17.747 20.778v22.335c.046 11.301-9.146 20.552-20.491 20.598l-.054-.001zM63.145 31.209l-.094.001H40.555c-.278 0-.555.013-.833.038-5.125.462-8.923 5.007-8.46 10.131 2.341 22.008 9.982 43.543 22.085 62.188 10.995 17.272 25.917 32.166 43.182 43.116 18.638 12.063 40.114 19.689 62.151 22.079.192.018.593.049.785.029 5.144-.022 9.321-4.223 9.3-9.366v-22.421a9.339 9.339 0 0 0-8.038-9.609 101.852 101.852 0 0 1-22.198-5.524 9.393 9.393 0 0 0-9.871 2.094l-9.477 9.46a5.614 5.614 0 0 1-6.746.909 125.228 125.228 0 0 1-46.989-46.9 5.592 5.592 0 0 1 .91-6.733l9.501-9.483c2.535-2.559 3.358-6.422 2.079-9.819a101.42 101.42 0 0 1-5.545-22.22c-.643-4.537-4.613-7.97-9.246-7.97z" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector(selectMobileMenuOpen);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= HEADER_TOP_THRESHOLD) {
          setHeaderVisible(true);
        } else if (currentScrollY > lastScrollY.current + HEADER_SCROLL_DELTA) {
          setHeaderVisible(false);
        } else if (currentScrollY < lastScrollY.current - HEADER_SCROLL_DELTA) {
          setHeaderVisible(true);
        }

        lastScrollY.current = currentScrollY;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    lastScrollY.current = window.scrollY;

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const showHeader = mobileMenuOpen || headerVisible;

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        id="site-header"
        className={cn(
          'site-header-glass sticky top-0 z-50 w-full max-w-[100vw] overflow-x-clip transition-transform duration-300 ease-in-out will-change-transform',
          !showHeader && 'pointer-events-none -translate-y-full'
        )}
      >
        <div
          id="header-inner"
          className="mx-auto box-border grid w-full max-w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-2 px-[var(--site-px)] py-3 max-md:overflow-hidden max-[374px]:gap-1.5 sm:items-center sm:gap-3 sm:py-4 md:max-lg:py-4 lg:flex lg:max-w-[min(var(--site-width),var(--site-vw))] lg:items-center lg:justify-between lg:gap-4 lg:px-0 lg:py-7"
        >
          <Link
            id="header-logo"
            href="/"
            className="w-fit min-w-0 shrink-0"
            aria-label="Utility Choice Home"
          >
            <UtilityChoiceLogo />
          </Link>

          <div
            id="header-actions"
            className="flex shrink-0 items-center gap-2 max-[374px]:gap-1.5 sm:gap-3 md:gap-4"
          >
            <button
              id="header-menu-btn"
              type="button"
              className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-full bg-brand-accent-bright px-3 text-[13px] font-bold text-white transition-transform hover:scale-[1.02] max-[374px]:h-9 max-[374px]:gap-0 max-[374px]:px-2.5 sm:h-11 sm:gap-1.5 sm:px-4 sm:text-sm md:max-lg:h-11 md:max-lg:min-w-0 md:max-lg:px-4 md:max-lg:text-sm lg:h-[61px] lg:min-w-[142px] lg:gap-2 lg:px-6 lg:text-[16px]"
              onClick={() => dispatch(setMobileMenuOpen(!mobileMenuOpen))}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-haspopup="dialog"
            >
              <span className="max-[374px]:sr-only sm:not-sr-only">Menu</span>
              <span className="text-white">
                <MenuDotIcon />
              </span>
            </button>

            <Link
              id="header-phone-btn"
              href="/enquiry"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-brand-border bg-white text-brand-primary shadow-sm transition-colors hover:border-brand-primary hover:bg-brand-primary/5 max-[374px]:h-9 max-[374px]:w-9 sm:h-11 sm:w-11 md:max-lg:h-11 md:max-lg:w-11 lg:h-[61px] lg:w-[61px]"
              aria-label="Phone"
            >
              <PhoneIcon />
            </Link>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <button
            id="mobile-menu-backdrop"
            type="button"
            className="fixed inset-0 z-[99] cursor-pointer bg-black/40"
            aria-label="Close menu"
            onClick={() => dispatch(setMobileMenuOpen(false))}
          />
          <div
            id="mobile-menu"
            className="fixed right-0 top-0 z-[100] box-border flex h-full w-[min(300px,calc(100vw-1rem))] flex-col overflow-hidden bg-brand-accent-bright pt-[env(safe-area-inset-top,0px)] pr-[env(safe-area-inset-right,0px)] shadow-[-4px_0_24px_rgba(0,0,0,0.12)] sm:w-[min(340px,calc(100vw-1.5rem))]"
            role="dialog"
            aria-modal="true"
            aria-label="Site"
          >
            <div
              id="mobile-menu-header"
              className="flex w-full shrink-0 justify-end px-4 pb-2 pt-4 sm:px-5 sm:pt-5"
            >
              <button
                id="header-menu-close-btn"
                type="button"
                className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-white pl-4 pr-3.5 text-[14px] font-bold text-brand-accent-bright transition-transform hover:scale-[1.02] sm:gap-2 sm:px-5 sm:text-[15px]"
                onClick={() => dispatch(setMobileMenuOpen(false))}
                aria-label="Close"
              >
                Close
                <CloseIcon />
              </button>
            </div>

            <nav
              id="mobile-menu-nav"
              className="flex-1 overflow-y-auto px-5 pt-4"
              aria-label="Site"
            >
              <ul id="mobile-menu-nav-list">
                {NAV_ITEMS.map((item) => {
                  const isActive = isNavActive(pathname, item.href);
                  return (
                    <li key={item.href} className="border-b border-white/20">
                      <Link
                        id={`nav-link-${hrefSlug(item.href)}`}
                        href={item.href}
                        onClick={() => dispatch(setMobileMenuOpen(false))}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'block py-4 text-[18px] font-bold leading-snug transition-colors',
                          isActive
                            ? '-mx-5 bg-brand-cream px-5 text-brand-accent-bright'
                            : 'text-white hover:text-white/90'
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div
              id="mobile-menu-footer"
              className="flex flex-col gap-3 px-5 pb-8 pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4"
            >
              <p
                id="mobile-menu-email"
                className="text-[14px] font-bold text-white"
              >
                <a
                  href={`mailto:${MOBILE_MENU_EMAIL}`}
                  onClick={() => trackContactClick('email')}
                  className="hover:underline"
                >
                  {MOBILE_MENU_EMAIL}
                </a>
              </p>
              <p
                id="mobile-menu-copyright"
                className="text-[12px] font-bold leading-snug text-[#FFFFFE] sm:max-w-[48%] sm:text-right sm:text-[14px]"
              >
                &copy; 2021 by Utility Choice &amp; Secured by Utility Choice
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
