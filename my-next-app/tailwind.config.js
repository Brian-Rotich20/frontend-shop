module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
       montserrat: ['Montserrat', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'], // optional: make it the default
      },
    },
  },
  plugins: [],
};
