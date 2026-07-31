/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* color-mix keeps opacity modifiers valid with hex CSS vars */
        void: 'color-mix(in srgb, var(--void) calc(<alpha-value> * 100%), transparent)',
        panel: 'color-mix(in srgb, var(--panel) calc(<alpha-value> * 100%), transparent)',
        surface: 'color-mix(in srgb, var(--surface) calc(<alpha-value> * 100%), transparent)',
        steel: {
          DEFAULT: 'color-mix(in srgb, var(--muted) calc(<alpha-value> * 100%), transparent)',
          dim: 'color-mix(in srgb, var(--muted-dim) calc(<alpha-value> * 100%), transparent)',
          bright: 'color-mix(in srgb, var(--text) calc(<alpha-value> * 100%), transparent)',
        },
        signal: {
          DEFAULT: 'color-mix(in srgb, var(--accent) calc(<alpha-value> * 100%), transparent)',
          dim: 'color-mix(in srgb, var(--accent-dim) calc(<alpha-value> * 100%), transparent)',
          glow: 'color-mix(in srgb, var(--accent-glow) calc(<alpha-value> * 100%), transparent)',
        },
        line: 'color-mix(in srgb, var(--line) calc(<alpha-value> * 100%), transparent)',
        /* Theme-aware overlays: white/black on dark, ink/white on Paper */
        lift: 'rgb(var(--lift) / <alpha-value>)',
        shade: 'rgb(var(--shade) / <alpha-value>)',
        amber: {
          live: '#F59E0B',
        },
        'electric-blue': 'color-mix(in srgb, var(--accent) calc(<alpha-value> * 100%), transparent)',
      },
      fontFamily: {
        display: ['"Syne"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        signal: '0 0 40px rgba(var(--accent-rgb), 0.15)',
        'signal-lg': '0 0 80px rgba(var(--accent-rgb), 0.25)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
