<template>
  <div class="sys-run">
    <el-tabs type="border-card">
      <el-tab-pane label="系统运行资源监测">
        <sourceLook></sourceLook>
      </el-tab-pane>
      <el-tab-pane label="数据库运行监测">
        <dataBase></dataBase>
      </el-tab-pane>
      <el-tab-pane label="SQL执行监测">
        <sqlData></sqlData>
      </el-tab-pane>
      <el-tab-pane label="访问审计">
        <visitTotal></visitTotal>
      </el-tab-pane>
    </el-tabs>
    <div class="sel-env">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          {{ runEnv }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in runEnvList"
            :key="item.code"
            :command="item.name"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import sourceLook from "./components/sourceLook/index";
import dataBase from "./components/dataBase/index";
import sqlData from "./components/sql/index";
import visitTotal from "./components/visitTotal/index";

export default {
  data() {
    return {
      runEnv: "开发环境",
      runEnvList: [
        { name: "开发环境", code: "0" },
        { name: "测试环境", code: "1" },
        { name: "生产环境", code: "2" },
      ],
    };
  },
  components: {
    sourceLook,
    dataBase,
    visitTotal,
    sqlData,
  },
  mounted() {},
  methods: {
    handleClick(val) {
      this.runEnv = val;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
