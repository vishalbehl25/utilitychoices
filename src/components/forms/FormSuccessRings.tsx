'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

const THANK_YOU_VIDEO = '/assets/thank-you/rotating-rings.mp4';
const THANK_YOU_IMAGE = '/assets/thank-you/rotating-rings-transparent.png';
const CANVAS_WIDTH = 318;
const CANVAS_HEIGHT = 452;
const SKIP_SECONDS = 0.55;

/** Only remove near-black background pixels — keep full ring colour. */
function keyBlackOnly(data: Uint8ClampedArray) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r < 40 && g < 40 && b < 40) {
      data[i + 3] = 0;
    }
  }
}

/**
 * Looping 3D rings on cream — transparent PNG fallback + canvas-keyed video.
 * No blend modes (they wash rings into the cream modal background).
 */
export function FormSuccessRings({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);
  const animatingRef = useRef(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let frameId = 0;
    let stopped = false;

    const guardIntro = () => {
      if (video.currentTime < SKIP_SECONDS) {
        video.currentTime = SKIP_SECONDS;
      }
    };

    const paint = () => {
      if (stopped) return;

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && !video.paused) {
        guardIntro();
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(video, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        const frame = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        keyBlackOnly(frame.data);
        ctx.putImageData(frame, 0, 0);

        if (!animatingRef.current) {
          animatingRef.current = true;
          setAnimating(true);
        }
      }

      frameId = requestAnimationFrame(paint);
    };

    const begin = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      video.currentTime = SKIP_SECONDS;
      void video.play().catch(() => {});
      frameId = requestAnimationFrame(paint);
    };

    video.addEventListener('loadeddata', begin);
    video.addEventListener('timeupdate', guardIntro);

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      begin();
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(frameId);
      video.removeEventListener('loadeddata', begin);
      video.removeEventListener('timeupdate', guardIntro);
      video.pause();
    };
  }, []);

  return (
    <div
      id="form-success-rings"
      className={cn(
        'relative mx-auto my-8 h-[226px] w-[159px] sm:my-10',
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={THANK_YOU_IMAGE}
        alt=""
        width={159}
        height={226}
        className={cn(
          'absolute inset-0 h-full w-full object-contain transition-opacity duration-300',
          animating ? 'opacity-0' : 'opacity-100'
        )}
        aria-hidden
      />

      <video
        ref={videoRef}
        id="form-success-video"
        className="hidden"
        src={THANK_YOU_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      />

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className={cn(
          'h-full w-full object-contain transition-opacity duration-300',
          animating ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden
      />

      {/* Masks white video reflection ghost below the rings */}
      <div
        id="form-success-rings-mask"
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[50%] w-[94%] -translate-x-1/2 bg-brand-off-white"
        aria-hidden
      />
    </div>
  );
}
