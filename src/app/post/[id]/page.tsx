import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { SectionContainer } from '@/components/layout/PageContainer';
import { BlogDetailView } from '@/components/blog/BlogDetailView';
import { fetchBlogById, fetchBlogs } from '@/lib/blog/api';
import {
  BLOG_IMAGE_BASE,
  resolveBlogImageUrl,
  sortBlogsByLatest,
  stripHtml,
  truncateText,
} from '@/lib/blog/format';
import { createMetadata } from '@/constants/metadata';
import { SITE_CONFIG } from '@/constants/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchBlogById(id);

  if (!post) {
    return createMetadata({
      title: 'Post Not Found | Utility Choice Blog',
      description: 'This blog post is not available.',
      path: `/post/${id}`,
    });
  }

  const description =
    post.excerpt?.trim() ||
    truncateText(stripHtml(post.content || post.title), 160);
  const imageUrl = resolveBlogImageUrl(post.bannerImage, BLOG_IMAGE_BASE);

  return {
    ...createMetadata({
      title: `${post.title} | Utility Choice Blog`,
      description,
      path: `/post/${post._id}`,
    }),
    openGraph: {
      title: post.title,
      description,
      url: `${SITE_CONFIG.url}/post/${post._id}`,
      siteName: SITE_CONFIG.name,
      type: 'article',
      locale: 'en_AU',
      ...(imageUrl ? { images: [{ url: imageUrl, alt: post.title }] } : {}),
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title: post.title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await fetchBlogById(id);
  if (!post) notFound();

  const { posts: recentPosts } = await fetchBlogs({ limit: 4, offset: 0 });
  const filteredRecent = sortBlogsByLatest(
    recentPosts.filter((item) => item._id !== post._id),
  ).slice(0, 3);

  const imageUrl = resolveBlogImageUrl(post.bannerImage, BLOG_IMAGE_BASE);
  const description =
    post.excerpt?.trim() ||
    truncateText(stripHtml(post.content || post.title), 160);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description,
    datePublished: post.customDate || post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: post.author || SITE_CONFIG.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: `${SITE_CONFIG.url}/post/${post._id}`,
    ...(imageUrl ? { image: [imageUrl] } : {}),
  };

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SectionContainer id="blog-post-section">
        <BlogDetailView post={post} recentPosts={filteredRecent} />
      </SectionContainer>
    </SiteLayout>
  );
}
