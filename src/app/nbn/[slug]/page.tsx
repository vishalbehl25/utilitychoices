import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { NBNDetailView } from '@/components/services/NBNDetailView';
import {
  getAllNBNPlanDetails,
  getNBNPlanDetailBySlug,
} from '@/data/nbn-plan-details';
import { createMetadata } from '@/constants/metadata';
import { staticParamsForProduction } from '@/lib/dev-route-config';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return staticParamsForProduction(() =>
    getAllNBNPlanDetails().map((plan) => ({ slug: plan.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const plan = getNBNPlanDetailBySlug(slug);
  if (!plan) return {};
  return createMetadata({
    title: `${plan.name} | Utility Choice`,
    description: `${plan.name} — ${plan.downloadSpeed ?? plan.nbnTier} NBN plan details, costs and bundles.`,
    path: `/nbn/${slug}`,
  });
}

export default async function NBNDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const plan = getNBNPlanDetailBySlug(slug);
  if (!plan) notFound();

  return (
    <SiteLayout>
      <div id="nbn-detail-page" className="bg-brand-off-white">
        <NBNDetailView plan={plan} />
      </div>
    </SiteLayout>
  );
}
