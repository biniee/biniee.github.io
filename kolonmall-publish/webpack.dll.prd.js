var path = require('path');
var webpack = require('webpack');
var outputPath = require('./conf/config.json').outputPath;

module.exports = {
  context: path.join(__dirname, 'webpack'),
  entry: {
    'vendor': ['./vendor'],
  },
  output: {
    path: path.join(__dirname, '/.tmp' + outputPath.javascripts + '/build'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '/webpack/dll', '[name]-manifest.json'),
      name: '[name]',
      context: path.join(__dirname, 'webpack'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ko/) /* only import moment & moment-ko */
  ],
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'webpack/common'),
      handlebars: 'handlebars/dist/handlebars.min.js',
    },
    modules: [
      path.join(__dirname, 'webpack'),
      'node_modules'
    ],
  }
};
