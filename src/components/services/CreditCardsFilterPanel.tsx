'use client';

import { cn } from '@/lib/cn';

interface CreditCardsFilterPanelProps {
  company: string;
  interestRate: string;
  charges: string;
  companyOptions: string[];
  interestRateOptions: string[];
  chargeOptions: string[];
  onCompanyChange: (value: string) => void;
  onInterestRateChange: (value: string) => void;
  onChargesChange: (value: string) => void;
  className?: string;
  id?: string;
}

function UnderlineSelect({
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
    <label
      id={`credit-cards-filter-${label.toLowerCase().replace(/\s+/g, '-')}`}
      className="flex min-w-[140px] flex-1 cursor-pointer flex-col gap-1"
    >
      <span className="sr-only">{label}</span>
      <div className="relative">
        <select
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none border-0 border-b border-brand-border bg-transparent pb-2 pr-8 text-sm text-brand-dark focus:border-brand-primary focus:outline-none"
        >
          <option value="">{label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span
          className="pointer-events-none absolute right-0 top-1/2 size-0 -translate-y-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-brand-dark"
          aria-hidden
        />
      </div>
    </label>
  );
}

export function CreditCardsFilterPanel({
  company,
  interestRate,
  charges,
  companyOptions,
  interestRateOptions,
  chargeOptions,
  onCompanyChange,
  onInterestRateChange,
  onChargesChange,
  className,
  id = 'credit-cards-filter',
}: CreditCardsFilterPanelProps) {
  return (
    <div id={id} className={cn('credit-cards-filter-panel', className)}>
      <p id={`${id}-label`} className="mb-4 text-sm font-bold text-brand-dark">
        Filter by
      </p>
      <div
        id={`${id}-controls`}
        className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-8 md:max-lg:flex-col md:max-lg:items-stretch md:max-lg:gap-4 lg:flex-row lg:items-end lg:gap-8"
      >
        <UnderlineSelect
          label="Select Company"
          options={companyOptions}
          value={company}
          onChange={onCompanyChange}
        />
        <UnderlineSelect
          label="Select Interest Rates"
          options={interestRateOptions}
          value={interestRate}
          onChange={onInterestRateChange}
        />
        <UnderlineSelect
          label="Select Charges"
          options={chargeOptions}
          value={charges}
          onChange={onChargesChange}
        />
      </div>
    </div>
  );
}
