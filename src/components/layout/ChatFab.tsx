'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export function ChatFab() {
  return (
    <Link
      id="chat-fab"
      href="/enquiry"
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-brand-accent-bright text-white shadow-[0_4px_16px_rgba(242,99,34,0.45)] transition-transform hover:scale-105 max-[374px]:bottom-3 max-[374px]:right-3 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      aria-label="Connect with us"
    >
      <MessageCircle className="h-6 w-6 fill-white sm:h-7 sm:w-7" strokeWidth={0} />
    </Link>
  );
}
