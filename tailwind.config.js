/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zinc: {
          50: 'oklch(0.98 0 0 / <alpha-value>)',
          100: 'oklch(0.96 0 0 / <alpha-value>)',
          200: 'oklch(0.92 0 0 / <alpha-value>)',
          300: 'oklch(0.86 0 0 / <alpha-value>)',
          400: 'oklch(0.72 0 0 / <alpha-value>)',
          500: 'oklch(0.62 0 0 / <alpha-value>)',
          600: 'oklch(0.50 0 0 / <alpha-value>)',
          700: 'oklch(0.40 0 0 / <alpha-value>)',
          800: 'oklch(0.27 0 0 / <alpha-value>)',
          900: 'oklch(0.18 0 0 / <alpha-value>)',
          950: 'oklch(0.12 0 0 / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
} 