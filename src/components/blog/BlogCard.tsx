'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Eye, Heart, MessageCircle, MoreVertical } from 'lucide-react';
import type { BlogSummary } from '@/types/blog';
import {
  BLOG_IMAGE_BASE,
  BLOG_PLACEHOLDER_GRADIENT,
  DEFAULT_READ_TIME,
  formatBlogDate,
  resolveBlogImageUrl,
} from '@/lib/blog/format';
import { cn } from '@/lib/cn';

interface BlogCardProps {
  post: BlogSummary;
  readTime?: string;
  className?: string;
}

function BlogCardComponent({ post, readTime, className }: BlogCardProps) {
  const imageUrl = resolveBlogImageUrl(post.bannerImage, BLOG_IMAGE_BASE);
  const formattedDate = formatBlogDate(post.createdAt, post.customDate);
  const displayReadTime = readTime ?? DEFAULT_READ_TIME;

  return (
    <article className={cn('min-h-[320px]', className)}>
      <Link
        id={`blog-card-${post.slug}`}
        href={`/post/${post._id}`}
        aria-label={`Read blog post: ${post.title}`}
        className="group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-none bg-brand-dark shadow-[0_4px_20px_rgba(16,25,33,0.12)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      >
        <div className="relative aspect-[16/10] min-h-[200px] flex-1 overflow-hidden">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={post.title}
              width={640}
              height={400}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="absolute inset-0 size-full"
              style={{ background: BLOG_PLACEHOLDER_GRADIENT }}
              aria-hidden
            />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"
            aria-hidden
          />

          <div className="relative z-10 flex h-full flex-col justify-between p-4 text-white sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-normal text-white/90 sm:text-sm">
                {formattedDate}
                <span aria-hidden="true"> · </span>
                {displayReadTime}
              </p>
              <MoreVertical
                className="size-4 shrink-0 text-white/80"
                aria-hidden
              />
            </div>

            <div>
              <h2 className="line-clamp-3 text-lg font-bold leading-snug !text-white sm:text-xl md:text-2xl">
                {post.title}
              </h2>
              <div className="mt-3 border-t border-white/40 pt-3">
                <div className="flex items-center justify-between text-xs text-white/90 sm:text-sm">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Eye className="size-4" aria-hidden />
                      <span>{post.views}</span>
                      <span className="sr-only">views</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MessageCircle className="size-4" aria-hidden />
                      <span>0</span>
                      <span className="sr-only">comments</span>
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5">
                    <Heart className="size-4" aria-hidden />
                    <span>{post.likes}</span>
                    <span className="sr-only">likes</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export const BlogCard = memo(BlogCardComponent);
