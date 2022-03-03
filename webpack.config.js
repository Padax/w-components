const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
    module: true,
    libraryTarget: 'module'
  },
  experiments: {
    outputModule: true
  }
};