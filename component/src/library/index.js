/**
 * avatar: Noah
 * email: noahzhangspace@gmail.com
 */
import WContainerBootstrap from "./components/WContainer/bootstrap";
import WButtonBootstrap from "./components/WButton/bootstrap";
import WTableBootstrap from "./components/WTable/bootstrap";
import WPaginationBootstrap from "./components/WPagination/bootstrap";
import WIconBootstrap from "./components/WIcon/bootstrap";
import WImageBootstrap from "./components/WImage/bootstrap";
import WTabsBootstrap from "./components/WTabs/bootstrap";
import WLineBootstrap from "./components/WLine/bootstrap";
import WBarBootstrap from "./components/WBar/bootstrap";
import WPieBootstrap from "./components/WPie/bootstrap";
import WTextBootstrap from "./components/WText/bootstrap";
import WStreakBootstrap from "./components/WStreak/bootstrap";
import WInputBootstrap from "./components/WInput/bootstrap";

import Instance from "./Instance";

// 组件
const components = {
  ...WContainerBootstrap.components,
  ...WButtonBootstrap.components,
  ...WTableBootstrap.components,
  ...WPaginationBootstrap.components,
  ...WIconBootstrap.components,
  ...WImageBootstrap.components,
  ...WTabsBootstrap.components,
  ...WLineBootstrap.components,
  ...WBarBootstrap.components,
  ...WPieBootstrap.components,
  ...WTextBootstrap.components,
  ...WStreakBootstrap.components,
  ...WInputBootstrap.components,
};

// 配置
const configs = {
  ...WContainerBootstrap.config,
  ...WButtonBootstrap.config,
  ...WTableBootstrap.config,
  ...WPaginationBootstrap.config,
  ...WIconBootstrap.config,
  ...WImageBootstrap.config,
  ...WTabsBootstrap.config,
  ...WLineBootstrap.config,
  ...WBarBootstrap.config,
  ...WPieBootstrap.config,
  ...WTextBootstrap.config,
  ...WStreakBootstrap.config,
  ...WInputBootstrap.config,
};

export default {
  install(Vue, options) {
    // 全局配置
    Vue.prototype.$configLibrary = {
      ...Vue.prototype.$configLibrary,
      ...configs
    };
    Vue.prototype.$instance = new Instance();
    // 全局注册组件
    Object.keys(components).forEach((name) => {
      Vue.component(name, components[name], options);
    });
  },
};
