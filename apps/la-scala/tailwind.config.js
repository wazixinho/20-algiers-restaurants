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
          primary: "#1C1917",
          secondary: "#D4AF37",
          accent: "#44403C",
          light: "#FAFAF9",
        }
      },
      fontFamily: {
        serif: ['"IM Fell English"', 'Georgia', 'serif'],
        sans: ['"Mulish"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
