'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import {
  NBNDropdown,
  type NBNDropdownOption,
} from '@/components/services/NBNDropdown';
import { NBNCompanyFilterDropdown } from '@/components/services/NBNCompanyFilterDropdown';

interface NBNFilterPanelProps {
  selectedPlan: string;
  speed: string;
  planOptions: readonly string[];
  speedOptions: readonly string[];
  onPlanChange: (value: string) => void;
  onSpeedChange: (value: string) => void;
  className?: string;
  id?: string;
}

export function NBNFilterPanel({
  selectedPlan,
  speed,
  planOptions,
  speedOptions,
  onPlanChange,
  onSpeedChange,
  className,
  id = 'nbn-filter',
}: NBNFilterPanelProps) {
  const [openFilter, setOpenFilter] = useState<'company' | 'speed' | null>(
    null
  );

  const speedDropdownOptions = useMemo<NBNDropdownOption[]>(
    () => [
      { value: '', label: 'All' },
      ...speedOptions.map((mbps) => ({
        value: mbps,
        label: `${mbps} Mbps`,
      })),
    ],
    [speedOptions]
  );

  return (
    <div
      id={id}
      className={cn(
        'credit-cards-filter-panel nbn-filter-glass',
        openFilter && 'nbn-filter-panel--open',
        className
      )}
    >
      <div
        id={`${id}-controls`}
        className="flex flex-col gap-5 max-md:gap-5 max-[374px]:gap-4 md:flex-row md:items-start md:gap-10 lg:gap-12"
      >
        <NBNCompanyFilterDropdown
          id={`${id}-company`}
          value={selectedPlan}
          planOptions={planOptions}
          onChange={onPlanChange}
          open={openFilter === 'company'}
          onOpenChange={(next) => setOpenFilter(next ? 'company' : null)}
        />

        <NBNDropdown
          id={`${id}-speed`}
          label="Filter by Maximum download speed (Mbps)"
          value={speed}
          onChange={onSpeedChange}
          options={speedDropdownOptions}
          placeholder="All"
          menuHeader="Select download speed (Mbps)"
          mobileLabel="Filter by download speed (Mbps)"
          open={openFilter === 'speed'}
          onOpenChange={(next) => setOpenFilter(next ? 'speed' : null)}
        />
      </div>
    </div>
  );
}
