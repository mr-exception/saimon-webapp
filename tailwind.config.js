module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: "#2d3142",
      secondary: "#4f5d75",

      warning: "#ef8354",
      danger: "#874000",

      base: "#eaebed",

      white: "white",
      black: "black",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
