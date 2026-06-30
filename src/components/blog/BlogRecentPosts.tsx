import Link from 'next/link';
import type { BlogSummary } from '@/types/blog';
import {
  BLOG_IMAGE_BASE,
  BLOG_PLACEHOLDER_GRADIENT,
  resolveBlogImageUrl,
} from '@/lib/blog/format';

interface BlogRecentPostsProps {
  posts: BlogSummary[];
}

export function BlogRecentPosts({ posts }: BlogRecentPostsProps) {
  if (!posts.length) return null;

  return (
    <section
      id="blog-recent-posts"
      className="mt-12"
      aria-labelledby="blog-recent-posts-heading"
    >
      <h2
        id="blog-recent-posts-heading"
        className="mb-6 text-2xl font-bold text-brand-dark md:text-3xl"
      >
        Recent Posts
      </h2>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const imageUrl = resolveBlogImageUrl(post.bannerImage, BLOG_IMAGE_BASE);
          return (
            <li key={post._id}>
              <Link
                href={`/post/${post._id}`}
                className="group block overflow-hidden rounded-[12px] border border-brand-border-light bg-white transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt={post.title}
                      width={400}
                      height={250}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="size-full"
                      style={{ background: BLOG_PLACEHOLDER_GRADIENT }}
                      aria-hidden
                    />
                  )}
                </div>
                <p className="line-clamp-2 p-4 text-sm font-bold text-brand-dark group-hover:text-brand-primary">
                  {post.title}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
