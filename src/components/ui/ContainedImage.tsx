import type { ImageProps, StaticImageData } from 'next/image';
import Image from 'next/image';
import { cn } from '@/lib/cn';

function resolveSrc(src: ImageProps['src']): string {
  if (typeof src === 'string') return src;
  return (src as StaticImageData).src;
}

const autoSizeStyle = { width: 'auto', height: 'auto' } as const;

type ContainedImageProps = Omit<ImageProps, 'fill'> & {
  fill?: never;
  id?: string;
};

/** Width/height props with CSS max-* sizing; uses native img when unoptimized (default). */
export function ContainedImage({
  className,
  style,
  unoptimized = true,
  src,
  alt,
  width,
  height,
  priority,
  loading,
  id,
  ...rest
}: ContainedImageProps) {
  const mergedStyle = { ...autoSizeStyle, ...style };

  if (unoptimized !== false) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        id={id}
        src={resolveSrc(src)}
        alt={alt}
        width={width}
        height={height}
        className={cn('block', className)}
        style={mergedStyle}
        loading={loading ?? (priority ? 'eager' : 'lazy')}
        decoding="async"
      />
    );
  }

  return (
    <Image
      id={id}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(className)}
      style={mergedStyle}
      priority={priority}
      loading={loading}
      unoptimized={unoptimized}
      {...rest}
    />
  );
}

export type FillImageProps = {
  src: ImageProps['src'];
  alt: string;
  className?: string;
  priority?: boolean;
  /** Kept for call-site compatibility with former next/image usage. */
  sizes?: string;
  unoptimized?: boolean;
};

/** Fills a relative parent; uses native img to avoid next/image dev warnings. */
export function FillImage({ src, alt, className, priority }: FillImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolveSrc(src)}
      alt={alt}
      className={cn('absolute inset-0 size-full', className)}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
