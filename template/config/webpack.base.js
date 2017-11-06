'use strict';

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_COMMON_CONFIG = require('./app.common');

module.exports = {
  entry: [
    APP_COMMON_CONFIG.PATH.INDEX
  ],
  output: {
    path: APP_COMMON_CONFIG.PATH.BUILD,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [APP_COMMON_CONFIG.PATH.NODE]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: APP_COMMON_CONFIG.PATH.SRC,
        loader: require.resolve('babel-loader'),
        options: {
          compact: true
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: APP_COMMON_CONFIG.PATH.HTML
    })
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}