/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(30, 58, 138)',
        primaryHover: 'rgba(30, 58, 138, 0.8)',
        primaryText: 'rgb(23 37 84)',
      },
    },
  },
  plugins: [],
};
