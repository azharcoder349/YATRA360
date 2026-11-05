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
          50: '#FDFCF7',
          100: '#FAF6EF',
          200: '#F3ECE0',
          300: '#E7DC melt',
          400: '#D5C4AA',
          500: '#BAA385',
          800: '#3D352A',
          900: '#221D16',
        },
        forest: {
          50: '#F2F8F5',
          100: '#E2F0EA',
          200: '#C5E1D5',
          300: '#99C7B6',
          400: '#64A790',
          500: '#40916C',
          600: '#2D6A4F',
          700: '#1B4332',
          800: '#143628',
          900: '#0B2219',
          950: '#05130D',
        },
        terracotta: {
          50: '#FDF5F2',
          100: '#FBE8E2',
          200: '#F7D4C7',
          300: '#EEB29D',
          400: '#DE8668',
          500: '#C86D51',
          600: '#B25438',
          700: '#94412B',
          800: '#7B3726',
          900: '#653123',
        },
        sand: {
          100: '#F5EBE0',
          200: '#E6CCB2',
          300: '#DDB892',
          400: '#B08968',
          500: '#7F5539',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 10px 30px -5px rgba(27, 67, 50, 0.08), 0 4px 6px -2px rgba(27, 67, 50, 0.04)',
        'warm-lg': '0 20px 40px -10px rgba(27, 67, 50, 0.12), 0 8px 10px -4px rgba(27, 67, 50, 0.06)',
        'float': '0 25px 50px -12px rgba(11, 34, 25, 0.25)',
      }
    },
  },
  plugins: [],
}

