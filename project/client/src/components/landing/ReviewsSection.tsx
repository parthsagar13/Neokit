'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const reviews = [
  {
    name: 'Aarav Mehta',
    role: 'Frontend Lead · SaaS Studio',
    text: 'NeoKit saved us at least three weeks. The dashboards look premium out of the box and the customizer made client demos effortless.',
  },
  {
    name: 'Sofia Alvarez',
    role: 'Product Designer',
    text: 'Finally a starter kit that feels designed, not assembled. Spacing, shadows, and motion details are genuinely ThemeForest-level.',
  },
  {
    name: 'Daniel Okonkwo',
    role: 'Full-stack Engineer',
    text: 'Clean TypeScript, solid structure, and apps that are actually usable. We shipped a CRM MVP using NeoKit as the foundation.',
  },
  {
    name: 'Priya Nair',
    role: 'Agency Founder',
    text: 'Our clients always ask if the admin was custom-built. That reaction alone paid for NeoKit multiple times over.',
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="nk-section bg-background">
      <div className="nk-container">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="Loved by teams who care about"
          highlight="craft"
          description="Developers and agencies choose NeoKit when the admin experience needs to feel as premium as the product itself."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {reviews.map((review, i) => (
            <motion.blockquote
              key={review.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="nk-card relative p-7"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/15" />
              <div className="mb-4 flex text-amber-400">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-[15px] leading-relaxed text-body">&ldquo;{review.text}&rdquo;</p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {review.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <div className="text-sm font-bold text-text">{review.name}</div>
                  <div className="text-xs text-body">{review.role}</div>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
