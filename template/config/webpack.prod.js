const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

const { PATH, ENV, SOURCEMAP } = require('./app.common');
const WEBPACK_BASE_CONFIG = require('./webpack.base');

const WEBPACK_PROD_CONFIG = {
  bail: true,
  entry: [PATH.INDEX],
  devtool: SOURCEMAP.PROD ? 'source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: PATH.HTML,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(ENV.PROD) }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: SOURCEMAP.PROD,
    }),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),
  ]
};

module.exports = merge.strategy({
  plugins: 'replace',
})(WEBPACK_BASE_CONFIG, WEBPACK_PROD_CONFIG);
