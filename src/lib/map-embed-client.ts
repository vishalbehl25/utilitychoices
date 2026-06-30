import {
  buildOfficeMapEmbedUrl,
  buildVisitorMapEmbedUrl,
} from '@/lib/map-embed';

interface MapEmbedApiResponse {
  embedUrl?: string;
}

export async function fetchMapEmbedUrl(input: {
  latitude?: string;
  longitude?: string;
  query?: string;
}): Promise<string> {
  try {
    const params = new URLSearchParams();
    if (input.latitude && input.longitude) {
      params.set('lat', input.latitude);
      params.set('lng', input.longitude);
    } else if (input.query?.trim()) {
      params.set('q', input.query.trim());
    }

    const response = await fetch(`/api/map-embed?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Map embed request failed');
    }

    const data = (await response.json()) as MapEmbedApiResponse;
    if (data.embedUrl) {
      return data.embedUrl;
    }
  } catch {
    // Fall through to client-built URL.
  }

  const visitorUrl = buildVisitorMapEmbedUrl(input);
  return visitorUrl ?? buildOfficeMapEmbedUrl();
}
