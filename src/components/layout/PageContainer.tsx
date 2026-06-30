import { cn } from '@/lib/cn';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'main';
  id?: string;
}

export function PageContainer({
  children,
  className,
  as: Tag = 'div',
  id,
}: PageContainerProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'mx-auto box-border w-full max-w-full max-md:px-[var(--site-px)] md:max-lg:px-[var(--site-px)] lg:max-w-[min(var(--site-width),var(--site-vw))] lg:px-5',
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function FullBleedSection({
  children,
  className,
  innerClassName,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('w-full', className)}>
      <PageContainer className={innerClassName}>{children}</PageContainer>
    </section>
  );
}

export function SectionContainer({
  children,
  className,
  innerClassName,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
}) {
  return (
    <FullBleedSection
      id={id}
      className={cn('py-10 md:py-14', className)}
      innerClassName={innerClassName}
    >
      {children}
    </FullBleedSection>
  );
}
