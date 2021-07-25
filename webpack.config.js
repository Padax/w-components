import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'development',
    entry: {
      index: './index.js'
    },
    output: {
      path: `${__dirname}/dist/`,
      publicPath: '/',
      filename: '[name].bundle.js'
    },
    //devtool: 'eval-source-map',
    devtool: false,
    // optimization: {
    //   splitChunks: {
    //     chunks: 'all', 
    //     name: 'shared'
    //   }
    // },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { 
              loader: 'css-loader', 
              options: {
                modules: {
                  mode: resourcePath => {
                    /* Set local mode for all component css. */
                    if(/src\/components/i.test(resourcePath)) {
                      return 'local';
                    }
                    return 'global';
                  },
                  localIdentName: '[path][name]__[local]'
                }
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".js"],
      alias: {
        src: path.resolve(__dirname, 'src'),
        components: path.resolve(__dirname, 'src', 'components'),
        util: path.resolve(__dirname, 'src', 'util')
      }
    }
};