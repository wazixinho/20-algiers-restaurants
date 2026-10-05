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
          primary: "#2D5A27",
          secondary: "#C99700",
          accent: "#78281F",
          light: "#FBF7F0",
        }
      },
      fontFamily: {
        serif: ['"Amiri"', 'Georgia', 'serif'],
        sans: ['"Tajawal"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
