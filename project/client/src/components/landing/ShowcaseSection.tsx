'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { cn } from '@/lib/utils';

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    title: 'Overview Dashboard',
    desc: 'KPI cards, revenue charts, activity feeds, and executive summaries in one polished view.',
    accent: 'from-teal-500/20 to-cyan-500/10',
    widgets: ['Revenue', 'Orders', 'Conversion', 'Traffic'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    title: 'Analytics Dashboard',
    desc: 'Deep funnel metrics, cohort trends, and performance charts built for growth teams.',
    accent: 'from-cyan-500/20 to-sky-500/10',
    widgets: ['Sessions', 'Funnel', 'Sources', 'Retention'],
  },
  {
    id: 'crm',
    label: 'CRM',
    title: 'CRM Dashboard',
    desc: 'Pipeline stages, deal values, and customer health — ready for sales operations.',
    accent: 'from-emerald-500/20 to-teal-500/10',
    widgets: ['Leads', 'Deals', 'Pipeline', 'Forecast'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    title: 'Mobile Dashboard',
    desc: 'Responsive layouts that feel native on phones and tablets without rebuilding screens.',
    accent: 'from-violet-500/15 to-teal-500/10',
    widgets: ['Summary', 'Alerts', 'Tasks', 'Chat'],
  },
  {
    id: 'customizer',
    label: 'Customizer',
    title: 'Theme Customizer',
    desc: 'Live accent colors, dark mode, sidebar styles, RTL, radius, and curated presets.',
    accent: 'from-amber-500/15 to-teal-500/10',
    widgets: ['Colors', 'Layout', 'RTL', 'Presets'],
  },
  {
    id: 'dark',
    label: 'Dark Mode',
    title: 'Dark Mode Experience',
    desc: 'A carefully tuned dark palette with soft contrast — ideal for long admin sessions.',
    accent: 'from-slate-800/40 to-teal-900/20',
    widgets: ['Contrast', 'Charts', 'Tables', 'Forms'],
  },
  {
    id: 'rtl',
    label: 'RTL',
    title: 'RTL Ready Layouts',
    desc: 'Mirror-ready structure for Arabic and other RTL languages without layout breakage.',
    accent: 'from-rose-500/10 to-teal-500/10',
    widgets: ['Sidebar', 'Nav', 'Forms', 'Tables'],
  },
];

export function ShowcaseSection() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section id="showcase" className="nk-section bg-background">
      <div className="nk-container">
        <SectionHeading
          eyebrow="Dashboard Showcase"
          title="Every screen looks"
          highlight="production-ready"
          description="Explore NeoKit’s signature dashboards, theme controls, and layout modes — designed like a premium ThemeForest demo."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition',
                active === tab.id
                  ? 'border-primary bg-primary text-white shadow-[0_8px_24px_-8px_rgba(20,184,166,0.7)]'
                  : 'border-border bg-white text-body hover:border-primary/30 hover:text-primary-active'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="mt-10 overflow-hidden rounded-3xl border border-border bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.25)]"
          >
            <div className={`bg-gradient-to-br ${current.accent} p-4 sm:p-6 lg:p-8`}>
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-text sm:text-2xl">{current.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-body sm:text-base">{current.desc}</p>
                </div>
                <div className="flex gap-2">
                  {current.widgets.map((w) => (
                    <span
                      key={w}
                      className="rounded-lg border border-white/60 bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-text backdrop-blur"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className={cn(
                  'overflow-hidden rounded-2xl border border-slate-200/80 shadow-xl',
                  current.id === 'dark' ? 'bg-slate-950' : 'bg-slate-100'
                )}
              >
                <div
                  className={cn(
                    'flex items-center gap-2 border-b px-4 py-2.5',
                    current.id === 'dark'
                      ? 'border-slate-800 bg-slate-900'
                      : 'border-slate-200 bg-white'
                  )}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span
                    className={cn(
                      'ml-3 text-xs font-medium',
                      current.id === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    )}
                  >
                    neokit.app / {current.id}
                  </span>
                </div>
                <div className="grid gap-3 p-4 sm:grid-cols-12 sm:p-5">
                  <div
                    className={cn(
                      'hidden rounded-xl p-3 sm:col-span-3 sm:block',
                      current.id === 'dark' ? 'bg-slate-900' : 'bg-slate-900'
                    )}
                  >
                    <div className="mb-4 h-2.5 w-16 rounded bg-primary" />
                    <div className="space-y-2">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            'h-2 rounded',
                            i === 0 ? 'w-full bg-primary/70' : 'w-[70%] bg-slate-700'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-9">
                    <div className="mb-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
                      {['$84.2k', '3,842', '18.4%', '1.2k'].map((stat, i) => (
                        <div
                          key={stat}
                          className={cn(
                            'rounded-xl p-3',
                            current.id === 'dark'
                              ? 'bg-slate-900 text-white'
                              : 'bg-white text-text shadow-sm'
                          )}
                        >
                          <div
                            className={cn(
                              'mb-2 h-1.5 w-8 rounded',
                              i % 2 === 0 ? 'bg-primary' : 'bg-cyan-400'
                            )}
                          />
                          <div className="text-lg font-bold">{stat}</div>
                          <div
                            className={cn(
                              'text-[11px]',
                              current.id === 'dark' ? 'text-slate-400' : 'text-body'
                            )}
                          >
                            {current.widgets[i] ?? 'Metric'}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid gap-3 lg:grid-cols-3">
                      <div
                        className={cn(
                          'rounded-xl p-4 lg:col-span-2',
                          current.id === 'dark' ? 'bg-slate-900' : 'bg-white shadow-sm'
                        )}
                      >
                        <div
                          className={cn(
                            'mb-3 text-sm font-semibold',
                            current.id === 'dark' ? 'text-white' : 'text-text'
                          )}
                        >
                          Performance Trend
                        </div>
                        <svg viewBox="0 0 400 120" className="h-28 w-full">
                          <defs>
                            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.35" />
                              <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0 90 C40 80, 70 40, 110 50 C150 60, 180 95, 220 70 C260 45, 300 30, 340 40 C370 48, 390 55, 400 50 L400 120 L0 120 Z"
                            fill="url(#area)"
                          />
                          <path
                            d="M0 90 C40 80, 70 40, 110 50 C150 60, 180 95, 220 70 C260 45, 300 30, 340 40 C370 48, 390 55, 400 50"
                            fill="none"
                            stroke="#14B8A6"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div
                        className={cn(
                          'rounded-xl p-4',
                          current.id === 'dark' ? 'bg-slate-900' : 'bg-white shadow-sm'
                        )}
                      >
                        <div
                          className={cn(
                            'mb-3 text-sm font-semibold',
                            current.id === 'dark' ? 'text-white' : 'text-text'
                          )}
                        >
                          Activity
                        </div>
                        <div className="space-y-3">
                          {['New order received', 'Invoice paid', 'User signed up'].map((row) => (
                            <div key={row} className="flex items-center gap-2">
                              <span className="h-8 w-8 rounded-full bg-primary/15" />
                              <div className="flex-1">
                                <div
                                  className={cn(
                                    'text-xs font-medium',
                                    current.id === 'dark' ? 'text-slate-200' : 'text-text'
                                  )}
                                >
                                  {row}
                                </div>
                                <div className="h-1.5 w-full rounded bg-slate-200/40" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
