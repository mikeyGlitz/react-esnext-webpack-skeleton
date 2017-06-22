const DEVELOPMENT = 'development';
const env = process.env.NODE_ENV;
const isDevelopment = env === DEVELOPMENT;

module.exports = { env, isDevelopment };
