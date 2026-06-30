import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { ChatFab } from './ChatFab';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="site-layout"
      className="flex min-h-screen w-full max-w-[100vw] flex-col overflow-x-clip bg-brand-off-white"
    >
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <ChatFab />
    </div>
  );
}
