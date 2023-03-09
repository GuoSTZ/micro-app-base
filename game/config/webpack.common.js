const chalk = require('chalk')
const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const packageJson = require('../package.json');

const PORT = packageJson.port
const NAME_SPACE = packageJson.name
const resolveApp = relativePath => path.resolve(process.cwd(), relativePath)

const common = {
  externals: {}, // 外部引入的资源，避免打包到自己的bundle中
  resolve: {
    alias: {
      '@': resolveApp('./src'),
      handlebars: 'handlebars/dist/handlebars.js',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.png'],
    mainFiles: ['index.js', 'index.jsx', 'index.ts', 'index.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: resolveApp('./src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        include: resolveApp('./src'),
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
    new webpack.DefinePlugin({ // 注入全局变量
      ENV: JSON.stringify(process.env.NODE_ENV),
      NAME_SPACE: JSON.stringify(NAME_SPACE),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ProgressBarPlugin({
      // 进度条
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    }),
  ],
}

module.exports = {
  common,
  resolveApp,
  PORT,
  NAME_SPACE
}
