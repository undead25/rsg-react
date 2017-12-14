const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { PATH } = require('./app.common');

module.exports = {
  /**
   * Tells webpack where to emit the bundles it creates and how to name
   * these files.
   * @see https://webpack.js.org/configuration/output/
   */
  output: {
    path: PATH.BUILD,
    pathinfo: true,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    sourceMapFilename: 'static/js/[name].[hash:8].map',
    publicPath: '/'
  },
  /**
   * How modules are resolved
   * @see https://webpack.js.org/configuration/resolve/
   */
  resolve: {
    extensions: [{{#if typescript}}'.ts', '.tsx', {{/if}}'.js', '.jsx', '.json'],
    modules: [PATH.NODE]
  },
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
      template: PATH.HTML
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
};
