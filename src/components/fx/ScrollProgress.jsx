import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Neutral white progress — not loud teal/green */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100] bg-gradient-to-r from-white/90 via-steel-bright to-white/40"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
