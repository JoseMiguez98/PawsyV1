/** @type {import('tailwindcss').Config} */
const { colors, typography, radius, spacing } = require("./tokens.config");

module.exports = {
  // NOTE: Use content targeting all JS, JSX, TS, and TSX files in root-level folder groups
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily: {
        "plus-jakarta": [typography.fontFamily.sans],
      },
      borderRadius: Object.fromEntries(
        Object.entries(radius).map(([key, value]) => [
          key,
          value === 9999 ? "9999px" : `${value}px`,
        ])
      ),
      spacing: Object.fromEntries(
        Object.entries(spacing).map(([key, value]) => [key, `${value}px`])
      ),
    },
  },
  plugins: [],
};
