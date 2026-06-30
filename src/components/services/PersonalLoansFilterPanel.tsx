'use client';

import { cn } from '@/lib/cn';

interface PersonalLoansFilterPanelProps {
  interestRate: string;
  interestRateOptions: readonly string[];
  onInterestRateChange: (value: string) => void;
  className?: string;
  id?: string;
}

export function PersonalLoansFilterPanel({
  interestRate,
  interestRateOptions,
  onInterestRateChange,
  className,
  id = 'personal-loan-filter',
}: PersonalLoansFilterPanelProps) {
  return (
    <div id={id} className={cn('credit-cards-filter-panel', className)}>
      <p id={`${id}-label`} className="mb-1 text-sm font-bold text-brand-dark">
        Filter by
      </p>
      <p
        id={`${id}-sublabel`}
        className="mb-4 text-xs font-normal text-brand-muted"
      >
        Filter by Interest Rates
      </p>
      <label
        id={`${id}-select-wrap`}
        className="relative block max-w-md cursor-pointer"
      >
        <span className="sr-only">Select Interest Rates</span>
        <select
          id={`${id}-select`}
          aria-label="Select Interest Rates"
          value={interestRate}
          onChange={(e) => onInterestRateChange(e.target.value)}
          className="w-full appearance-none rounded-[10px] border border-brand-border-muted bg-white px-4 py-2.5 pr-10 text-sm text-brand-dark transition-colors focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        >
          <option value="">Select Interest Rates</option>
          {interestRateOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-3 top-1/2 size-0 -translate-y-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-brand-dark"
          aria-hidden
        />
      </label>
    </div>
  );
}
