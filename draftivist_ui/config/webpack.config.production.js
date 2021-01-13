const { merge } = require('webpack-merge');
const common = require('./webpack.config.base');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
          '__API_HOSTNAME__': "**FILL THIS IN**"
        })
      ]
})