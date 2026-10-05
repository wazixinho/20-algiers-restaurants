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
          primary: "#9E2A2B",
          secondary: "#E09F3E",
          accent: "#335C67",
          light: "#FFF3B0",
        }
      },
      fontFamily: {
        serif: ['"Rufina"', 'Georgia', 'serif'],
        sans: ['"Raleway"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
