'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { NeokitLogo } from '@/components/brand/NeokitLogo';
import { useAuth } from '@/context/AuthContext';
import { useUserAuth } from '@/context/UserAuthContext';
import { cn } from '@/lib/utils';

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
  const pathname = usePathname();
  const { isAuthenticated: isAdmin } = useAuth();
  const { isAuthenticated: isUser } = useUserAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-[#111827]/92 text-white backdrop-blur-xl">
      <div className="nk-container flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <NeokitLogo size="md" useWordmarkImage className="brightness-0 invert" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/templates"
            className={cn(
              'rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white',
              pathname.startsWith('/templates') && 'text-primary'
            )}
          >
            Marketplace
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/templates"
            className="hidden h-10 items-center rounded-lg px-3 text-sm font-medium text-slate-300 transition hover:text-white sm:inline-flex"
          >
            <ShoppingCart className="mr-1.5 h-4 w-4" />
            Browse
          </Link>
          {isAdmin ? (
            <Link
              href="/admin/dashboard"
              className="hidden h-10 items-center rounded-lg bg-white/10 px-3 text-sm font-medium sm:inline-flex"
            >
              Admin
            </Link>
          ) : isUser ? (
            <Link
              href="/dashboard"
              className="hidden h-10 items-center gap-1.5 rounded-lg bg-white/10 px-3 text-sm font-medium sm:inline-flex"
            >
              <User className="h-4 w-4" />
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden h-10 items-center rounded-lg px-3 text-sm font-medium text-slate-300 transition hover:text-white sm:inline-flex"
            >
              Login
            </Link>
          )}
          <a
            href="#purchase"
            className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary-hover"
          >
            Buy Now
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#111827] px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/templates"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5"
            >
              Marketplace
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
