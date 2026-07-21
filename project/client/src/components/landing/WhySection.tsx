'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock3, Code2, Headphones, Rocket, Sparkles } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { AnimatedCounter } from './AnimatedCounter';

const reasons = [
  {
    icon: Rocket,
    title: 'Ship weeks faster',
    desc: 'Skip rebuilding admin foundations. Start from screens that already look premium.',
  },
  {
    icon: Code2,
    title: 'Clean React architecture',
    desc: 'Typed components, predictable folders, and patterns your team can extend safely.',
  },
  {
    icon: Sparkles,
    title: 'ThemeForest-grade polish',
    desc: 'Soft shadows, refined spacing, and micro interactions that feel handcrafted.',
  },
  {
    icon: Clock3,
    title: 'Lifetime updates',
    desc: 'One purchase. Ongoing improvements, new screens, and framework-friendly upgrades.',
  },
  {
    icon: Headphones,
    title: 'Developer-first support',
    desc: 'Clear docs and practical guidance so customization never becomes a guessing game.',
  },
  {
    icon: CheckCircle2,
    title: 'Commercial ready',
    desc: 'Use NeoKit for client projects and production products with confidence.',
  },
];

export function WhySection() {
  return (
    <section className="nk-section bg-slate-950 text-white">
      <div className="nk-container">
        <SectionHeading
          eyebrow="Why NeoKit"
          title="Built to feel expensive —"
          highlight="because it is"
          description="NeoKit is not a random component dump. It is a cohesive starter kit designed to impress stakeholders on day one."
          className="[&_h2]:text-white [&_p]:text-slate-400 [&_span]:border-primary/30 [&_span]:bg-primary/10 [&_span]:text-primary"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { end: 150, suffix: '+', label: 'UI Components' },
            { end: 20, suffix: '+', label: 'App Screens' },
            { end: 4000, suffix: '+', label: 'Developers' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-7 text-center backdrop-blur"
            >
              <div className="text-3xl font-bold text-primary sm:text-4xl">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-primary/40 hover:bg-white/[0.07]"
            >
              <item.icon className="mb-4 h-6 w-6 text-primary" />
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
