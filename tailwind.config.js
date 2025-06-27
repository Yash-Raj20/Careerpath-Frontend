export const content = ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"];
export const darkMode = "class";
export const theme = {
   extend: {
      animation: {
        dropdown: "fadeInScale 0.2s ease-out",
      },
      keyframes: {
        fadeInScale: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      }
    },
};
export const plugins = [];
