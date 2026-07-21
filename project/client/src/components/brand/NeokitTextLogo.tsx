'use client';

import { cn } from '@/lib/utils';
import { BRAND_NAME } from '@/lib/brand';

const sizeMap = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
} as const;

interface NeokitTextLogoProps {
  size?: keyof typeof sizeMap;
  className?: string;
  /** Show icon mark before the wordmark */
  showMark?: boolean;
  /** `onLight` for white headers, `onDark` for dark footers */
  variant?: 'onLight' | 'onDark';
}

/** Theme-colored text wordmark: Neo + Kit (primary teal) */
export function NeokitTextLogo({
  size = 'md',
  className,
  showMark = true,
  variant = 'onLight',
}: NeokitTextLogoProps) {
  const neoClass = variant === 'onDark' ? 'text-white' : 'text-text';

  return (
    <span
      className={cn('inline-flex items-center gap-2 font-bold tracking-tight', sizeMap[size], className)}
      aria-label={BRAND_NAME}
    >
      {showMark && (
        <span className="flex h-[1.15em] w-[1.15em] items-center justify-center rounded-full bg-primary text-[0.55em] font-extrabold text-white shadow-[0_4px_12px_-2px_rgba(20,184,166,0.55)]">
          N
        </span>
      )}
      <span className="leading-none">
        <span className={neoClass}>Neo</span>
        <span className="text-primary">Kit</span>
      </span>
    </span>
  );
}
