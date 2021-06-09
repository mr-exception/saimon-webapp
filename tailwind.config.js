module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#2F5061",
      secondary: "#4297A0",
      danger: "#E57F84",
      accent: "#E57F84",
      white: "white",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
