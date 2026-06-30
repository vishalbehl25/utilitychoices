'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionContainer } from '@/components/layout/PageContainer';
import { cn } from '@/lib/cn';
import { siteWidthClass } from '@/lib/responsive';

const testimonials = [
  {
    name: 'Michael Brown',
    rating: 5,
    quote:
      'I was looking for a personal loan, and Utility Choice helped me find the lowest interest rate!',
  },
  {
    name: 'Sarah Jenkins',
    rating: 5,
    quote:
      'Utility Choice made NBN comparisons extremely simple. I switched plans in under 5 minutes and saved $20/month!',
  },
  {
    name: 'Emma Taylor',
    rating: 5,
    quote:
      'Excellent platform! I compared solar deals and saved over $1,200 a year on my electricity bills.',
  },
  {
    name: 'David Miller',
    rating: 5,
    quote:
      'Very professional brokers. They guided me through the entire credit card process with complete transparency.',
  },
  {
    name: 'Lisa Anderson',
    rating: 5,
    quote:
      'Highly recommend this site! They help you find the absolute best rates in Australia without any hidden fees.',
  },
  {
    name: 'James Wilson',
    rating: 5,
    quote:
      'Utility Choice made it so easy to find the best credit card. The whole process was smooth and hassle-free!',
  },
  {
    name: 'Jessica Chen',
    rating: 5,
    quote:
      'Great experience comparing home loans. The expert advice was invaluable and completely free.',
  },
  {
    name: 'Ryan Kowalski',
    rating: 5,
    quote:
      'Switched my electricity provider through their platform. The savings were immediate and significant!',
  },
  {
    name: 'Chloe Bennett',
    rating: 5,
    quote:
      'So glad I reviewed my bills today. Saved $150 on NBN and electricity. Outstanding service!',
  },
  {
    name: 'Oliver Davis',
    rating: 5,
    quote:
      'Amazing tool. I found top solar panel deals and a highly-rated local broker within seconds.',
  },
];

export function TestimonialsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const active = testimonials[activeIndex];
  const total = testimonials.length;

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  return (
    <SectionContainer
      id="testimonials-summary"
      className="bg-[#FDFBED] pb-14 pt-4 md:pb-16"
    >
      <div
        id="testimonials-section-header"
        className={cn(siteWidthClass, 'mb-8 text-center sm:mb-10')}
      >
        <h2
          id="testimonials-heading"
          className="mb-3 text-[1.4rem] font-bold leading-tight text-[#333333] max-[374px]:text-[1.25rem] sm:mb-5 sm:text-[2.5rem] lg:text-[2.75rem]"
        >
          Let&apos;s see what our{' '}
          <span className="text-brand-accent-bright">clients says</span>
        </h2>
        <p
          id="testimonials-description"
          className="text-[15px] font-normal leading-[1.5] text-[#666666] max-[374px]:text-sm sm:text-[17px] md:text-lg"
        >
          We have been helping{' '}
          <strong className="font-bold text-[#333333]">Australians</strong> for
          the last <strong className="font-bold text-[#333333]">6 years</strong>{' '}
          &amp; have assisted{' '}
          <strong className="font-bold text-[#333333]">
            over 45,000+ users
          </strong>
          , with a{' '}
          <strong className="font-bold text-[#333333]">4.3-star rating</strong>.
        </p>
      </div>

      <div
        ref={sectionRef}
        id="footer-quote"
        className={cn(
          siteWidthClass,
          'relative rounded-[16px] bg-white px-8 py-6 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)] max-[374px]:px-6 max-[374px]:py-5 sm:px-12 sm:py-8 md:py-10 md:pl-12 md:pr-12 lg:px-16'
        )}
      >
        <button
          type="button"
          id="testimonials-prev"
          onClick={goPrev}
          className={cn(
            'absolute left-1.5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full md:left-3 md:h-10 md:w-10',
            'cursor-pointer border border-brand-border-light bg-white text-brand-dark shadow-sm',
            'transition-colors hover:border-brand-accent-bright hover:text-brand-accent-bright',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-bright/40'
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} aria-hidden />
        </button>

        <button
          type="button"
          id="testimonials-next"
          onClick={goNext}
          className={cn(
            'absolute right-1.5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full md:right-3 md:h-10 md:w-10',
            'cursor-pointer border border-brand-border-light bg-white text-brand-dark shadow-sm',
            'transition-colors hover:border-brand-accent-bright hover:text-brand-accent-bright',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-bright/40'
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} aria-hidden />
        </button>

        <div
          id="testimonials-quote-mark"
          className="mb-3 flex justify-center select-none font-serif text-5xl leading-[0.1] text-brand-dark/15 md:mb-4 md:text-[72px]"
        >
          “
        </div>

        <div
          id="testimonials-quote-content"
          className="flex min-h-[120px] flex-col justify-center md:min-h-[140px]"
        >
          <p
            key={`${activeIndex}-name`}
            className="mb-1 animate-fade-in text-base font-extrabold text-brand-dark md:text-lg"
          >
            {active.name}
          </p>

          <div
            id="testimonials-stars"
            className="mb-4 text-base tracking-widest text-brand-accent-bright"
            aria-label="5 out of 5 stars"
          >
            {'★★★★★'}
          </div>

          <p
            key={`${activeIndex}-quote`}
            className="mx-auto max-w-[620px] animate-fade-in text-sm font-light italic leading-relaxed text-brand-muted max-[374px]:text-[13px] sm:text-base md:text-lg lg:text-xl"
          >
            &ldquo;{active.quote}&rdquo;
          </p>
        </div>

        <div
          id="testimonials-pagination"
          className="mt-8 flex items-center justify-center gap-2.5"
        >
          {testimonials.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                id={`testimonial-dot-${index + 1}`}
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'cursor-pointer transition-all duration-300 focus:outline-none',
                  isActive
                    ? 'h-2.5 w-2.5 scale-110 rounded-full border border-brand-accent-bright bg-transparent'
                    : 'h-1.5 w-1.5 rounded-full bg-brand-accent-bright'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
