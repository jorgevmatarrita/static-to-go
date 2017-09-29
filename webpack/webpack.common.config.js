const 
    // Dependencies.
    path               = require('path'),
    webpack            = require('webpack'),
    // Pluggins.
    HtmlWebpackPlugin  = require('html-webpack-plugin'),
    ExtractTextPlugin  = require('extract-text-webpack-plugin'),
    // Path constants.
    ROOT         = path.resolve(__dirname, '../'),
    SOURCE       = path.resolve(ROOT, 'source'),
    APP          = path.resolve(ROOT, 'source/app'),
    PROD         = path.resolve(ROOT, 'production'),
    NODE_MODULES = path.resolve(ROOT, 'node_modules');

const Pages = pages => 
    pages.map(page => {
        return new HtmlWebpackPlugin({
                filename: page.filename,
                template: 'index.ejs',
                name : page.name
               })
    })
;

var config = {
    target: 'web',
    context : SOURCE,
    entry : {
        app : './app.entrypoint.js',
    },
    output : {
        path : PROD,
        filename : '[name]_[chunkhash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2017', 'react', 'stage-0'] }
                }],
            },
            { 
                test: /\.tpl$/,
                loader: 'ejs-loader?variable=data'
            },
            {
                test : /\.(html|php)$/,
                loader: 'html-loader',
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'autoprefixer-loader', 'sass-loader']
                })
            },
            {
                test: /\.(jpg|jpeg|gif)$/,
                exclude: [/node_modules/],
                loader: 'url-loader?limit=10000&name=./images/[name].[ext]'
            },
            {
                test: /\.(svg|ico|png)$/,
                exclude: [/node_modules/],
                loader: 'url-loader?limit=10000&name=./icons/[name].[ext]'
            },
            {
                test: /\.(ttf|eot)$/,
                exclude: [/node_modules/],
                loader: 'url-loader?limit=1&name=./fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles_[chunkhash].css'),
        ...Pages([
            { name : 'Home', filename : 'index.html' },
            { name : 'About', filename : 'about.html' }
        ])
    ],
    resolve : {
        modules : [NODE_MODULES, SOURCE, APP]
    },
};

// If the app has two or more entry points the CommonChunkPlugin is injected.
if (Object.keys(config.entry).length >= 2) {

    config.plugins = [
        ...config.plugins,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'shared',
            filename: '[name]_[chunkhash].js',
            minChunks: 2,
        })
    ];

}

module.exports = config;