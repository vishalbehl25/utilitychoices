import { getHomeLoanBySlug, normalizeHomeLoanSlug } from '@/data/home-loans';
import homeLoanImages from '@/data/home-loan-images.json';

const images = homeLoanImages as Record<string, string>;

function resolveImagePath(slug: string): string | undefined {
  const normalized = normalizeHomeLoanSlug(slug);
  return (
    images[slug] ??
    images[normalized] ??
    Object.entries(images).find(
      ([k]) => normalizeHomeLoanSlug(k) === normalized,
    )?.[1]
  );
}

export function getHomeLoanImageUrl(slug: string): string | undefined {
  const loan =
    getHomeLoanBySlug(slug) ?? getHomeLoanBySlug(normalizeHomeLoanSlug(slug));
  if (loan?.logo) return loan.logo;
  return resolveImagePath(slug);
}
