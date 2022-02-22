import MessageBox from "./index.vue";
export default {
  install(Vue) {
    const VueMessageBox = Vue.extend(MessageBox);
    const VueMessageBoxComponent = new VueMessageBox().$mount();
    Vue.prototype.$nextTick(() => {
      document.getElementById("app").appendChild(VueMessageBoxComponent.$el);
    });
    Vue.prototype.$messageBox = function (type, message = null) {
      VueMessageBoxComponent.type = type;
      VueMessageBoxComponent.message = message;
      VueMessageBoxComponent.dialogVisible = true;
    };
  },
};
