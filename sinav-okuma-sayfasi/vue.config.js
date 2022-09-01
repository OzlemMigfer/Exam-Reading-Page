const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  // configureWebpack: {
  //   module: {
  //     rules: [
  //       {       
  //        test: /\.txt/,
  //        type: 'asset/source',
  //       }
  //     ]
  //   },
  // }
})
