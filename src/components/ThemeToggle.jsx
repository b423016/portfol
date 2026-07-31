import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronUp, FiCheck } from 'react-icons/fi';
import {
  THEMES,
  DEFAULT_THEME,
  getStoredTheme,
  applyTheme,
} from '../theme/themes';

/**
 * On-site theme selector — fixed bottom-right.
 * Cycles Navy / Mono / Warm / Sky / Signal.
 */
export default function ThemeToggle({ compact = false }) {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    setTheme(applyTheme(getStoredTheme()));
  }, []);

  useEffect(() => {
    const onDoc = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const select = (id) => {
    setTheme(applyTheme(id));
    setOpen(false);
  };

  const current = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <div
      ref={panelRef}
      className={
        compact
          ? 'relative'
          : 'fixed bottom-5 right-5 z-[70] sm:bottom-6 sm:right-6'
      }
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className={`${
              compact ? 'absolute bottom-full right-0 mb-2' : 'mb-3'
            } w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-white/12 bg-panel shadow-2xl overflow-hidden`}
            style={{ background: 'color-mix(in srgb, var(--panel) 92%, transparent)' }}
            role="listbox"
            aria-label="Color themes"
          >
            <div className="px-4 py-3 border-b border-white/10">
              <p className="font-mono text-[10px] tracking-[0.28em] text-signal uppercase">
                Theme
              </p>
              <p className="text-xs text-steel mt-1">
                Pick a palette · saved on this device
              </p>
            </div>
            <ul className="p-2 space-y-0.5">
              {THEMES.map((t) => {
                const active = t.id === theme;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => select(t.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                        active
                          ? 'bg-signal/15 ring-1 ring-signal/35'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <span className="flex -space-x-1.5 shrink-0" aria-hidden>
                        {t.swatch.map((c) => (
                          <span
                            key={c}
                            className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                            style={{ background: c }}
                          />
                        ))}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 text-sm font-semibold text-steel-bright">
                          {t.label}
                          {active && (
                            <FiCheck className="text-signal shrink-0" size={14} />
                          )}
                        </span>
                        <span className="block text-[11px] text-steel truncate">
                          {t.blurb}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 pl-2.5 pr-3.5 py-2 rounded-full border border-white/15 bg-panel text-steel-bright hover:border-signal/50 hover:text-white transition-colors shadow-xl backdrop-blur-xl"
        style={{ background: 'color-mix(in srgb, var(--panel) 90%, transparent)' }}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Color theme: ${current.label}. Open theme selector.`}
      >
        <span className="flex -space-x-1" aria-hidden>
          {current.swatch.map((c) => (
            <span
              key={c}
              className="w-4 h-4 rounded-full border border-white/30"
              style={{ background: c }}
            />
          ))}
        </span>
        <span className="font-mono text-xs tracking-wide hidden xs:inline sm:inline">
          {current.label}
        </span>
        <FiChevronUp
          size={14}
          className={`text-signal transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  );
}
