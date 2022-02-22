module.exports = {
  publicPath: "",
  devServer: {
    proxy: {
      "/wbi": {
        //target: "http://192.168.40.72:7000",
        //target: "http://192.168.40.80:8889",
        target: "http://192.168.80.83:80/wapi",
        changOrigin: true,
        pathRewrite: {
          "^/wbi": "/wbi",
        },
      },
    },
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
    },
  },
};
