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
          primary: "#582F0E",
          secondary: "#A68A64",
          accent: "#7F4F24",
          light: "#EDE0D4",
        }
      },
      fontFamily: {
        serif: ['"Vollkorn"', 'Georgia', 'serif'],
        sans: ['"Cabin"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
