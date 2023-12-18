/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#25293C',
        'dark-component': '#2F3349',
        'dark-text': '#ACB0CC',
        'primary': '#5F57BF',
        'secondary': '#EA5455',
      },
    },
  },
  plugins: [],
}
