import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/constants/navigation';
import { creditCardDetails } from '@/data/credit-card-details';
import { getUniqueHomeLoanSlugs } from '@/data/home-loans';
import { nbnPlans } from '@/data/nbn-plans';
import { personalLoans } from '@/data/personal-loans';
import { fetchAllBlogIds } from '@/lib/blog/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_CONFIG.url;

  const staticPages = [
    '',
    '/credit-cards',
    '/personal-loan',
    '/nbn',
    '/items',
    '/solar-pannel',
    '/Inverters',
    '/blog',
    '/enquiry',
    '/call-contact',
    '/privacy-policy',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  const creditCardEntries = creditCardDetails.map((c) => ({
    url: `${base}/credit-cards/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const homeLoanEntries = getUniqueHomeLoanSlugs().map((slug) => ({
    url: `${base}/items/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const nbnEntries = nbnPlans.map((n) => ({
    url: `${base}/nbn/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const personalLoanEntries = personalLoans.map((p) => ({
    url: `${base}/personal-loan-1/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const blogIds = await fetchAllBlogIds();
  const blogEntries = blogIds.map((id) => ({
    url: `${base}/post/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...creditCardEntries,
    ...homeLoanEntries,
    ...nbnEntries,
    ...personalLoanEntries,
    ...blogEntries,
  ];
}
