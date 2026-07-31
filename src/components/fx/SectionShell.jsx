import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Shared section chrome + scroll-linked fade/slide so the site feels one continuous system.
 */
export default function SectionShell({
  id,
  children,
  className = '',
  index = 0,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Lighter scroll motion — less paint thrash than scale+blur stacks
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], reduced ? [1, 1, 1, 1] : [0.55, 1, 1, 0.7]);
  const y = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], reduced ? [0, 0, 0, 0] : [32, 0, 0, -12]);

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ opacity, y }}
      className={`relative ${className}`}
    >
      {/* Shared section connector label */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 flex justify-center overflow-hidden" aria-hidden="true">
        <div className="h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Subtle index watermark — continuity across sections */}
      <span
        className="pointer-events-none absolute right-4 md:right-10 top-16 font-mono text-[10px] tracking-[0.4em] text-white/10 uppercase select-none"
        aria-hidden="true"
      >
        {String(index).padStart(2, '0')} // SYS
      </span>

      {children}
    </motion.section>
  );
}
