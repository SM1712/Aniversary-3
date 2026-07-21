/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F5',
          100: '#F5F0E8',
          200: '#E8E1D5',
          300: '#D5C9B7',
        },
        ink: {
          900: '#1C1917',
          800: '#292524',
          700: '#44403C',
          500: '#78716C',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          900: '#881337',
        },
        gold: {
          500: '#d97706',
          600: '#b45309',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cursive: ['"Dancing Script"', 'cursive'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
