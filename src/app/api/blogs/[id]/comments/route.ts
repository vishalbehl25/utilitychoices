import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { addBlogComment, listBlogComments } from '@/lib/blog/comments-store';
import { blogCommentSchema } from '@/lib/validations/blog-comment';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!id?.trim()) {
    return NextResponse.json(
      { success: false, error: 'Blog ID is required' },
      { status: 400 },
    );
  }

  try {
    const comments = await listBlogComments(id);
    return NextResponse.json({ success: true, data: comments });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to load comments' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!id?.trim()) {
    return NextResponse.json(
      { success: false, error: 'Blog ID is required' },
      { status: 400 },
    );
  }

  try {
    const body = await request.json();
    const data = blogCommentSchema.parse(body);
    const comment = await addBlogComment(id, data);

    return NextResponse.json({ success: true, data: comment }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: error.issues[0]?.message ?? 'Invalid comment',
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to save comment' },
      { status: 500 },
    );
  }
}
