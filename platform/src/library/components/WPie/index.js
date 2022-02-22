export default {
  options: {
    title: "饼图",
    eventEnums: [],
  },
  attribs: {
    color: [
      "#5470c6",
      "#91cc75",
      "#fac858",
      "#ee6666",
      "#73c0de",
      "#3ba272",
      "#fc8452",
      "#9a60b4",
      "#ea7ccc",
    ],
    backgroundColor: "#fff",
    grid: {
      top: 100,
      right: 100,
      bottom: 100,
      left: 100,
    },
    series: [
      {
        id: "1", // 系列 id
        name: "S1", // 系列名称
        dataIndex: 0, // 数据索引
        center: ["50%", "50%"],
        radius: [0, 100],
      },
    ],
  },
  datas: [
    {
      label: "图表数据",
      attribs: "chartData",
      defaultValue: [
        [
          { value: 1048, name: "Search Engine" },
          { value: 75, name: "Direct" },
          { value: 50, name: "Email" },
          { value: 44, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
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
