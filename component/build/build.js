const path = require('path');
const rm = require('rimraf');
const webpackConfig = require('./webpack.prod.conf');
const webpack = require('webpack');

// 删除 dist
rm(path.resolve(__dirname, '../dist'), err => {
  if (err) throw err

  webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    console.log(stats);
  })
})
