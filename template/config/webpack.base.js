'use strict';

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_COMMON_CONFIG = require('./app.common');

module.exports = {
  /**
   * An entry point indicates which module webpack should use to begin
   * building out its internal dependency graph. 
   * @see https://webpack.js.org/configuration/entry-context/
   */
  entry: [
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
    APP_COMMON_CONFIG.PATH.INDEX
  ],
  /**
   * Tells webpack where to emit the bundles it creates and how to name
   * these files.
   * @see https://webpack.js.org/configuration/output/
   */
  output: {
    path: APP_COMMON_CONFIG.PATH.BUILD,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/'
  },
  /**
   * How modules are resolved
   * @see https://webpack.js.org/configuration/resolve/
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [APP_COMMON_CONFIG.PATH.NODE]
  },
  /**
   * How the different types of modules within a project will be treated.
   * @see https://webpack.js.org/configuration/module/
   */
  module: {
    // Makes missing exports an error instead of warning
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: APP_COMMON_CONFIG.PATH.SRC,
        loader: require.resolve('babel-loader'),
        options: {
          compact: true
        }
      }
    ]
  },
  /**
   * Customize the webpack build process
   * @see https://webpack.js.org/configuration/plugins/
   */
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    // @see https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      inject: true,
      template: APP_COMMON_CONFIG.PATH.HTML
    })
  ],
  /**
   * Some libraries import Node modules but don't use them in the browser.
   * Tell Webpack to provide empty mocks for them so importing them works.
   * @see https://webpack.js.org/configuration/node/
   */
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}