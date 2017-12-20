const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved
const resolve = relativePath => path.resolve(fs.realpathSync(process.cwd()), relativePath);

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
    PUBLIC: '/',
    {{#if typescript}}
    INDEX: resolve('src/index.tsx')
    {{else}}
    INDEX: resolve('src/index.js')
    {{/if}}
  },
  SERVER: {
    PROTOCOL: process.env.HTTPS === 'true' ? 'https' : 'http',
    HOST: process.env.HOST || '0.0.0.0',
    PORT: 3000
  },
  ANALYZER: {
    PORT: 3001,
    OPEN: false
  },
  SOURCEMAP: {
    DEV: true,
    PROD: false
  }
};
