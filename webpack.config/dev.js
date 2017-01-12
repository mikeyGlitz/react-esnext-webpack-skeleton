const envDev = require('@easy-webpack/config-env-development');
const { generateConfig } = require('@easy-webpack/core');

const generateIndex = require('./html-plugin');

module.exports = generateConfig(
    require('./common'),
    envDev({ devtool: '#inline-source-map'}),
    generateIndex(false)
);