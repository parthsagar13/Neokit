'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';

const controls = [
  { label: 'Accent Color', value: 'Teal / Custom' },
  { label: 'Dark Mode', value: 'On / Off' },
  { label: 'Sidebar Style', value: 'Compact · Vertical · Mini' },
  { label: 'RTL Layout', value: 'One click' },
  { label: 'Border Radius', value: 'Soft · Medium · Sharp' },
  { label: 'Theme Presets', value: 'Neo · Ocean · Slate · Ember' },
];

export function CustomizerSection() {
  return (
    <section className="nk-section bg-white">
      <div className="nk-container grid items-center gap-12 lg:grid-cols-2">
        <SectionHeading
          align="left"
          eyebrow="Theme Customizer"
          title="Design your admin in"
          highlight="seconds"
          description="Switch accents, layouts, and direction live. NeoKit’s customizer is built for demos, client walkthroughs, and rapid branding."
        />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-primary/20 via-cyan-200/20 to-transparent blur-xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-slate-950 p-6 text-white shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">NeoKit Customizer</div>
                <div className="text-xs text-slate-400">Realtime preview · Persisted settings</div>
              </div>
              <div className="flex gap-1.5">
                {['#14B8A6', '#6366F1', '#F59E0B', '#EC4899', '#0EA5E9'].map((c) => (
                  <span key={c} className="h-5 w-5 rounded-full ring-2 ring-white/10" style={{ background: c }} />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {controls.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <span className="text-sm font-medium">{row.label}</span>
                  <span className="text-xs text-primary">{row.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
