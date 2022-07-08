/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      minWidth: {
        120: '30rem'
      },
      minHeight: {
        28: '7rem',
        40: '10rem'
      }
    }
  },
  plugins: []
}
