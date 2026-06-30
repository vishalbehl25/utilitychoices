'use client';

import { useMemo, useState } from 'react';
import { Link2, Search } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionContainer } from '@/components/layout/PageContainer';
import { SOLAR_FAQ } from '@/data/solar-faq';
import { FaqRichText } from '@/lib/faq-rich-text';
import { SITE_CONFIG } from '@/constants/navigation';

const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/utilitychoices',
  twitter: 'https://x.com/utilitychoices',
  linkedin: 'https://www.linkedin.com/company/utility-choice',
} as const;

export function SolarFaqSection() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SOLAR_FAQ;
    return SOLAR_FAQ.filter((faq) => {
      const body = [
        faq.answer,
        faq.listIntro,
        faq.closing,
        ...(faq.paragraphs ?? []),
        ...(faq.bullets ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return faq.question.toLowerCase().includes(q) || body.includes(q);
    });
  }, [query]);

  return (
    <SectionContainer id="solar-faq" className="bg-white py-12 md:py-16">
      <h2
        id="solar-faq-heading"
        className="mb-6 text-center text-2xl font-bold text-brand-dark sm:mb-8 sm:text-3xl md:text-4xl"
      >
        Frequently asked questions
      </h2>

      <div className="relative mx-auto mb-8 max-w-xl">
        <label htmlFor="solar-faq-search" className="sr-only">
          Search FAQs
        </label>
        <input
          id="solar-faq-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Looking for something?"
          className="w-full border-0 border-b border-brand-border bg-transparent py-2 pr-10 text-base text-brand-dark outline-none placeholder:text-brand-muted focus:border-brand-primary"
        />
        <Search
          className="pointer-events-none absolute right-0 top-1/2 size-5 -translate-y-1/2 text-brand-muted"
          aria-hidden
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-brand-muted">
          No questions match your search. Try different keywords.
        </p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {filtered.map((faq, i) => (
            <AccordionItem key={faq.question} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold sm:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-brand-muted">
                {faq.paragraphs?.map((para) => (
                  <p
                    key={para.slice(0, 48)}
                    className="mb-3 font-light leading-relaxed"
                  >
                    <FaqRichText text={para} />
                  </p>
                ))}
                {faq.answer ? (
                  <p className="mb-3 font-light leading-relaxed">
                    <FaqRichText text={faq.answer} />
                  </p>
                ) : null}
                {faq.listIntro ? (
                  <p className="mb-3 font-light leading-relaxed">
                    <FaqRichText text={faq.listIntro} />
                  </p>
                ) : null}
                {faq.bullets?.length ? (
                  <ul className="list-disc space-y-2 pl-5 font-light">
                    {faq.bullets.map((item) => (
                      <li key={item}>
                        <FaqRichText text={item} />
                      </li>
                    ))}
                  </ul>
                ) : null}
                {faq.closing ? (
                  <p className="mt-3 font-light leading-relaxed">
                    <FaqRichText text={faq.closing} />
                  </p>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <div
        id="solar-faq-social"
        className="mt-10 flex items-center gap-4 text-brand-dark"
      >
        <a
          href={SOCIAL_LINKS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-dark transition-colors hover:text-brand-primary"
          aria-label="Facebook"
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
        <a
          href={SOCIAL_LINKS.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-dark transition-colors hover:text-brand-primary"
          aria-label="X"
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-dark transition-colors hover:text-brand-primary"
          aria-label="LinkedIn"
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href={SITE_CONFIG.url}
          className="transition-colors hover:text-brand-primary"
          aria-label="Utility Choice website"
        >
          <Link2 className="size-5" />
        </a>
      </div>
    </SectionContainer>
  );
}
