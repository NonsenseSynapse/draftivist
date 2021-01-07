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
      },
      // {
      //   test: /\.(svg|png|jpe?g)$/,
      //   use: [
      //     {loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: path.resolve(__dirname, '../public'),
      //       publicPath: '/'
      //     }}
      //   ]
      // },
      // {
      //   test: /\.html$/,
      //   use: ['html-loader']
      // }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'splash.html',
      template: path.resolve(__dirname, '../public/splash.html'),
      inject: false,
      // publicPath: '/'
    }),
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist',),
    // publicPath: '/'
  },
};
