export default {
  options: {
    title: "标签页",
    eventEnums: [],
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
  slotName: "tab1",
  datas: [
    {
      label: "激活名称",
      attribs: "activeName",
      defaultValue: "tab1",
      valueType: "string",
      whetherInitialize: true,
      bindVariable: "",
      callback: "",
      controlledComponents: [],
    },
    {
      label: "标签项",
      attribs: "tabs",
      defaultValue: [
        { label: "标签一", name: "tab1" },
        { label: "标签二", name: "tab2" },
        { label: "标签三", name: "tab3" },
      ],
      valueType: "array",
      whetherInitialize: true,
      bindVariable: "",
      callback: "",
      controlledComponents: [],
    },
  ],
  events: [],
};
