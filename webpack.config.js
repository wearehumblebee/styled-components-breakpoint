const path = require('path');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'src', 'index.js'),
  build: path.join(__dirname, 'lib'),
};

module.exports = {
  entry: {
    // Add the client which connects to our middleware
    index: ['babel-polyfill', PATHS.app],
  },
  output: {
    path: PATHS.build,
    filename: '[name].umd.js',
    libraryTarget: 'umd',
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
        loaders: ['babel-loader'],
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
