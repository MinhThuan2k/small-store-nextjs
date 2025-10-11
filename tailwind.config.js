/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff49db'
      },
      fontFamily: {
        manrope: ['var(--font-manrope)', 'sans-serif']
      }
    }
  },
  plugins: []
}
