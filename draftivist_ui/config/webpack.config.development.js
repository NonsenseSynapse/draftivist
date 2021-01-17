const { merge } = require('webpack-merge');
const common = require('./webpack.config.base');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        host: '0.0.0.0',
        port: 3000
      },
    plugins: [
      new webpack.DefinePlugin({
        '__API_HOSTNAME__': JSON.stringify("http://localhost:8000/api")
      })
    ]
})