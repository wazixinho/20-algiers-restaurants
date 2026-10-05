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
          primary: "#1B4332",
          secondary: "#E9C46A",
          accent: "#2D6A4F",
          light: "#F4F1DE",
        }
      },
      fontFamily: {
        serif: ['"Amiri"', 'Georgia', 'serif'],
        sans: ['"Cairo"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
