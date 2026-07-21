'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeading } from './SectionHeading';

const faqs = [
  {
    q: 'Is NeoKit a one-time purchase?',
    a: 'Yes. NeoKit has a single premium plan with lifetime access. No monthly or yearly subscriptions.',
  },
  {
    q: 'What stack does NeoKit use?',
    a: 'NeoKit is built with React, TypeScript, and Tailwind CSS, with a modern component architecture ready for production apps.',
  },
  {
    q: 'Can I use NeoKit for client projects?',
    a: 'Yes. Your license covers commercial use for client work and end products you build with NeoKit.',
  },
  {
    q: 'Do I get future updates?',
    a: 'Lifetime updates are included. You receive improvements, refinements, and new screens as NeoKit evolves.',
  },
  {
    q: 'Is dark mode and RTL included?',
    a: 'Absolutely. NeoKit ships with light/dark themes, RTL support, and a live theme customizer for accents, layouts, and presets.',
  },
  {
    q: 'How is NeoKit different from free admin templates?',
    a: 'Free kits often look unfinished. NeoKit focuses on premium spacing, motion, application modules, and a cohesive design system that feels ready to sell.',
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="nk-section bg-white">
      <div className="nk-container max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers before you"
          highlight="buy"
          description="Everything you need to know about licensing, stack, and what’s included in NeoKit."
        />

        <div className="mt-10 rounded-3xl border border-border bg-background/60 p-2 sm:p-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`} className="border-border px-2">
                <AccordionTrigger className="text-left text-base font-semibold text-text hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-body">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
