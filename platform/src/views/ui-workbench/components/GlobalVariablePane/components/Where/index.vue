<template>
  <div class="where-card" v-if="['AND', 'OR'].indexOf(whereItem.field) !== -1">
    <div class="where-title">
      <span>{{ whereItem.field | titleFormat }}</span>
      <el-button v-if="parentData" type="text" @click="removeWhere"
        >删除</el-button
      >
    </div>
    <div class="where-body">
      <Where
        v-for="(item, index) in whereItem.list"
        :key="item.id"
        :whereItem="item"
        :fieldList="columnList"
        :parentData="whereItem.list"
        :parentIndex="index"
      />
      <div class="where-action">
        <elx-select :value.sync="addType" class="type">
          <el-option label="字段" value="field"></el-option>
          <el-option label="且" value="AND"></el-option>
          <el-option label="或" value="OR"></el-option>
        </elx-select>
        <el-button @click="addWhere(whereItem)" class="where-button" type="text"
          >添加</el-button
        >
      </div>
    </div>
  </div>
  <div class="where-item" v-else>
    <elx-select
      :title="'字段名称：' + data.field"
      :value.sync="data.field"
      placeholder="字段名称"
    >
      <el-option
        v-for="item in columnList"
        :key="item.name"
        :label="item.annotation"
        :value="item.name"
      ></el-option>
    </elx-select>
    <elx-select
      :title="'分隔符：' + data.signed"
      :value.sync="data.signed"
      placeholder="分隔符"
    >
      <el-option label="等于" value="="></el-option>
      <el-option label="大于" value=">"></el-option>
      <el-option label="大于等于" value=">="></el-option>
      <el-option label="小于" value="<"></el-option>
      <el-option label="小于等于" value="<="></el-option>
      <el-option label="不等于" value="!"></el-option>
    </elx-select>
    <elx-input
      :title="'默认值：' + data.defaultValue"
      :value.sync="data.defaultValue"
      placeholder="默认值"
    />
    <elx-select
      :title="'绑定变量：' + data.bindVariable"
      clearable
      :value.sync="data.bindVariable"
      placeholder="绑定变量"
    >
      <el-option
        v-for="variable in config.variables"
        :key="variable.id"
        :label="variable.name"
        :value="variable.id"
      ></el-option>
    </elx-select>
    <el-button @click="removeWhere" type="text">删除</el-button>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  inject: ["config"],
  name: "Where",
  props: ["whereItem", "fieldList", "parentData", "parentIndex"],
  data() {
    return {
      data: this.whereItem,
      addType: "field",
      columnList: [],
    };
  },
  watch: {
    fieldList: {
      handler(val) {
        this.columnList = val;
      },
      deep: true,
      immediate: true,
    },
  },
  filters: {
    titleFormat(val) {
      switch (val) {
        case "AND":
          return "且";
        case "OR":
          return "或";
        default:
          return val;
      }
    },
  },
  methods: {
    addWhere(item) {
      if (this.addType === "field") {
        item.list.push({
          id: nanoid(),
          field: "",
          signed: "=",
          defaultValue: "",
          bindVariable: "",
        });
      } else {
        item.list.push({
          id: nanoid(),
          field: this.addType,
          list: [],
        });
        this.addType = "field";
      }
    },
    removeWhere() {
      this.parentData.splice(this.parentIndex, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.where-card {
  font-size: 14px;
  margin-bottom: 6px;
  .where-title {
    background: #ebebeb;
    border: 1px solid #559eff;
    padding: 0 6px;
    line-height: 30px;
    border-radius: 3px 0 0 0;
    border-right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .where-body {
    border-left: 1px solid #559eff;
    padding: 10px 0 10px 10px;
  }
}
.where-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  gap: 3px;
  margin-bottom: 5px;
}
.where-action {
  display: flex;
  .where-button {
    display: block;
    margin-left: 6px;
  }
  .where-type {
    margin-right: 5px;
  }
}
</style>
