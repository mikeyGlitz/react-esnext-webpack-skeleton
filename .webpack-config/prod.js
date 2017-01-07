const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(require('./common'), {
    output: {
        filename: '[hash].js',
        chunkFilename: '[chunkhash].bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourcemap: false,
            compress: true,
            mangle: {
                keepFnames: true,
                screw_ie8: true,
                except: []                
            }
        })
    ]
});