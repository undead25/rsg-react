const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

const { PATH, ENV, SOURCEMAP } = require('./app.common');
const WEBPACK_BASE_CONFIG = require('./webpack.base');

const WEBPACK_PROD_CONFIG = {
  /**
   * Do not continue if got errors.
   * @see https://webpack.js.org/configuration/other-options/#bail
   */
  bail: true,
  /**
   * An entry point indicates which module webpack should use to begin
   * building out its internal dependency graph.
   * @see https://webpack.js.org/configuration/entry-context/
   */
  entry: [PATH.INDEX],
  /**
   * Choose a style of source mapping to enhance the debugging process.
   * @see https://webpack.js.org/configuration/devtool/#devtool
   */
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
  ],
  /**
   * How the different types of modules within a project will be treated.
   * @see https://webpack.js.org/configuration/module/
   */
  module: {
    // Makes missing exports an error instead of warning
    strictExportPresence: true,
    rules: [
      {{#if typescript}}
      {
        test: /\.ts[x]?$/,
        exclude: /(node_modules)/,
        include: PATH.SRC,
        loader: 'babel-loader!awesome-typescript-loader'
      },
      {{/if}}
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules)/,
        include: PATH.SRC,
        loader: 'babel-loader?cacheDirectory=true'
      },
      {{#if_eq preprocessor 'sass'}}
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap'
        })
      },
      {{/if_eq}}
      {{#if_eq preprocessor 'less'}}
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap!postcss-loader?sourceMap!less-loader?sourceMap'
        })
      },
      {{/if_eq}}
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?importLoaders=1&sourceMap!postcss-loader?sourceMap'
        })
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        }
      }
    ]
  }
};

module.exports = merge.strategy({
  plugins: 'replace',
  module: 'replace'
})(WEBPACK_BASE_CONFIG, WEBPACK_PROD_CONFIG);
