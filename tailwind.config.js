/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JavaScript, TypeScript, and JSX/TSX files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [ 
    require("@tailwindcss/forms"),       // Adds better form styles
    require("@tailwindcss/typography") // Adds enhanced typography styles]
  ]
}

