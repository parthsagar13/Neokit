import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Providers } from '@/components/Providers';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'NeoKit — Premium React Admin Dashboard Starter Kit',
    template: `%s | NeoKit`,
  },
  description:
    'NeoKit is a premium React + TypeScript admin dashboard starter kit with 150+ components, apps, theme customizer, dark mode, and RTL — built for production teams.',
  icons: {
    icon: '/brand/neokit-icon.png',
    apple: '/brand/neokit-icon.png',
  },
  openGraph: {
    type: 'website',
    title: 'NeoKit — Premium React Admin Dashboard Starter Kit',
    description:
      'Build beautiful admin dashboards faster with NeoKit. Lifetime access, full source code, and production-ready UI.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
