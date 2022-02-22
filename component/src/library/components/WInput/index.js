export default {
  options: {
    title: "输入框",
    eventEnums: [{ label: "点击事件", name: "click" }],
  },
  attribs: {
    style: {
      width: "100%",
    },
    size: "small",
  },
  datas: [
    {
      label: "默认内容",
      attribs: "value",
      defaultValue: "",
      valueType: "string",
      whetherInitialize: true,
      bindVariable: "",
      callback: "",
      controlledComponents: [],
    },
  ],
  events: [],
};
