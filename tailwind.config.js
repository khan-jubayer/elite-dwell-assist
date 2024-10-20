/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5b4bd2",
          secondary: "#5b4bd2",
          accent: "#b83280",
          neutral: "#00acdf",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
