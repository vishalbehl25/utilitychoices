import type { Metadata } from 'next';
import { SITE_CONFIG } from './navigation';

type PageMeta = {
  title: string;
  description: string;
  path?: string;
};

export function createMetadata({
  title,
  description,
  path = '',
}: PageMeta): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;

  return {
    title: {
      absolute: title,
    },
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      type: 'website',
      locale: 'en_AU',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export const HOME_METADATA = createMetadata({
  title:
    'Explore & Compare Home Loan Deals | Utility Choice - Best Utility Marketplace',
  description: SITE_CONFIG.description,
  path: '/',
});

export const PAGE_METADATA = {
  creditCards: createMetadata({
    title: 'Top 10 credit card Australia | Utility Choice',
    description:
      'Explore and select from 50+ credit cards and find the one that best suits your needs.',
    path: '/credit-cards',
  }),
  homeLoan: createMetadata({
    title: 'Home loan interest rate | Utility Choice',
    description:
      'Get daily updated comparisons of 40+ home loan options, rated on interest rates, fees, offset features, and more.',
    path: '/items',
  }),
  nbn: createMetadata({
    title:
      'Cheapest Internet Plans | Utility Choice NBN Deals & Marketing Insights',
    description:
      'Explore 40+ NBN plans from leading providers and choose the perfect plan for your needs.',
    path: '/nbn',
  }),
  personalLoan: createMetadata({
    title:
      'Personal Loan Calculator | Utility Choice Marketing Consulting Firm',
    description:
      'Compare over 70+ personal loan and find the one that best suits your needs.',
    path: '/personal-loan',
  }),
  solar: createMetadata({
    title:
      'House Solar Panels for Every Home - Compare & Choose Utility Choice',
    description:
      'Thinking about installing a solar system at home? Utility Choice offers a variety of solar panels, inverters, and batteries.',
    path: '/solar-pannel',
  }),
  inverters: createMetadata({
    title: 'Best inverter for home use | Utility Choice',
    description:
      'Utility Choice offers a diverse selection of solar inverters. Explore and compare popular models.',
    path: '/Inverters',
  }),
  blog: createMetadata({
    title: 'Utility Choice Blog | Marketing Insights & Inspiration',
    description:
      'Latest utility comparison insights, tips and guides from Utility Choice.',
    path: '/blog',
  }),
  enquiry: createMetadata({
    title: 'Contact Utility Choice for Unlimited Data Plan Advice – No Fees!',
    description:
      'Connect with our experts for free! Neither we nor Utility Choice experts charge any fees.',
    path: '/enquiry',
  }),
  callContact: createMetadata({
    title: 'Contact Utility Choice for Unlimited Data Plan Advice – No Fees!',
    description:
      'Before connecting us, choose the list of services you want to compare.',
    path: '/call-contact',
  }),
  privacy: createMetadata({
    title:
      'Utility Choice Privacy Policy App Terms & Conditions | Updated May 2023',
    description: 'Utility Choice Privacy Policy, Terms of Use, and Disclaimer.',
    path: '/privacy-policy',
  }),
} as const;
