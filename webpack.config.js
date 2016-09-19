var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './main.js'],
    output: {
        path: 'build',
        filename: 'bundle.js',
        publicPath: 'build/',
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
            { test: /\.jpg$/, loader: "file?name=css/[name].[ext]" }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/bundle.css"),
        new WebpackCleanupPlugin({quiet: true}),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    devtool: 'source-map',
    watch: true
};