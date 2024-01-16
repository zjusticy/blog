/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      gray: "rgba(0, 0, 0, 0.5)",
      "light-gray": "rgba(0, 0, 0, 0.1)",
      "primary-color": "#272727",
      "secondary-color": "rgb(236, 245, 240)",
      "button-color": "rgba(9, 132, 113, 0.9)",
    },
    extend: {
      spacing: {
        "grid-gutter": "16px",
      },
    },
  },
  plugins: [],
};
