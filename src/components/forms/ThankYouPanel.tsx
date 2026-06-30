'use client';

import { useRouter } from 'next/navigation';
import { FormSuccessContent } from '@/components/forms/FormSuccessModal';

export function ThankYouPanel() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-md rounded-[12px] bg-brand-off-white px-6 py-8 shadow-[0_8px_32px_rgba(16,25,33,0.08)] sm:px-8 sm:py-10">
      <FormSuccessContent onClose={() => router.push('/')} />
    </div>
  );
}
