/* craco.config.js */
module.exports = {
  devServer: {
    port: 8091,
    headers: { //micro 跨域设置
      'Access-Control-Allow-Origin': '*',
    },
  }
};