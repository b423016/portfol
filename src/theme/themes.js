/** Theme ids must match [data-theme] in index.css */
export const THEMES = [
  {
    id: 'navy',
    label: 'Navy',
    blurb: 'Halcyon · mint',
    swatch: ['#0B1220', '#64FFDA', '#8B9BB4'],
  },
  {
    id: 'mono',
    label: 'Mono',
    blurb: 'Ink · white',
    swatch: ['#0A0A0A', '#FAFAFA', '#A3A3A3'],
  },
  {
    id: 'warm',
    label: 'Warm',
    blurb: 'Studio · copper',
    swatch: ['#12100E', '#E8A87C', '#A89F94'],
  },
  {
    id: 'sky',
    label: 'Sky',
    blurb: 'Black · soft blue',
    swatch: ['#05070B', '#7DD3FC', '#8FA3B8'],
  },
  {
    id: 'signal',
    label: 'Signal',
    blurb: 'Current cyber',
    swatch: ['#05070B', '#2DD4BF', '#94A3B8'],
  },
];

export const DEFAULT_THEME = 'warm';
export const THEME_STORAGE_KEY = 'ayush-portfolio-theme';

export function applyTheme(id) {
  const theme = THEMES.find((t) => t.id === id) ? id : DEFAULT_THEME;
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  return theme;
}

export function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

/** Read live CSS vars for canvas / three.js */
export function readThemeColors() {
  const s = getComputedStyle(document.documentElement);
  const parseRgb = (v) =>
    (v || '45, 212, 191')
      .split(',')
      .map((n) => parseInt(n.trim(), 10) || 0);

  return {
    void: s.getPropertyValue('--void').trim() || '#05070b',
    panel: s.getPropertyValue('--panel').trim() || '#0a0f16',
    text: s.getPropertyValue('--text').trim() || '#e2e8f0',
    muted: s.getPropertyValue('--muted').trim() || '#94a3b8',
    accent: s.getPropertyValue('--accent').trim() || '#2dd4bf',
    accentDim: s.getPropertyValue('--accent-dim').trim() || '#14b8a6',
    accentGlow: s.getPropertyValue('--accent-glow').trim() || '#5eead4',
    ring: s.getPropertyValue('--ring').trim() || '#34d399',
    ringEmissive: s.getPropertyValue('--ring-emissive').trim() || '#059669',
    accentRgb: parseRgb(s.getPropertyValue('--accent-rgb')),
    packet1: parseRgb(s.getPropertyValue('--packet-1')),
    packet2: parseRgb(s.getPropertyValue('--packet-2')),
    packet3: parseRgb(s.getPropertyValue('--packet-3')),
  };
}
