'use strict';
const path = require('path');
const ip = require('ip');

const resolve = relativePath => path.resolve(__dirname, '..', relativePath);

module.exports = {
  ENV: {
    DEV: 'development',
    PROD: 'production',
    TEST: 'test'
  },
  PATH: {
    APP: resolve('.'),
    SRC: resolve('src'),
    BUILD: resolve('dist'),
    HTML: resolve('index.html'),
    NODE: resolve('node_modules'),
    INDEX: resolve('src/index.jsx')
  },
  SERVER: {
    PROTOCOL: process.env.HTTPS === 'true' ? 'https' : 'http',
    HOST: ip.address() || '0.0.0.0',
    PORT: 3000
  }
}
