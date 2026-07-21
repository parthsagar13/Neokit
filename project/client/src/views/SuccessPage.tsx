'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Download, LayoutGrid, Loader2 } from 'lucide-react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Button } from '@/components/ui/button';
import { templateApi } from '@/services/api';
import { useTemplateDownload } from '@/hooks/useTemplateDownload';
import { formatPrice } from '@/lib/format';
import { NEOKIT_PRODUCT_SLUG } from '@/lib/brand';
import type { Template } from '@/types';

export const SuccessPage = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug') || NEOKIT_PRODUCT_SLUG;
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const { download, isDownloading } = useTemplateDownload();

  useEffect(() => {
    let active = true;
    setLoading(true);
    templateApi
      .getBySlug(slug)
      .then((data) => {
        if (active) setTemplate(data);
      })
      .catch(() => {
        if (active) setTemplate(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-[0_20px_50px_-24px_rgba(15,23,42,0.25)] sm:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-text">Payment successful!</h1>
          <p className="mt-4 text-body">
            Thank you for purchasing NeoKit. Your download is ready.
          </p>

          {loading ? (
            <div className="mt-8 flex justify-center text-body">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : template ? (
            <Button
              className="mt-8 h-12 bg-primary px-8 text-white hover:bg-primary-hover"
              onClick={() => download(template._id, template.slug)}
              disabled={isDownloading(template._id)}
            >
              <Download className="mr-2 h-5 w-5" />
              {isDownloading(template._id) ? 'Preparing download...' : 'Download NeoKit'}
            </Button>
          ) : (
            <div className="mt-8 space-y-3">
              <p className="text-sm text-body">
                Your payment was received. Open My Downloads to get your files.
              </p>
              <Button asChild className="h-12 bg-primary px-8 hover:bg-primary-hover">
                <Link href="/dashboard/downloads">
                  <Download className="mr-2 h-5 w-5" />
                  Go to My Downloads
                </Link>
              </Button>
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <Link href="/" className="text-body transition hover:text-primary-active">
              Back to Home
            </Link>
            <span className="text-border">|</span>
            <Link
              href="/dashboard/downloads"
              className="flex items-center gap-2 text-body transition hover:text-primary-active"
            >
              <LayoutGrid className="h-4 w-4" />
              My Downloads
            </Link>
          </div>

          {template && (
            <div className="mt-10 grid gap-4 border-t border-border pt-8 sm:grid-cols-3">
              {[
                { label: 'Item', value: template.title },
                { label: 'License', value: 'Commercial Use' },
                {
                  label: 'Total',
                  value: formatPrice(template.price, template.isFree, template.currency || 'INR'),
                },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-primary-bg/60 p-4 text-left">
                  <p className="text-xs font-semibold uppercase text-slate-400">{item.label}</p>
                  <p className="mt-1 font-semibold text-text">{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <LandingFooter />
    </div>
  );
};
