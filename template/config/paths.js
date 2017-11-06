'use strict';
const path = require('path');

const resolve = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
  APP: resolve(),
  SRC: resolve('src'),
  DIST: resolve('dist'),
  HTML: resolve('index.html'),
  NODE: resolve('node_modules'),
  INDEX: resolve('src/index.jsx')
}
