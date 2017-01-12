const webpack = require('webpack');
const {
    generateConfig
} = require('@easy-webpack/core');
const envProd = require('@easy-webpack/config-env-production');

const generateIndex = require("./html-plugin");

module.exports = generateConfig(
    require('./common'),
    envProd(), {
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
    },
    generateIndex(true)
);
