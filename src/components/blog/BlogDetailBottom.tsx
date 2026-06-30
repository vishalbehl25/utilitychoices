'use client';

import { useState } from 'react';
import { Eye, Heart, MessageCircle } from 'lucide-react';
import type { BlogSummary } from '@/types/blog';
import { BlogCommentsSection } from '@/components/blog/BlogCommentsSection';
import { BlogRecentPosts } from '@/components/blog/BlogRecentPosts';

interface BlogDetailBottomProps {
  blogId: string;
  slug: string;
  views: number;
  likes: number;
  recentPosts: BlogSummary[];
}

export function BlogDetailBottom({
  blogId,
  slug,
  views,
  likes,
  recentPosts,
}: BlogDetailBottomProps) {
  const [commentCount, setCommentCount] = useState(0);

  return (
    <>
      <div
        id={`blog-post-${slug}-stats`}
        className="flex items-center justify-between border-t border-brand-border-light py-4 text-sm text-brand-muted"
      >
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <Eye className="size-4" aria-hidden />
            {views}
            <span className="sr-only">views</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessageCircle className="size-4" aria-hidden />
            {commentCount}
            <span className="sr-only">comments</span>
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-brand-accent">
          <Heart className="size-4" aria-hidden />
          {likes}
          <span className="sr-only">likes</span>
        </span>
      </div>

      <BlogRecentPosts posts={recentPosts} />

      <BlogCommentsSection
        blogId={blogId}
        slug={slug}
        onCountChange={setCommentCount}
      />
    </>
  );
}
