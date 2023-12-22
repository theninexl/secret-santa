/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ean-blue': '##0081FF',
      },
      fontFamily: {
        'plex': ['"IBM Plex Sans"'],
        'yesteryear': ['"Yesteryear"']
      }
    },
  },
  plugins: [],
}

