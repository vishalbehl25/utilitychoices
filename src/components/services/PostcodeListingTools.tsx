'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/hooks/redux';
import {
  setPostcode,
} from '@/redux/features/postcode/postcodeSlice';

/** Reads `?postcode=` from the URL and stores it in Redux. */
export function SyncPostcodeFromUrl() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const param = searchParams.get('postcode');

  useEffect(() => {
    if (param && /^[0-9]{4}$/.test(param)) {
      dispatch(setPostcode(param));
    }
  }, [param, dispatch]);

  return null;
}

export function PostcodeListingTools() {
  return <SyncPostcodeFromUrl />;
}
