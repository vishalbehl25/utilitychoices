'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { FormSuccessRings } from '@/components/forms/FormSuccessRings';
import { cn } from '@/lib/cn';

interface FormSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FormSuccessContent({
  className,
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) {
  return (
    <div
      id="form-success-content"
      className={cn('flex flex-col items-center text-center', className)}
    >
      <p
        id="form-success-message"
        className="text-base font-bold leading-snug text-brand-dark sm:text-lg"
      >
        Our team is reviewing your request, and we will get back to you as soon
        as possible.
      </p>
      <p
        id="form-success-thank-you"
        className="mt-3 inline-block bg-brand-accent-bright px-4 py-1.5 text-base font-bold text-white sm:text-lg"
      >
        Thank you !
      </p>

      <FormSuccessRings />

      <button
        id="form-success-close-btn"
        type="button"
        onClick={onClose}
        className="w-full cursor-pointer rounded-full bg-brand-dark px-8 py-4 text-base font-bold text-white transition-colors hover:bg-brand-dark-hover"
      >
        Close
      </button>
    </div>
  );
}

export function FormSuccessModal({
  open,
  onOpenChange,
}: FormSuccessModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          id="form-success-overlay"
          className="fixed inset-0 z-[200] bg-black/40"
        />
        <Dialog.Content
          id="form-success-modal"
          className="fixed left-1/2 top-1/2 z-[201] w-[min(100%-2rem,420px)] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[12px] bg-brand-off-white px-6 py-8 shadow-[0_8px_32px_rgba(16,25,33,0.18)] focus:outline-none sm:px-8 sm:py-10"
        >
          <Dialog.Title className="sr-only">
            Thank you for your submission
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Our team is reviewing your request and will get back to you soon.
          </Dialog.Description>
          <FormSuccessContent onClose={() => onOpenChange(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
