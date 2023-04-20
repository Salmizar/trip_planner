/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {}
  },
  plugins: [],
}

