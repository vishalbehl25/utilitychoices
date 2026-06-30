import type { BlogSummary } from '@/types/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { cn } from '@/lib/cn';

interface BlogGridProps {
  posts: BlogSummary[];
  className?: string;
}

export function BlogGrid({ posts, className }: BlogGridProps) {
  return (
    <ul
      id="blog-listing"
      role="list"
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6',
        className,
      )}
    >
      {posts.map((post) => (
        <li key={post._id} className="min-h-[320px]">
          <BlogCard post={post} />
        </li>
      ))}
    </ul>
  );
}
