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
          primary: "#49111C",
          secondary: "#D4AF37",
          accent: "#0F4C5C",
          light: "#F8F5EE",
        }
      },
      fontFamily: {
        serif: ['"Amiri"', 'Georgia', 'serif'],
        sans: ['"Scheherazade New"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
