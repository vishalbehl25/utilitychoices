import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { SectionContainer } from '@/components/layout/PageContainer';
import { HomeLoanDetailView } from '@/components/services/HomeLoanDetailView';
import { getHomeLoanDetailBySlug } from '@/data/home-loan-details';
import { getUniqueHomeLoanSlugs } from '@/data/home-loans';
import { createMetadata } from '@/constants/metadata';
import { staticParamsForProduction } from '@/lib/dev-route-config';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return staticParamsForProduction(() =>
    getUniqueHomeLoanSlugs().map((slug) => ({ slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const loan = getHomeLoanDetailBySlug(slug);
  if (!loan) return {};
  const description = `Compare ${loan.name} from ${loan.lender} with an advertised rate of ${loan.interestRate} and loan fee ${loan.loanFee}.`;
  return createMetadata({
    title: `${loan.name} | Utility Choice`,
    description: description.slice(0, 160),
    path: `/items/${slug}`,
  });
}

export default async function HomeLoanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const loan = getHomeLoanDetailBySlug(slug);
  if (!loan) notFound();

  return (
    <SiteLayout>
      <SectionContainer
        id="home-loan-detail-section"
        className="bg-brand-off-white py-0 md:py-2"
      >
        <HomeLoanDetailView loan={loan} />
      </SectionContainer>
    </SiteLayout>
  );
}
