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
import { PieChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
echarts.use([
  GridComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  UniversalTransition,
]);

import { ResizeObserver } from "@juggle/resize-observer";
export default {
  mixins: [componentMixin],
  data() {
    return {
      option: null,
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
      this.option = {
        color: this.data.attribs.color,
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
        series: this.data.attribs.series.map((serie) => {
          return {
            type: "pie",
            itemStyle: serie.itemStyle,
            data: this.chartData[serie.dataIndex],
            center: serie.center,
            radius: serie.radius,
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
