const webpack = require('webpack');
const path = require("path");
const baseWebpackConfig = require('./webpack.base.conf');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "../src/main-dev.js")
  },
  plugins: [
    // 根据 https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // 模板
    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),
  ]
});

// 添加热刷新脚本
Object.keys(webpackConfig.entry).forEach((name) => {
  webpackConfig.entry[name] = ['./build/dev-client'].concat(webpackConfig.entry[name])
})

module.exports = webpackConfig;
