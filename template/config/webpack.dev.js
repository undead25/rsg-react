'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const APP_COMMON_CONFIG = require('./app.common');
const WEBPACK_BASE_CONFIG = require('./webpack.base');

const WEBPACK_DEV_CONFIG = {
  devtool: 'cheap-module-source-map',
  output: {
    path: APP_COMMON_CONFIG.PATH.BUILD,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: APP_COMMON_CONFIG.PATH.HTML
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // See https://github.com/Urthen/case-sensitive-paths-webpack-plugin
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(APP_COMMON_CONFIG.ENV.DEV) }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CaseSensitivePathsPlugin(),
    new BundleAnalyzerPlugin({ analyzerPort: 8883 }),
    new FriendlyErrorsPlugin()
  ],
  performance: {
    hints: false
  },
  devServer: {
    compress: true,
    contentBase: APP_COMMON_CONFIG.PATH.BUILD,
    clientLogLevel: 'none',
    watchContentBase: true,
    hot: true,
    publicPath: '/',
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    overlay: false,
    historyApiFallback: {
      disableDotRule: true
    },
    https: APP_COMMON_CONFIG.SERVER.PROTOCOL === 'https',
    host: APP_COMMON_CONFIG.SERVER.HOST,
    port: APP_COMMON_CONFIG.SERVER.PORT
  }
};

module.exports = merge.strategy({
  output: 'replace',
  plugins: 'replace'
})(WEBPACK_BASE_CONFIG, WEBPACK_DEV_CONFIG);
