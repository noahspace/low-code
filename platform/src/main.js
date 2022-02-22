import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "remixicon/fonts/remixicon.css";
import "./assets/styles/index.scss";
//二叉树
import BinTreeOrg from "bin-tree-org";
import "bin-tree-org/lib/styles/index.css";
Vue.component("BinTreeOrg", BinTreeOrg);
/** 右键菜单 */
import Contextmenu from "vue-contextmenujs";
Vue.use(Contextmenu);
// 消息提示
import MessageBox from "./components/MessageBox";
Vue.use(MessageBox);
// 弹窗包裹器
import DialogWrapper from "./components/DialogWrapper";
Vue.use(DialogWrapper);
Vue.config.productionTip = false;
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };

import auth from "./utils/auth";
import * as authAPI from "./apis/auth";
// 加载组件库
import Library from "./library";
Vue.use(Library);

import ElxComponents from "./components/ElxComponents";
Vue.use(ElxComponents);

// 路由前置拦截器
router.beforeEach(async (to, from, next) => {
  const token = auth.getToken();
  window.document.title = "华雁智科低代码平台 - " + to.meta.title;
  if (to.path !== "/login") {
    // 判断是否登录
    if (token) {
      if (
        to.matched.every((record) => record.meta.requiresAuth) &&
        (!to.meta.roles ||
          to.meta.roles.some((role) => role === auth.getUserRole()))
      ) {
        next();
      } else {
        router.push({
          path: "/error/401",
        });
      }
    } else {
      // next({
      //   path: "/login",
      //   query: { redirect: to.fullPath },
      // });

      // 模拟登录《生产环境注释》
      auth.setToken("jhfhhdjhhsjdhnfjfuehf");
      auth.setUserRole("admin");
      auth.setUserInfo({
        token: "jhfhhdjhhsjdhnfjfuehf",
        userId: "",
        appId: "",
        username: "wbi-admin-1",
        loginname: "zzz",
        sm2Key: "",
        orgInfo: "admin",
      });
      next();

      // 获取用户信息
      try {
        let res = await authAPI.getUserInfo();
        if (res.code == 200) {
          let userInfo = res.result.split(",");
          // 0 token， 1：用户 id 密文， 2：应用 id 密文，3：用户名，4：登录名，5：SSO 服务 SM2 公钥，6：用户所属组织机构信息
          auth.setToken(userInfo[0]);
          auth.setUserRole(userInfo[6]);
          auth.setUserInfo({
            token: userInfo[0],
            userId: userInfo[1],
            appId: userInfo[2],
            username: userInfo[3],
            loginname: userInfo[4],
            sm2Key: userInfo[5],
            orgInfo: userInfo[6],
          });
          Vue.prototype.$notify({
            title: "成功",
            message: "登录成功，正在跳往首页",
            type: "success",
            duration: 1 * 1000,
            close: () => {
              location.href = "/wbi/index.html";
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
