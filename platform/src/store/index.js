import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentLayoutConfig: null,
  },
  mutations: {
    currentLayoutConfig(state, payload) {
      state.currentLayoutConfig = payload;
    },
  },
  actions: {},
  modules: {},
});
