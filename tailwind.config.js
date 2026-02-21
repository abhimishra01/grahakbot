/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#07040f',
        surface: '#111118',
        surface2: '#1a1825',
        accent: '#8b5cf6',
        'accent-2': '#6366f1',
        'text-primary': '#ede9fe',
        'text-muted': '#4c4470',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'rgba(139,92,246,0.15)',
      },
      animation: {
        'dot-bounce': 'dotBounce 1.4s infinite ease-in-out both',
        'fade-up': 'fadeUp 0.3s ease-out forwards',
      },
      keyframes: {
        dotBounce: {
          '0%, 80%, 100%': { transform: 'scale(0)', opacity: '0.3' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
