const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

const {
    version
} = require('../package.json');

const template = path.resolve(__dirname, '../app/index.html');
const title = 'skeleton';

module.exports = function(minify) {
    return {
        plugins: [
            new HtmlWebpackPlugin({
                minify: minify && {
                    collapseWhitespace: true,
                    removeComments: true
                },
                title,
                template,
                version
            })
        ]
    };
};
