const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin');
const path = require('path');

const { version } = require('../package.json');
const { env, isDevelopment } = require('../envhelper');

const title = 'Webpack Skeleton';
const template = path.resolve('app/index.html');

const minify = isDevelopment ? false : {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  removeComments: true
};

const config = {
  entry: {
    app: path.resolve('app/index'),
    react: ['react', 'react-dom']
  },
  output: {
    path: path.resolve('dist'),
    filename: isDevelopment ? '[name].bundle.js' : '[name].[hash].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      { test: /\.(png|gif|jpg|cur)$/, loader: 'url-loader', query: { limit: 8192 } },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader', query: { limit: 10000, mimetype: 'application/font-woff' } },
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment,
              includeLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new LodashWebpackPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'react']
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: isDevelopment
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': env
    }),
    new webpack.ProvidePlugin({
      /* eslint-disable global-require */
      Promise: require('bluebird'),
      regeneratorRuntime: require('regenerator-runtime')
      /* eslint-enable */
    }),
    new HtmlWebpackPlugin({
      title,
      template,
      version,
      minify
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
    config.devtool = 'inline-source-map';
    config.devServer = {
      hot: true,
      port: 8080,
      publicPath: 'http://localhost:8080'
    };
    break;
}

module.exports = config;
