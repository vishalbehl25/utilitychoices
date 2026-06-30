import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { SectionContainer } from '@/components/layout/PageContainer';
import { LegalDocumentTabs } from '@/components/legal/LegalDocumentTabs';
import { PAGE_METADATA } from '@/constants/metadata';

export const metadata: Metadata = PAGE_METADATA.privacy;

export default function PrivacyPolicyPage() {
  return (
    <SiteLayout>
      <SectionContainer id="privacy-policy-section" className="py-12">
        <div className="mx-auto w-full max-w-[960px]">
          <Suspense fallback={null}>
            <LegalDocumentTabs defaultTab="privacy" />
          </Suspense>
        </div>
      </SectionContainer>
    </SiteLayout>
  );
}
