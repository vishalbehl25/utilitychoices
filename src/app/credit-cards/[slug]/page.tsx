import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { SectionContainer } from '@/components/layout/PageContainer';
import { CreditCardDetailView } from '@/components/services/CreditCardDetailView';
import {
  creditCardDetails,
  getCreditCardDetailBySlug,
} from '@/data/credit-card-details';
import { createMetadata } from '@/constants/metadata';
import { staticParamsForProduction } from '@/lib/dev-route-config';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return staticParamsForProduction(() =>
    creditCardDetails.map((c) => ({ slug: c.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = getCreditCardDetailBySlug(slug);
  if (!card) return {};
  return createMetadata({
    title: `${card.name} | Utility Choice`,
    description: card.summary.slice(0, 160),
    path: `/credit-cards/${card.slug}`,
  });
}

export default async function CreditCardDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const card = getCreditCardDetailBySlug(slug);
  if (!card) notFound();

  return (
    <SiteLayout>
      <SectionContainer
        id="credit-card-detail-section"
        className="bg-brand-off-white py-0 md:py-2"
      >
        <CreditCardDetailView card={card} />
      </SectionContainer>
    </SiteLayout>
  );
}
