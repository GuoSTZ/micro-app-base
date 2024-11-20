const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: "static",
  runtimeCompiler: true,
  publicPath: './',
  outputDir: 'build',
  devServer: {
    host: "0.0.0.0",
    // 端口号
    port: 8093,
    headers: { //micro 跨域设置
      'Access-Control-Allow-Origin': '*',
    },
    https: false,
    // https:{type:Boolean}
    //配置自动启动浏览器
    open: true,
    //热更新
    hot: true,
    //配置多个跨域
    proxy: { }
    // proxy: proxyConfig.proxyList,
  },
});
