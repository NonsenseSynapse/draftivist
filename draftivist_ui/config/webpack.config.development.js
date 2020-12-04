const { merge } = require('webpack-merge');
const common = require('./webpack.config.base');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        host: '0.0.0.0',
        port: 3000
      },
})