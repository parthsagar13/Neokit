'use client';

import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';

const brands = [
  'React',
  'TypeScript',
  'Next.js',
  'Tailwind CSS',
  'Vite',
  'Redux',
  'React Query',
  'Recharts',
  'Formik',
  'Zod',
  'Framer Motion',
  'Radix UI',
];

export function TrustedSection() {
  return (
    <section className="border-b border-border bg-white py-12">
      <div className="nk-container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
        >
          Trusted by developers shipping with modern stacks
        </motion.p>
      </div>
      <Marquee gradient gradientColor="#ffffff" speed={36} pauseOnHover>
        {brands.map((brand) => (
          <div
            key={brand}
            className="mx-3 flex h-12 items-center rounded-xl border border-border bg-background px-6 text-sm font-semibold text-body shadow-sm"
          >
            {brand}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
