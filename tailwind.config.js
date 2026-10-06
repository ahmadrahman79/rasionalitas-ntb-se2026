/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f4fe',
          100: '#ebe9fd',
          200: '#d9d6fb',
          300: '#bbb5f7',
          400: '#978cf1',
          500: '#7563ea',
          600: '#6043de',
          700: '#5234c7',
          800: '#442da2',
          900: '#392882',
          950: '#23185b',
        },
        sidebar: {
          bg: '#5b58de',
          dark: '#4c49cc',
          light: '#716eed',
          card: '#292764'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(100, 110, 140, 0.08)',
        'soft-lg': '0 10px 30px -4px rgba(100, 110, 140, 0.12)',
        'purple-glow': '0 8px 25px -4px rgba(96, 67, 222, 0.35)',
      }
    },
  },
  plugins: [],
}
