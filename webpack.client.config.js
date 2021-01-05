const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ReactServerWebpackPlugin = require('react-server-dom-webpack/plugin');
const ReactServerWebpackPlugin = require('./plugin/ReactFlightWebpackPlugin')
  .default;
// const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const cwd = process.cwd();

module.exports = {
  context: path.resolve(cwd, './'),
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  entry: [path.resolve(__dirname, './src/index.client.tsx')],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'main.js',
    pathinfo: false,
    futureEmitAssets: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        // use: 'babel-loader',
        use: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, './public/index.html'),
    }),
    // new ReactRefreshPlugin(),
    new ReactServerWebpackPlugin({
      isServer: false,
    }),
  ],
};
