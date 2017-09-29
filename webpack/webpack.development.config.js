const commonConfig = require('./webpack.common.config'),
      path         = require('path'),
      PROD         = '../production';

module.exports = Object.assign(commonConfig,
    {
        watch: true,
        devtool: 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname, PROD),
        }
    }
);