'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import { NBNDropdown, type NBNDropdownOption } from '@/components/services/NBNDropdown';

type HomeLoanOpenFilter = 'interest' | 'loan-fee' | 'max-amount' | null;

interface HomeLoansFilterPanelProps {
  interestRate: string;
  loanFee: string;
  maxLoanAmount: string;
  interestRateOptions: readonly string[];
  loanFeeOptions: readonly string[];
  maxLoanAmountOptions: readonly string[];
  onInterestRateChange: (value: string) => void;
  onLoanFeeChange: (value: string) => void;
  onMaxLoanAmountChange: (value: string) => void;
  className?: string;
  id?: string;
}

function toDropdownOptions(values: readonly string[]): NBNDropdownOption[] {
  return [
    { value: '', label: 'All' },
    ...values.map((v) => ({ value: v, label: v })),
  ];
}

export function HomeLoansFilterPanel({
  interestRate,
  loanFee,
  maxLoanAmount,
  interestRateOptions,
  loanFeeOptions,
  maxLoanAmountOptions,
  onInterestRateChange,
  onLoanFeeChange,
  onMaxLoanAmountChange,
  className,
  id = 'home-loan-filter',
}: HomeLoansFilterPanelProps) {
  const [openFilter, setOpenFilter] = useState<HomeLoanOpenFilter>(null);

  const interestOptions = useMemo(
    () => toDropdownOptions(interestRateOptions),
    [interestRateOptions],
  );
  const feeOptions = useMemo(
    () => toDropdownOptions(loanFeeOptions),
    [loanFeeOptions],
  );
  const maxAmountOptions = useMemo(
    () => toDropdownOptions(maxLoanAmountOptions),
    [maxLoanAmountOptions],
  );

  return (
    <div
      id={id}
      className={cn(
        'credit-cards-filter-panel home-loan-filter-glass max-md:px-4 max-md:py-4 max-[374px]:px-3 max-[374px]:py-3.5',
        openFilter && 'home-loan-filter-panel--open',
        className,
      )}
    >
      <div
        id={`${id}-controls`}
        className="flex flex-col gap-5 max-md:gap-5 max-[374px]:gap-4 md:max-lg:flex-col md:max-lg:gap-5 lg:flex-row lg:items-start lg:gap-10"
      >
        <NBNDropdown
          id={`${id}-interest`}
          label="Filter by Interest Rate pa"
          value={interestRate}
          onChange={onInterestRateChange}
          options={interestOptions}
          placeholder="Select Interest Rate pa"
          menuHeader="Select Interest Rate pa"
          open={openFilter === 'interest'}
          onOpenChange={(next) => setOpenFilter(next ? 'interest' : null)}
        />
        <NBNDropdown
          id={`${id}-loan-fee`}
          label="Filter by Loan Fee"
          value={loanFee}
          onChange={onLoanFeeChange}
          options={feeOptions}
          placeholder="Select Loan Fee"
          menuHeader="Select Loan Fee"
          open={openFilter === 'loan-fee'}
          onOpenChange={(next) => setOpenFilter(next ? 'loan-fee' : null)}
        />
        <NBNDropdown
          id={`${id}-max-amount`}
          label="Filter by Maximum Loan Amount"
          value={maxLoanAmount}
          onChange={onMaxLoanAmountChange}
          options={maxAmountOptions}
          placeholder="Select Maximum Loan Amount"
          menuHeader="Select Maximum Loan Amount"
          open={openFilter === 'max-amount'}
          onOpenChange={(next) => setOpenFilter(next ? 'max-amount' : null)}
        />
      </div>
    </div>
  );
}
