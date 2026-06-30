import type { Metadata } from 'next';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { SectionContainer } from '@/components/layout/PageContainer';
import { BlogPage } from '@/components/blog/BlogPage';
import { fetchBlogs } from '@/lib/blog/api';
import { PAGE_METADATA } from '@/constants/metadata';
import type { BlogSummary } from '@/types/blog';

export const metadata: Metadata = PAGE_METADATA.blog;

export default async function BlogListingPage() {
  let initialPosts: BlogSummary[] = [];
  let initialPagination = { total: 0, limit: 10, offset: 0 };
  let initialCategories: string[] = [];

  try {
    const result = await fetchBlogs({ limit: 10, offset: 0 });
    initialPosts = result.posts;
    initialPagination = result.pagination;
    initialCategories = result.categories;
  } catch {
    // Client hook handles retry if SSR fetch fails
  }

  return (
    <SiteLayout>
      <SectionContainer id="blog-section">
        <BlogPage
          initialPosts={initialPosts}
          initialPagination={initialPagination}
          initialCategories={initialCategories}
        />
      </SectionContainer>
    </SiteLayout>
  );
}
