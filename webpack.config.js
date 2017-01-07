let env = process.env.NODE_ENV || 'development';

env = env.toLowerCase();

let config = {};
switch (env) {
    case 'production':
        config = require('./.webpack-config/prod.js');
        break;
    default:
    case 'development':
        config = require('./.webpack-config/dev.js');
}

module.exports = config;