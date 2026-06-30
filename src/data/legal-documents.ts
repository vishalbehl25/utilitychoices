export type LegalTabId = 'privacy' | 'terms' | 'disclaimer';

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  contact?: string[];
}

export interface LegalDocument {
  id: LegalTabId;
  label: string;
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
  contact?: string[];
}

export const LEGAL_TABS: LegalDocument[] = [
  {
    id: 'privacy',
    label: 'Privacy Policy',
    title: 'Privacy Policy',
    lastUpdated: '21.05.2023',
    intro: [
      'Utility Choice ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. By accessing or using our website, you consent to the practices described in this Privacy Policy.',
    ],
    sections: [
      {
        heading: 'What We Do',
        paragraphs: [
          'Utility Choice operates as an independent lead generation consultancy for Credit Cards, Loans, solar, NBN, and insurance services. We generate leads through an online platform, facilitating connections between consumers, utility broker and service provider of Credit Cards, Loans, solar, NBN, and insurance services to help consumer explore and compare better deals for utility services. Our services are designed to provide impartial and transparent advice enabling consumers to make informed decisions based on their specific needs. Utility Choice does not own, generate, or distribute these services but serves as an intermediary, allowing consumers to access offerings from various utility brokers and service provider to optimize their expenditures. This service is provided without bias and solely for the convenience and benefit of the consumer.',
        ],
      },
      {
        heading: '1. Information We Collect',
        paragraphs: [
          'We may collect and process the following information about you:',
        ],
        bullets: [
          'Personal Information: When you fill out a form on our website, we may collect your name, phone number, and full address.',
          'Product Preferences: Information about the products you are interested in, such as Credit Cards, Loans, solar, NBN, and insurance.',
          'Usage Data: We may collect information about how you use our website, including your IP address, browser type, and pages visited.',
        ],
      },
      {
        heading: '2. How We Use Your Information',
        paragraphs: ['We use the information we collect to:'],
        bullets: [
          'Provide and Improve Our Services: To explore the multiple products and provide better deals at better price from other service provider companies.',
          'Communicate with You: To contact you via email or other communication methods for further processes after you fill out a form on our website.',
          'Marketing: To send you promotional materials and other information that may be of interest to you, subject to applicable laws and your preferences.',
          'Analytics: To analyze usage patterns and improve our website and services.',
        ],
      },
      {
        heading: '3. Disclosure of Your Information',
        paragraphs: [
          'We may share your information with third parties in the following circumstances:',
        ],
        bullets: [
          'Service Providers: We may share your information with the utility broker at service providers who perform services on our behalf, such as call centers and marketing agencies.',
          'Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities.',
          'Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.',
        ],
      },
      {
        heading: '4. Data Security',
        paragraphs: [
          'We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.',
        ],
      },
      {
        heading: '5. Your Data Protection Rights',
        paragraphs: [
          'Depending on your location, you may have the following rights regarding your personal information:',
        ],
        bullets: [
          'Access: You have the right to request access to your personal information.',
          'Rectification: You have the right to request the correction of inaccurate or incomplete information.',
          'Erasure: You have the right to request the deletion of your personal information.',
          'Objection: You have the right to object to the processing of your personal information under certain circumstances.',
          'Restriction: You have the right to request the restriction of processing your personal information.',
          'Data Portability: You have the right to request the transfer of your personal information to another organization or directly to you.',
        ],
      },
      {
        heading: '6. Third-Party Links',
        paragraphs: [
          'Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of these third-party websites.',
        ],
      },
      {
        heading: '7. Changes to This Privacy Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any updates.',
        ],
      },
      {
        heading: '8. Contact Us',
        paragraphs: [
          'If you have any questions about this Privacy Policy, please contact us at:',
        ],
        contact: ['Utility Choice', 'help@utilitychoice.com.au'],
      },
    ],
  },
  {
    id: 'terms',
    label: 'Terms of Use',
    title: 'Terms and Conditions',
    lastUpdated: '21.05.2023',
    intro: [
      'Welcome to Utility Choice! These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to comply with and be bound by these terms.',
    ],
    sections: [
      {
        heading: '1. Definitions',
        bullets: [
          '"Company," "we," "our," or "us" refers to Utility Choice.',
          '"User," "you," or "your" refers to any person who accesses or uses our website and services.',
          '"Services" refers to the lead generation and market informative services about utility services through our platform.',
        ],
      },
      {
        heading: '2. Use of Our Services',
        bullets: [
          'Our platform facilitates connections between consumers, Utility broker and service providers for Credit Cards, Loans, solar, NBN, and insurance services.',
          'We do not own, generate, or distribute these services; we act as an intermediary to help users find and compare better deals.',
          'By using our services, you agree to provide accurate and complete information.',
          'You must be at least 18 years old to use our services.',
        ],
      },
      {
        heading: '3. User Obligations',
        bullets: [
          'You agree not to use our services for any illegal or unauthorized purpose.',
          'You must not submit false or misleading information.',
          'You are responsible for maintaining the confidentiality of any login credentials.',
        ],
      },
      {
        heading: '4. No Guarantee of Service Availability',
        bullets: [
          'We strive to provide uninterrupted access to our services; however, we do not guarantee that our website or services will always be available or error-free.',
          'We reserve the right to suspend, modify, or terminate any part of our services at any time without notice.',
        ],
      },
      {
        heading: '5. Third-Party Links and Services',
        bullets: [
          'Our website may contain links to third-party websites and services.',
          'We are not responsible for the content, policies, or practices of any third-party websites or services.',
          'Any engagement with third-party service providers is solely between you and the respective provider.',
        ],
      },
      {
        heading: '6. Limitation of Liability',
        bullets: [
          'We are not responsible for any loss, damage, or liability resulting from your use of our services.',
          'We do not guarantee that you will receive the best rates or offers from service providers.',
          'We shall not be liable for any direct, indirect, incidental, or consequential damages arising out of your use of our services.',
        ],
      },
      {
        heading: '7. Indemnification',
        bullets: [
          'You agree to indemnify and hold harmless Utility Choice, its employees, directors, and affiliates from any claims, damages, or expenses arising from your use of our services or violation of these terms.',
        ],
      },
      {
        heading: '8. Intellectual Property',
        bullets: [
          'All content, trademarks, logos, and other intellectual property on our website belong to Utility Choice.',
          'You may not copy, distribute, or modify any content from our website without our prior written consent.',
        ],
      },
      {
        heading: '9. Privacy Policy',
        bullets: [
          'Your use of our services is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.',
        ],
      },
      {
        heading: '10. Changes to Terms and Conditions',
        bullets: [
          'We reserve the right to update these Terms and Conditions at any time.',
          'Any changes will be posted on our website, and your continued use of our services constitutes acceptance of the updated terms.',
        ],
      },
      {
        heading: '11. Governing Law',
        bullets: [
          'These Terms and Conditions shall be governed by and construed in accordance with the laws of Australia.',
          'Any disputes arising from these terms shall be resolved in the appropriate courts of Australia.',
        ],
      },
      {
        heading: '12. Contact Us',
        paragraphs: [
          'If you have any questions regarding these Terms and Conditions, please contact us at:',
        ],
        contact: ['help@utilitychoice.com.au'],
      },
    ],
  },
  {
    id: 'disclaimer',
    label: 'Disclaimer',
    title: 'Disclaimer',
    lastUpdated: '21.05.2023',
    intro: [
      'The information provided on the Utility Choice website ("Website") is for general informational purposes only. While we strive to ensure accuracy, we make no warranties regarding the completeness, reliability, or suitability of the information.',
    ],
    sections: [
      {
        heading: '1. No Financial or Professional Advice',
        paragraphs: [
          'Utility Choice is an independent lead generation consultancy that connects consumers with utility brokers and service providers. We do not provide financial, legal, or professional advice. Any decisions you make based on information from our Website are at your own risk.',
        ],
      },
      {
        heading: '2. Third-Party Services and Links',
        paragraphs: [
          'Our Website may contain links to third-party websites or services. Utility Choice does not own, operate, or control these third-party platforms and is not responsible for their content, policies, or practices.',
        ],
      },
      {
        heading: '3. Limitation of Liability',
        paragraphs: [
          'To the fullest extent permitted by law, Utility Choice, its affiliates, officers, employees, and agents shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our Website or services.',
        ],
      },
      {
        heading: '4. No Guarantee of Service Availability',
        paragraphs: [
          'While we strive to provide uninterrupted and secure access to our Website and services, we do not guarantee that the Website will always be available, error-free, or free from viruses or other harmful components.',
        ],
      },
      {
        heading: '5. Changes to the Disclaimer',
        paragraphs: [
          'Utility Choice reserves the right to modify or update this Disclaimer at any time without prior notice. Users are encouraged to review this page periodically for any changes.',
        ],
      },
      {
        heading: '6. Contact Information',
        paragraphs: ['If you have any questions about this Disclaimer, please contact us:'],
        contact: ['Utility Choice', 'help@utilitychoice.com.au'],
      },
    ],
  },
];

export const LEGAL_DOCUMENTS = Object.fromEntries(
  LEGAL_TABS.map((doc) => [doc.id, doc])
) as Record<LegalTabId, LegalDocument>;
