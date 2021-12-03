const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '..', '..', '.env')
});
const webpack = require('webpack');

module.exports = {
  entry: ['./src/index.ts', './src/css/main.scss'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(svg|png)$/,
        type: 'asset/resource'
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Draftivist',
      template: path.resolve(__dirname, '../src/assets/index.ejs')
    }),
    new HtmlWebpackPlugin({
      filename: 'splash.html',
      template: path.resolve(__dirname, '../public/splash.html'),
      inject: false,
      publicPath: '/'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/assets/images'),
          to: path.resolve(__dirname, '../dist'),
        }
      ]
    }),
    new webpack.DefinePlugin( {
      "process.env": dotenv.parsed
    }),
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
};
