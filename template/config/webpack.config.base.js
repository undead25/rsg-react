'use strict';
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    '../src/index.jsx'
  ],
  output: {
    path: '../dist',
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],

  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: '../index.html',
      chunksSortMode: 'dependency',
    }),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: {
    hints: false
  }
}