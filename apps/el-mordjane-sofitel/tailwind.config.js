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
          primary: "#780016",
          secondary: "#C5A059",
          accent: "#1A1A1A",
          light: "#F8F6F0",
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Cinzel Decorative"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
