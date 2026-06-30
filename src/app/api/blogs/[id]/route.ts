import { NextResponse } from 'next/server';
import { fetchBlogById } from '@/lib/blog/api';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!id?.trim()) {
    return NextResponse.json(
      { success: false, error: 'ID is required' },
      { status: 400 },
    );
  }

  try {
    const post = await fetchBlogById(id);
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 502 },
    );
  }
}
