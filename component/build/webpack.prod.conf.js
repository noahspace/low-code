const baseWebpackConfig = require('./webpack.base.conf');
const path = require("path");
const { merge } = require('webpack-merge');

const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  entry: {
    main: path.resolve(__dirname, "../src/main.js")
  },
});

module.exports = webpackConfig;
