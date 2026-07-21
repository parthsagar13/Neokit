'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary-bg px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary-active">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        {title}{' '}
        {highlight && <span className="nk-gradient-text">{highlight}</span>}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-body sm:text-lg">{description}</p>
      )}
    </motion.div>
  );
}
