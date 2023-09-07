const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const chalk = require('chalk')
const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const packageJson  = require('../package.json');

const PORT = packageJson.port;
const NAME_SPACE = packageJson.name;

const resolveApp = relativePath => path.resolve(__dirname, relativePath)

const common = {
  externals: {}, // 外部引入的资源，避免打包到自己的bundle中
  resolve: {
    alias: {
      '@': resolveApp('../src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    mainFiles: ['index.js', 'index.jsx', 'index.ts', 'index.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: resolveApp('../src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [],
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 大于10kb将会启用file-loader将文件单独导出
          },
        },
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new AntdDayjsWebpackPlugin(),
    new ProgressBarPlugin({
      // 进度条
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    }),
    new webpack.DefinePlugin({ // 注入全局变量
      ENV: JSON.stringify(process.env.NODE_ENV),
      NAME_SPACE: JSON.stringify(NAME_SPACE),
    }),
  ],
}

module.exports = {
  PORT,
  NAME_SPACE,
  common,
  resolveApp
}
