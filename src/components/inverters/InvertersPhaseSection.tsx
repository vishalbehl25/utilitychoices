import { SectionContainer } from '@/components/layout/PageContainer';
import { InverterCard } from '@/components/inverters/InverterCard';
import type { InverterProduct } from '@/data/inverters';
import { cn } from '@/lib/cn';

interface InvertersPhaseSectionProps {
  id: string;
  title: string;
  description: string;
  products: InverterProduct[];
  variant?: 'white' | 'cream';
}

export function InvertersPhaseSection({
  id,
  title,
  description,
  products,
  variant = 'white',
}: InvertersPhaseSectionProps) {
  return (
    <SectionContainer
      id={id}
      className={cn(
        'py-12 md:py-16',
        variant === 'cream' ? 'bg-section-cream' : 'bg-white'
      )}
    >
      <h2 className="mb-3 text-2xl font-bold text-brand-dark sm:text-3xl md:text-4xl">
        {title}
      </h2>
      <p className="mb-8 max-w-3xl text-base font-light leading-relaxed text-brand-muted sm:mb-10">
        {description}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {products.map((product, index) => (
          <InverterCard key={product.slug} {...product} index={index} />
        ))}
      </div>
    </SectionContainer>
  );
}
