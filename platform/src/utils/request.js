import axios from "axios";
import auth from "@/utils/auth";
const service = axios.create({
  baseURL: "/",
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 发送请求之前做些事

    // 让每个请求携带 Token
    config.headers["token"] = auth.getToken();
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (!res.code) {
      return res;
    }
    // 如果 code 不是 200 判断为错误
    if (res.code != 200) {
      window.ELEMENT.Message({
        message: res.msg || "Error",
        type: "error",
        duration: 5 * 1000,
      });

      if (res.code == 401 || res.code == 403) {
        window.ELEMENT.MessageBox.confirm(
          "您已退出，您可以取消停留在此页面，或重新登录",
          "确认退出",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {});
      }
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.error(error);
    window.ELEMENT.Message.closeAll();
    window.ELEMENT.Message({
      message: error.msg || "网络连接错误",
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
