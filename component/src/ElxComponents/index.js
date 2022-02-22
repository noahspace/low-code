// 扩展 ElementUI 组件

import ElxInput from "./ElxInput";
import ElxSelect from "./ElxSelect";
import ElxInputNumber from "./ElxInputNumber";
import ElxColorPicker from "./ElxColorPicker";
import ElxSwitch from "./ElxSwitch";
// import ElxImage from "./ElxImage";

const components = {
  ElxInput,
  ElxSelect,
  ElxInputNumber,
  ElxColorPicker,
  ElxSwitch,
  // ElxImage,
};

export default {
  install(Vue, options) {
    Object.keys(components).forEach((key) => {
      Vue.component(key, components[key], options);
    });
  },
};
