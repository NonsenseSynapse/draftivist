const { merge } = require('webpack-merge');
const common = require('./webpack.config.base');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
          '__API_HOSTNAME__': JSON.stringify(process.env.API_HOST)
        })
      ],
    output: {
        publicPath: process.env.STATIC_PATH
      },
})