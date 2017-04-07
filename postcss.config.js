// eslint-disable-next-line strict
'use strict';

const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
};
