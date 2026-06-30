import Link from 'next/link';
import { cn } from '@/lib/cn';

interface ProductCardProps {
  href: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function ProductCard({ href, title, children, className, id }: ProductCardProps) {
  return (
    <Link
      id={id}
      href={href}
      className={cn('site-card-interactive block p-5', className)}
    >
      <h3 className="mb-3 text-lg font-bold text-brand-dark">{title}</h3>
      <div className="space-y-2 text-sm text-brand-dark/80">{children}</div>
    </Link>
  );
}

export function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="font-medium text-brand-muted">{label}</span>
      <span className="text-right font-semibold text-brand-dark">{value}</span>
    </div>
  );
}

export function DetailSpecPanel({ children }: { children: React.ReactNode }) {
  return <div className="site-spec-panel">{children}</div>;
}

export function ServicePageHeader({
  tagline,
  title,
  description,
  id = 'service-page-header',
}: {
  tagline?: string;
  title: string;
  description: string;
  id?: string;
}) {
  return (
    <div id={id} className="mb-8 text-center">
      {tagline ? (
        <p id={`${id}-tagline`} className="mb-2 text-lg font-bold text-brand-dark md:text-xl">
          {tagline}
        </p>
      ) : null}
      <h1 id={`${id}-title`} className="site-page-title">
        {title}
      </h1>
      <p id={`${id}-description`} className="site-page-description">
        {description}
      </p>
    </div>
  );
}

export function FilterBar({
  children,
  id = 'service-filter-bar',
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="site-filter-bar">
      <span id={`${id}-label`} className="text-sm font-semibold text-brand-dark">
        Filter by
      </span>
      {children}
    </div>
  );
}

export function FilterSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="cursor-pointer rounded-[10px] border border-brand-border-muted bg-white px-3 py-2 text-sm text-brand-dark transition-colors focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
