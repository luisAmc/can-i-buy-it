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
        brand: brandColor,
        'category-payment': colors.teal,
        'category-entertainment': colors.purple,
        'category-food': colors.rose,
        'category-car': colors.sky,
        'category-home': colors.yellow,
        'category-service': colors.pink,
        'category-other': colors.teal
      },
      ringColor: {
        DEFAULT: brandColor['500']
      }
    }
  },
  plugins: []
};
