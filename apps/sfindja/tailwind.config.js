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
          primary: "#264653",
          secondary: "#2A9D8F",
          accent: "#E76F51",
          light: "#F8F9FA",
        }
      },
      fontFamily: {
        serif: ['"Gilda Display"', 'Georgia', 'serif'],
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
