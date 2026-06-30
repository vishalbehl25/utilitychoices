'use client';

import { useEffect, useState } from 'react';
import { ENQUIRY_MAP_HEIGHT_PX } from '@/constants/enquiry';
import { getClientMapMetadata } from '@/lib/enquiry/client-location';
import { fetchMapEmbedUrl } from '@/lib/map-embed-client';
import { buildOfficeMapEmbedUrl } from '@/lib/map-embed';
import { cn } from '@/lib/cn';

const OFFICE_MAP_TITLE = 'Utility Choice office — 322 King William St, Adelaide';

export function ContactMap({
  id = 'contact-map',
  className,
  variant = 'default',
}: {
  id?: string;
  className?: string;
  variant?: 'default' | 'enquiry';
}) {
  const isEnquiry = variant === 'enquiry';
  const [mapUrl, setMapUrl] = useState<string | null>(
    isEnquiry ? null : buildOfficeMapEmbedUrl(),
  );
  const [mapTitle, setMapTitle] = useState(
    isEnquiry ? 'Loading your location…' : OFFICE_MAP_TITLE,
  );
  const [isLoading, setIsLoading] = useState(isEnquiry);

  useEffect(() => {
    if (!isEnquiry) return;

    let cancelled = false;

    async function loadEnquiryMap() {
      try {
        const metadata = await getClientMapMetadata();
        if (cancelled) return;

        const embedUrl = await fetchMapEmbedUrl({
          latitude: metadata?.latitude,
          longitude: metadata?.longitude,
          query: metadata?.detectedAddress,
        });

        if (cancelled) return;

        setMapUrl(embedUrl);

        if (metadata?.detectedAddress) {
          setMapTitle(metadata.detectedAddress);
        } else if (metadata?.city && metadata?.region) {
          setMapTitle(`${metadata.city}, ${metadata.region}`);
        } else if (metadata?.latitude && metadata?.longitude) {
          setMapTitle('Your detected location');
        } else {
          setMapTitle(OFFICE_MAP_TITLE);
        }
      } catch {
        if (cancelled) return;
        setMapUrl(buildOfficeMapEmbedUrl());
        setMapTitle(OFFICE_MAP_TITLE);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadEnquiryMap();

    return () => {
      cancelled = true;
    };
  }, [isEnquiry]);

  const mapHeight = isEnquiry ? ENQUIRY_MAP_HEIGHT_PX : undefined;

  return (
    <section
      id={id}
      className={cn(
        'w-full overflow-hidden',
        isEnquiry &&
          'relative left-1/2 z-0 w-screen max-w-[100vw] -translate-x-1/2',
        className
      )}
    >
      {isLoading ? (
        <div
          className="flex w-full items-center justify-center bg-brand-cream/30 text-sm text-brand-muted"
          style={{ height: mapHeight }}
          aria-live="polite"
          aria-busy="true"
        >
          Detecting your location…
        </div>
      ) : (
        mapUrl && (
          <iframe
            key={mapUrl}
            id={`${id}-iframe`}
            title={mapTitle}
            src={mapUrl}
            className={cn(
              'block w-full border-0',
              !isEnquiry && 'h-[400px] md:h-[450px]'
            )}
            style={isEnquiry ? { height: mapHeight } : undefined}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        )
      )}
    </section>
  );
}
