'use client';

import Link from 'next/link';
import { NeokitTextLogo } from '@/components/brand/NeokitTextLogo';
import { SUPPORT_EMAIL } from '@/lib/brand';

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Dashboards', href: '#showcase' },
      { label: 'Components', href: '#components' },
      { label: 'Applications', href: '#modules' },
      { label: 'Pricing', href: '#purchase' },
    ],
  },
  {
    title: 'Marketplace',
    links: [
      { label: 'Browse Templates', href: '/templates' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy-policy' },
      { label: 'Refund Policy', href: '/refund-policy' },
      { label: 'Cancellation', href: '/cancellation-policy' },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-slate-800 bg-sidebar text-slate-300">
      <div className="nk-container grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <NeokitTextLogo size="xl" variant="onDark" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Premium React Admin Dashboard Starter Kit for teams who want beautiful, production-ready
            interfaces without reinventing the foundation.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-4 inline-block text-sm font-medium text-primary transition hover:text-teal-300"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith('#') ? (
                    <a href={link.href} className="text-sm transition hover:text-white">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm transition hover:text-white">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-800">
        <div className="nk-container flex flex-col items-center justify-between gap-3 py-6 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} NeoKit. All rights reserved.</p>
          <p>Crafted for premium product teams.</p>
        </div>
      </div>
    </footer>
  );
}
