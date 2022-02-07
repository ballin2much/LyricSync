// vue.config.js
module.exports = {
  // options...
  configureWebpack: {
    devServer: {
      watchOptions: {
        poll: true
      }
    }
  }
}
