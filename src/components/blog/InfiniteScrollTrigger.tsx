'use client';

import { useEffect, useRef } from 'react';

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
  enabled?: boolean;
}

export function InfiniteScrollTrigger({
  onIntersect,
  enabled = true,
}: InfiniteScrollTriggerProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin: '200px', threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, onIntersect]);

  return (
    <div
      ref={sentinelRef}
      aria-hidden="true"
      className="h-px w-full"
    />
  );
}
