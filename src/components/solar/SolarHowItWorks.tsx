import Link from 'next/link';
import { SectionContainer } from '@/components/layout/PageContainer';
import { SOLAR_HOW_IT_WORKS } from '@/data/solar';

export function SolarHowItWorks() {
  return (
    <SectionContainer
      id="solar-how-it-works"
      className="border-t border-brand-section-border bg-[#FDFBED] py-12 md:py-16"
    >
      <h2
        id="solar-how-it-works-heading"
        className="mb-10 text-center text-2xl font-bold text-brand-dark sm:mb-12 sm:text-3xl md:text-4xl"
      >
        How it Works?
      </h2>

      <ol className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
        {SOLAR_HOW_IT_WORKS.map((item) => (
          <li
            key={item.step}
            id={`solar-how-step-${item.step}`}
            className="text-center"
          >
            <span
              className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-brand-accent-bright text-lg font-bold text-white"
              aria-hidden
            >
              {item.step}
            </span>
            <h3 className="mb-3 text-lg font-bold text-brand-dark sm:text-xl">
              {item.title}
            </h3>
            <p className="text-sm font-light leading-relaxed text-brand-muted sm:text-base">
              {item.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex justify-center sm:mt-12">
        <Link
          href="/enquiry"
          className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand-accent-bright px-12 py-3.5 text-base font-bold text-white shadow-[0_4px_14px_rgba(255,98,0,0.3)] transition-transform hover:scale-[1.02] sm:px-14 sm:py-4 sm:text-lg"
        >
          Switch Now
        </Link>
      </div>
    </SectionContainer>
  );
}
