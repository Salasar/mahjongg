var path = require('path');

module.exports = {
    entry: './main.js',
    output: {
        path: 'build',
        filename: 'bundle.js',
        publicPath: 'build',
    },
    devServer: {
        inline: true
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel" }
        ]
    },
    devtool: 'source-map',
    watch: true
};