/** @type {import('tailwindcss').Config} */
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
      colors: {
        primary: {
          DEFAULT: "#E8613A",
          light: "#F4906F",
          pale: "#FDE8E0",
        },
        secondary: {
          DEFAULT: "#3D6B2E",
          light: "#5A8C45",
          pale: "#E8F3E3",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          warm: "#FDF6F3",
          muted: "#F5F5F5",
        },
        "on-surface": {
          DEFAULT: "#1A1A1A",
          secondary: "#5C5C5C",
          tertiary: "#9E9E9E",
        },
        border: "#E8E0DC",
        error: "#C0392B",
        warning: "#E8613A",
        success: "#3D6B2E",
        badge: {
          perdido: "#C0392B",
          avistado: "#4A7FC1",
          adoptable: "#3D6B2E",
          urgente: "#E8613A",
        },
        neutral: {
          100: "#1A1A1A",
          80: "#5C5C5C",
          60: "#9E9E9E",
          20: "#E8E0DC",
          10: "#F5F5F5",
        },
      },
      fontFamily: {
        inter: ["Inter-Regular", "sans-serif"],
        "inter-semibold": ["Inter-SemiBold", "sans-serif"],
        "inter-bold": ["Inter-Bold", "sans-serif"],
        "plus-jakarta": ["PlusJakartaSans-Regular", "sans-serif"],
        "plus-jakarta-medium": ["PlusJakartaSans-Medium", "sans-serif"],
        "plus-jakarta-semibold": ["PlusJakartaSans-SemiBold", "sans-serif"],
        "plus-jakarta-bold": ["PlusJakartaSans-Bold", "sans-serif"],
        "plus-jakarta-extrabold": ["PlusJakartaSans-ExtraBold", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
        sm: "6px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "48px",
        "screen-padding": "16px",
        "card-padding": "16px",
        "section-gap": "24px",
      },
    },
  },
  plugins: [],
}
