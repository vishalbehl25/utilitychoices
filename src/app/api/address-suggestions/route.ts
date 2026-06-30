import { NextResponse } from 'next/server';
import {
  AUSTRALIA_BBOX,
  extractAustralianPostcode,
  formatPhotonFeature,
  type AddressSuggestion,
} from '@/lib/australian-address';

function withValidPostcode(suggestions: AddressSuggestion[]): AddressSuggestion[] {
  return suggestions.filter((suggestion) => suggestion.postcode !== null);
}

function buildPostcodeSuggestion(query: string): AddressSuggestion | null {
  const postcode = extractAustralianPostcode(query);
  if (!postcode || query.trim() !== postcode) {
    return null;
  }

  return {
    id: `postcode-${postcode}`,
    label: `${postcode}, Australia`,
    postcode,
  };
}

async function fetchGoogleSuggestions(
  query: string
): Promise<AddressSuggestion[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return [];

  const res = await fetch(
    'https://places.googleapis.com/v1/places:autocomplete',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
      body: JSON.stringify({
        input: query,
        includedRegionCodes: ['au'],
        languageCode: 'en',
      }),
    }
  );

  if (!res.ok) return [];

  const data = (await res.json()) as {
    suggestions?: Array<{
      placePrediction?: {
        placeId?: string;
        text?: { text?: string };
      };
    }>;
  };

  return (data.suggestions ?? [])
    .map((item) => {
      const label = item.placePrediction?.text?.text?.trim();
      const id = item.placePrediction?.placeId;
      if (!label || !id) return null;
      const postcodeMatch = label.match(/\b([0-9]{4})\b/);
      return {
        id,
        label,
        postcode: postcodeMatch?.[1] ?? null,
      } satisfies AddressSuggestion;
    })
    .filter((s): s is AddressSuggestion => s !== null);
}

async function fetchPhotonSuggestions(
  query: string
): Promise<AddressSuggestion[]> {
  const url = new URL('https://photon.komoot.io/api/');
  url.searchParams.set('q', query);
  url.searchParams.set('limit', '8');
  url.searchParams.set('lang', 'en');
  url.searchParams.set('bbox', AUSTRALIA_BBOX);

  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
    next: { revalidate: 86400 },
  });

  if (!res.ok) return [];

  const data = (await res.json()) as {
    features?: Array<{ properties?: Record<string, unknown> }>;
  };

  const seen = new Set<string>();
  const results: AddressSuggestion[] = [];

  for (const feature of data.features ?? []) {
    if (!feature.properties) continue;
    const suggestion = formatPhotonFeature(feature.properties);
    if (seen.has(suggestion.label)) continue;
    seen.add(suggestion.label);
    results.push(suggestion);
  }

  return results;
}

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q')?.trim() ?? '';

  if (query.length < 1) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const postcodeSuggestion = buildPostcodeSuggestion(query);
    let suggestions = await fetchGoogleSuggestions(query);
    if (suggestions.length === 0) {
      suggestions = await fetchPhotonSuggestions(query);
    }

    suggestions = withValidPostcode(suggestions);

    if (postcodeSuggestion) {
      suggestions = [
        postcodeSuggestion,
        ...suggestions.filter((item) => item.postcode !== postcodeSuggestion.postcode),
      ];
    }

    return NextResponse.json(
      { suggestions },
      {
        headers: {
          'Cache-Control': 'private, max-age=60',
        },
      }
    );
  } catch {
    return NextResponse.json({ suggestions: [] }, { status: 200 });
  }
}
