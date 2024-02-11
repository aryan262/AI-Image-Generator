/** @type {import('tailwindcss').Config} */
export default {
  mode:'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '10000': '10000ms',
      },
    },
  },
  plugins: [],
}

