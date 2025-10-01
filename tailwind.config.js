/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff49db'
      },
      fontFamily: {
        blink: ['BlinkMacSystemFont-Thin', 'sans-serif']
      }
    }
  },
  plugins: []
}
