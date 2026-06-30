import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { SolarPackageHeader } from '@/data/solar';

export interface SolarPackageCardProps {
  size: string;
  headerColor: SolarPackageHeader;
  plans: string;
  ideal: string;
  panels: string;
  panelBrands: string;
  inverter: string;
  inverterBrands: string;
  feature: string;
}

const headerStyles: Record<SolarPackageHeader, string> = {
  orange: 'solar-package-card-header--orange',
  blue: 'solar-package-card-header--blue',
};

function PackageSection({
  children,
  bordered = true,
}: {
  children: ReactNode;
  bordered?: boolean;
}) {
  return (
    <div
      className={cn(
        'px-4 py-4 text-center sm:px-5 sm:py-5',
        bordered && 'border-b border-brand-border-light/80'
      )}
    >
      {children}
    </div>
  );
}

export function SolarPackageCard({
  size,
  headerColor,
  plans,
  ideal,
  panels,
  panelBrands,
  inverter,
  inverterBrands,
  feature,
}: SolarPackageCardProps) {
  const slug = size.replace(/\s+/g, '-').toLowerCase();

  return (
    <article
      id={`solar-package-${slug}`}
      className="solar-package-card flex h-full flex-col"
    >
      <div
        className={cn(
          'rounded-t-[11px] px-4 py-5 text-center text-white sm:py-6',
          headerStyles[headerColor]
        )}
      >
        <h3 className="text-[28px] font-bold leading-tight !text-white sm:text-[32px]">
          {size}
        </h3>
        <p className="mt-1.5 text-sm font-normal leading-snug !text-white sm:text-base">
          {plans}
        </p>
      </div>

      <div className="solar-package-card-body flex flex-1 flex-col rounded-b-[11px]">
        <PackageSection>
          <p className="text-sm font-bold leading-snug text-brand-dark sm:text-[15px]">
            {ideal}
          </p>
        </PackageSection>

        <PackageSection>
          <p className="text-sm font-bold leading-snug text-brand-dark sm:text-[15px]">
            {panels}
          </p>
          <p className="mt-1.5 text-xs font-normal leading-relaxed text-brand-dark sm:text-sm">
            {panelBrands}
          </p>
        </PackageSection>

        <PackageSection>
          <p className="text-sm font-bold leading-snug text-brand-dark sm:text-[15px]">
            {inverter}
          </p>
          <p className="mt-1.5 text-xs font-normal leading-relaxed text-brand-dark sm:text-sm">
            {inverterBrands}
          </p>
        </PackageSection>

        <PackageSection bordered={false}>
          <p className="text-sm font-bold leading-snug text-brand-dark sm:text-[15px]">
            {feature}
          </p>
        </PackageSection>
      </div>
    </article>
  );
}
