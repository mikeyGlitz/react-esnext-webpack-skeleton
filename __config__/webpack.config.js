const { generateConfig, stripMetadata } = require('@easy-webpack/core');
const envProd = require('@easy-webpack/config-env-production');
const envDev = require('@easy-webpack/config-env-production');
const fontsAndImages = require('@easy-webpack/config-fonts-and-images');
const commonChunks = require('@easy-webpack/config-common-chunks-simple');
const css = require('@easy-webpack/config-css');
const generateIndex = require('@easy-webpack/config-generate-index-html');
const globalBluebird = require('@easy-webpack/config-global-bluebird');
const globalRegenerator = require('@easy-webpack/config-global-regenerator');
const uglify = require('@easy-webpack/config-uglify');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const path = require('path');
const { version } = require('../package.json');

const env = (process.env.NODE_ENV || 'development').toLowerCase();

const title = 'Skeleton';

const coreModules = {
  react: [
    'react',
    'react-dom'
  ]
};

const basePath = path.resolve(__dirname, '..');
const outDir = path.resolve(basePath, 'public');
const appDir = path.join(basePath, 'app');
const template = path.join(appDir, 'index.html');
const main = path.join(appDir, 'index');

const baseConfig = {
  entry: {
    app: main,
    react: coreModules.react
  },
  output: {
    path: outDir
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    enforceExtension: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin()
  ]
};

let config = generateConfig(
  baseConfig,
  fontsAndImages(),
  css(),
  globalBluebird(),
  globalRegenerator(),
  commonChunks({ appChunkName: 'app', firstChunk: 'react' }),
  generateIndex({
    minify: env === 'production',
    overrideOptions: {
      title, version, template
    }
  })
);

const exclude = [
  '__webpack_require__',
  'cb'
  // Additional exports go here
];

switch (env) {
  case 'production':
    config = generateConfig(
      config,
      envProd(),
      uglify({ debug: false, exclude })
    );
    break;
  default:
  case 'development':
    config = generateConfig(
      config,
      envDev({ devtool: '#inline-source-map' })
    );
    break;
}

module.exports = stripMetadata(config);
