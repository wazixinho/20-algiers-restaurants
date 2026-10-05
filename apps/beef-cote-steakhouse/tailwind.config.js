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
          primary: "#8D0801",
          secondary: "#D4AF37",
          accent: "#495057",
          light: "#F8F9FA",
        }
      },
      fontFamily: {
        serif: ['"Bebas Neue"', 'Georgia', 'serif'],
        sans: ['"Barlow"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
