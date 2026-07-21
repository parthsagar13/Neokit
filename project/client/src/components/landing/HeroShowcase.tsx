'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Bell,
  TrendingUp,
  Users,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  CreditCard,
  Activity,
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

/** Cache-bust so browsers load the latest full screenshot */
const IMG = {
  overview: '/landing/neokit-overview.png?v=3',
  mobile: '/landing/neokit-mobile.png?v=2',
  dark: '/landing/neokit-dark.png?v=2',
} as const;

function FullImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      decoding="async"
      fetchPriority="high"
      draggable={false}
      className={className}
    />
  );
}

/** Large MacBook — image keeps natural aspect ratio, nothing cropped */
function MacBookScreen() {
  return (
    <div className="relative w-full">
      <div className="rounded-[14px] border border-slate-700 bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900 p-1.5 shadow-[0_45px_90px_-25px_rgba(15,23,42,0.6)] sm:rounded-[18px] sm:p-2">
        <div className="mb-1.5 flex items-center justify-center">
          <span className="h-[3px] w-14 rounded-full bg-slate-500/90" />
        </div>

        {/* Full screenshot — width 100%, height AUTO (never forced shorter) */}
        <div className="rounded-[8px] bg-white ring-1 ring-black/25 sm:rounded-[10px]">
          <FullImage
            src={IMG.overview}
            alt="NeoKit Overview Dashboard — full screen"
            className="block h-auto w-full max-w-none rounded-[8px] sm:rounded-[10px]"
          />
        </div>
      </div>

      <div className="mx-auto h-[6px] w-[101%] -translate-x-[0.5%] rounded-b-md bg-gradient-to-b from-slate-600 to-slate-800" />
      <div className="mx-auto h-2.5 w-[110%] -translate-x-[5%] rounded-b-[12px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-lg" />
      <div className="mx-auto h-1 w-[30%] rounded-b-md bg-slate-600" />
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-[96px] rounded-[22px] border-[3px] border-slate-800 bg-slate-900 shadow-[0_22px_44px_-12px_rgba(15,23,42,0.55)] sm:w-[120px]">
      <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-11 -translate-x-1/2 rounded-full bg-slate-700" />
      <div className="p-[3px] pt-4">
        <div className="overflow-hidden rounded-[14px] bg-white">
          <FullImage
            src={IMG.mobile}
            alt="NeoKit mobile dashboard"
            className="block h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}

function CustomizerPanel() {
  return (
    <div className="nk-glass w-[140px] rounded-xl p-2.5 shadow-[0_18px_40px_-12px_rgba(15,23,42,0.35)] sm:w-[158px]">
      <div className="mb-2 flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span className="text-[10px] font-bold text-text">Theme Customizer</span>
      </div>
      <div className="space-y-2 text-[9px] text-body">
        <div>
          <div className="mb-1 font-medium">Accent Color</div>
          <div className="flex gap-1">
            {['#14B8A6', '#6366F1', '#F59E0B', '#EC4899'].map((c) => (
              <span
                key={c}
                className="h-3.5 w-3.5 rounded-full ring-1 ring-black/5"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
        {['Dark Mode', 'Sidebar Style', 'RTL', 'Radius'].map((label) => (
          <div key={label} className="flex items-center justify-between">
            <span>{label}</span>
            <span className="h-3 w-6 rounded-full bg-primary/25 p-0.5">
              <span className="block h-2 w-2 rounded-full bg-primary" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PopupChip({
  icon: Icon,
  title,
  subtitle,
  color,
}: {
  icon: typeof Bell;
  title: string;
  subtitle: string;
  color: string;
}) {
  return (
    <div className="nk-glass flex max-w-[176px] items-start gap-2 rounded-xl px-2.5 py-2 shadow-[0_14px_30px_-10px_rgba(15,23,42,0.3)]">
      <div className={`mt-0.5 rounded-lg p-1.5 ${color}`}>
        <Icon className="h-3 w-3 text-white" />
      </div>
      <div>
        <div className="text-[10px] font-bold text-text">{title}</div>
        <div className="text-[9px] text-body">{subtitle}</div>
      </div>
    </div>
  );
}

const rotatingWidgets = [
  {
    key: 'payment',
    node: (
      <PopupChip
        icon={CheckCircle2}
        title="Payment Success"
        subtitle="$249 · NeoKit License"
        color="bg-emerald-500"
      />
    ),
  },
  {
    key: 'visitors',
    node: (
      <PopupChip icon={Users} title="Live Visitors" subtitle="128 browsing demos" color="bg-primary" />
    ),
  },
  {
    key: 'orders',
    node: (
      <PopupChip
        icon={CreditCard}
        title="Recent Orders"
        subtitle="Pro Kit · 2 min ago"
        color="bg-indigo-500"
      />
    ),
  },
  {
    key: 'notify',
    node: (
      <PopupChip
        icon={Bell}
        title="Notifications"
        subtitle="3 new dashboard alerts"
        color="bg-amber-500"
      />
    ),
  },
];

export function HeroShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [widgetIndex, setWidgetIndex] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 22 });
  const sy = useSpring(my, { stiffness: 55, damping: 22 });

  const laptopX = useTransform(sx, [-0.5, 0.5], [-5, 5]);
  const laptopY = useTransform(sy, [-0.5, 0.5], [-3, 3]);
  const sideX = useTransform(sx, [-0.5, 0.5], [8, -8]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setWidgetIndex((i) => (i + 1) % rotatingWidgets.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative w-full overflow-visible pt-6"
    >
      <div className="pointer-events-none absolute left-1/2 top-[40%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

      {/* Dark mode — above laptop, does not cover bottom */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: [0, -8, 0], rotate: [-1.5, 1, -1.5] }}
        transition={{
          opacity: { delay: 0.25, duration: 0.55 },
          y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 6.2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute left-0 top-0 z-20 w-[118px] overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl sm:w-[150px]"
      >
        <div className="border-b border-slate-700 px-2 py-1 text-[8px] font-semibold uppercase tracking-wide text-slate-300">
          Dark Mode
        </div>
        <FullImage src={IMG.dark} alt="NeoKit dark mode" className="block h-auto w-full" />
      </motion.div>

      {/* Customizer — top right */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, y: [0, -9, 0], rotate: [1.5, -1, 1.5] }}
        transition={{
          opacity: { delay: 0.35, duration: 0.55 },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 },
          rotate: { duration: 6.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 },
        }}
        style={{ x: sideX }}
        className="absolute right-0 top-0 z-30"
      >
        <CustomizerPanel />
      </motion.div>

      {/* MAIN LAPTOP — full width of column, full image height */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ x: laptopX, y: laptopY }}
        className="relative z-10 mx-auto w-full max-w-none pt-12 sm:pt-14"
      >
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        >
          <MacBookScreen />
        </motion.div>
      </motion.div>

      {/* Phone — left side, mid height (not covering laptop bottom) */}
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        style={{ x: sideX }}
        className="absolute left-[-6px] top-[42%] z-20 sm:left-[-10px] sm:top-[38%]"
      >
        <motion.div
          animate={{ y: [0, -11, 0], rotate: [-2.5, 1.5, -2.5] }}
          transition={{
            y: { duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.35 },
            rotate: { duration: 6.4, repeat: Infinity, ease: 'easeInOut', delay: 0.35 },
          }}
        >
          <PhoneMockup />
        </motion.div>
      </motion.div>

      {/* Analytics strip — right mid, small clear preview */}
      <motion.div
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, y: [0, -8, 0], rotate: [2, -1.2, 2] }}
        transition={{
          opacity: { delay: 0.4, duration: 0.6 },
          y: { duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 },
          rotate: { duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 },
        }}
        className="absolute right-[-4px] top-[48%] z-20 w-[132px] overflow-hidden rounded-xl border border-white/70 bg-white/85 p-1.5 shadow-xl backdrop-blur sm:right-[-8px] sm:w-[150px]"
      >
        <div className="mb-1 flex items-center justify-between px-1">
          <span className="text-[9px] font-bold text-text">Analytics</span>
          <Activity className="h-3 w-3 text-primary" />
        </div>
        <FullImage src={IMG.overview} alt="Analytics preview" className="block h-auto w-full rounded-md" />
      </motion.div>

      {/* KPI chips — do not cover laptop bottom edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{
          opacity: { delay: 0.6 },
          y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute left-[18%] top-[34%] z-30 hidden rounded-xl border border-white/70 bg-white/90 px-2.5 py-2 shadow-lg backdrop-blur sm:block"
      >
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary-bg p-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
          </div>
          <div>
            <div className="text-[8px] text-body">Revenue</div>
            <div className="text-xs font-bold text-text">$48.2k</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 0.7 },
          y: { duration: 5.1, repeat: Infinity, ease: 'easeInOut', delay: 0.2 },
        }}
        className="absolute left-[22%] top-[58%] z-30 rounded-xl border border-white/70 bg-white/90 px-2 py-1.5 shadow-lg backdrop-blur"
      >
        <div className="flex items-center gap-1.5">
          <ShoppingBag className="h-3 w-3 text-amber-500" />
          <span className="text-[9px] font-semibold text-text">
            Orders <AnimatedCounter end={1284} />
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{
          opacity: { delay: 0.75 },
          y: { duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.35 },
        }}
        className="absolute right-[16%] top-[34%] z-30 hidden rounded-xl border border-white/70 bg-white/90 px-2 py-1.5 shadow-lg backdrop-blur md:block"
      >
        <div className="flex items-center gap-1.5">
          <Users className="h-3 w-3 text-primary" />
          <span className="text-[9px] font-semibold text-text">
            Customers <AnimatedCounter end={8642} />
          </span>
        </div>
      </motion.div>

      {/* Rotating widgets — beside laptop, not over bottom charts */}
      <div className="absolute right-[12%] top-[62%] z-40 hidden h-[52px] w-[180px] lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={rotatingWidgets[widgetIndex].key}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            {rotatingWidgets[widgetIndex].node}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
