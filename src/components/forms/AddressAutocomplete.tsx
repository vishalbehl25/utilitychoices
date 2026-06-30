'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { cn } from '@/lib/cn';
import type { AddressSuggestion } from '@/lib/australian-address';

interface AddressAutocompleteProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (suggestion: AddressSuggestion) => void;
  placeholder?: string;
  error?: boolean;
  inputClassName?: string;
  listClassName?: string;
  'aria-label'?: string;
}

export function AddressAutocomplete({
  id: idProp,
  value,
  onChange,
  onSelect,
  placeholder = 'e.g., 123 street, 3000',
  error,
  inputClassName,
  listClassName,
  'aria-label': ariaLabel = 'Address or postcode',
}: AddressAutocompleteProps) {
  const autoId = useId();
  const inputId = idProp ?? `address-autocomplete-${autoId}`;
  const listId = `${inputId}-listbox`;

  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.trim().length < 1) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/address-suggestions?q=${encodeURIComponent(query.trim())}`
      );
      const data = (await res.json()) as { suggestions?: AddressSuggestion[] };
      setSuggestions(data.suggestions ?? []);
      setActiveIndex(-1);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const trimmed = value.trim();
    const minLength = /^\d+$/.test(trimmed) ? 2 : 3;
    if (!open || trimmed.length < minLength) return;

    const timer = window.setTimeout(() => {
      void fetchSuggestions(value);
    }, 280);

    return () => window.clearTimeout(timer);
  }, [value, open, fetchSuggestions]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const showList =
    open && value.trim().length > 0 && (loading || suggestions.length > 0);

  useEffect(() => {
    if (!showList) return;

    const closeOnScroll = () => setOpen(false);

    window.addEventListener('scroll', closeOnScroll, true);
    return () => window.removeEventListener('scroll', closeOnScroll, true);
  }, [showList]);

  const pickSuggestion = (suggestion: AddressSuggestion) => {
    onSelect(suggestion);
    setOpen(false);
    setSuggestions([]);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      setOpen(true);
      return;
    }

    if (!open || suggestions.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      pickSuggestion(suggestions[activeIndex]);
    } else if (event.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={rootRef} className="relative z-50 w-full">
      <input
        id={inputId}
        type="text"
        role="combobox"
        aria-expanded={showList}
        aria-controls={showList ? listId : undefined}
        aria-autocomplete="list"
        aria-activedescendant={
          activeIndex >= 0 ? `${inputId}-option-${activeIndex}` : undefined
        }
        aria-label={ariaLabel}
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onKeyDown={handleKeyDown}
        className={cn(inputClassName, error && 'border-red-400 text-red-600')}
      />

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className={cn(
            'absolute left-0 right-0 top-full z-[200] max-h-[min(280px,50vh)] overflow-y-auto rounded-b-[10px] border border-brand-border bg-white shadow-[0_8px_24px_rgba(16,25,33,0.12)]',
            listClassName
          )}
        >
          {loading && suggestions.length === 0 && (
            <li className="border-b border-brand-border-light px-4 py-3 text-sm text-brand-muted">
              Searching…
            </li>
          )}
          {!loading && suggestions.length === 0 && (
            <li className="px-4 py-3 text-sm text-brand-muted">
              No addresses found. Try a street name or postcode.
            </li>
          )}
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.id}-${index}`}
              id={`${inputId}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
            >
              <button
                type="button"
                className={cn(
                  'w-full cursor-pointer truncate border-b border-brand-border-light px-4 py-3 text-left text-sm font-medium text-brand-dark transition-colors last:border-b-0',
                  index === activeIndex
                    ? 'bg-brand-light-blue/60'
                    : 'hover:bg-brand-cream/40'
                )}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pickSuggestion(suggestion)}
              >
                {suggestion.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
