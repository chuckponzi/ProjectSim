/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures all relevant files are scanned
  ],
  theme: {
    extend: {
      colors: {
        primary: "#98C1D9", // Muted blue-gray for primary elements
        secondary: "#EE6C4D", // Soft brick red for accents
        accent: "#E0FBFC", // Light aqua for backgrounds or highlights
        background: "#F4F4F9", // Off-white gray for overall background
        text: "#3D5A80", // Deep slate blue for text
        card: "#E0FBFC", // Light aqua for card backgrounds
        muted: "#6B7280", // Gray for muted/secondary text
        border: "#CBD5E1", // Light gray-blue for borders
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),       // Form styling
    require("@tailwindcss/typography"), // Enhanced typography
  ],
};
