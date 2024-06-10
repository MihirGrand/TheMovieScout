module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ef233c",
        secondary: "#d90429",
        bglight: "#edf2f4",
        bgdark: {
          DEFAULT: "#2b2d42",
          100: "#8d99ae",
        },
      },
    },
    fontFamily: {
      light: ["QuickSand-Light", "sans-serif"],
      regular: ["QuickSand-Regular", "sans-serif"],
      medium: ["QuickSand-Medium", "sans-serif"],
      semibold: ["QuickSand-SemiBold", "sans-serif"],
      bold: ["QuickSand-Bold", "sans-serif"],
    },
  },
  plugins: [],
};
