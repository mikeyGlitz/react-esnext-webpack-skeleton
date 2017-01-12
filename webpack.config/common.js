const commonChunks = require('@easy-webpack/config-common-chunks-simple');
const { generateConfig } = require("@easy-webpack/core");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const path = require('path');

const rootdir = path.resolve(__dirname, '..');
const srcDir = path.resolve(rootdir, 'app');
const distDir = path.resolve(rootdir, 'public');

const reactDeps = [
    'react',
    'react-dom'
    // Subsequent React dependencies here
];

const baseConfig = {
    context: srcDir,
    entry: {
        'app': 'index.js',
        'react': reactDeps
    },
    output: {
        path: distDir,
        filename: '[name].bundle.js'
    },
    resolve: {
        modules: [srcDir, 'node_modules'],
        extensions: ['.js', '.jsx', '.css'],
        enforceExtension: false
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader'
                })
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
                loader: 'url-loader', 
                query: { limit: 10000 }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "styles.css",
            disable: false,
            allChunks: true
        }),
        new LodashModuleReplacementPlugin()
    ]
};

module.exports = generateConfig(
    baseConfig,
    commonChunks({
        appChunkName: 'app',
        firstChunkName: 'react'
    })
);