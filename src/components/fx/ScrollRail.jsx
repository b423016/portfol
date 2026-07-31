import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const SECTIONS = ['home', 'projects', 'experience', 'skills', 'achievements', 'contact'];

/**
 * Fixed left spine that ties the whole page together —
 * progress fill + active node labels (desktop).
 */
export default function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });
  const [active, setActive] = useState('home');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.2, rootMargin: '-30% 0px -50% 0px' }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-0 h-[55vh]"
      aria-hidden="true"
    >
      <div className="relative w-px flex-1 bg-white/10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full origin-top bg-gradient-to-b from-white via-steel to-white/40"
          style={{ scaleY, height: '100%' }}
        />
      </div>

      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex flex-col justify-between py-1">
        {SECTIONS.map((id) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative flex items-center"
              title={id}
            >
              <span
                className={`block w-2 h-2 rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-white border-white scale-125 shadow-[0_0_12px_rgba(255,255,255,0.5)]'
                    : 'bg-void border-white/30 group-hover:border-white/70'
                }`}
              />
              <span
                className={`absolute left-4 font-mono text-[9px] tracking-widest uppercase whitespace-nowrap transition-all duration-300 ${
                  isActive ? 'opacity-100 text-white translate-x-0' : 'opacity-0 -translate-x-1 text-steel group-hover:opacity-60'
                }`}
              >
                {id}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
