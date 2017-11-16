//@see https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb',
  plugins: [
    'react'
  ],
  rules: {
    'comma-dangle': 0,
    'import/no-extraneous-dependencies': 0
  }
}
