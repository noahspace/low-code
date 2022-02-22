<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="基本信息" name="first">
      <serverInfo></serverInfo>
    </el-tab-pane>
    <el-tab-pane label="项目列表" name="second">
      <componentsMag></componentsMag>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import serverInfo from "../components/serverInfo";
import componentsMag from "../components/componentsMag";
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  components: { serverInfo, componentsMag },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang="scss">
.el-tabs {
  height: 100%;
  .el-tabs__content {
    height: calc(100% - 60px);
    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
