/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '480px',    // Extra small devices (phones, less than 576px)
        'sm': '640px',    // Small devices (tablets, 640px and up)
        'md': '768px',    // Medium devices (desktops, 768px and up)
        'lg': '1024px',   // Large devices (large desktops, 1024px and up)
        'xl': '1280px',   // Extra large devices (1280px and up)
        '2xl': '1440px',  // 2x large devices (1440px and up)
        '3xl': '1600px',  // 3x large devices (1600px and up)
        '4xl': '1920px',  // 4x large devices (1920px and up)
      }
    },
  },
  plugins: [],
};
