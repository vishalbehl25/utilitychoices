import { getPersonalLoanBySlug } from '@/data/personal-loans';
import personalLoanImages from '@/data/personal-loan-images.json';

const images = personalLoanImages as Record<string, string>;

export function getPersonalLoanImageUrl(slug: string): string | undefined {
  const normalized = decodeURIComponent(slug);
  const loan = getPersonalLoanBySlug(slug) ?? getPersonalLoanBySlug(normalized);
  if (loan?.logo) return loan.logo;
  return images[slug] ?? images[normalized];
}
