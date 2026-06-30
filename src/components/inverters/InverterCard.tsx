import { ContainedImage } from '@/components/ui/ContainedImage';
import type { InverterProduct } from '@/data/inverters';
import { cn } from '@/lib/cn';

export interface InverterCardProps extends InverterProduct {
  index?: number;
  className?: string;
}

export function InverterCard({
  slug,
  name,
  sizes,
  features,
  image,
  logo,
  logoAlt,
  index = 0,
  className,
}: InverterCardProps) {
  return (
    <article
      id={`inverter-card-${slug}`}
      className={cn('inverter-card flex h-full flex-col', className)}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="inverter-card-image bg-[#f2f2f4]">
        <ContainedImage
          src={image}
          alt={name}
          width={200}
          height={200}
          className="relative z-[1] max-h-[140px] max-w-full object-contain"
          unoptimized
        />
      </div>

      <div className="inverter-card-body">
        <div className="mb-3 flex min-h-[36px] items-center">
          <ContainedImage
            src={logo}
            alt={logoAlt}
            width={100}
            height={40}
            className="max-h-8 max-w-[120px] object-contain object-left"
            unoptimized
          />
        </div>

        <h3 className="mb-2 text-base font-bold leading-snug text-brand-dark sm:text-lg">
          {name}
        </h3>

        <p className="mb-3 text-sm font-semibold text-brand-primary">{sizes}</p>

        <ul className="space-y-1.5 text-sm font-light leading-relaxed text-brand-muted">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
