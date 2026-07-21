'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  SmoothScroll,
  LandingNavbar,
  LandingFooter,
  HeroSection,
  TrustedSection,
  ShowcaseSection,
  FeaturesSection,
  ComponentsSection,
  CustomizerSection,
  ModulesSection,
  GallerySection,
  WhySection,
  ReviewsSection,
  FaqSection,
  PurchaseSection,
} from '@/components/landing';
import { useNeoKitPurchase } from '@/hooks/useNeoKitPurchase';
import { useUserAuth } from '@/context/UserAuthContext';

export const LandingPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useUserAuth();
  const { buy } = useNeoKitPurchase();
  const buyTriggered = useRef(false);

  useEffect(() => {
    if (buyTriggered.current) return;
    if (searchParams.get('buy') !== '1') return;
    if (!isAuthenticated) return;

    buyTriggered.current = true;
    router.replace('/', { scroll: false });
    void buy();
  }, [buy, isAuthenticated, router, searchParams]);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background text-text">
        <LandingNavbar />
        <main>
          <HeroSection />
          <TrustedSection />
          <ShowcaseSection />
          <FeaturesSection />
          <ComponentsSection />
          <CustomizerSection />
          <ModulesSection />
          <GallerySection />
          <WhySection />
          <ReviewsSection />
          <FaqSection />
          <PurchaseSection />
        </main>
        <LandingFooter />
      </div>
    </SmoothScroll>
  );
};
