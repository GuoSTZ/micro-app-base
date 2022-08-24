const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin'); // js压缩
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // css压缩
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制文件
const MiniCssExtractPlugin= require('mini-css-extract-plugin'); // css分离
const CompressionPlugin = require('compression-webpack-plugin'); // gzip压缩
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // webpack5 推荐使用css-minimizer-webpack-plugin

const { merge } = require('webpack-merge');
const {
  common,
  NAME_SPACE,
  REMOTE_PUBLIC,
  resolveApp,
  getModuleFederationPlugin
} = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: resolveApp("./build"),
    filename: 'js/[name]-[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].js',
    // 资源
    assetModuleFilename: 'assets/[name].[contenthash:8].[ext]',
    // 编译前清除目录
    clean: true
  },
  module: {
    rules: [
        {
          test: /\.css$/,
          use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            // 当解析antd.less，必须写成下面格式，否则会报Inline JavaScript is not enabled错误
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true
                }
              }
            },
          ],
        },
    ]
  },
  plugins: [
    getModuleFederationPlugin('production'), // add ModuleFederationPlugin
    new ExternalTemplateRemotesPlugin(),
    new htmlWebpackPlugin({
      ENV: 'production',
      filename: 'index.html',
      hash: true, // 为CSS文件和JS文件引入时，添加唯一的hash，破环缓存非常有用
      publicPath: `/${NAME_SPACE}/`,
      template: resolveApp('./public/index.ejs')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash:8].css'
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
