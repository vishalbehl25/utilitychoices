import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { BlogComment, CreateBlogCommentPayload } from '@/types/blog-comment';

function getStorageDir(): string {
  return process.env.BLOG_COMMENTS_STORAGE_DIR?.trim() || 'data/blog-comments';
}

function getCommentsFilePath(blogId: string): string {
  const safeId = blogId.replace(/[^a-zA-Z0-9_-]/g, '');
  return path.join(path.resolve(process.cwd(), getStorageDir()), `${safeId}.json`);
}

async function readComments(blogId: string): Promise<BlogComment[]> {
  const filePath = getCommentsFilePath(blogId);

  try {
    const raw = await readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw) as BlogComment[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export async function listBlogComments(blogId: string): Promise<BlogComment[]> {
  const comments = await readComments(blogId);
  return comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function addBlogComment(
  blogId: string,
  payload: CreateBlogCommentPayload,
): Promise<BlogComment> {
  const storageDir = path.resolve(process.cwd(), getStorageDir());
  await mkdir(storageDir, { recursive: true });

  const comments = await readComments(blogId);
  const comment: BlogComment = {
    id: randomUUID(),
    blogId,
    authorName: payload.authorName.trim(),
    text: payload.text.trim(),
    createdAt: new Date().toISOString(),
  };

  comments.push(comment);
  await writeFile(
    getCommentsFilePath(blogId),
    JSON.stringify(comments, null, 2),
    'utf8',
  );

  return comment;
}
