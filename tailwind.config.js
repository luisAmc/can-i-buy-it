const colors = require('tailwindcss/colors');

const brandColor = colors.indigo;

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        brand: brandColor
      },
      ringColor: {
        DEFAULT: brandColor['500']
      }
    }
  },
  plugins: []
};
