'use client';

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

export const LandingPage = () => {
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
