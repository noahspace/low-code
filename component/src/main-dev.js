import Vue from "vue";
import ElxComponents from "./ElxComponents"
Vue.use(ElxComponents);
// 加载组件库
import Library from "./library"
Vue.use(Library);
import DevContainer from "./dev-container";
import "./index.scss";

Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };

new Vue({
  el: '#app',
  render: h => h(DevContainer)
})
