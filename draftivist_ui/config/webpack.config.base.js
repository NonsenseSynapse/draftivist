const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: ['./src/index.ts', './src/css/main.css'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      }
    ],
  },  
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'splash.html',
      template: path.resolve(__dirname, '../public/splash.html'),
      inject: false
    })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
};