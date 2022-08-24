const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const { ModuleFederationPlugin } = webpack.container;

const PORT = 9998
const NAME_SPACE = 'app-capaa-platform'
const REMOTE_PUBLIC = 'https://192.168.52.146:18443/'

const resolveApp = relativePath => path.resolve(process.cwd(), relativePath)

const getRemoteEntryUrl = (env, {name, port, url }) => {
  if (env === 'production') {
    return `${name}@[HOST_URL]${name}/remoteEntry.js`
  }

  if (port) {
    return `${name}@http://localhost:${port}/remoteEntry.js`;
  }

  if (url) {
    const newUrl = url.includes('//') ? url : `//${url}`
    return `${name}@${newUrl}/remoteEntry.js`;
  }

  return `${name}@${REMOTE_PUBLIC}${name}/remoteEntry.js`;
}

const getModuleFederationPlugin = env => new ModuleFederationPlugin({
  name: NAME_SPACE,
  filename: 'remoteEntry.js',
  remotes: {
    'mc_common': getRemoteEntryUrl(env, { name: 'mc_common' }),
    'mc_components': getRemoteEntryUrl(env, { name: 'mc_components' }),
  }
});

const common = {
  // externals: { }, // 外部引入的资源，避免打包到自己的bundle中
  resolve: {
    alias: {
      '@': resolveApp('./src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    mainFiles: ['index.js', 'index.jsx', 'index.ts', 'index.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        include: resolveApp('./src'),
        exclude: /node_modules/
        // enforce: 'pre',
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        // 自动选择导出为单独文件还是url形式
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        },
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        // 分割为单独文件，并导出url
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(), // output 已经配置了clean，还需要吗？
    new webpack.DefinePlugin({ // 注入全局变量
      ENV: JSON.stringify(process.env.NODE_ENV),
      NAME_SPACE: JSON.stringify(NAME_SPACE),
      HOST_NAME_SPACE: JSON.stringify(NAME_SPACE),
      // API_VERSION: JSON.stringify(API_VERSION),
      // PROJECTION: JSON.stringify(PROJECTION)
    }),
    new ProgressBarPlugin({ // 进度条
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    })
  ]
}

module.exports = {
  PORT,
  common,
  NAME_SPACE,
  REMOTE_PUBLIC,
  resolveApp,
  getModuleFederationPlugin
}