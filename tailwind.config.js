/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'kode': ['Kode Mono', 'monospace'],
      },
      colors: {
        'terminal-green': '#4ADE80',
        'terminal-dark': '#0F172A',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'glow 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
} 