'use client';

import { Loader2 } from 'lucide-react';
import type { BlogPagination, BlogSummary } from '@/types/blog';
import { BlogCategoryTabs } from '@/components/blog/BlogCategoryTabs';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { BlogSkeleton } from '@/components/blog/BlogSkeleton';
import { EmptyState } from '@/components/blog/EmptyState';
import { ErrorState } from '@/components/blog/ErrorState';
import { InfiniteScrollTrigger } from '@/components/blog/InfiniteScrollTrigger';
import { useInfiniteBlogs } from '@/hooks/useInfiniteBlogs';

interface BlogPageProps {
  initialPosts: BlogSummary[];
  initialPagination: BlogPagination;
  initialCategories: string[];
}

export function BlogPage({
  initialPosts,
  initialPagination,
  initialCategories,
}: BlogPageProps) {
  const {
    posts,
    categories,
    category,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    retry,
    selectCategory,
  } = useInfiniteBlogs({
    initialPosts,
    initialPagination,
    initialCategories,
  });

  const showInitialSkeleton = isLoading && posts.length === 0;
  const showEmpty = !isLoading && !error && posts.length === 0;

  return (
    <div id="blog-page" aria-busy={isLoading || isLoadingMore}>
      <BlogCategoryTabs
        categories={categories}
        activeCategory={category}
        onSelect={selectCategory}
      />

      {error && posts.length === 0 ? (
        <ErrorState onRetry={retry} />
      ) : showInitialSkeleton ? (
        <BlogSkeleton />
      ) : showEmpty ? (
        <EmptyState
          message={
            category
              ? `No posts found in "${category}".`
              : undefined
          }
        />
      ) : (
        <>
          <BlogGrid posts={posts} />

          {isLoadingMore && (
            <div
              className="flex justify-center py-8"
              role="status"
              aria-live="polite"
            >
              <Loader2
                className="size-8 animate-spin text-brand-primary"
                aria-hidden
              />
              <span className="sr-only">Loading more blog posts</span>
            </div>
          )}

          {!hasMore && posts.length > 0 && !isLoadingMore && (
            <p
              className="py-8 text-center text-sm text-brand-muted"
              role="status"
              aria-live="polite"
            >
              No more blogs available.
            </p>
          )}

          <InfiniteScrollTrigger
            enabled={hasMore && !isLoading && !isLoadingMore && !error}
            onIntersect={loadMore}
          />
        </>
      )}

      {error && posts.length > 0 && (
        <div className="pt-4">
          <ErrorState message={error} onRetry={loadMore} />
        </div>
      )}
    </div>
  );
}
