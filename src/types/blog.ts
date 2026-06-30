export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogSummary {
  _id: string;
  title: string;
  slug: string;
  bannerImage: string;
  bannerIframeUrl?: string;
  status: string;
  author: string;
  category: string;
  views: number;
  likes: number;
  scheduledPublishDate: string | null;
  createdAt: string;
  updatedAt: string;
  customDate?: string | null;
}

export interface BlogDetail extends BlogSummary {
  content: string;
  excerpt: string;
  keywords: string[];
  faqs: BlogFaq[];
  __v?: number;
}

export interface BlogPagination {
  total: number;
  limit: number;
  offset: number;
}

export interface BlogsListResponse {
  success: boolean;
  data: BlogSummary[];
  pagination: BlogPagination;
}

export interface BlogDetailResponse {
  success: boolean;
  data: BlogDetail;
}

export interface FetchBlogsParams {
  limit?: number;
  offset?: number;
  category?: string;
  signal?: AbortSignal;
}

export interface BlogsPageResult {
  posts: BlogSummary[];
  pagination: BlogPagination;
  categories: string[];
}
