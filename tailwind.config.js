export const content = ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"];
export const darkMode = "class";
export const theme = {
  extend: {
    animation: {
      dropdown: "fadeInScale 0.2s ease-out",
      "spin-slow": "spin 6s linear infinite",
      "fade-in": "fadeIn 3s ease-in-out infinite",
    },
    keyframes: {
      fadeInScale: {
        "0%": { opacity: 0, transform: "scale(0.95)" },
        "100%": { opacity: 1, transform: "scale(1)" },
      },
      fadeIn: {
        "0%, 100%": { opacity: 0 },
        "50%": { opacity: 1 },
      },
    },
  },
};
export const plugins = [];
