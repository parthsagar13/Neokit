'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, Loader2 } from 'lucide-react';
import { NeokitTextLogo } from '@/components/brand/NeokitTextLogo';
import { useAuth } from '@/context/AuthContext';
import { useUserAuth } from '@/context/UserAuthContext';
import { useNeoKitPurchase } from '@/hooks/useNeoKitPurchase';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Dashboards', href: '#showcase' },
  { label: 'Components', href: '#components' },
  { label: 'Apps', href: '#modules' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
];

export function LandingNavbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated: isAdmin } = useAuth();
  const { isAuthenticated: isUser } = useUserAuth();
  const { buy, processing } = useNeoKitPurchase();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-xl">
      <div className="nk-container flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <NeokitTextLogo size="lg" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-body transition hover:bg-primary-bg hover:text-primary-active"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAdmin ? (
            <Link
              href="/admin/dashboard"
              className="hidden h-10 items-center rounded-lg bg-primary-bg px-3 text-sm font-medium text-primary-active sm:inline-flex"
            >
              Admin
            </Link>
          ) : isUser ? (
            <Link
              href="/dashboard"
              className="hidden h-10 items-center gap-1.5 rounded-lg bg-primary-bg px-3 text-sm font-medium text-primary-active sm:inline-flex"
            >
              <User className="h-4 w-4" />
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden h-10 items-center rounded-lg px-3 text-sm font-medium text-body transition hover:text-primary-active sm:inline-flex"
            >
              Login
            </Link>
          )}
          <button
            type="button"
            onClick={() => void buy()}
            disabled={processing}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(20,184,166,0.7)] transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
          >
            {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Buy Now
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-body hover:bg-primary-bg hover:text-primary-active"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
