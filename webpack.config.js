const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
    module: true,
    libraryTarget: 'module'
  },
  experiments: {
    outputModule: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 9000
  }
};