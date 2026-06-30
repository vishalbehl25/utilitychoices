'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

const HERO_EMBED_SRC = '/assets/hero/hero-embed.html';

interface HeroLottieAnimationProps {
  className?: string;
}

/** Same Wix htmlComp iframe embed as utilitychoices.com.au hero */
export function HeroLottieAnimation({ className }: HeroLottieAnimationProps) {
  const [showIframe, setShowIframe] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIframe(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn('relative size-full overflow-hidden', className)}
      aria-hidden
    >
      <div
        className={cn(
          'absolute inset-0 bg-transparent transition-opacity duration-500',
          loaded ? 'opacity-0' : 'opacity-100',
        )}
      />
      {showIframe ? (
        <iframe
          title="Embedded Content"
          name="htmlComp-iframe"
          src={HERO_EMBED_SRC}
          width="326"
          height="398"
          scrolling="no"
          allow="fullscreen"
          loading="lazy"
          className={cn(
            'size-full overflow-hidden border-0 transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => setLoaded(true)}
        />
      ) : null}
    </div>
  );
}
