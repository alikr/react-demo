const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const config = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude:path.resolve(__dirname, 'node_modules/'),
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
          title : "react",
          name: 'html',
          template: path.join(__dirname,'src/index.html'),
          filename:path.join(__dirname,'dist/index.html'),
          excludeChunks: [],
          inject: true
        })
    ]
}

module.exports = function(env) {
    return env == 'prod' ? webpackMerge(config, {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true,
                    warnings: false,
                    drop_console: true,
                    drop_debugger: true,
                    dead_code: true
                },
                comments: false
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env)
            }),
        ]
    }) : config;
};