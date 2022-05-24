// 我们在DemoWebpackPlugin的构造函数打印一条信息，当我们执行打包命令时，这条信息就会输出，
// plugin类里面需要实现一个apply方法，webpack打包时候，会调用plugin的aplly方法来执行plugin的逻辑，
// 这个方法接受一个compiler作为参数，这个compiler是webpack实例

// plugin的核心在于，apply方法执行时，可以操作webpack本次打包的各个时间节点
// （hooks，也就是生命周期勾子），在不同的时间节点做一些操作

class DemoWebpackPlugin {
  constructor () {
      console.log('plugin init')
  }
  // compiler是webpack实例
  apply (compiler) {
      // 一个新的编译(compilation)创建之后（同步）
      // compilation代表每一次执行打包，独立的编译
      compiler.hooks.compile.tap('DemoWebpackPlugin', compilation => {
          console.log(compilation)
      })
      // 生成资源到 output 目录之前（异步）
      compiler.hooks.emit.tapAsync('DemoWebpackPlugin', (compilation, fn) => {
          console.log(compilation)
          compilation.assets['index.md'] = {
              // 文件内容
              source: function () {
                  return 'this is a demo for plugin'
              },
              // 文件尺寸
              size: function () {
                  return 25
              }
          }
          fn()
      })
  }
}

module.exports = DemoWebpackPlugin


// webpack.config.js
const path = require('path')
const DemoWebpackPlugin = require('./demo-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new DemoWebpackPlugin()
    ]
}
