/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050505",
        secondary: "#FFFFFF",
        accent: "#d2fd09",
        bgDark: "#0B0B0B",
        grayMuted: "#CCCCCC",
      },
      fontFamily: {
        heading: ["Bebas Neue", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(210, 253, 9, 0.3)',
        'glow-strong': '0 0 25px rgba(210, 253, 9, 0.5)',
      }
    },
  },
  plugins: [],
}
