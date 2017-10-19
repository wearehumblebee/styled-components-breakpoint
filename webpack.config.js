const path = require('path');
const webpack = require('webpack');

const hotMiddlewareScript = 'webpack-hot-middleware/client?name=bundle';


const PATHS = {
  app: path.join(__dirname, 'src', 'index.js'),
  build: path.join(__dirname, 'public', 'assets', 'scripts'),
};

module.exports = {
  entry: {
    // Add the client which connects to our middleware
    client: ['babel-polyfill', PATHS.app, hotMiddlewareScript],
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/assets/scripts/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
  },
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'react-hot-loader/webpack'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
