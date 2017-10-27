const 
    // Dependencies.
    path    = require('path'),
    webpack = require('webpack'),
    { readdirSync } = require('fs'),
    // Custom Modules.
    Pages = require('./pageProcessor'),
    // Pluggins.
    HtmlWebpackPlugin  = require('html-webpack-plugin'),
    ExtractTextPlugin  = require('extract-text-webpack-plugin'),
    webfontsGenerator = require('webfonts-generator'),
    // logger.
    log = msj => console.log(msj),
    // Path constants.
    ROOT         = path.resolve(__dirname, '../'),
    pth          = location => path.resolve(ROOT, location),
    SOURCE       = pth('source'),
    APP          = pth('source/app'),
    TEMPLATE     = pth('source/index.ejs'),
    ICONS        = pth('source/assets/icons'),
    IMAGES       = pth('source/assets/images'),
    FONTS        = pth('source/styles/fonts'),
    PROD         = pth('production'),
    NODE_MODULES = pth('node_modules');

webfontsGenerator(
    {
        files : readdirSync(ICONS).map(svg => `./source/assets/icons/${svg}`),
        dest: pth('source/styles/fonts'),
        fontName : 'icons',
        css : true,
        cssTemplate : pth('source/styles/icons/WebfontsGenerator/template.scss'),
        cssDest : pth('source/styles/icons/WebfontsGenerator/output.scss'),
        writeFiles : true,
        templateOptions : {
            baseSelector : '.icon',
            classPrefix : 'icon-'
        }
    },
    error => log(error || 'Done.')
);

module.exports = {
    target: 'web',
    context : SOURCE,
    entry : {
        app   : './app.entrypoint.js'
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
                    loader: 'babel-loader?cacheDirectory=false',
                    options: { presets: ['es2017', 'react', 'stage-0'] }
                }],
            },
            { 
                test: /\.(tpl|ejs)$/,
                loader: 'ejs-loader?variable=data',
                exclude : TEMPLATE,
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
                test: /\.(png|png|jpg|jpeg|gif)$/,
                include: IMAGES,
                loader: 'url-loader?limit=10000&name=./images/[name].[ext]'
            },
            {
                test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'url-loader?limit=1&name=./fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        ...Pages,
    ],
    resolve : {
        modules : [NODE_MODULES, SOURCE, APP]
    },
};