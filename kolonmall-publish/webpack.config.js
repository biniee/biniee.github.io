var path = require('path');
var webpack = require('webpack');
var outputPath = require('./conf/config.json').outputPath;

var config = {
  context: path.join(__dirname, 'webpack'),
  entry: {
    'client': ['babel-polyfill', './client'],
    'handlebars': ['./handlebars'],
  },
  output: {
    path: path.join(__dirname, '/.tmp' + outputPath.javascripts + '/build'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            }
          },
          {
            loader: "eslint-loader"
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /utils\.js$/,
        use: [
          {
            loader: "unlazy-loader"
          },
        ],
      }
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, 'webpack'),
      manifest: require('./webpack/dll/vendor-manifest.json')
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'webpack/common'),
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
    extensions: ['.js', '.jsx']
  },
  node: {
    fs: 'empty',
  },
  watch: false
};

module.exports = config;
