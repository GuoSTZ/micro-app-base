const webpack = require('webpack')
// const TerserPlugin = require('terser-webpack-plugin') // js压缩
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // css压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css分离
const CompressionPlugin = require('compression-webpack-plugin') // gzip压缩
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制文件
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // webpack5 推荐使用css-minimizer-webpack-plugin

const { merge } = require('webpack-merge')
const {
  NAME_SPACE,
  common,
  resolveApp, 
  addHtmlWebpackPlugin,
} = require('./webpack.common')

const getWebpackProdConfig = options => {
  const {
    env,
    remotePublic,
    cache,
    module,
    addWebpackPlugin,
    microFrontEndConfig,
    config: customConfig,
  } = options

  let otherPlugins = []
  if (addWebpackPlugin && typeof addWebpackPlugin === 'function') {
    otherPlugins = addWebpackPlugin('development') || []
  }

  if (addWebpackPlugin && Array.isArray(addWebpackPlugin)) {
    otherPlugins = addWebpackPlugin
  }

  let config = {
    mode: 'production',
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
            // 当解析antd.less，必须写成下面格式，否则会报Inline JavaScript is not enabled错误
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
      ],
      ...(module || {}),
    },
    plugins: [
      addHtmlWebpackPlugin({ env, namespace: NAME_SPACE }),
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
      }),
      ...otherPlugins,
    ]
  }
  if (customConfig) {
    config = {
      ...config,
      ...customConfig,
    }
  }
  return merge(common, config)
}

module.exports = getWebpackProdConfig
