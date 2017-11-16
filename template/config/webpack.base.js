const HtmlWebpackPlugin = require('html-webpack-plugin');

const { PATH } = require('./app.common');

module.exports = {
  /**
   * An entry point indicates which module webpack should use to begin
   * building out its internal dependency graph. 
   * @see https://webpack.js.org/configuration/entry-context/
   */
  entry: [
    `${require.resolve('webpack-dev-server/client')}?/`,
    require.resolve('webpack/hot/dev-server'),
    PATH.INDEX
  ],
  /**
   * Tells webpack where to emit the bundles it creates and how to name
   * these files.
   * @see https://webpack.js.org/configuration/output/
   */
  output: {
    path: PATH.BUILD,
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
    // extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    extensions: ['.js', '.jsx', '.json'],
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
      {
        test: /\.ts[x]?$/,
        exclude: /(node_modules)/,
        include: PATH.SRC,
        loader: 'babel-loader!awesome-typescript-loader'
      },
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules)/,
        include: PATH.SRC,
        loader: 'babel-loader?cacheDirectory=true'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader?sourceMap!postcss-loader?sourceMap!less-loader?sourceMap'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?importLoaders=1&sourceMap!postcss-loader?sourceMap'
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
