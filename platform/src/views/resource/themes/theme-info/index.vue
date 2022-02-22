<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="基本信息" name="first">
      <editTheme></editTheme>
    </el-tab-pane>
    <el-tab-pane label="组件分类" name="second">
      <componentsMag></componentsMag>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import editTheme from "../components/editTheme";
import componentsMag from "../components/componentsMag";

export default {
  data() {
    return {
      activeName: "first",
    };
  },
  components: { editTheme, componentsMag },

  methods: {},
  beforeDestroy() {
    window.localStorage.removeItem("params");
  },
};
</script>
<style lang="scss">
.el-tabs {
  height: 100%;
  background: #fff;
  padding-left: 20px;
  .el-tabs__content {
    height: calc(100% - 60px);
    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
