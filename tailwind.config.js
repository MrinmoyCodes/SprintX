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
        accent: "#7CFF5B",
        bgDark: "#0B0B0B",
        grayMuted: "#999999",
      },
      fontFamily: {
        heading: ["Bebas Neue", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(124, 255, 91, 0.3)',
        'glow-strong': '0 0 25px rgba(124, 255, 91, 0.5)',
      }
    },
  },
  plugins: [],
}
