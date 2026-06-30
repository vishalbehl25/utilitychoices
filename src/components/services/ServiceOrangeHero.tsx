import { PageContainer } from '@/components/layout/PageContainer';
import { cn } from '@/lib/cn';

interface ServiceOrangeHeroProps {
  title: string;
  description: string;
  className?: string;
  innerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  id?: string;
}

/** Wix service listing hero — full-width orange band, white type */
export function ServiceOrangeHero({
  title,
  description,
  className,
  innerClassName,
  titleClassName,
  descriptionClassName,
  id = 'service-orange-hero',
}: ServiceOrangeHeroProps) {
  return (
    <section id={id} className={cn('service-orange-hero w-full', className)}>
      <PageContainer
        id={`${id}-inner`}
        className={cn('py-10 md:py-12 lg:py-14', innerClassName)}
      >
        <h1
          id={`${id}-title`}
          className={cn(
            'text-3xl font-bold !text-white md:text-4xl lg:text-[2.5rem]',
            titleClassName,
          )}
        >
          {title}
        </h1>
        <p
          id={`${id}-description`}
          className={cn(
            'mt-4 max-w-3xl text-base font-light leading-relaxed !text-white md:text-lg',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      </PageContainer>
    </section>
  );
}
