import type { Metadata } from 'next';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { SectionContainer } from '@/components/layout/PageContainer';
import { ContactForm } from '@/components/forms/ContactForm';
import { ContactMap } from '@/components/forms/ContactMap';
import { PAGE_METADATA } from '@/constants/metadata';

export const metadata: Metadata = PAGE_METADATA.callContact;

export default function CallContactPage() {
  return (
    <SiteLayout>
      <SectionContainer id="call-contact-section" className="py-12">
        <ContactForm variant="call-contact" />
      </SectionContainer>
      <ContactMap id="call-contact-map" />
    </SiteLayout>
  );
}
