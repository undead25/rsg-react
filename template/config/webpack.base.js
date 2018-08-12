const { PATH } = require('./app.common');

module.exports = {
  /**
   * How and where webpack should output your bundles.
   * @see https://webpack.js.org/configuration/output/
   */
  output: {
    path: PATH.BUILD,
    pathinfo: true,
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    sourceMapFilename: 'static/js/[name].[hash:8].map',
    publicPath: PATH.PUBLIC
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
        loader: 'style-loader!css-loader?importLoaders=1!postcss-loader!sass-loader'
      },
      {{/if_eq}}
      {{#if_eq preprocessor 'less'}}
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader?importLoaders=1!postcss-loader!less-loader'
      },
      {{/if_eq}}
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?importLoaders=1!postcss-loader'
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
