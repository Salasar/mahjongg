var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var WebpackBrowserPlugin = require('webpack-browser-plugin');

module.exports = {
    entry: ['babel-polyfill', './main.js'],
    output: {
        path: 'build',
        filename: 'bundle.js'
    },
    devServer: {
        inline: true
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel" },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.html$/,
                loader: 'html?name=[name].[ext]',
            },
            { test: /\.(jpg|gif)$/, loader: "file?name=css/[name].[ext]" }
        ]
    },
    plugins: [
        new WebpackBrowserPlugin(),
        new ExtractTextPlugin("css/bundle.css"),
        new WebpackCleanupPlugin({quiet: true}),
    ],
    devtool: 'source-map',
    watch: true
};