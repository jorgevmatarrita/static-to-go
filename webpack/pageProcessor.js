const path = require('path');
      join = path.join,
      dir = path.resolve(__dirname, '../source/app/pages'),
      {readdirSync, lstatSync} = require('fs'),
      isDirectory = source => lstatSync(source).isDirectory(),
      getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory),
      directories = getDirectories(dir),
      HtmlWebpackPlugin = require('html-webpack-plugin');

const Pages = directories.map(directory => {
    const splitDirectory = directory.split('/'),
          name = splitDirectory[splitDirectory.length - 1],
          jsFile = `${name}.js`,
          htmlFile = `${name}.html`;

    return {
        name : name,
        filename: htmlFile
    };

});

module.exports = Pages.map(

    page => new HtmlWebpackPlugin({ 
        inject : true,
        filename: page.filename,
        template: 'index.ejs',
        name : page.name,
        chunks : ['app'],
    })

);