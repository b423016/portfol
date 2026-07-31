import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const SECTIONS = ['home', 'projects', 'experience', 'skills', 'achievements', 'contact'];

function getActiveSectionId() {
  const focusY = Math.min(120, Math.max(72, window.innerHeight * 0.18));
  let active = SECTIONS[0];
  for (const id of SECTIONS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= focusY) active = id;
  }
  const doc = document.documentElement;
  if (window.scrollY + window.innerHeight >= doc.scrollHeight - 48) {
    active = SECTIONS[SECTIONS.length - 1];
  }
  return active;
}

/**
 * Fixed left spine that ties the whole page together —
 * progress fill + active node labels (desktop).
 */
export default function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });
  const [active, setActive] = useState('home');
  const ticking = useRef(false);

  useEffect(() => {
    const sync = () => {
      const next = getActiveSectionId();
      setActive((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        sync();
        ticking.current = false;
      });
    };
    sync();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-0 h-[55vh]"
      aria-hidden="true"
    >
      <div className="relative w-px flex-1 bg-lift/10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full origin-top bg-gradient-to-b from-lift via-steel to-lift/40"
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
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="group relative flex items-center"
              title={id}
            >
              <span
                className={`block w-2 h-2 rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-lift border-lift scale-125 shadow-[0_0_12px_rgba(var(--accent-rgb),0.35)]'
                    : 'bg-void border-lift/30 group-hover:border-lift/70'
                }`}
              />
              <span
                className={`absolute left-4 font-mono text-[9px] tracking-widest uppercase whitespace-nowrap transition-all duration-300 ${
                  isActive ? 'opacity-100 text-steel-bright translate-x-0' : 'opacity-0 -translate-x-1 text-steel group-hover:opacity-60'
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
