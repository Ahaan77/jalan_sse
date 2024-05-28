/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anybody: ['"Anybody"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
