import { cn } from '@/lib/cn';

interface BlogSkeletonProps {
  count?: number;
  className?: string;
}

function BlogSkeletonCard() {
  return (
    <div
      className="min-h-[320px] animate-pulse overflow-hidden bg-brand-border-light"
      aria-hidden
    >
      <div className="aspect-[16/10] min-h-[200px] bg-brand-border" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-1/3 rounded bg-brand-border" />
        <div className="h-6 w-full rounded bg-brand-border" />
        <div className="h-6 w-4/5 rounded bg-brand-border" />
        <div className="mt-4 h-px w-full bg-brand-border" />
        <div className="flex justify-between">
          <div className="h-3 w-20 rounded bg-brand-border" />
          <div className="h-3 w-10 rounded bg-brand-border" />
        </div>
      </div>
    </div>
  );
}

export function BlogSkeleton({ count = 6, className }: BlogSkeletonProps) {
  return (
    <ul
      role="list"
      aria-busy="true"
      aria-label="Loading blog posts"
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6',
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <BlogSkeletonCard />
        </li>
      ))}
    </ul>
  );
}
