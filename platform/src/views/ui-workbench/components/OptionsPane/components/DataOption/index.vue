<template>
  <div class="data-option">
    <el-collapse accordion>
      <el-collapse-item
        v-for="(item, index) in this.currentActive.component.datas"
        :key="item.attribs"
      >
        <template slot="title">
          <div class="data-info">
            <span class="name" :title="item.attribs">{{ item.attribs }}</span>
            <span class="desc" :title="item.label">{{ item.label }}</span>
          </div>
        </template>
        <el-form label-width="90px">
          <div class="option">
            <div class="card">
              <div class="header">数据配置</div>
              <div class="body">
                <el-form-item label="数据默认值">
                  <elx-input
                    v-if="item.valueType === 'string'"
                    :value.sync="item.defaultValue"
                  ></elx-input>
                  <elx-input-number
                    v-if="item.valueType === 'number'"
                    :value.sync="item.defaultValue"
                  ></elx-input-number>
                  <elx-switch
                    v-if="item.valueType === 'boolean'"
                    :value.sync="item.defaultValue"
                  ></elx-switch>
                  <elx-input
                    type="textarea"
                    v-if="item.valueType === 'object'"
                    :value.sync="item.defaultValue"
                    valueType="object"
                  ></elx-input>
                  <elx-input
                    type="textarea"
                    v-if="item.valueType === 'array'"
                    :value.sync="item.defaultValue"
                    valueType="array"
                  ></elx-input>
                </el-form-item>
                <el-form-item label="绑定变量">
                  <elx-select :value.sync="item.bindVariable" clearable>
                    <el-option
                      v-for="variable in config.variables"
                      :key="variable.id"
                      :label="variable.name"
                      :value="variable.id"
                    ></el-option>
                  </elx-select>
                </el-form-item>
                <el-form-item label="处理函数">
                  <elx-input type="textarea" :value.sync="item.callback">
                  </elx-input>
                </el-form-item>
                <el-form-item label="是否初始化">
                  <elx-switch :value.sync="item.whetherInitialize">
                  </elx-switch>
                </el-form-item>
              </div>
            </div>
            <div class="card">
              <div class="header">受控组件数据绑定</div>
              <div
                class="body"
                v-for="(
                  controlledComponent, index2
                ) in item.controlledComponents"
                :key="controlledComponent.id"
              >
                <el-form-item label="受控组件 ID">
                  <elx-input
                    :value.sync="controlledComponent.componentId"
                  ></elx-input>
                </el-form-item>
                <el-form-item label="字段名称">
                  <elx-input
                    :value.sync="controlledComponent.field"
                  ></elx-input>
                </el-form-item>
                <el-form-item label="处理函数">
                  <elx-input
                    type="textarea"
                    :value.sync="controlledComponent.callback"
                  ></elx-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    @click="deleteControlledComponent(index, index2)"
                    type="danger"
                    >删除</el-button
                  >
                </el-form-item>
              </div>
              <div class="body" style="margin-bottom: 0">
                <el-button
                  @click="addControlledComponent(index)"
                  style="width: 100%"
                  >添加受控组件</el-button
                >
              </div>
              <div class="footer">如果没有绑定受控组件，则自动绑定当前组件</div>
            </div>
          </div>
        </el-form>
      </el-collapse-item>
      <div class="empty" v-if="this.currentActive.component.datas.length === 0">
        无数据
      </div>
    </el-collapse>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  inject: ["config", "currentActive"],
  methods: {
    // 添加受控组件
    addControlledComponent(index) {
      this.currentActive.component.datas[index].controlledComponents.push({
        id: nanoid(),
        componentId: "",
        field: "",
        callback: "",
      });
    },
    // 删除受控组件
    deleteControlledComponent(index, index2) {
      this.currentActive.component.datas[index].controlledComponents.splice(
        index2,
        1
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
