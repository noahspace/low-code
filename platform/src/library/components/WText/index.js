export default {
  options: {
    title: "文字",
    eventEnums: [{ label: "点击事件", name: "click" }],
  },
  attribs: {
    style: {
      width: "auto",
      height: "auto",
      fontFamily: "微软雅黑",
      fontSize: "14px",
      color: "#000",
      lineHeight: "1",
      textAlign: "left",
      fontWeight: "normal",
      textTransform: "none",
    },
  },
  datas: [
    {
      label: "文字内容",
      attribs: "text",
      defaultValue: "文字",
      valueType: "string",
      whetherInitialize: true,
      bindVariable: "",
      callback: "",
      controlledComponents: [],
    },
  ],
  events: [],
};
