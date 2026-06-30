import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorState({
  message = 'Unable to load blog posts. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      id="blog-error"
      role="alert"
      className="flex flex-col items-center gap-4 py-12 text-center"
    >
      <p className="max-w-md text-base text-brand-muted">{message}</p>
      <Button type="button" variant="secondary" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}
