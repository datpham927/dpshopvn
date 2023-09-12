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
        "red_custom": "rgb(255,66,78)",
        "red_lighter_custom": "rgb(255, 170, 175)",
        "background_primary": "#F5F5FA",
        "text_secondary": "rgb(120, 120, 120)"
      },
      height: {
        header: "100px",
        search: "40px"
      },
      width: {
        search: "750px",
        "menu_user": "160px",
      },
      boxShadow: {
        search: "rgba(0, 0, 0, 0.28) 0px 6px 12px 0px",
        cart: "rgb(210,223,230) 0px 0px 20px"
      },
      keyframes: {
        flash: {
          '0%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        openChat: {
          '0%': { transform: 'scale(0)', opacity: "0" },
          '100%': { transform: 'scale(1)', opacity: "1" },
        }, openChatOff: {
          '0%': { transform: 'scale(1)', opacity: "1" },
          '100%': { transform: 'scale(0)', opacity: "0" },
        },
        openBoxChat: {
          '0%': { width: '0px', opacity: "0" },
          '100%': { width: '400px', opacity: "1" },
        }, openBoxChatOff: {
          '0%': { width: '400px', opacity: "1" },
          '100%': { width: '0px', opacity: "0" },
        },

      },
      animation: {
        "active-flash": 'flash 0.6s ease-in-out infinite',
        "active-openChat": 'openChat 0.3s',
        "active-openChatOff": 'openChatOff 0.3s',
        "active-openBoxChat": 'openBoxChat 0.3s',
        "active-openBoxChatOff": 'openBoxChatOff 0.3s'
      },

      screens: {
        'laptop': { "min": '1024px' },
        'tablet': { "max": '1023px' },
        'mobile': { "max": '739px' }
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
}
