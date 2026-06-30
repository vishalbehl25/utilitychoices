'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { NBN_PLAN_FILTER_ALL } from '@/data/nbn-plans';

interface NBNCompanyFilterDropdownProps {
  id: string;
  value: string;
  planOptions: readonly string[];
  onChange: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function DropdownChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={cn(
        'h-2.5 w-2.5 shrink-0 text-[#7eb6e0] transition-transform duration-200',
        open && 'rotate-180',
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9.2828 4.89817"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M4.64116,4.89817a.5001.5001,0,0,1-.34277-.13574L.15727.86448A.50018.50018,0,0,1,.84282.136L4.64116,3.71165,8.44.136a.50018.50018,0,0,1,.68555.72852L4.98393,4.76243A.5001.5001,0,0,1,4.64116,4.89817Z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 text-brand-primary"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 8.5L6.5 12L13 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function triggerLabel(value: string): string {
  if (value === NBN_PLAN_FILTER_ALL) return 'All';
  return value;
}

export function NBNCompanyFilterDropdown({
  id,
  value,
  planOptions,
  onChange,
  open: openProp,
  onOpenChange,
  className,
}: NBNCompanyFilterDropdownProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const open = openProp ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    onOpenChange?.(next);
    if (openProp === undefined) {
      setUncontrolledOpen(next);
    }
  };
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = useId();

  const displayLabel = triggerLabel(value);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open || !listRef.current) return;
    const selected = listRef.current.querySelector(
      '[data-selected="true"]',
    ) as HTMLElement | null;
    selected?.scrollIntoView({ block: 'nearest' });
  }, [open, value]);

  const menuItems: { value: string; label: string }[] = [
    { value: NBN_PLAN_FILTER_ALL, label: 'All' },
    ...planOptions.map((name) => ({ value: name, label: name })),
  ];

  return (
    <div
      ref={rootRef}
      id={id}
      className={cn('nbn-filter-field', open && 'nbn-filter-field--open', className)}
    >
      <p id={`${id}-label`} className="nbn-filter-field-label">
        Filter by Company
      </p>
      <div className="relative">
        <button
          id={`${id}-trigger`}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-labelledby={`${id}-label ${id}-trigger`}
          title={displayLabel}
          onClick={() => setOpen(!open)}
          className={cn(
            'nbn-filter-trigger nbn-filter-trigger--company',
            open && 'nbn-filter-trigger--open',
          )}
        >
          <span className="min-w-0 flex-1 truncate text-left font-normal text-brand-primary">
            {displayLabel}
          </span>
          <DropdownChevron open={open} />
        </button>

        {open ? (
          <div className="nbn-filter-menu-wrap">
            <ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-label="Select Company"
              className="nbn-filter-menu nbn-filter-menu--company"
            >
              <li
                role="presentation"
                className="nbn-filter-menu-header"
                aria-hidden
              >
                Select Company
              </li>
              {menuItems.map((opt) => {
                const isSelected = value === opt.value;
                return (
                  <li key={opt.value} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      data-selected={isSelected ? 'true' : undefined}
                      className={cn(
                        'nbn-filter-menu-item',
                        isSelected && 'nbn-filter-menu-item--selected',
                      )}
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                      }}
                    >
                      <span className="nbn-filter-menu-item-check">
                        {isSelected ? <CheckIcon /> : null}
                      </span>
                      <span className="min-w-0 flex-1 text-left leading-snug">
                        {opt.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="nbn-filter-menu-scroll-hint" aria-hidden>
              <DropdownChevron open={false} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
