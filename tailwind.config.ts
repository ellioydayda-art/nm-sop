import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode surfaces
        'd-bg':      '#070709',
        'd-surface': '#0f0f13',
        'd-raised':  '#16161c',
        'd-border':  '#222228',
        'd-text':    '#f0f0f8',
        'd-muted':   '#8888a0',
        'd-subtle':  '#44445a',
        // Light mode surfaces
        'l-bg':      '#f4f4fa',
        'l-surface': '#ffffff',
        'l-raised':  '#ededf8',
        'l-border':  '#dcdcec',
        'l-text':    '#14142a',
        'l-muted':   '#5a5a78',
        'l-subtle':  '#9898b0',
        // Brand
        brand: {
          DEFAULT: '#8b7ff8',
          dark:    '#6c5ef5',
          light:   '#a89cf9',
          glow:    'rgba(139,127,248,0.25)',
        },
        accent: '#06d6a0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #8b7ff8 0%, #06d6a0 100%)',
        'card-gradient':  'linear-gradient(135deg, rgba(139,127,248,0.06) 0%, rgba(6,214,160,0.04) 100%)',
      },
      boxShadow: {
        'glow-brand': '0 0 30px rgba(139,127,248,0.2)',
        'glow-sm':    '0 0 15px rgba(139,127,248,0.12)',
        'card':       '0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.2)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.5), 0 16px 40px rgba(0,0,0,0.3)',
      },
      animation: {
        'fade-in':       'fadeIn 0.4s ease-out',
        'slide-up':      'slideUp 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'float':         'float 6s ease-in-out infinite',
        'float-slow':    'float 9s ease-in-out infinite',
        'pulse-glow':    'pulseGlow 3s ease-in-out infinite',
        'spin-slow':     'spin 8s linear infinite',
        'gradient-shift':'gradientShift 8s ease infinite',
        'stagger-1':     'slideUp 0.4s ease-out 0.05s both',
        'stagger-2':     'slideUp 0.4s ease-out 0.1s both',
        'stagger-3':     'slideUp 0.4s ease-out 0.15s both',
        'stagger-4':     'slideUp 0.4s ease-out 0.2s both',
        'stagger-5':     'slideUp 0.4s ease-out 0.25s both',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-14px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.08)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
export default config
