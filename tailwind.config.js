/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "myShadow": "2px 2px 6px  #bebebe "
      }
    },
  },
  plugins: [],
}