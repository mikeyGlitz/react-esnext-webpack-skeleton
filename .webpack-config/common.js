const ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

const debug = process.env.NODE_ENV === 'development';

const rootdir = path.resolve(__dirname, '..');
const srcDir = path.resolve(rootdir, 'app');
const distDir = path.resolve(rootdir, 'public');

module.exports = {
    context: srcDir,
    entry: {
        'app': 'index.js'
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
                use: ['babel-loader']
            },
            {
                test: /\.json$/,
                use: ['json-loader']
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
                use: [{ loader: 'url-loader', query: { limit: 10000 } }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.ejs',
            inject: 'body'
        }),
        new ExtractTextPlugin("styles.css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.bundle.js'
        })
    ]
}