/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        okra: ["Okra", "sans-serif"],
        "okra-medium": ["Okra-Medium", "sans-serif"],
        "okra-bold": ["Okra-Bold", "sans-serif"],
        "okra-extrabold": ["Okra-ExtraBold", "sans-serif"],
        "okra-light": ["Okra-MediumLight", "sans-serif"],
      },
      colors: {
        primary: "#FC5431",
        secondary: "#FDBBAA",
        tertiary: "#CF3239",
      },
    },
  },
  plugins: [],
};
