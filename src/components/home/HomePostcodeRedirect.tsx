'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/hooks/redux';
import { selectPostcode } from '@/redux/features/postcode/postcodeSlice';
import { extractAustralianPostcode } from '@/lib/australian-address';
import { getServiceHrefFromKey } from '@/lib/service-keys';

/**
 * When the explore form falls back to a native GET on `/`, send users to the
 * correct listing page with the same postcode query (runs once per mount).
 */
export function HomePostcodeRedirect() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedService } = useAppSelector(selectPostcode);
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (pathname !== '/' || redirectedRef.current) {
      return;
    }

    const postcodeParam = searchParams.get('postcode');
    const locationParam = searchParams.get('location');
    const postcode =
      postcodeParam && /^[0-9]{4}$/.test(postcodeParam)
        ? postcodeParam
        : locationParam
          ? extractAustralianPostcode(locationParam)
          : null;

    if (!postcode) {
      return;
    }

    redirectedRef.current = true;
    const href = getServiceHrefFromKey(selectedService) ?? '/items';
    router.replace(`${href}?postcode=${postcode}`);
  }, [pathname, searchParams, selectedService, router]);

  return null;
}
