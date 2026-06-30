import Link from 'next/link';
import { MoreVertical } from 'lucide-react';
import type { BlogDetail, BlogSummary } from '@/types/blog';
import { BlogContent } from '@/components/blog/BlogContent';
import { BlogDetailBottom } from '@/components/blog/BlogDetailBottom';
import { BlogFaqSection } from '@/components/blog/BlogFaqSection';
import { BlogShareBar } from '@/components/blog/BlogShareBar';
import { Button } from '@/components/ui/button';
import {
  BLOG_IMAGE_BASE,
  BLOG_PLACEHOLDER_GRADIENT,
  calculateReadTime,
  formatBlogDate,
  resolveBlogImageUrl,
} from '@/lib/blog/format';
import { SITE_CONFIG } from '@/constants/navigation';

interface BlogDetailViewProps {
  post: BlogDetail;
  recentPosts: BlogSummary[];
}

export function BlogDetailView({ post, recentPosts }: BlogDetailViewProps) {
  const imageUrl = resolveBlogImageUrl(post.bannerImage, BLOG_IMAGE_BASE);
  const formattedDate = formatBlogDate(post.createdAt, post.customDate);
  const readTime = calculateReadTime(post.content || post.title);
  const shareUrl = `${SITE_CONFIG.url}/post/${post._id}`;

  return (
    <article id={`blog-post-${post.slug}`} className="mx-auto max-w-3xl">
      <header id={`blog-post-${post.slug}-header`} className="mb-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <p className="text-sm text-brand-muted">
            {formattedDate}
            <span aria-hidden="true"> · </span>
            {readTime}
          </p>
          <MoreVertical className="size-5 shrink-0 text-brand-muted" aria-hidden />
        </div>
        <h1 className="text-3xl font-bold leading-tight text-brand-dark md:text-4xl lg:text-[2.5rem]">
          {post.title}
        </h1>
      </header>

      {imageUrl ? (
        <div className="mb-8 overflow-hidden rounded-[16px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={post.title}
            width={960}
            height={540}
            loading="eager"
            decoding="async"
          />
        </div>
      ) : (
        <div
          className="mb-8 aspect-[16/9] w-full rounded-[16px]"
          style={{ background: BLOG_PLACEHOLDER_GRADIENT }}
          aria-hidden
        />
      )}

      <BlogContent content={post.content} />

      <BlogFaqSection faqs={post.faqs ?? []} />

      <BlogShareBar url={shareUrl} title={post.title} className="my-8" />

      <BlogDetailBottom
        blogId={post._id}
        slug={post.slug}
        views={post.views}
        likes={post.likes}
        recentPosts={recentPosts}
      />

      <div id={`blog-post-${post.slug}-actions`} className="mt-8">
        <Button asChild variant="secondary">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    </article>
  );
}
