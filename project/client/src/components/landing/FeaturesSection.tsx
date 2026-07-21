'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Palette,
  ShieldCheck,
  Smartphone,
  Gauge,
  Layers,
  Moon,
  Languages,
  Boxes,
  Sparkles,
  FileCode2,
  Zap,
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Multiple Dashboards',
    desc: 'Overview, Analytics, CRM, Ecommerce, and more — ready to plug into your product.',
  },
  {
    icon: Boxes,
    title: '150+ UI Components',
    desc: 'Buttons, forms, tables, charts, dialogs, and complex widgets with consistent polish.',
  },
  {
    icon: Palette,
    title: 'Live Theme Customizer',
    desc: 'Accent colors, layouts, radius, RTL, and presets — preview changes instantly.',
  },
  {
    icon: Moon,
    title: 'Light & Dark Modes',
    desc: 'Carefully balanced palettes for both themes without sacrificing readability.',
  },
  {
    icon: Languages,
    title: 'RTL Support',
    desc: 'First-class right-to-left layouts for global products and multilingual teams.',
  },
  {
    icon: Smartphone,
    title: 'Fully Responsive',
    desc: 'Desktop-first craftsmanship that still feels intentional on tablet and mobile.',
  },
  {
    icon: ShieldCheck,
    title: 'Auth Pages Included',
    desc: 'Login, register, forgot password, and verification screens with production UX.',
  },
  {
    icon: Gauge,
    title: 'Performance Focused',
    desc: 'Lean structure, lazy routes, and transform-based motion for buttery UI.',
  },
  {
    icon: Layers,
    title: 'App Modules',
    desc: 'Chat, Mail, Calendar, Kanban, Invoice, File Manager, and project boards.',
  },
  {
    icon: FileCode2,
    title: 'TypeScript Ready',
    desc: 'Typed components and clean architecture so your team can scale confidently.',
  },
  {
    icon: Sparkles,
    title: 'Premium Micro Interactions',
    desc: 'Hover lifts, soft shadows, and subtle motion that make the UI feel expensive.',
  },
  {
    icon: Zap,
    title: 'Fast Customization',
    desc: 'Token-based styling and Tailwind utilities so redesigns take hours, not weeks.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="nk-section bg-white">
      <div className="nk-container">
        <SectionHeading
          eyebrow="Feature Grid"
          title="Everything you need to ship a"
          highlight="premium admin"
          description="NeoKit packs the systems, apps, and polish that ThemeForest bestsellers are known for — without the generic template feel."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.04, duration: 0.45 }}
              className="nk-card group p-6"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-bg text-primary transition group-hover:bg-primary group-hover:text-white">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-text">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{feature.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
