import type { BlogFaq } from '@/types/blog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface BlogFaqSectionProps {
  faqs: BlogFaq[];
}

export function BlogFaqSection({ faqs }: BlogFaqSectionProps) {
  if (!faqs.length) return null;

  return (
    <section id="blog-faq" className="mt-10" aria-labelledby="blog-faq-heading">
      <h2
        id="blog-faq-heading"
        className="mb-4 text-2xl font-bold text-brand-dark md:text-3xl"
      >
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={`${faq.question}-${index}`} value={`faq-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
