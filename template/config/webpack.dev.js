const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const { PATH, ENV, SERVER } = require('./app.common');
const WEBPACK_BASE_CONFIG = require('./webpack.base');

const WEBPACK_DEV_CONFIG = {
  devtool: 'cheap-module-source-map',
  output: {
    path: PATH.BUILD,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: PATH.HTML
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // See https://github.com/Urthen/case-sensitive-paths-webpack-plugin
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(ENV.DEV) }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CaseSensitivePathsPlugin(),
    // https://github.com/geowarin/friendly-errors-webpack-plugin
    new FriendlyErrorsPlugin(),
    // https://github.com/th0r/webpack-bundle-analyzer
    new BundleAnalyzerPlugin()
  ],
  performance: {
    hints: false
  },
  /**
   * Use webpack with a development server that provides live reloading.
   * @see https://webpack.js.org/configuration/dev-server/
   */
  devServer: {
    // Enable gzip compression for everything served
    compress: true,
    // Tell the server where to serve content from. 
    // This is only necessary if you want to serve static files. 
    contentBase: PATH.BUILD,
    // Prevent webpack's own logs shown in console.
    clientLogLevel: 'none',
    watchContentBase: true,
    // Open the browser
    open: true,
    // Enable webpack's Hot Module Replacement feature
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
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    https: SERVER.PROTOCOL === 'https',
    // Specify a host to use
    host: SERVER.HOST,
    port: SERVER.PORT
  }
};

module.exports = merge.strategy({
  output: 'replace',
  plugins: 'replace'
})(WEBPACK_BASE_CONFIG, WEBPACK_DEV_CONFIG);
