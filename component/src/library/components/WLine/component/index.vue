<template>
  <div class="chart" ref="chart"></div>
</template>

<script>
import componentMixin from "../../../componentMixin";
// Echarts 按需加载
import * as echarts from "echarts/core";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  GridComponent,
  TooltipComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

import { ResizeObserver } from "@juggle/resize-observer";
export default {
  mixins: [componentMixin],
  data() {
    return {
      option: null,
      xAxis: this.data.datas.find((obj) => obj.attribs === "xAxis")
        .defaultValue,
      yAxis: this.data.datas.find((obj) => obj.attribs === "yAxis")
        .defaultValue,
      chartData: this.data.datas.find((obj) => obj.attribs === "chartData")
        .defaultValue,
    };
  },
  watch: {
    data: {
      handler() {
        this.setOption();
      },
      deep: true,
    },
  },
  mounted() {
    const chartDom = this.$refs["chart"];
    this.myChart = echarts.init(chartDom, "dark");
    this.setOption();
    // 监听大小改变
    const resizeObserver = new ResizeObserver(() => {
      this.resize();
    });
    resizeObserver.observe(chartDom);
  },
  methods: {
    setOption() {
      console.log(this.data.attribs);
      this.option = {
        backgroundColor: this.data.attribs.backgroundColor,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          top: this.data.attribs.grid.top,
          right: this.data.attribs.grid.right,
          bottom: this.data.attribs.grid.bottom,
          left: this.data.attribs.grid.left,
        },
        xAxis: this.data.attribs.xAxis.map((xAxis) => {
          return {
            type: xAxis.type,
            name: xAxis.name,
            position: xAxis.position,
            offset: xAxis.offset,
            data: this.xAxis[xAxis.dataIndex],
            nameTextStyle: xAxis.nameTextStyle,
            axisLine: xAxis.axisLine,
            axisTick: xAxis.axisTick,
            splitLine: xAxis.splitLine,
            axisLabel: xAxis.axisLabel,
          };
        }),
        yAxis: this.data.attribs.yAxis.map((yAxis) => {
          return {
            type: yAxis.type,
            name: yAxis.name,
            position: yAxis.position,
            offset: yAxis.offset,
            data: this.yAxis[yAxis.dataIndex],
            nameTextStyle: yAxis.nameTextStyle,
            axisLine: yAxis.axisLine,
            axisTick: yAxis.axisTick,
            splitLine: yAxis.splitLine,
            axisLabel: yAxis.axisLabel,
          };
        }),
        series: this.data.attribs.series.map((serie) => {
          return {
            type: "line",
            smooth: serie.smooth,
            lineStyle: serie.lineStyle,
            itemStyle: serie.itemStyle,
            data: this.chartData[serie.dataIndex],
            xAxisIndex: serie.xAxisIndex,
            yAxisIndex: serie.yAxisIndex,
            symbol: serie.symbol,
            symbolSize: serie.symbolSize,
          };
        }),
      };
      this.option && this.myChart.setOption(this.option);
    },
    resize() {
      this.myChart.resize();
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
