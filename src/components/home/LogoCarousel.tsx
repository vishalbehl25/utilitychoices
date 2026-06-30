'use client';

import { ContainedImage } from '@/components/ui/ContainedImage';
import { cn } from '@/lib/cn';

interface LogoCarouselProps {
  logos: readonly { name: string; url: string }[];
  direction?: 'left' | 'right';
  speed?: number;
}

export function LogoCarousel({
  logos,
  direction = 'left',
  speed = 30,
}: LogoCarouselProps) {
  const duplicated = [...logos, ...logos];

  return (
    <div className="relative mb-4 overflow-hidden py-2">
      <div
        className={cn(
          'flex w-max items-center gap-10',
          direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicated.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex h-14 w-28 flex-shrink-0 items-center justify-center"
          >
            <ContainedImage
              src={logo.url}
              alt={logo.name}
              width={112}
              height={56}
              className="max-h-12 max-w-[112px] object-contain opacity-90 grayscale-0"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
