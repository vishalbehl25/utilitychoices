import type {
  BlogDetail,
  BlogDetailResponse,
  BlogsListResponse,
  BlogsPageResult,
  FetchBlogsParams,
} from '@/types/blog';
import { extractUniqueCategories, sortBlogsByLatest } from '@/lib/blog/format';

export const BLOG_API_BASE =
  process.env.BLOG_API_BASE_URL ?? 'https://zfour.zfourhr.in';

export const BLOG_LIST_PATH = '/api/utility_choice/blogs';
export const DEFAULT_BLOG_PAGE_SIZE = 10;

export class BlogApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'BlogApiError';
  }
}

function buildListUrl(params: FetchBlogsParams): string {
  const url = new URL(`${BLOG_API_BASE}${BLOG_LIST_PATH}`);
  url.searchParams.set('limit', String(params.limit ?? DEFAULT_BLOG_PAGE_SIZE));
  url.searchParams.set('offset', String(params.offset ?? 0));
  url.searchParams.set('sort', 'createdAt');
  url.searchParams.set('order', 'desc');
  if (params.category) {
    url.searchParams.set('category', params.category);
  }
  return url.toString();
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new BlogApiError(
      `Blog API request failed (${response.status})`,
      response.status,
    );
  }

  const payload = (await response.json()) as T & { success?: boolean };
  if ('success' in payload && payload.success === false) {
    throw new BlogApiError('Blog API returned unsuccessful response', 502);
  }

  return payload;
}

export async function fetchBlogs(
  params: FetchBlogsParams = {},
): Promise<BlogsPageResult> {
  const response = await fetch(buildListUrl(params), {
    signal: params.signal,
    next: { revalidate: 300 },
  });

  const payload = await parseJsonResponse<BlogsListResponse>(response);

  return {
    posts: sortBlogsByLatest(payload.data ?? []),
    pagination: payload.pagination,
    categories: extractUniqueCategories(payload.data ?? []),
  };
}

export async function fetchBlogById(id: string): Promise<BlogDetail | null> {
  const response = await fetch(
    `${BLOG_API_BASE}${BLOG_LIST_PATH}/${encodeURIComponent(id)}`,
    { next: { revalidate: 300 } },
  );

  if (response.status === 404) return null;

  const payload = await parseJsonResponse<BlogDetailResponse>(response);
  return payload.data ?? null;
}

export async function fetchAllBlogIds(): Promise<string[]> {
  try {
    const { posts, pagination } = await fetchBlogs({
      limit: 100,
      offset: 0,
    });

    if (pagination.total <= posts.length) {
      return posts.map((post) => post._id);
    }

    const remaining = await fetchBlogs({
      limit: pagination.total - posts.length,
      offset: posts.length,
    });

    return [...posts, ...remaining.posts].map((post) => post._id);
  } catch {
    return [];
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const { posts } = await fetchBlogs({ limit: 100, offset: 0 });
    return extractUniqueCategories(posts);
  } catch {
    return [];
  }
}
