interface EmptyStateProps {
  message?: string;
}

export function EmptyState({
  message = 'No blog posts available yet.',
}: EmptyStateProps) {
  return (
    <p
      id="blog-empty"
      role="status"
      className="py-12 text-center text-base text-brand-muted"
    >
      {message}
    </p>
  );
}
