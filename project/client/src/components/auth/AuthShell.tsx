'use client';

import Link from 'next/link';
import { NeokitTextLogo } from '@/components/brand/NeokitTextLogo';
import { LandingFooter } from '@/components/landing/LandingFooter';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

/** Shared premium auth layout matching NeoKit landing theme */
export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="nk-noise" />
          <div className="nk-grid-overlay" />
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
        </div>

        <div className="relative w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Link href="/" className="inline-flex">
              <NeokitTextLogo size="xl" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border bg-white/90 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <div className="border-b border-border bg-gradient-to-r from-primary-bg via-white to-primary-bg px-6 py-7 text-center sm:px-8">
              <h1 className="text-2xl font-bold tracking-tight text-text sm:text-[1.75rem]">{title}</h1>
              <p className="mt-2 text-sm text-body">{subtitle}</p>
            </div>
            <div className="px-6 py-7 sm:px-8 sm:py-8">{children}</div>
          </div>
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}
