const webpackConfig = require('./webpack.dev.conf');
const webpack = require('webpack');
const express = require('express');
const app = express();
const port = 8080;

const compiler = webpack(webpackConfig)

// 放入内存
app.use(require("webpack-dev-middleware")(compiler, {
  publicPath: webpackConfig.output.publicPath,
}));

// 热加载更新
app.use(require("webpack-hot-middleware")(compiler));

// 纯静态资源
app.use(express.static('public'));

module.exports = app.listen(port, (err) => {
  if (err) throw err;
  var uri = "http://localhost:" + port;
  console.log(uri + '\n');
})
