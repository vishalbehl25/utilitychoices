import { ContainedImage } from '@/components/ui/ContainedImage';
import { SectionContainer } from '@/components/layout/PageContainer';
import { cn } from '@/lib/cn';
import { SOLAR_PARTNERS } from '@/data/partners';

const LOGO_SCALES: Record<string, string> = {
  Sunboost: 'scale-[1.15]',
};

export function SolarPartnersSection() {
  return (
    <SectionContainer id="solar-partners" className="bg-white py-12 md:py-16">
      <h2
        id="solar-partners-heading"
        className="mb-8 text-center text-2xl font-bold text-brand-dark max-[374px]:text-xl sm:mb-10 sm:text-3xl md:text-4xl lg:text-[40px]"
      >
        Our Partner&apos;s{' '}
        <span className="text-brand-accent-bright">Partner</span>
      </h2>

      <div className="rounded-[20px] border border-brand-border-light bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.015)] sm:p-8 md:p-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6">
          {SOLAR_PARTNERS.map((logo) => (
            <div
              key={logo.name}
              id={`solar-partner-${logo.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex h-20 w-full items-center justify-center rounded-[12px] border border-brand-border-muted bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
            >
              <ContainedImage
                src={logo.url}
                alt={logo.name}
                width={120}
                height={48}
                className={cn(
                  'max-h-[40px] max-w-[100px] object-contain sm:max-h-[48px] sm:max-w-[120px]',
                  LOGO_SCALES[logo.name] ?? ''
                )}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
