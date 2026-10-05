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
          primary: "#5C1D24",
          secondary: "#E07A5F",
          accent: "#3D405B",
          light: "#F4F1DE",
        }
      },
      fontFamily: {
        serif: ['"Spectral"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
