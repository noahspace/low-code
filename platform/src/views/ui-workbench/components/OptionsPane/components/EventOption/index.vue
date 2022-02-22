<template>
  <div class="event-option">
    <el-collapse class="collapse" accordion>
      <el-collapse-item
        v-for="(item, index) in currentActive.component.events"
        :key="item.id"
      >
        <template slot="title">
          <div class="event-li">
            <span>{{ item.type }}</span>
            <el-button
              @click.stop="removeEvent(index)"
              type="text"
              icon="el-icon-delete"
            ></el-button>
          </div>
        </template>
        <el-form label-width="68px">
          <div class="option">
            <div class="card">
              <div class="header">事件名称</div>
              <div class="body">
                <el-form-item label-width="0">
                  <elx-input :value.sync="item.type"></elx-input>
                </el-form-item>
              </div>
            </div>
            <el-radio-group style="margin-bottom: 10px" v-model="currentPane">
              <el-radio-button :label="1">预设方法</el-radio-button>
              <el-radio-button :label="2">自定义方法</el-radio-button>
            </el-radio-group>
            <div v-show="currentPane === 1">
              <div class="card">
                <div class="header">预设方法执行线</div>
                <div class="body">
                  <el-steps style="margin-top: 6px" direction="vertical">
                    <el-step
                      status="process"
                      v-for="(method, methodIndex) in item.presetMethods"
                      :key="method.id"
                    >
                      <template slot="title">
                        <div class="event-step">
                          <span>{{
                            method.type | presetMethodNameFilter(presetMethods)
                          }}</span>
                          <div>
                            <el-button
                              @click="presetMethodSortDown(index, methodIndex)"
                              type="text"
                              icon="el-icon-sort-down"
                            ></el-button>
                            <el-button
                              @click="presetMethodSortUp(index, methodIndex)"
                              type="text"
                              icon="el-icon-sort-up"
                            ></el-button>
                            <el-popover
                              placement="left-start"
                              width="300"
                              trigger="click"
                              style="margin-left: 10px"
                            >
                              <!-- 绑定变量配置界面 -->
                              <el-form
                                class="option"
                                v-if="method.type === 'bindVariable'"
                              >
                                <div class="card">
                                  <div class="header">绑定变量</div>
                                  <div class="body">
                                    <el-form-item>
                                      <elx-select
                                        :value.sync="method.bindVariable"
                                      >
                                        <el-option
                                          v-for="variable in config.variables"
                                          :key="variable.id"
                                          :label="variable.name"
                                          :value="variable.id"
                                        ></el-option>
                                      </elx-select>
                                    </el-form-item>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="header">变量值或表达式</div>
                                  <div class="body">
                                    <el-form-item>
                                      <elx-input
                                        type="textarea"
                                        :value.sync="method.variableValue"
                                      ></elx-input>
                                    </el-form-item>
                                  </div>
                                </div>
                              </el-form>
                              <!-- 加载数据 -->
                              <el-form
                                class="option"
                                v-if="method.type === 'loadData'"
                              >
                                <div class="card">
                                  <div class="header">待加载数据的组件 ID</div>
                                  <div class="body">
                                    <el-form-item>
                                      <elx-input
                                        :value.sync="method.componentId"
                                      ></elx-input>
                                    </el-form-item>
                                  </div>
                                </div>
                              </el-form>
                              <el-button
                                slot="reference"
                                type="text"
                                class="el-icon-edit"
                              ></el-button>
                            </el-popover>
                            <el-button
                              style="margin-left: 10px"
                              @click="removePresetMethod(index, methodIndex)"
                              type="text"
                              icon="el-icon-delete"
                            ></el-button>
                          </div>
                        </div>
                      </template>
                    </el-step>
                  </el-steps>
                  <div class="empty" v-if="item.presetMethods.length === 0">
                    无数据
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="header">添加预设方法</div>
                <div class="body">
                  <el-form-item label="预设方法">
                    <el-select v-model="newPresetMethodType">
                      <el-option
                        v-for="item in presetMethods"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="addPresetMethod(index)" type="primary"
                      >添加</el-button
                    >
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="card" v-show="currentPane === 2">
              <div class="header">自定义事件体</div>
              <div class="body">
                <el-form-item label-width="0">
                  <elx-input
                    type="textarea"
                    :value.sync="item.callback"
                  ></elx-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </el-collapse-item>
      <div
        class="empty"
        v-if="this.currentActive.component.events.length === 0"
      >
        无数据
      </div>
    </el-collapse>
    <el-form class="option" label-width="68px">
      <div class="card">
        <div class="body">
          <el-form-item label="添加事件">
            <el-autocomplete
              v-model="newClickName"
              :fetch-suggestions="eventSearch"
              value-key="name"
              :debounce="0"
            >
              <el-button
                @click="addEvent"
                slot="append"
                icon="el-icon-plus"
              ></el-button>
              <template slot-scope="{ item }">
                <div style="padding: 6px 0">
                  <div
                    :title="item.name"
                    style="
                      line-height: 1;
                      font-size: 14px;
                      font-weight: bold;
                      text-overflow: ellipsis;
                      overflow: hidden;
                    "
                    class="name"
                  >
                    {{ item.name }}
                  </div>
                  <div
                    :title="item.label"
                    style="
                      line-height: 1;
                      font-size: 12px;
                      text-overflow: ellipsis;
                      overflow: hidden;
                    "
                    class="label"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </template>
            </el-autocomplete>
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
  data() {
    return {
      currentPane: 1,
      newClickName: "",
      newPresetMethodType: "",
      eventEnums: this.currentActive.component.options.eventEnums
        ? this.currentActive.component.options.eventEnums
        : [],
      presetMethods: [
        { label: "绑定变量", value: "bindVariable" },
        { label: "加载数据", value: "loadData" },
      ],
    };
  },
  filters: {
    presetMethodNameFilter: (value, presetMethods) => {
      const presetMethod = presetMethods.find(
        (presetMethod) => presetMethod.value === value
      );
      return presetMethod ? presetMethod.label : "未知";
    },
  },
  watch: {
    "currentActive.component.options.eventEnums": {
      handler(newValue) {
        this.eventEnums = newValue ? newValue : [];
      },
      deep: true,
    },
  },
  methods: {
    // 添加事件
    addEvent() {
      if (!this.newClickName) {
        this.$message({ type: "info", message: "事件名不能为空" });
        return;
      }
      if (
        this.currentActive.component.events.find(
          (obj) => obj.type === this.newClickName
        )
      ) {
        this.$message({ type: "info", message: "事件名已存在" });
        return;
      }
      this.currentActive.component.events.push({
        id: nanoid(),
        type: this.newClickName,
        presetMethods: [],
        callback: "",
      });
      this.newClickName = "";
    },
    // 返回预设方法字段
    getPresetMethodField(type) {
      switch (type) {
        case "bindVariable":
          return { bindVariable: "", variableValue: "" };
        case "loadData":
          return { componentId: "" };
        default:
          return {};
      }
    },
    // 添加预设方法
    addPresetMethod(index) {
      if (!this.newPresetMethodType) {
        return this.$message({ type: "info", message: "请选择预设事件类型" });
      }
      this.currentActive.component.events[index].presetMethods.push({
        type: this.newPresetMethodType,
        ...this.getPresetMethodField(this.newPresetMethodType),
      });
      this.newPresetMethodType = "";
    },
    // 与下一个交换位置
    presetMethodSortDown(index, methodIndex) {
      const data = this.currentActive.component.events[index].presetMethods;
      if (data[methodIndex + 1]) {
        data[methodIndex] = data.splice(
          methodIndex + 1,
          1,
          data[methodIndex]
        )[0];
      }
    },
    // 与上一个交换位置
    presetMethodSortUp(index, methodIndex) {
      const data = this.currentActive.component.events[index].presetMethods;
      if (data[methodIndex - 1]) {
        data[methodIndex] = data.splice(
          methodIndex - 1,
          1,
          data[methodIndex]
        )[0];
      }
    },
    // 移除预设方法
    removePresetMethod(index, methodIndex) {
      this.currentActive.component.events[index].presetMethods.splice(
        methodIndex,
        1
      );
    },
    // 移除事件
    removeEvent(index) {
      this.currentActive.component.events.splice(index, 1);
    },
    // 事件搜索
    eventSearch(value, callback) {
      const results = value
        ? this.eventEnums.filter(
            (event) =>
              event.name.toLowerCase().indexOf(value.toLowerCase()) === 0
          )
        : this.eventEnums;
      callback(results);
    },
    // 数据格式化
    dataFormat(data) {
      return JSON.parse(JSON.stringify(data));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
