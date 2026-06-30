import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { SectionContainer } from '@/components/layout/PageContainer';
import { PersonalLoanDetailView } from '@/components/services/PersonalLoanDetailView';
import {
  getAllPersonalLoanDetails,
  getPersonalLoanDetailBySlug,
} from '@/data/personal-loan-details';
import { createMetadata } from '@/constants/metadata';
import { staticParamsForProduction } from '@/lib/dev-route-config';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return staticParamsForProduction(() =>
    getAllPersonalLoanDetails().map((p) => ({ slug: p.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const loan = getPersonalLoanDetailBySlug(slug);
  if (!loan) return {};
  return createMetadata({
    title: `${loan.name} | Utility Choice`,
    description: loan.summary.slice(0, 160),
    path: `/personal-loan-1/${slug}`,
  });
}

export default async function PersonalLoanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const loan = getPersonalLoanDetailBySlug(slug);
  if (!loan) notFound();

  return (
    <SiteLayout>
      <SectionContainer
        id="personal-loan-detail-section"
        className="bg-brand-off-white py-0 md:py-2"
      >
        <PersonalLoanDetailView loan={loan} />
      </SectionContainer>
    </SiteLayout>
  );
}
