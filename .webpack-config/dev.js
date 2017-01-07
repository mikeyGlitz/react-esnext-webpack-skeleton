const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(require('./common'),
{
    devtool: 'inline-source-map',
    output: { chunkFilename: '[id].bundle.js'},
});