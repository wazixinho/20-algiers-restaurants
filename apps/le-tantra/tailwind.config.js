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
          primary: "#9D0208",
          secondary: "#D4AF37",
          accent: "#2B2D42",
          light: "#F8F8FF",
        }
      },
      fontFamily: {
        serif: ['"Italiana"', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
