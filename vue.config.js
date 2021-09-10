const path = require('path')

module.exports = {
  publicPath: './',
  devServer: {
    port: '80',
    host: 'electrotallinn.ee',
    overlay: {
      warnings: true,
      errors: true
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set(
      'vue$',
      path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm.js')
    )
  },
  lintOnSave: true
}
