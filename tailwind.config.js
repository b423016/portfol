/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#05070B',
        panel: '#0A0F16',
        steel: {
          DEFAULT: '#94A3B8',
          dim: '#64748B',
          bright: '#E2E8F0',
        },
        signal: {
          DEFAULT: '#2DD4BF',
          dim: '#14B8A6',
          glow: '#5EEAD4',
        },
        amber: {
          live: '#F59E0B',
        },
        // keep alias used across components
        'electric-blue': '#2DD4BF',
      },
      fontFamily: {
        display: ['"Syne"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        signal: '0 0 40px rgba(45, 212, 191, 0.15)',
        'signal-lg': '0 0 80px rgba(45, 212, 191, 0.25)',
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
