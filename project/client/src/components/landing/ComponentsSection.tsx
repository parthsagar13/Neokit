'use client';

import { motion } from 'framer-motion';
import {
  Calendar,
  ChartColumn,
  ChevronsDownUp,
  FileText,
  FolderOpen,
  FormInput,
  Kanban,
  LayoutGrid,
  Mail,
  MessageSquare,
  Receipt,
  Shield,
  Table2,
  Users,
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const items = [
  { icon: ChevronsDownUp, label: 'Accordion' },
  { icon: FormInput, label: 'Buttons & Forms' },
  { icon: Table2, label: 'Data Tables' },
  { icon: ChartColumn, label: 'Charts' },
  { icon: Calendar, label: 'Calendar' },
  { icon: Kanban, label: 'Kanban' },
  { icon: Mail, label: 'Mail' },
  { icon: MessageSquare, label: 'Chat' },
  { icon: FolderOpen, label: 'File Manager' },
  { icon: Receipt, label: 'Invoice' },
  { icon: Users, label: 'Users' },
  { icon: Shield, label: 'Authentication' },
  { icon: LayoutGrid, label: 'Cards & Widgets' },
  { icon: FileText, label: 'Typography' },
];

export function ComponentsSection() {
  return (
    <section id="components" className="nk-section relative overflow-hidden bg-primary-bg/60">
      <div className="nk-noise" />
      <div className="nk-container relative">
        <SectionHeading
          eyebrow="UI Kit"
          title="A complete component library,"
          highlight="handcrafted"
          description="From foundational controls to full applications — every piece follows the same spacing, elevation, and interaction language."
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.35 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white px-3 py-5 text-center shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-text">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
