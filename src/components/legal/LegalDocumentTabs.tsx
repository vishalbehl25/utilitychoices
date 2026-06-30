'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import {
  LEGAL_TABS,
  type LegalDocument,
  type LegalTabId,
} from '@/data/legal-documents';
import { cn } from '@/lib/cn';

function ContactLine({ line }: { line: string }) {
  if (line.includes('@')) {
    return (
      <p className="legal-doc-paragraph">
        Email:{' '}
        <a
          href={`mailto:${line}`}
          className="text-brand-primary underline-offset-2 hover:underline"
        >
          {line}
        </a>
      </p>
    );
  }

  return <p className="legal-doc-paragraph">{line}</p>;
}

function LegalDocumentBody({ doc }: { doc: LegalDocument }) {
  return (
    <>
      {doc.intro.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="legal-doc-paragraph">
          {paragraph}
        </p>
      ))}

      {doc.sections.map((section) => (
        <section key={section.heading} className="legal-doc-section">
          <h2 className="legal-doc-heading">{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="legal-doc-paragraph">
              {paragraph}
            </p>
          ))}
          {section.bullets && (
            <ul className="legal-doc-list">
              {section.bullets.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          )}
          {section.contact?.map((line) => (
            <ContactLine key={line} line={line} />
          ))}
        </section>
      ))}
    </>
  );
}

export function LegalDocumentTabs({
  defaultTab = 'privacy',
}: {
  defaultTab?: LegalTabId;
}) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab: LegalTabId =
    tabParam === 'privacy' ||
    tabParam === 'terms' ||
    tabParam === 'disclaimer'
      ? tabParam
      : defaultTab;

  const [activeTab, setActiveTab] = useState<LegalTabId>(initialTab);
  const doc = LEGAL_TABS.find((tab) => tab.id === activeTab) ?? LEGAL_TABS[0];

  return (
    <div id="legal-documents">
      <div
        id="legal-document-tabs"
        className="mb-6 flex flex-wrap gap-3"
        role="tablist"
        aria-label="Legal documents"
      >
        {LEGAL_TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              id={`legal-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`legal-panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'border-brand-primary bg-brand-primary text-white'
                  : 'border-brand-border-light bg-white text-brand-dark hover:border-brand-border-subtle'
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <article
        id={`legal-panel-${doc.id}`}
        role="tabpanel"
        aria-labelledby={`legal-tab-${doc.id}`}
        className="rounded-[12px] border border-brand-border-light bg-white px-6 py-8 shadow-[0_2px_8px_rgba(0,0,0,0.01)] md:px-10 md:py-10"
      >
        <h1 className="text-3xl font-bold text-brand-dark">{doc.title}</h1>
        <p className="mt-1 text-sm text-brand-dark/60">
          Last Updated: {doc.lastUpdated}
        </p>
        <div className="legal-doc-body mt-8">
          <LegalDocumentBody doc={doc} />
        </div>
      </article>
    </div>
  );
}
