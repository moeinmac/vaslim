/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./UI/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        alibaba: ["var(--alibaba)"],
        kalameh: ["var(--kalameh)"],
      },
      colors: {
        black: "var(--black)",
        blue: "var(--blue)",
        orange: "var(--orange)",
        white: "var(--white)",
        gray: "var(--gray)",
      },
      spacing : {
        "800" : "100px"
      }
    },
  },
  plugins: [],
};
