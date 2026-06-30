import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import { StoreProvider } from '@/redux/StoreProvider';
import { CmsAnalyticsTracker } from '@/components/cms/CmsAnalyticsTracker';
import './globals.css';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.utilitychoices.com.au'),
  title: {
    default: 'Utility Choice',
    template: '%s | Utility Choice',
  },
  icons: {
    icon: '/assets/favicon.png',
    apple: '/assets/favicon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${nunitoSans.className} ${nunitoSans.variable} antialiased`}>
        <StoreProvider>
          <CmsAnalyticsTracker />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
