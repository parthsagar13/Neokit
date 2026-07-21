'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  decimals = 0,
  className,
  duration = 2.2,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {inView ? (
        <CountUp end={end} duration={duration} decimals={decimals} separator="," />
      ) : (
        0
      )}
      {suffix}
    </span>
  );
}
