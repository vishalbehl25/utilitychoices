import { NextResponse } from 'next/server';
import { z } from 'zod';
import { fetchBlogs } from '@/lib/blog/api';

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(20).default(10),
  offset: z.coerce.number().int().min(0).default(0),
  category: z.string().optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    limit: searchParams.get('limit') ?? undefined,
    offset: searchParams.get('offset') ?? undefined,
    category: searchParams.get('category') ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Invalid query parameters' },
      { status: 400 },
    );
  }

  try {
    const result = await fetchBlogs(parsed.data);
    return NextResponse.json({
      success: true,
      data: result.posts,
      pagination: result.pagination,
      categories: result.categories,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 502 },
    );
  }
}
