/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: 'var(--void)',
        panel: 'var(--panel)',
        surface: 'var(--surface)',
        steel: {
          DEFAULT: 'var(--muted)',
          dim: 'var(--muted-dim)',
          bright: 'var(--text)',
        },
        signal: {
          DEFAULT: 'var(--accent)',
          dim: 'var(--accent-dim)',
          glow: 'var(--accent-glow)',
        },
        line: 'var(--line)',
        amber: {
          live: '#F59E0B',
        },
        'electric-blue': 'var(--accent)',
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
