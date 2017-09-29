const 
    // Config.
    commonConfig = require('./webpack.common.config'),
    // Dependencies.
    path = require('path'),
    // Plugins.
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    // Path constants.
    ROOT = path.resolve(__dirname, '../'),
    PROD = path.resolve(ROOT, 'production');

module.exports = Object.assign(commonConfig,
    {
        watch: false,
        devtool: 'eval',
        plugins: [
            ...commonConfig.plugins,
            new CleanWebpackPlugin([PROD], {
                root: ROOT,
                verbose: true,
            })
        ]
    }
);