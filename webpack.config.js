const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => ({
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
    historyApiFallback: true,
    compress: true,
    port: 9000,
    devMiddleware: {
      writeToDisk: filePath => !/.hot-update./ .test(filePath)
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      }
    }
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: env.analyze === 'true' ? 'server' : 'disabled' })
  ]
});