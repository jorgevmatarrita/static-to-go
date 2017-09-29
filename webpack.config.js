const IS_PROD    = (process.env.npm_lifecycle_event === 'prod'),
      devConfig  = require('./webpack/webpack.development.config'),
      prodConfig = require('./webpack/webpack.production.config');

// Determines which config to use and then exports it.
module.exports = (IS_PROD) ? prodConfig : devConfig;