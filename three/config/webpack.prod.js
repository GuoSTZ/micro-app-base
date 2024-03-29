const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css分离
const CompressionPlugin = require('compression-webpack-plugin') // gzip压缩
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制文件
const htmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const { merge } = require('webpack-merge')
const {
  common,
  resolveApp, 
  lessVars
} = require('./webpack.common')

const env = 'production';

module.exports = merge(common, {
  mode: env,
  entry: './src/index',
  output: {
    path: resolveApp('./build'),
    filename: 'js/[name]-[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js',
    // 资源
    assetModuleFilename: 'assets/[name].[contenthash:8].[ext]',
    // 编译前清除目录
    clean: true,
  },
  externals: {},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new htmlWebpackPlugin({
      ENV: env,
      filename: 'index.html',
      template: resolveApp('./public/index.html'),
      hash: true, // 为CSS文件和JS文件引入时，添加唯一的hash，破环缓存非常有用
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash:8].css',
    }),
    new CompressionPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./public",
          to: "", 
          globOptions: {
            ignore: [
              "**/index.html",
              "**/.DS_Store",
            ]
          }
        }
      ]
    })
  ]
})
