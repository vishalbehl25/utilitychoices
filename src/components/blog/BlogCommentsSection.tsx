'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { BlogComment } from '@/types/blog-comment';

interface BlogCommentsSectionProps {
  blogId: string;
  slug: string;
  onCountChange?: (count: number) => void;
}

function formatCommentDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleDateString('en-AU', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function BlogCommentsSection({
  blogId,
  slug,
  onCountChange,
}: BlogCommentsSectionProps) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const textareaId = `blog-comment-${slug}`;
  const nameInputId = `blog-comment-name-${slug}`;
  const noteId = `blog-comment-${slug}-note`;

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/blogs/${encodeURIComponent(blogId)}/comments`);
      const payload = (await response.json()) as {
        success: boolean;
        data?: BlogComment[];
        error?: string;
      };

      if (!response.ok || !payload.success) {
        throw new Error(payload.error ?? 'Failed to load comments');
      }

      const nextComments = payload.data ?? [];
      setComments(nextComments);
      onCountChange?.(nextComments.length);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : 'Failed to load comments',
      );
    } finally {
      setIsLoading(false);
    }
  }, [blogId, onCountChange]);

  useEffect(() => {
    void loadComments();
  }, [loadComments]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/blogs/${encodeURIComponent(blogId)}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorName, text }),
      });

      const payload = (await response.json()) as {
        success: boolean;
        data?: BlogComment;
        error?: string;
      };

      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.error ?? 'Failed to post comment');
      }

      setComments((current) => {
        const next = [payload.data!, ...current];
        onCountChange?.(next.length);
        return next;
      });
      setAuthorName('');
      setText('');
      setSuccessMessage('Your comment was posted.');
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : 'Failed to post comment',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id={`blog-post-${slug}-comments`}
      className="mt-10"
      aria-labelledby={`blog-post-${slug}-comments-heading`}
    >
      <h2
        id={`blog-post-${slug}-comments-heading`}
        className="mb-4 text-xl font-bold text-brand-dark"
      >
        Comments{comments.length > 0 ? ` (${comments.length})` : ''}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor={nameInputId} className="mb-1.5 block text-sm font-medium text-brand-dark">
            Name
          </label>
          <Input
            id={nameInputId}
            value={authorName}
            onChange={(event) => setAuthorName(event.target.value)}
            placeholder="Your name"
            maxLength={80}
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-brand-dark">
            Comment
          </label>
          <textarea
            id={textareaId}
            rows={4}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Write a comment..."
            maxLength={2000}
            disabled={isSubmitting}
            required
            className="w-full resize-none rounded-[10px] border border-brand-border bg-white px-4 py-3 text-sm text-brand-dark placeholder:text-brand-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            aria-describedby={noteId}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={isSubmitting || isLoading}>
            {isSubmitting ? 'Posting…' : 'Post comment'}
          </Button>
          {successMessage ? (
            <p className="text-sm text-brand-primary" role="status">
              {successMessage}
            </p>
          ) : null}
        </div>

        {error ? (
          <p id={noteId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : (
          <p id={noteId} className="text-xs text-brand-muted">
            Comments are visible to everyone on this page.
          </p>
        )}
      </form>

      <div className="mt-8 space-y-4">
        {isLoading ? (
          <p className="text-sm text-brand-muted">Loading comments…</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-brand-muted">No comments yet. Be the first to comment.</p>
        ) : (
          <ul role="list" className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="rounded-[10px] border border-brand-border-light bg-white px-4 py-3"
              >
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-brand-dark">{comment.authorName}</p>
                  <time
                    dateTime={comment.createdAt}
                    className="text-xs text-brand-muted"
                  >
                    {formatCommentDate(comment.createdAt)}
                  </time>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-brand-dark/85">
                  {comment.text}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
