module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f5cb5c",
        primaryHover: "#FF6969",
        secondary: "#d90429",
        lightText: "#e8eddf",
        bglight: "#e8eddf",
        bgdark: {
          DEFAULT: "#242423",
          100: "#333533",
          200: "#474947",
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
