/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        historical: {
          50: '#faf8f1',
          100: '#f5f0e1',
          200: '#eadfbf',
          300: '#dcc896',
          400: '#ccab66',
          500: '#c19344',
          600: '#b38139',
          700: '#946732',
          800: '#795530',
          900: '#644729',
        }
      },
    },
  },
  plugins: [],
} 