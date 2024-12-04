const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve('./dist'),
    filename: 'script/bundle.js',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  module: {
    rules: [{ test: /.ts$/, loader: 'ts-loader' }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
