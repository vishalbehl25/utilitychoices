const WORDS_PER_MINUTE = 200;
const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i;

export const BLOG_IMAGE_BASE =
  process.env.NEXT_PUBLIC_BLOG_API_BASE_URL ??
  process.env.BLOG_API_BASE_URL ??
  'https://zfour.zfourhr.in';

export const BLOG_PLACEHOLDER_GRADIENT =
  'linear-gradient(135deg, #1c62af 0%, #101921 100%)';

export const DEFAULT_READ_TIME = '4 min read';

export function resolveBlogImageUrl(
  path: string | undefined | null,
  baseUrl: string,
): string | null {
  if (!path?.trim()) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl.replace(/\/$/, '')}${normalized}`;
}

export function formatBlogDate(
  createdAt: string,
  customDate?: string | null,
): string {
  const raw = customDate || createdAt;
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleDateString('en-AU', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function calculateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

export function truncateText(text: string, maxLength = 160): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength - 1).trim()}…`;
}

export function isHtmlContent(content: string): boolean {
  return HTML_TAG_PATTERN.test(content);
}

export function plainTextToParagraphs(content: string): string[] {
  return content
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

export function extractUniqueCategories(posts: { category: string }[]): string[] {
  const categories = new Set<string>();
  for (const post of posts) {
    const category = post.category?.trim();
    if (category && category !== 'Uncategorized') {
      categories.add(category);
    }
  }
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Rewrites relative /uploads/ asset paths in blog HTML to absolute URLs. */
export function resolveContentAssetUrls(
  html: string,
  baseUrl: string,
): string {
  const base = baseUrl.replace(/\/$/, '');
  return html.replace(
    /(\s(?:src|href)=["'])(\/uploads\/[^"']+)(["'])/gi,
    (_, prefix, path, suffix) => `${prefix}${base}${path}${suffix}`,
  );
}

export function getBlogPublishTime(post: {
  createdAt: string;
  customDate?: string | null;
}): number {
  const raw = post.customDate || post.createdAt;
  const time = new Date(raw).getTime();
  return Number.isNaN(time) ? 0 : time;
}

/** Newest first — uses customDate when set, otherwise createdAt. */
export function sortBlogsByLatest<
  T extends { createdAt: string; customDate?: string | null },
>(posts: T[]): T[] {
  return [...posts].sort(
    (a, b) => getBlogPublishTime(b) - getBlogPublishTime(a),
  );
}
