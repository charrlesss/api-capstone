const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "550px",
      "2xs": "320px",
      tablet:'862px' ,
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#0099FF",
      },
    },
  },
  extend: {},
  plugins: [],
};
