export interface BlogComment {
  id: string;
  blogId: string;
  authorName: string;
  text: string;
  createdAt: string;
}

export interface BlogCommentsResponse {
  success: boolean;
  data: BlogComment[];
}

export interface CreateBlogCommentPayload {
  authorName: string;
  text: string;
}
