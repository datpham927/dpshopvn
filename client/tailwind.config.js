import shadows from '@mui/material/styles/shadows';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(26,148,255)",
        secondary: "rgb(128, 128, 137)",
        hover: "rgba(39, 39, 42, 0.12)",
        overlay: "rgba(0, 0, 0, 0.53)",
        bgSecondary: "rgb(219, 238, 255)",
        "color_hover": "rgba(39, 39, 42, 0.12)"
      },
      height: {
        header: "100px",
        search: "40px"
      },
      width: {
        search: "750px",
        "menu_user": "240px"
      },
      boxShadow: {
        search: "rgba(0, 0, 0, 0.28) 0px 6px 12px 0px"
      }


    },
  },
  plugins: [],
}