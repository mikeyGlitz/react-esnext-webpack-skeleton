const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { version } = require('../package.json');
const { env, isDevelopment } = require('../envhelper');

const title = 'Webpack Skeleton';
const template = path.resolve('app/index.html');

const minify = isDevelopment ? false : {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  removeComments: true,
};

const config = {
  entry: {
    app: ['babel-polyfill', path.resolve('app/index')],
    react: ['react', 'react-dom', 'prop-types'],
  },
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: isDevelopment ? '[name].bundle.js' : '[name].[hash].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      { test: /\.(png|gif|jpg|cur)$/, loader: 'url-loader', query: { limit: 8192 } },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/font-woff' } },
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      {
        test: /\.pcss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: isDevelopment,
                includeLoaders: 1,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        }),
      },
    ],
  },
  plugins: [
    new LodashWebpackPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'react']
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: isDevelopment,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': env,
    }),
    new webpack.ProvidePlugin({
      Promise: 'imports-loader?this=>global!exports-loader?global.Promise!bluebird',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
      regeneratorRuntime: 'regenerator-runtime'
    }),
    new ExtractTextPlugin({ filename: 'styles.css', allChunks: true }),
    new HtmlWebpackPlugin({
      title,
      template,
      version,
      minify,
    }),
  ]
};

switch (env) {
  case 'production':
    config.plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compress: true,
        mangle: true,
        sourceMap: false
      }),
      new ImageminPlugin({
        test: /\.(png|gif|tiff?|jpe?g)$/
      }),
      ...config.plugins
    ];
    break;
  default:
  case 'development':
    config.devtool = 'eval';
    config.entry.app = [
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      'react-hot-loader/patch',
      ...config.entry.app
    ];
    config.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      ...config.plugins,
    ];
    config.devServer = {
      hot: true,
      quiet: false,
      port: 8080,
      inline: true,
      contentBase: 'http://localhost:8080/',
      stats: {
        colors: true,
      }
    };
    break;
}

module.exports = config;
