import { NextResponse } from 'next/server';
import { lookupGeoFromIp } from '@/lib/enquiry/geo-lookup';
import { fetchPublicIpMetadata } from '@/lib/enquiry/public-ip';
import {
  extractClientIp,
  extractUserAgent,
  isPrivateIp,
} from '@/lib/enquiry/request-metadata';

export async function GET(request: Request) {
  const userAgent = extractUserAgent(request);
  const serverIp = extractClientIp(request);

  if (!isPrivateIp(serverIp) && serverIp !== 'Unknown') {
    const geo = await lookupGeoFromIp(serverIp);
    return NextResponse.json({
      ipAddress: serverIp,
      userAgent,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      latitude: geo.latitude,
      longitude: geo.longitude,
    });
  }

  const publicMetadata = await fetchPublicIpMetadata();
  if (publicMetadata) {
    return NextResponse.json({
      ipAddress: publicMetadata.ipAddress,
      userAgent,
      country: publicMetadata.country,
      region: publicMetadata.region,
      city: publicMetadata.city,
      latitude: publicMetadata.latitude,
      longitude: publicMetadata.longitude,
    });
  }

  return NextResponse.json({
    ipAddress: 'Unknown',
    userAgent,
    country: 'Unknown',
    region: 'Unknown',
    city: 'Unknown',
    latitude: 'N/A',
    longitude: 'N/A',
  });
}
