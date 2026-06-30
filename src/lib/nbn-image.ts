import { NBN_PROVIDER_LOGOS } from '@/data/nbn-providers';

export function getNBNProviderLogo(company: string): string | undefined {
  return NBN_PROVIDER_LOGOS[company];
}
