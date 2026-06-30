'use client';

import { cn } from '@/lib/cn';

interface BlogCategoryTabsProps {
  categories: string[];
  activeCategory: string | null;
  onSelect: (category: string | null) => void;
}

export function BlogCategoryTabs({
  categories,
  activeCategory,
  onSelect,
}: BlogCategoryTabsProps) {
  const tabs = [{ label: 'All Posts', value: null as string | null }, ...categories.map((c) => ({ label: c, value: c }))];

  return (
    <nav
      id="blog-category-tabs"
      aria-label="Blog categories"
      className="mb-8 flex flex-wrap gap-6 border-b border-brand-border-light pb-3"
    >
      {tabs.map((tab) => {
        const isActive = activeCategory === tab.value;
        return (
          <button
            key={tab.label}
            type="button"
            onClick={() => onSelect(tab.value)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'cursor-pointer text-base font-normal transition-colors',
              isActive
                ? 'font-bold text-brand-dark'
                : 'text-brand-muted hover:text-brand-dark',
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
