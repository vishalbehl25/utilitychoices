import creditCardImages from '@/data/credit-card-images.json';

const images = creditCardImages as Record<string, string>;

export function getCreditCardImageUrl(slug: string): string | undefined {
  const normalized = decodeURIComponent(slug);
  return images[slug] ?? images[normalized];
}
