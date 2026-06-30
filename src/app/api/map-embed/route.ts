import { NextResponse } from 'next/server';
import { resolveMapEmbedUrl } from '@/lib/map-embed';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat')?.trim();
  const lng = searchParams.get('lng')?.trim();
  const query = searchParams.get('q')?.trim();

  const embedUrl = resolveMapEmbedUrl({
    latitude: lat,
    longitude: lng,
    query,
  });

  return NextResponse.json(
    { embedUrl },
    {
      headers: { 'Cache-Control': 'private, no-store' },
    },
  );
}
