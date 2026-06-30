import { NextResponse } from 'next/server';
import { reverseGeocodeCoordinates } from '@/lib/enquiry/reverse-geocode';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (
    !lat ||
    !lng ||
    !Number.isFinite(Number(lat)) ||
    !Number.isFinite(Number(lng))
  ) {
    return NextResponse.json(
      { success: false, message: 'Valid lat and lng are required' },
      { status: 400 },
    );
  }

  const result = await reverseGeocodeCoordinates(Number(lat), Number(lng));
  if (!result) {
    return NextResponse.json(
      { success: false, message: 'No address found for coordinates' },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    formattedAddress: result.formattedAddress ?? '',
    city: result.city,
    region: result.region,
    country: result.country,
    latitude: lat,
    longitude: lng,
  });
}
