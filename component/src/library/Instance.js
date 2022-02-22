/**
 * avatar: Noah
 * email: noahzhangspace@gmail.com
 */
// 组件实例操作
export default class Instance {
  libraries = {};
  register(hook, that) {
    this.libraries[hook] = that;
  }
  get(hook) {
    return this.libraries[hook];
  }
}
