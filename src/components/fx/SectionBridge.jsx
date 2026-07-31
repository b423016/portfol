import React from 'react';
import { motion } from 'framer-motion';

/**
 * Minimal section connector — thin line only.
 * Pattern from modern recruiter-first portfolios (not decorative noise).
 */
export default function SectionBridge() {
  return (
    <div
      className="relative h-12 sm:h-16 flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      <motion.div
        className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-white/15 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
