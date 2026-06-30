import type { Metadata } from 'next';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { SectionContainer } from '@/components/layout/PageContainer';
import { ContactForm } from '@/components/forms/ContactForm';
import { ContactMap } from '@/components/forms/ContactMap';
import { PAGE_METADATA } from '@/constants/metadata';

export const metadata: Metadata = PAGE_METADATA.enquiry;

export default function EnquiryPage() {
  return (
    <SiteLayout>
      <SectionContainer id="enquiry-section" className="py-12 pb-8">
        <ContactForm variant="enquiry" />
      </SectionContainer>
      <ContactMap id="enquiry-map" variant="enquiry" className="mt-6 overflow-x-hidden" />
    </SiteLayout>
  );
}
