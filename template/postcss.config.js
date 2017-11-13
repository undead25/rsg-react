const autoprefixer = require('autoprefixer');
const flexbugsfixes = require('postcss-flexbugs-fixes');

module.exports = {
  plugins: [
    flexbugsfixes,
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9'
      ],
      flexbox: 'no-2009',
    })
  ]
}