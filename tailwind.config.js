/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures all relevant files are scanned
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8", // Main blue for tabs and buttons
        secondary: "#9333ea", // Accent purple
        background: "#ffffff", // Light background
        card: "#f3f4f6", // Card background
        text: "#374151", // Main text color
        muted: "#6b7280", // Muted text (secondary info)
        border: "#e5e7eb", // Border color
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),       // Form styling
    require("@tailwindcss/typography"), // Enhanced typography
  ],
};
