'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Download, LayoutGrid, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { Button } from '@/components/ui/button';
import { downloadApi } from '@/services/api';
import { useUserAuth } from '@/context/UserAuthContext';

export const SuccessPage = () => {
  const { isAuthenticated } = useUserAuth();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to download');
      return;
    }

    try {
      setDownloading(true);
      await downloadApi.downloadNeoKit();
      toast.success('Download started');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setDownloading(false);
    }
  };

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

          <Button
            className="mt-8 h-12 bg-primary px-8 text-white hover:bg-primary-hover"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Download className="mr-2 h-5 w-5" />
            )}
            {downloading ? 'Preparing download...' : 'Download NeoKit'}
          </Button>

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
        </div>
      </div>

      <LandingFooter />
    </div>
  );
};
