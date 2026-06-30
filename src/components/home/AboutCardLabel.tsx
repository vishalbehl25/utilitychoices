'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/cn';

const LABEL_VIDEO_SRC = '/assets/about/label-text-video.mp4';
const LABEL_POSTER_SRC = '/assets/about/label-text-bg.jpg';

/** Wix comp-m6swvpzg / comp-m6swn55o — video masked by vertical title text */
const VIEWBOX_WIDTH = 68;
const VIEWBOX_HEIGHT = 300;
const LABEL_FONT_SIZE = 30;

type AboutCardLabelProps = {
  label: 'Our Vision' | 'Our Mission';
  className?: string;
};

function buildLabelMask(label: string): string {
  const centerX = VIEWBOX_WIDTH / 2;
  const centerY = VIEWBOX_HEIGHT / 2;
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}">`,
    `<text x="${centerX}" y="${centerY}" text-anchor="middle" dominant-baseline="middle"`,
    ` transform="rotate(-90 ${centerX} ${centerY})" font-size="${LABEL_FONT_SIZE}" font-weight="700"`,
    ` font-family="Nunito Sans,sans-serif" letter-spacing="0.02em" fill="white">`,
    label,
    '</text></svg>',
  ].join('');
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function AboutCardLabel({ label, className }: AboutCardLabelProps) {
  const labelMask = useMemo(() => buildLabelMask(label), [label]);

  const maskStyle = useMemo(
    () =>
      ({
        WebkitMaskImage: labelMask,
        maskImage: labelMask,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }) as const,
    [labelMask]
  );

  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden',
        'min-h-[100px] max-md:min-h-0 lg:min-h-[200px]',
        className
      )}
      role="img"
      aria-label={label}
    >
      {/* Poster fallback — visible until video loads or if autoplay is blocked */}
      <div
        className="pointer-events-none absolute inset-0 motion-reduce:hidden"
        style={maskStyle}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LABEL_POSTER_SRC}
          alt=""
          className="h-full w-full scale-[1.6] object-cover object-center"
        />
      </div>

      {/* HTML video + SVG text mask — works on mobile Safari (foreignObject does not) */}
      <div
        className="relative h-full w-full motion-reduce:hidden"
        style={maskStyle}
      >
        <video
          className="h-full w-full scale-[1.6] object-cover object-center"
          src={LABEL_VIDEO_SRC}
          poster={LABEL_POSTER_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* Reduced motion fallback */}
      <div className="absolute inset-0 hidden items-center justify-center motion-reduce:flex">
        <span
          className="text-sideways text-sm font-extrabold uppercase tracking-[0.1em] text-brand-primary max-[374px]:text-xs lg:text-xl lg:tracking-widest"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            whiteSpace: 'nowrap',
          }}
        >
          {label.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
