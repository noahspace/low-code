export default {
  options: {
    title: "按钮",
    eventEnums: [{ label: "点击事件", name: "click" }],
  },
  attribs: {
    style: {},
    size: "small",
    type: "primary",
    round: false,
    circle: false,
    loading: false,
    disabled: false,
    icon: "",
  },
  datas: [
    {
      label: "按钮文字",
      attribs: "buttonText",
      defaultValue: "按钮",
      valueType: "string",
      whetherInitialize: true,
      bindVariable: "",
      callback: "",
      controlledComponents: [],
    },
  ],
  events: [],
};
