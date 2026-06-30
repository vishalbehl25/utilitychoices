'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { BlogPagination, BlogSummary } from '@/types/blog';
import { sortBlogsByLatest } from '@/lib/blog/format';

const PAGE_SIZE = 10;

interface BlogsApiResponse {
  success: boolean;
  data: BlogSummary[];
  pagination: BlogPagination;
  categories?: string[];
  error?: string;
}

interface UseInfiniteBlogsOptions {
  initialPosts?: BlogSummary[];
  initialPagination?: BlogPagination;
  initialCategories?: string[];
  pageSize?: number;
}

function dedupePosts(posts: BlogSummary[]): BlogSummary[] {
  const seen = new Set<string>();
  return posts.filter((post) => {
    if (seen.has(post._id)) return false;
    seen.add(post._id);
    return true;
  });
}

async function fetchBlogPage(
  offset: number,
  category: string | null,
  pageSize: number,
  signal: AbortSignal,
): Promise<BlogsApiResponse> {
  const params = new URLSearchParams({
    limit: String(pageSize),
    offset: String(offset),
  });
  if (category) params.set('category', category);

  const response = await fetch(`/api/blogs?${params.toString()}`, { signal });
  const payload = (await response.json()) as BlogsApiResponse;

  if (!response.ok || !payload.success) {
    throw new Error(payload.error ?? 'Failed to fetch blogs');
  }

  return payload;
}

export function useInfiniteBlogs({
  initialPosts = [],
  initialPagination = { total: 0, limit: PAGE_SIZE, offset: 0 },
  initialCategories = [],
  pageSize = PAGE_SIZE,
}: UseInfiniteBlogsOptions = {}) {
  const [posts, setPosts] = useState<BlogSummary[]>(initialPosts);
  const [pagination, setPagination] = useState<BlogPagination>(initialPagination);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [category, setCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFetchingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const hasMore = posts.length < pagination.total;

  const loadPage = useCallback(
    async (offset: number, activeCategory: string | null, append: boolean) => {
      if (isFetchingRef.current) return;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      isFetchingRef.current = true;

      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      try {
        const payload = await fetchBlogPage(
          offset,
          activeCategory,
          pageSize,
          controller.signal,
        );

        if (controller.signal.aborted) return;

        setPagination(payload.pagination);
        if (payload.categories?.length) {
          setCategories((prev) => {
            const merged = new Set([...prev, ...payload.categories!]);
            return Array.from(merged).sort((a, b) => a.localeCompare(b));
          });
        }

        setPosts((prev) =>
          append
            ? sortBlogsByLatest(dedupePosts([...prev, ...payload.data]))
            : sortBlogsByLatest(dedupePosts(payload.data)),
        );
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      } finally {
        if (!controller.signal.aborted) {
          isFetchingRef.current = false;
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    },
    [pageSize],
  );

  const loadMore = useCallback(() => {
    if (!hasMore || isFetchingRef.current) return;
    void loadPage(posts.length, category, true);
  }, [category, hasMore, loadPage, posts.length]);

  const retry = useCallback(() => {
    void loadPage(0, category, false);
  }, [category, loadPage]);

  const selectCategory = useCallback(
    (nextCategory: string | null) => {
      setCategory(nextCategory);
      setPosts([]);
      setPagination({ total: 0, limit: pageSize, offset: 0 });
      void loadPage(0, nextCategory, false);
    },
    [loadPage, pageSize],
  );

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  return {
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
  };
}
