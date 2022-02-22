export default {
  options: {
    title: "折线图",
    eventEnums: [],
  },
  attribs: {
    backgroundColor: "#fff",
    grid: {
      top: 100,
      right: 100,
      bottom: 100,
      left: 100,
    },
    xAxis: [
      {
        id: "1",
        name: "X1",
        type: "category", // 轴类型
        dataIndex: 0, // 数据索引
        nameTextStyle: {
          color: "#888",
          fontSize: 12,
        },
        position: "bottom",
        offset: 0,
        // 轴线样式
        axisLine: {
          show: true,
          lineStyle: {
            color: "#888",
            width: 1,
          },
        },
        // 刻度样式
        axisTick: {
          show: true,
          lineStyle: {
            color: "#888",
            width: 1,
          },
        },
        // 分割线
        splitLine: {
          show: false,
          lineStyle: {
            color: "#888",
            width: 1,
          },
        },
        // 刻度标签样式
        axisLabel: {
          show: true,
          color: "#888",
          fontSize: 12,
        },
      },
    ],
    yAxis: [
      {
        id: "1",
        name: "Y1",
        position: "left",
        offset: 0,
        type: "value", // 轴类型
        dataIndex: 0, // 数据索引
        nameTextStyle: {
          color: "#888",
          fontSize: 12,
        },
        // 轴线样式
        axisLine: {
          show: true,
          lineStyle: {
            color: "#888",
            width: 1,
          },
        },
        // 刻度样式
        axisTick: {
          show: false,
          lineStyle: {
            color: "#888",
            width: 1,
          },
        },
        // 分割线
        splitLine: {
          show: true,
          lineStyle: {
            color: "#888",
            width: 1,
          },
        },
        // 刻度标签样式
        axisLabel: {
          show: true,
          color: "#888",
          fontSize: 12,
        },
      },
    ],
    series: [
      {
        id: "1", // 系列 id
        name: "S1", // 系列名称
        dataIndex: 0, // 数据索引
        xAxisIndex: "0", // x 轴索引
        yAxisIndex: "0", // y 轴索引
        smooth: false, // 平滑曲线
        lineStyle: {
          color: "#888",
          type: "solid",
          width: 2,
        },
        itemStyle: {
          color: "#888",
        },
        symbol: "emptyCircle", // 标记图形
        symbolSize: 6, // 标记大小
      },
    ],
  },
  datas: [
    {
      label: "X 轴",
      attribs: "xAxis",
      defaultValue: [["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]],
      valueType: "array",
      whetherInitialize: true,
      bindVariable: "",
      callback: "",
      controlledComponents: [],
    },
    {
      label: "Y 轴",
      attribs: "yAxis",
      defaultValue: [],
      valueType: "array",
      whetherInitialize: true,
      bindVariable: "",
      callback: "",
      controlledComponents: [],
    },
    {
      label: "图表数据",
      attribs: "chartData",
      defaultValue: [[150, 230, 224, 218, 135, 147, 260]],
      valueType: "array",
      whetherInitialize: true,
      bindVariable: "",
      callback: "",
      controlledComponents: [],
    },
  ],
  events: [],
};
