'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Check, ArrowRight, Play } from 'lucide-react';
import { HeroShowcase } from './HeroShowcase';
import { AnimatedCounter } from './AnimatedCounter';

const trustItems = [
  'Lifetime Updates',
  'React',
  'TypeScript',
  'TailwindCSS',
  'Dark Mode',
  '150+ Components',
];

export function HeroSection() {
  return (
    <section className="relative overflow-x-clip border-b border-border bg-gradient-to-b from-primary-bg via-background to-background pt-8 pb-24 sm:pt-12 sm:pb-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="nk-noise" />
        <div className="nk-grid-overlay" />
        <div className="animate-nk-gradient absolute -left-32 top-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,#14B8A6_0%,transparent_70%)] opacity-25 blur-2xl" />
        <div className="absolute -right-20 top-40 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,#2DD4BF_0%,transparent_70%)] opacity-20 blur-2xl" />
      </div>

      <div className="nk-container relative grid items-start gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-8">
        {/* Left */}
        <div className="relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-primary-active shadow-sm backdrop-blur"
          >
            <span className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current" />
              ))}
            </span>
            Premium React Admin Dashboard
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]"
          >
            Build Beautiful Admin Dashboards{' '}
            <span className="nk-gradient-text">Faster</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-5 text-base leading-relaxed text-body sm:text-lg"
          >
            NeoKit is a production-ready React + TypeScript starter kit with polished dashboards,
            150+ UI components, apps, authentication, and a powerful theme customizer — crafted for
            teams who ship premium products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="#purchase"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(20,184,166,0.65)] transition hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              Buy Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#showcase"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-white px-7 text-sm font-semibold text-text shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary-active"
            >
              <Play className="h-4 w-4 fill-current text-primary" />
              Live Preview
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-x-4 gap-y-2"
          >
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-sm text-body">
                <Check className="h-4 w-4 text-primary" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.55 }}
            className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-white/70 p-4 shadow-sm backdrop-blur"
          >
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-bold text-text">4.9/5</span>
              <span className="mx-2 text-border">|</span>
              <span className="text-body">
                <AnimatedCounter end={4000} suffix="+" className="font-semibold text-text" />{' '}
                Developers
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative"
        >
          <HeroShowcase />
        </motion.div>
      </div>
    </section>
  );
}
