const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const UglifyjsPlugin = require("uglifyjs-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const debug = process.env.NODE_ENV !== "production";
// 代码压缩工具
// const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  // 构建输出目录
  outputDir: "build",
  // 静态资源目录 (js, css, img, fonts)
  assetsDir: "assets",
  // 页面配置
  // pages: {
  //     index: {
  //         entry: ['babel-polyfill', './src/main.js']
  //     }
  // },
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: true,
  filenameHashing: false,
  // 运行时版本是否需要编译
  runtimeCompiler: true,
  // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  transpileDependencies: [],
  // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  productionSourceMap: false,
  configureWebpack: {
    devtool: debug ? "cheap-module-eval-source-map" : false,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@layout": path.resolve(__dirname, "./src/layout"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@ajax": path.resolve(__dirname, "./src/ajax"),
        "@apis": path.resolve(__dirname, "./src/apis"),
        "@router": path.resolve(__dirname, "./src/router"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@untils": path.resolve(__dirname, "./src/untils"),
        "@store": path.resolve(__dirname, "./src/store"),
        "@mock": path.resolve(__dirname, "./src/mock"),
        vue$: "vue/dist/vue.esm.js"
      }
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "public/index.html",
        hash: true,
        minify: true
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "root.jQuery": "jquery"
      })
      // new UglifyjsPlugin({
      //     sourceMap: false,
      //     uglifyOptions: {
      //         compress: {
      //             drop_debugger: true,
      //             drop_console: true
      //         }
      //     }
      // }),
      // new CompressionWebpackPlugin({
      //     algorithm: 'gzip',
      //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      //     threshold: 10240,
      //     minRatio: 0.8
      // })
    ]
  },
  // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // chainWebpack: config => {
  //     if (debug) {
  //         // 本地开发配置
  //     } else {
  //         // 生产开发配置
  //     }
  // },
  // 配置高于chainWebpack中关于css loader的配置
  css: {
    // 是否开启支持‘foo.module.css’样式
    // modules: true,
    // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    extract: true,
    // 是否在构建样式地图，false将提高构建速度
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      css: {
        // localIdentName: '[name]-[hash]',
        localIdentName: "[name]",
        camelCase: "only"
      },

      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "@assets/style/variables.scss";`
      }
      // stylus: {}
    }
  },
  // 构建时开启多进程处理babel编译
  parallel: require("os").cpus().length > 1,
  // 第三方插件配置
  pluginOptions: {},
  // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  devServer: {
    open: true,
    host: "localhost",
    port: 8090,
    https: false,
    hotOnly: false
    // proxy: {
    //     '/api': {
    //         target: '<url>',
    //         ws: true,
    //         changOrigin: true
    //     }
    // },
    // before: app => {}
  }
};
