const path = require("path")

const resolve = dir => path.resolve(__dirname,dir)

/* craco.config.js */
module.exports = {
  webpack:{
    alias:{
      "@": resolve('src')
    },
  },
  devServer: {
    port: 8091,
    headers: { //micro 跨域设置
      'Access-Control-Allow-Origin': '*',
    },
  }
};