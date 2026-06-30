import { resolveSubmissionTimeZone } from '@/lib/enquiry/format-submission-datetime';
import { lookupGeoFromIp } from '@/lib/enquiry/geo-lookup';
import { parseUserAgent } from '@/lib/enquiry/parse-user-agent';
import {
  fetchPublicIpAddress,
  sanitizeIpAddress,
} from '@/lib/enquiry/public-ip';
import {
  enrichGeoData,
  reverseGeocodeCoordinates,
} from '@/lib/enquiry/reverse-geocode';
import {
  extractRequestMetadata,
  isPrivateIp,
} from '@/lib/enquiry/request-metadata';
import type {
  ClientSubmissionMetadata,
  EnquiryGeoData,
  LocationSource,
  ResolvedEnquiryMetadata,
} from '@/lib/enquiry/types';

const EMPTY_GEO: EnquiryGeoData = {
  country: 'Unknown',
  region: 'Unknown',
  city: 'Unknown',
  latitude: 'N/A',
  longitude: 'N/A',
};

function isValidCoordinate(value?: string): boolean {
  if (!value || value === 'N/A') return false;
  return Number.isFinite(Number(value));
}

function hasValidCoordinates(client?: ClientSubmissionMetadata | null): boolean {
  return (
    isValidCoordinate(client?.latitude) && isValidCoordinate(client?.longitude)
  );
}

async function resolvePublicIp(
  serverIp: string,
  clientIp?: string,
): Promise<string> {
  const sanitizedClientIp = sanitizeIpAddress(clientIp);
  if (sanitizedClientIp) {
    return sanitizedClientIp;
  }

  if (!isPrivateIp(serverIp) && serverIp !== 'Unknown') {
    return serverIp;
  }

  const publicIp = await fetchPublicIpAddress();
  if (publicIp) {
    return publicIp;
  }

  return 'Unknown';
}

function pickUserAgent(serverUa: string, clientUa?: string): string {
  if (serverUa !== 'Unknown') {
    return serverUa;
  }
  return clientUa?.trim() || 'Unknown';
}

function geoFromClient(client: ClientSubmissionMetadata): EnquiryGeoData {
  return {
    country: client.country?.trim() || 'Unknown',
    region: client.region?.trim() || 'Unknown',
    city: client.city?.trim() || 'Unknown',
    latitude: client.latitude?.trim() || 'N/A',
    longitude: client.longitude?.trim() || 'N/A',
  };
}

async function enrichGeoFromCoordinates(
  geo: EnquiryGeoData,
  detectedAddress?: string,
  preferCoordinates = true,
): Promise<{ geo: EnquiryGeoData; detectedAddress?: string }> {
  if (!isValidCoordinate(geo.latitude) || !isValidCoordinate(geo.longitude)) {
    return { geo, detectedAddress };
  }

  const reverse = await reverseGeocodeCoordinates(
    Number(geo.latitude),
    Number(geo.longitude),
  );

  if (!reverse) {
    return { geo, detectedAddress };
  }

  return {
    geo: enrichGeoData(geo, reverse, preferCoordinates),
    detectedAddress: reverse.formattedAddress || detectedAddress,
  };
}

function clientIpGeoIsUsable(client?: ClientSubmissionMetadata | null): boolean {
  return Boolean(
    client?.country?.trim() && client.country.trim() !== 'Unknown',
  );
}

function resolveAgentDetails(
  userAgent: string,
  client?: ClientSubmissionMetadata | null,
) {
  if (client?.browser && client?.operatingSystem) {
    return {
      browser: client.browser,
      operatingSystem: client.operatingSystem,
    };
  }

  return parseUserAgent(userAgent);
}

function resolveLocationSource(
  client?: ClientSubmissionMetadata | null,
): LocationSource {
  if (client?.locationSource === 'gps' || hasValidCoordinates(client)) {
    return 'gps';
  }
  return 'ip';
}

function resolveSubmissionTimeZoneForRecord(
  client?: ClientSubmissionMetadata | null,
  country?: string,
): string {
  return resolveSubmissionTimeZone({
    timeZone: client?.timeZone,
    country: country ?? client?.country,
  });
}

export async function resolveEnquiryMetadata(
  request: Request,
  client?: ClientSubmissionMetadata | null,
): Promise<ResolvedEnquiryMetadata> {
  const server = extractRequestMetadata(request);
  const ipAddress = await resolvePublicIp(
    server.ipAddress,
    client?.ipAddress,
  );
  const userAgent = pickUserAgent(server.userAgent, client?.userAgent);
  const agent = resolveAgentDetails(userAgent, client);

  if (client && hasValidCoordinates(client)) {
    const enriched = await enrichGeoFromCoordinates(
      geoFromClient(client),
      client.detectedAddress,
      true,
    );

    return {
      locationSource: resolveLocationSource(client),
      ipAddress,
      userAgent,
      browser: agent.browser,
      operatingSystem: agent.operatingSystem,
      detectedAddress: enriched.detectedAddress,
      submissionTimeZone: resolveSubmissionTimeZoneForRecord(
        client,
        enriched.geo.country,
      ),
      ...enriched.geo,
    };
  }

  if (client && clientIpGeoIsUsable(client)) {
    const enriched = await enrichGeoFromCoordinates(
      geoFromClient(client),
      client.detectedAddress,
      false,
    );

    return {
      locationSource: client.locationSource ?? 'ip',
      ipAddress,
      userAgent,
      browser: agent.browser,
      operatingSystem: agent.operatingSystem,
      detectedAddress: enriched.detectedAddress,
      submissionTimeZone: resolveSubmissionTimeZoneForRecord(
        client,
        enriched.geo.country,
      ),
      ...enriched.geo,
    };
  }

  if (!isPrivateIp(ipAddress) && ipAddress !== 'Unknown') {
    const geo = await lookupGeoFromIp(ipAddress);
    if (geo.country !== 'Unknown') {
      return {
        locationSource: 'ip',
        ipAddress,
        userAgent,
        browser: agent.browser,
        operatingSystem: agent.operatingSystem,
        submissionTimeZone: resolveSubmissionTimeZoneForRecord(
          client,
          geo.country,
        ),
        ...geo,
      };
    }
  }

  return {
    locationSource: 'ip',
    ipAddress,
    userAgent,
    browser: agent.browser,
    operatingSystem: agent.operatingSystem,
    submissionTimeZone: resolveSubmissionTimeZoneForRecord(client),
    ...EMPTY_GEO,
  };
}
