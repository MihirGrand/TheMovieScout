module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ef233c",
        primaryHover: "#f24f63",
        secondary: "#d90429",
        bglight: "#edf2f4",
        bgdark: {
          DEFAULT: "#2b2d42",
          100: "#8d99ae",
        },
      },
    },
    fontFamily: {
      qlight: ["QuickSand-Light", "sans-serif"],
      qregular: ["QuickSand-Regular", "sans-serif"],
      qmedium: ["QuickSand-Medium", "sans-serif"],
      qsemibold: ["QuickSand-SemiBold", "sans-serif"],
      qbold: ["QuickSand-Bold", "sans-serif"],
    },
  },
  plugins: [],
};
