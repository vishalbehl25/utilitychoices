'use client';

import { useEffect, useRef, useState } from 'react';
import { FillImage } from '@/components/ui/ContainedImage';
import { cn } from '@/lib/cn';

const HEART_PATH =
  'M56.27138900756836,9.283245086669922 C86.56354522705078,-43.18428039550781 30.85853385925293,-78.0531005859375 0,-47.1945686340332 C-30.85853385925293,-78.0531005859375 -86.56354522705078,-43.18446731567383 -56.27138900756836,9.283245086669922 C-42.3302116394043,33.43081283569336 -14.211678504943848,55.570045471191406 0,59.37810134887695 C14.211678504943848,55.570045471191406 42.33002471923828,33.43081283569336 56.27138900756836,9.283245086669922z';

/** Darker green dome behind heart (Wix Lottie inner shape) */
const HEART_ARCH_PATH =
  'M-58,18 C-58,-22 -28,-42 0,-44 C28,-42 58,-22 58,18 C58,32 28,38 0,40 C-28,38 -58,32 -58,18z';

/** Heart + arch scale (smaller heart, more visible map) */
const HEART_SCALE = 0.68;
const ARCH_SCALE = 0.72;
const HEART_STROKE = 11;

interface AustraliaMapAnimationProps {
  className?: string;
  onVisible?: () => void;
}

export function AustraliaMapAnimation({
  className,
  onVisible,
}: AustraliaMapAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const onVisibleRef = useRef(onVisible);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    onVisibleRef.current = onVisible;
  }, [onVisible]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const activate = () => {
      setAnimate(true);
      onVisibleRef.current?.();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activate();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '80px 0px' }
    );

    observer.observe(el);

    // Already in view on load (e.g. scrolled section) — don't wait for scroll
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 80 && rect.bottom > -80) {
      activate();
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id="process-australia-map"
      className={cn('shrink-0', className)}
      aria-hidden
    >
      <div
        className={cn(
          'relative h-[118px] w-[138px] overflow-visible max-[374px]:h-[108px] max-[374px]:w-[124px] sm:h-[165px] sm:w-[192px] md:h-[228px] md:w-[272px] lg:h-[248px] lg:w-[296px]',
          animate && 'animate-australia-map-float motion-reduce:animate-none'
        )}
      >
        <FillImage
          src="/assets/home/australia-map.svg"
          alt=""
          className="origin-center scale-[1.08] object-contain object-center sm:scale-[1.1] md:scale-[1.14]"
        />
        <svg
          viewBox="0 0 500 640"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        >
          <g transform={`translate(250 278) scale(${ARCH_SCALE})`}>
            <path fill="#A5CD5C" d={HEART_ARCH_PATH} />
          </g>
          <g transform={`translate(250 282.2) scale(${HEART_SCALE})`}>
            <g
              className={cn(
                animate && 'animate-heart-pulse motion-reduce:animate-none'
              )}
            >
              <path fill="#FD6050" d={HEART_PATH} />
              <path
                fill="none"
                stroke="#33CCCC"
                strokeWidth={HEART_STROKE}
                strokeLinecap="round"
                strokeLinejoin="round"
                d={HEART_PATH}
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
