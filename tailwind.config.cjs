const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
  ],
  daisyui: {
    themes: [
      {
        bionario: {
          ...require('daisyui/src/colors/themes')['[data-theme=forest]'],
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
