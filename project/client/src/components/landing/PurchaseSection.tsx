'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Play, Sparkles, Loader2 } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { LIVE_PREVIEW_URL } from '@/lib/brand';
import { useNeoKitPurchase } from '@/hooks/useNeoKitPurchase';

const includes = [
  'Lifetime Access',
  'Future Updates',
  'Full Source Code',
  'React + TypeScript',
  'Tailwind CSS',
  'Premium Components',
  'Authentication Pages',
  'Multiple Dashboards',
  'Application Modules',
  'Forms & Validation',
  'Charts & Widgets',
  'Ecommerce Screens',
  'Theme Customizer',
  'Dark Mode + RTL',
  'Documentation',
];

export function PurchaseSection() {
  const { buy, processing } = useNeoKitPurchase();

  return (
    <section id="purchase" className="nk-section relative overflow-hidden bg-primary-bg">
      <div className="nk-noise" />
      <div className="absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

      <div className="nk-container relative">
        <SectionHeading
          eyebrow="One-Time Purchase"
          title="One plan. Lifetime value."
          highlight="No subscriptions."
          description="NeoKit is sold as a single premium starter kit. Buy once, customize forever, and keep every future update."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]"
        >
          <div className="border-b border-border bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-6 py-8 text-white sm:px-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Premium Starter Kit
                </div>
                <h3 className="mt-3 text-2xl font-bold sm:text-3xl">NeoKit Starter Kit</h3>
                <p className="mt-2 max-w-md text-sm text-slate-300">
                  Complete React admin foundation with dashboards, apps, components, and theme tools.
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400 line-through">$99</div>
                <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                  $49
                  <span className="ml-1 text-base font-medium text-slate-400">USD</span>
                </div>
                <div className="mt-1 text-xs font-medium text-primary">One-time payment</div>
              </div>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-10">
            <div className="grid gap-3 sm:grid-cols-2">
              {includes.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-body">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-bg text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => void buy()}
                disabled={processing}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(20,184,166,0.75)] transition hover:-translate-y-0.5 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Buy Now
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <a
                href={LIVE_PREVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 text-sm font-semibold text-text transition hover:-translate-y-0.5 hover:border-primary/30"
              >
                <Play className="h-4 w-4 fill-current text-primary" />
                Live Preview
              </a>
            </div>

            <p className="mt-5 text-center text-xs text-slate-500">
              Instant access after purchase · Commercial license · Lifetime updates included
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
