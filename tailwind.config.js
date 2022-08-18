module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xl: { max: "1440px" },
      lg: { max: "976px" },
      md: { max: "768px" },
      sm: { max: "480px" },
    },
    extend: {},
  },
  plugins: [],
};
