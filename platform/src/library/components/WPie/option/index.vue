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
          <el-form-item label="基本颜色">
            <elx-input
              valueType="array"
              :value.sync="currentActive.component.attribs.color"
            ></elx-input>
          </el-form-item>
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
            <el-form-item label="大小">
              <elx-input
                type="textarea"
                valueType="array"
                :value.sync="item.radius"
              ></elx-input>
            </el-form-item>
            <el-form-item label="位置">
              <elx-input
                type="textarea"
                valueType="array"
                :value.sync="item.center"
              ></elx-input>
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
    // 添加系列
    addSerie() {
      const id = nanoid();
      this.currentActive.component.attribs.series.push({
        id: id, // 系列 id
        name: id, // 系列名称
        dataIndex: 0, // 数据索引
        center: ["50%", "50%"],
        radius: [0, 100],
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
