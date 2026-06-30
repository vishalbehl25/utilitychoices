import type { Metadata } from 'next';
import { ThankYouPanel } from '@/components/forms/ThankYouPanel';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { SectionContainer } from '@/components/layout/PageContainer';
import { createMetadata } from '@/constants/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Thanks for submitting | Utility Choice',
  description: 'Thank you for contacting Utility Choice.',
  path: '/copy-of-thanks-for-submitting',
});

export default function ThankYouPage() {
  return (
    <SiteLayout>
      <SectionContainer id="thank-you-section" className="py-16 md:py-20">
        <ThankYouPanel />
      </SectionContainer>
    </SiteLayout>
  );
}
