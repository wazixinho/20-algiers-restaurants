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
          primary: "#0E4D92",
          secondary: "#E6AF2E",
          accent: "#1D2D44",
          light: "#F0EBD8",
        }
      },
      fontFamily: {
        serif: ['"Scheherazade New"', 'Georgia', 'serif'],
        sans: ['"Tajawal"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
