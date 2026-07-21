'use client';

import { motion } from 'framer-motion';
import {
  MessageSquare,
  Mail,
  CalendarDays,
  KanbanSquare,
  Receipt,
  FolderKanban,
  ContactRound,
  FolderOpen,
  ShoppingBag,
  UserRound,
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const modules = [
  { icon: MessageSquare, title: 'Chat', desc: 'Realtime conversations with threads and presence.' },
  { icon: Mail, title: 'Mail', desc: 'Inbox, compose, labels, and polished reading panes.' },
  { icon: CalendarDays, title: 'Calendar', desc: 'Month, week, and agenda views for scheduling.' },
  { icon: KanbanSquare, title: 'Kanban', desc: 'Drag-and-drop boards for project workflows.' },
  { icon: Receipt, title: 'Invoice', desc: 'Create, preview, and track billing documents.' },
  { icon: FolderKanban, title: 'Projects', desc: 'Task lists, members, and progress at a glance.' },
  { icon: ContactRound, title: 'CRM', desc: 'Contacts, deals, and pipeline-ready screens.' },
  { icon: FolderOpen, title: 'File Manager', desc: 'Folders, uploads, and media browsing UI.' },
  { icon: ShoppingBag, title: 'Ecommerce', desc: 'Products, orders, and storefront admin views.' },
  { icon: UserRound, title: 'User Management', desc: 'Roles, profiles, and permission-ready layouts.' },
];

export function ModulesSection() {
  return (
    <section id="modules" className="nk-section bg-background">
      <div className="nk-container">
        <SectionHeading
          eyebrow="Application Modules"
          title="Apps that feel like a"
          highlight="finished product"
          description="Ship more than dashboards. NeoKit includes complete application UIs you can customize for your domain."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {modules.map((mod, i) => (
            <motion.article
              key={mod.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="group rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg"
            >
              <div className="mb-3 inline-flex rounded-xl bg-slate-900 p-2.5 text-primary transition group-hover:bg-primary group-hover:text-white">
                <mod.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-text">{mod.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-body">{mod.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
