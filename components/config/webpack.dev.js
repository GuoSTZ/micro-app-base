const htmlWebpackPlugin = require('html-webpack-plugin');

const { merge } = require('webpack-merge')
const {
  common,
  resolveApp,
  PORT
} = require('./webpack.common')

const env = 'development';

module.exports = merge(common, {
  target: 'web',
  mode: env,
  entry: './src/index', // 入口文件
  // 开发工具，开启 source map，编译调试
  devtool: 'eval-cheap-module-source-map',
  cache: {
    type: 'filesystem', // 启用持久化缓存
    cacheDirectory: resolveApp('.cache'), // 缓存文件存放的位置
    name: 'development-cache',
    buildDependencies: {
      // 缓存失效的配置
      config: [__filename],
    },
  },
  // experiments: {
  //   lazyCompilation: true,
  // },
  devServer: {
    host: 'localhost',
    port: PORT,
    headers: { //micro 跨域设置
      'Access-Control-Allow-Origin': '*',
    },
    open: true, // 自动打开页面
    hot: true, // 默认为true
    compress: true, // 是否开启代码压缩
    // watchContentBase: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    // contentBase: path.join(__dirname, '../public'),
    static: {
      // 托管的静态资源文件, 可通过数组的方式托管多个静态资源文件
      directory: resolveApp('public'),
    },
    client: {
      progress: true, // 在浏览器端打印编译进度
      overlay: {
        // 只显示错误信息
        errors: true,
        warnings: false,
      },
      logging: 'warn', // 控制台只显示warn以上信息
    },
    proxy: {
      '/soc': {
        target: 'http://192.168.51.211:9003/',
        // pathRewrite: {'^/soc': ''},
      },
      '/capaa': {
        target: 'http://192.168.51.211:9003/',
        // changeOrigin: true,
        pathRewrite: { '^/capaa': '' },
        // secure: false
      },
      '/userCenter': {
        target: 'http://192.168.51.211:9003/',
        pathRewrite: { '^/userCenter': '/soc' },
      },
      '/mock': {
        target: 'http://192.168.51.211:9003/',
        // changeOrigin: true,
        pathRewrite: { '^/mock': '' },
        // secure: false
      },
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
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
    // new webpack.HotModuleReplacementPlugin(), // HRM: 模块热替换
    new htmlWebpackPlugin({
      ENV: env,
      filename: 'index.html',
      publicPath: '/',
      template: resolveApp('./public/index.html'),
      hash: true, // 为CSS文件和JS文件引入时，添加唯一的hash，破环缓存非常有用
    })
  ],
})
