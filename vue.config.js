
require = require('esm')(module);
const path = require('path')
const { routes } = require('./src/routes.js')

module.exports = {
    publicPath: './',
  devServer: {
    port: '8080',
    host: 'localhost',
    overlay: {
      warnings: true,
      errors: true
    }
  },
  pluginOptions: {
    sitemap: {
        baseURL: 'https://map.electrotallinn.ee',
        outputDir: './',
        routes,
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
