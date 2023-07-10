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
        primary: "rgb(0,136,72)",
        secondary: "rgb(128, 128, 137)",
        hover: "rgba(39, 39, 42, 0.12)",
        overlay: "rgba(0, 0, 0, 0.53)",
        bgSecondary: "rgb(179,236,207)",
        "color_hover": "rgba(39, 39, 42, 0.12)",
        "red_custom":"rgb(255,66,78)",
        "red_lighter_custom":"rgb(255, 170, 175)",
        "background_primary":"#F5F5FA",
        "text_secondary":"rgb(120, 120, 120)"
      },
      height: {
        header: "100px",
        search: "40px"
      },
      width: {
        search: "750px",
        "menu_user": "240px",
      },
      boxShadow: {
        search: "rgba(0, 0, 0, 0.28) 0px 6px 12px 0px",
        cart:"rgba(0, 0, 0, 0.1) 0px 0px 20px"
      },
      keyframes: {
        flash: {
          '0%': { transform: 'scale(1.3)'  },
          '100%': { transform: 'scale(1)'  },
        }
      },
      animation: {
        "active-flash": 'flash 0.6s ease-in-out infinite'
      }


    },
  },
  plugins: [],
}