import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiGrid, FiCpu, FiGithub, FiLinkedin, FiMail, FiAward, FiBriefcase, FiMenu, FiX,
} from 'react-icons/fi';

const navItems = [
  { id: 'home', icon: <FiHome />, label: 'Home' },
  { id: 'projects', icon: <FiGrid />, label: 'Work' },
  { id: 'experience', icon: <FiBriefcase />, label: 'XP' },
  { id: 'skills', icon: <FiCpu />, label: 'Stack' },
  { id: 'achievements', icon: <FiAward />, label: 'Wins' },
  { id: 'contact', icon: <FiMail />, label: 'Contact' },
];

const SECTION_IDS = navItems.map((n) => n.id);

/** Which section owns the scroll focus line (just under the fixed nav). */
function getActiveSectionId() {
  // Focus band sits under the floating pill nav (~5.5rem)
  const focusY = Math.min(120, Math.max(72, window.innerHeight * 0.18));
  let active = SECTION_IDS[0];

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top;
    // Last section whose top has crossed above the focus line wins
    if (top <= focusY) active = id;
  }

  // Near page bottom: force last section so Contact sticks
  const doc = document.documentElement;
  const atBottom =
    window.scrollY + window.innerHeight >= doc.scrollHeight - 48;
  if (atBottom) active = SECTION_IDS[SECTION_IDS.length - 1];

  return active;
}

const Navigation = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ticking = useRef(false);
  const clickLock = useRef(null);

  const scrollToSection = (id) => {
    setActiveTab(id);
    setOpen(false);
    // Hold active state while smooth-scroll settles (avoid spy thrash)
    if (clickLock.current) window.clearTimeout(clickLock.current);
    clickLock.current = window.setTimeout(() => {
      clickLock.current = null;
    }, 900);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const syncFromScroll = useCallback(() => {
    setScrolled(window.scrollY > 24);
    if (clickLock.current) return;
    const next = getActiveSectionId();
    setActiveTab((prev) => (prev === next ? prev : next));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        syncFromScroll();
        ticking.current = false;
      });
    };

    syncFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (clickLock.current) window.clearTimeout(clickLock.current);
    };
  }, [syncFromScroll]);

  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.35 }}
          className={`site-nav flex items-center justify-between gap-2 px-2 py-2 rounded-2xl border transition-[background-color,box-shadow,border-color] duration-300 ${
            scrolled
              ? 'site-nav--scrolled border-line shadow-card'
              : 'border-line/80'
          }`}
          aria-label="Primary"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="hidden sm:flex items-center gap-2 pl-3 pr-2 font-display font-bold text-sm tracking-tight text-steel-bright"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-lift/80" />
            ayushjha
            <span className="text-steel">.online</span>
          </a>

          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  aria-label={item.label}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative px-3 py-2 rounded-xl text-xs font-mono tracking-wide transition-colors ${
                    isActive ? 'text-steel-bright' : 'text-steel hover:text-steel-bright/90'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-lift/[0.08] border border-lift/15"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="md:hidden p-2.5 rounded-xl text-steel hover:text-steel-bright border border-transparent hover:border-lift/10"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>

          <div className="flex items-center gap-1 pr-1">
            <a
              href="https://github.com/b423016"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl text-steel hover:text-steel-bright hover:bg-lift/5 transition-colors"
              aria-label="GitHub"
            >
              <FiGithub size={16} />
            </a>
            <a
              href="https://linkedin.com/in/ayush-jha-196470287"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl text-steel hover:text-steel-bright hover:bg-lift/5 transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={16} />
            </a>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-20 left-4 right-4 z-50 md:hidden glass-panel rounded-2xl p-3 border-lift/10 shadow-lg"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-mono ${
                  activeTab === item.id ? 'text-steel-bright bg-lift/10' : 'text-steel hover:text-steel-bright'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
