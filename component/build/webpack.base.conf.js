const path = require("path");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "",
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    // 自动补全后缀
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: ["vue-style-loader", "css-loader"],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: [
              { loader: 'cache-loader' },
              { loader: 'babel-loader', options: { presets: ['env'] } }
            ]
          }
        }
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  externals: {
    vue: "Vue",
  },
}
