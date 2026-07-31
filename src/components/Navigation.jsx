import React, { useState, useEffect } from 'react';
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

const Navigation = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    setActiveTab(id);
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTab(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: '-20% 0px -55% 0px' }
    );
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.35 }}
          className={`flex items-center justify-between gap-2 px-2 py-2 rounded-2xl border transition-all duration-300 ${
            scrolled
              ? 'bg-void/85 backdrop-blur-2xl border-white/12 shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
              : 'bg-black/50 backdrop-blur-xl border-white/10'
          }`}
          aria-label="Primary"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="hidden sm:flex items-center gap-2 pl-3 pr-2 font-display font-bold text-sm tracking-tight text-white"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
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
                    isActive ? 'text-white' : 'text-steel hover:text-white/90'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/15"
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
            className="md:hidden p-2.5 rounded-xl text-steel hover:text-white border border-transparent hover:border-white/10"
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
              className="p-2.5 rounded-xl text-steel hover:text-white hover:bg-white/5 transition-colors"
              aria-label="GitHub"
            >
              <FiGithub size={16} />
            </a>
            <a
              href="https://linkedin.com/in/ayush-jha-196470287"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl text-steel hover:text-white hover:bg-white/5 transition-colors"
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
            className="fixed top-20 left-4 right-4 z-50 md:hidden glass-panel rounded-2xl p-3 border-white/10 shadow-lg"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-mono ${
                  activeTab === item.id ? 'text-white bg-white/10' : 'text-steel hover:text-white'
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
