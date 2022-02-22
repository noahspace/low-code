<template>
  <div class="option">
    <el-form label-width="90px" :model="currentActive.component">
      <div class="card">
        <div class="body">
          <el-form-item label="组件 ID">
            <el-input disabled v-model="currentActive.component.id"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="card">
        <div class="header">基本样式</div>
        <div class="body">
          <el-form-item label="背景颜色">
            <elx-color-picker
              :value.sync="currentActive.component.attribs.backgroundColor"
            ></elx-color-picker>
          </el-form-item>
          <el-form-item label="上间距">
            <elx-input-number
              :value.sync="currentActive.component.attribs.grid.top"
            ></elx-input-number>
          </el-form-item>
          <el-form-item label="右间距">
            <elx-input-number
              :value.sync="currentActive.component.attribs.grid.right"
            ></elx-input-number>
          </el-form-item>
          <el-form-item label="下间距">
            <elx-input-number
              :value.sync="currentActive.component.attribs.grid.bottom"
            ></elx-input-number>
          </el-form-item>
          <el-form-item label="左间距">
            <elx-input-number
              :value.sync="currentActive.component.attribs.grid.left"
            ></elx-input-number>
          </el-form-item>
        </div>
      </div>

      <div class="card">
        <div class="header">X 轴系列</div>
        <el-collapse>
          <el-collapse-item
            v-for="item in currentActive.component.attribs.xAxis"
            :key="item.id"
            :title="item.name"
          >
            <div class="card">
              <div class="header">基本配置</div>
              <div class="body">
                <el-form-item label="轴名称">
                  <elx-input :value.sync="item.name"></elx-input>
                </el-form-item>
                <el-form-item label="数据索引">
                  <elx-input-number
                    :value.sync="item.dataIndex"
                  ></elx-input-number>
                </el-form-item>
                <el-form-item label="轴名称颜色">
                  <elx-color-picker
                    :value.sync="item.nameTextStyle.color"
                  ></elx-color-picker>
                </el-form-item>
                <el-form-item label="轴名称大小">
                  <elx-input-number
                    :value.sync="item.nameTextStyle.fontSize"
                  ></elx-input-number>
                </el-form-item>
                <el-form-item label="轴位置">
                  <elx-select :value.sync="item.position">
                    <el-option label="上" value="top"></el-option>
                    <el-option label="下" value="bottom"></el-option>
                  </elx-select>
                </el-form-item>
                <el-form-item label="轴位置偏移">
                  <elx-input-number
                    :value.sync="item.offset"
                  ></elx-input-number>
                </el-form-item>
                <el-form-item label="轴类型">
                  <elx-select :value.sync="item.type">
                    <el-option label="数值轴" value="value"></el-option>
                    <el-option label="类目轴" value="category"></el-option>
                    <el-option label="时间轴" value="time"></el-option>
                    <el-option label="对数轴" value="log"></el-option>
                  </elx-select>
                </el-form-item>
              </div>
            </div>
            <div class="card">
              <div class="header">轴线样式</div>
              <div class="body">
                <el-form-item label="显示轴线">
                  <elx-switch :value.sync="item.axisLine.show"></elx-switch>
                </el-form-item>
                <el-form-item label="轴线颜色">
                  <elx-color-picker
                    :value.sync="item.axisLine.lineStyle.color"
                  ></elx-color-picker>
                </el-form-item>
                <el-form-item label="轴线宽度">
                  <elx-input-number
                    :value.sync="item.axisLine.lineStyle.width"
                  ></elx-input-number>
                </el-form-item>
              </div>
            </div>
            <div class="card">
              <div class="header">坐标轴刻度</div>
              <div class="body">
                <el-form-item label="显示刻度">
                  <elx-switch :value.sync="item.axisTick.show"></elx-switch>
                </el-form-item>
                <el-form-item label="刻度线颜色">
                  <elx-color-picker
                    :value.sync="item.axisTick.lineStyle.color"
                  ></elx-color-picker>
                </el-form-item>
                <el-form-item label="刻度线宽度">
                  <elx-input-number
                    :value.sync="item.axisTick.lineStyle.width"
                  ></elx-input-number>
                </el-form-item>
              </div>
            </div>
            <div class="card">
              <div class="header">分割线样式</div>
              <div class="body">
                <el-form-item label="显示分割线">
                  <elx-switch :value.sync="item.splitLine.show"></elx-switch>
                </el-form-item>
                <el-form-item label="分割线颜色">
                  <elx-color-picker
                    :value.sync="item.splitLine.lineStyle.color"
                  ></elx-color-picker>
                </el-form-item>
                <el-form-item label="分割线宽度">
                  <elx-input-number
                    :value.sync="item.splitLine.lineStyle.width"
                  ></elx-input-number>
                </el-form-item>
              </div>
            </div>
            <div class="card">
              <div class="header">刻度标签样式</div>
              <div class="body">
                <el-form-item label="显示标签">
                  <elx-switch :value.sync="item.axisLabel.show"></elx-switch>
                </el-form-item>
                <el-form-item label="标签文字颜色">
                  <elx-color-picker
                    :value.sync="item.axisLabel.color"
                  ></elx-color-picker>
                </el-form-item>
                <el-form-item label="标签文字大小">
                  <elx-input-number
                    :value.sync="item.axisLabel.fontSize"
                  ></elx-input-number>
                </el-form-item>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="card">
        <div class="body">
          <el-form-item label-width="0">
            <el-button
              @click="addXAxis"
              style="width: 100%"
              type="primary"
              size="mini"
              >添加一项</el-button
            >
          </el-form-item>
        </div>
      </div>

      <div class="card">
        <div class="header">Y 轴系列</div>
        <el-collapse>
          <el-collapse-item
            v-for="item in currentActive.component.attribs.yAxis"
            :key="item.id"
            :title="item.name"
          >
            <div class="card">
              <div class="header">基本配置</div>
              <div class="body">
                <el-form-item label="轴名称">
                  <elx-input :value.sync="item.name"></elx-input>
                </el-form-item>
                <el-form-item label="数据索引">
                  <elx-input-number
                    :value.sync="item.dataIndex"
                  ></elx-input-number>
                </el-form-item>
                <el-form-item label="轴名称颜色">
                  <elx-color-picker
                    :value.sync="item.nameTextStyle.color"
                  ></elx-color-picker>
                </el-form-item>
                <el-form-item label="轴名称大小">
                  <elx-input-number
                    :value.sync="item.nameTextStyle.fontSize"
                  ></elx-input-number>
                </el-form-item>
                <el-form-item label="轴位置">
                  <elx-select :value.sync="item.position">
                    <el-option label="右" value="right"></el-option>
                    <el-option label="左" value="left"></el-option>
                  </elx-select>
                </el-form-item>
                <el-form-item label="轴位置偏移">
                  <elx-input-number
                    :value.sync="item.offset"
                  ></elx-input-number>
                </el-form-item>
                <el-form-item label="轴类型">
                  <elx-select :value.sync="item.type">
                    <el-option label="数值轴" value="value"></el-option>
                    <el-option label="类目轴" value="category"></el-option>
                    <el-option label="时间轴" value="time"></el-option>
                    <el-option label="对数轴" value="log"></el-option>
                  </elx-select>
                </el-form-item>
              </div>
            </div>
            <div class="card">
              <div class="header">轴线样式</div>
              <div class="body">
                <el-form-item label="显示轴线">
                  <elx-switch :value.sync="item.axisLine.show"></elx-switch>
                </el-form-item>
                <el-form-item label="轴线颜色">
                  <elx-color-picker
                    :value.sync="item.axisLine.lineStyle.color"
                  ></elx-color-picker>
                </el-form-item>
                <el-form-item label="轴线宽度">
                  <elx-input-number
                    :value.sync="item.axisLine.lineStyle.width"
                  ></elx-input-number>
                </el-form-item>
              </div>
            </div>
            <div class="card">
              <div class="header">坐标轴刻度</div>
              <div class="body">
                <el-form-item label="显示刻度">
                  <elx-switch :value.sync="item.axisTick.show"></elx-switch>
                </el-form-item>
                <el-form-item label="刻度线颜色">
                  <elx-color-picker
                    :value.sync="item.axisTick.lineStyle.color"
                  ></elx-color-picker>
                </el-form-item>
                <el-form-item label="刻度线宽度">
                  <elx-input-number
                    :value.sync="item.axisTick.lineStyle.width"
                  ></elx-input-number>
                </el-form-item>
              </div>
            </div>
            <div class="card">
              <div class="header">分割线样式</div>
              <div class="body">
                <el-form-item label="显示分割线">
                  <elx-switch :value.sync="item.splitLine.show"></elx-switch>
                </el-form-item>
                <el-form-item label="分割线颜色">
                  <elx-color-picker
                    :value.sync="item.splitLine.lineStyle.color"
                  ></elx-color-picker>
                </el-form-item>
                <el-form-item label="分割线宽度">
                  <elx-input-number
                    :value.sync="item.splitLine.lineStyle.width"
                  ></elx-input-number>
                </el-form-item>
              </div>
            </div>
            <div class="card">
              <div class="header">刻度标签样式</div>
              <div class="body">
                <el-form-item label="显示标签">
                  <elx-switch :value.sync="item.axisLabel.show"></elx-switch>
                </el-form-item>
                <el-form-item label="标签文字颜色">
                  <elx-color-picker
                    :value.sync="item.axisLabel.color"
                  ></elx-color-picker>
                </el-form-item>
                <el-form-item label="标签文字大小">
                  <elx-input-number
                    :value.sync="item.axisLabel.fontSize"
                  ></elx-input-number>
                </el-form-item>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="card">
        <div class="body">
          <el-form-item label-width="0">
            <el-button
              @click="addYAxis"
              style="width: 100%"
              type="primary"
              size="mini"
              >添加一项</el-button
            >
          </el-form-item>
        </div>
      </div>

      <div class="card">
        <div class="header">数据</div>
        <el-collapse>
          <el-collapse-item
            v-for="item in currentActive.component.attribs.series"
            :key="item.id"
            :title="item.name"
          >
            <el-form-item label="数据名称">
              <elx-input :value.sync="item.name"></elx-input>
            </el-form-item>
            <el-form-item label="数据索引">
              <elx-input-number :value.sync="item.dataIndex"></elx-input-number>
            </el-form-item>
            <el-form-item label="x 轴索引">
              <elx-input-number
                :value.sync="item.xAxisIndex"
              ></elx-input-number>
            </el-form-item>
            <el-form-item label="y 轴索引">
              <elx-input-number
                :value.sync="item.yAxisIndex"
              ></elx-input-number>
            </el-form-item>
            <el-form-item label="平滑曲线">
              <elx-switch :value.sync="item.smooth"></elx-switch>
            </el-form-item>
            <el-form-item label="线条颜色">
              <elx-color-picker
                :value.sync="item.lineStyle.color"
              ></elx-color-picker>
            </el-form-item>
            <el-form-item label="线条类型">
              <elx-select :value.sync="item.lineStyle.type">
                <el-option label="实线" value="solid"></el-option>
                <el-option label="虚线" value="dashed"></el-option>
                <el-option label="点线" value="dotted"></el-option>
              </elx-select>
            </el-form-item>
            <el-form-item label="线条宽度">
              <elx-input-number
                :value.sync="item.lineStyle.width"
              ></elx-input-number>
            </el-form-item>
            <el-form-item label="标记图形">
              <elx-select :value.sync="item.symbol">
                <el-option label="空心圆" value="emptyCircle"></el-option>
                <el-option label="实心圆" value="circle"></el-option>
                <el-option label="方形" value="rect"></el-option>
                <el-option label="圆角方形" value="roundRect"></el-option>
                <el-option label="三角形" value="triangle"></el-option>
                <el-option label="菱形" value="diamond"></el-option>
                <el-option label="别针" value="pin"></el-option>
                <el-option label="箭" value="arrow"></el-option>
                <el-option label="无" value="none"></el-option>
              </elx-select>
            </el-form-item>
            <el-form-item label="标记大小">
              <elx-input-number
                :value.sync="item.symbolSize"
              ></elx-input-number>
            </el-form-item>
            <el-form-item label="标记颜色">
              <elx-color-picker
                :value.sync="item.itemStyle.color"
              ></elx-color-picker>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="card">
        <div class="body">
          <el-form-item label-width="0">
            <el-button
              @click="addSerie"
              style="width: 100%"
              type="primary"
              size="mini"
              >添加一项</el-button
            >
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  inject: ["config", "currentActive"],
  methods: {
    // 添加 X 轴
    addXAxis() {
      const id = nanoid();
      this.currentActive.component.attribs.xAxis.push({
        id: id,
        name: id,
        position: "top",
        offset: 0,
        type: "category", // 轴类型
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
      });
    },
    // 添加 Y 轴
    addYAxis() {
      const id = nanoid();
      this.currentActive.component.attribs.yAxis.push({
        id: id,
        name: id,
        position: "right",
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
      });
    },
    // 添加系列
    addSerie() {
      const id = nanoid();
      this.currentActive.component.attribs.series.push({
        id: id, // 系列 id
        name: id, // 系列名称
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
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
