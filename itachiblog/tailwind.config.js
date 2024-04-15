module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navbar_color: "#FB6D48",
        logo_bg: "#FFAF45",
        text_color: "#FFFFFF",
        hover_color: "#431415",
      },
      width:{
        'post-card': 'calc(33% - 20px)',
      }
    },
  },
  plugins: [],
};
