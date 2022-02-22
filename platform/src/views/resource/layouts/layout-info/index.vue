<template>
  <div class="tabs">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="布局预览" name="first">
        <componentsMag></componentsMag>
      </el-tab-pane>
      <el-tab-pane label="基本信息" name="second">
        <layoutInfo ref="layoutInfo"></layoutInfo>
      </el-tab-pane>
    </el-tabs>
    <el-button
      type="primary"
      @click="editFun()"
      class="btnEdit"
      v-show="rows.status == '1'"
      >编辑</el-button
    >
    <el-button @click="cancelFun()" class="btnBack">返回</el-button>
  </div>
</template>
<script>
import layoutInfo from "../components/layoutInfo";
import componentsMag from "../components/componentsMag";

export default {
  data() {
    return {
      activeName: "first",
      rows: {},
    };
  },
  components: { layoutInfo, componentsMag },
  mounted() {
    if (!this.$route.params.rows) {
      // 表示 为空对象，页面状态为刷新状态  则从localStorage 中获取值
      this.rows = JSON.parse(window.localStorage.getItem("params"));
    } else {
      // 表示为从其他页面跳转过来 获取从父页面传过来的参数
      this.rows = this.$route.params.rows;
      // 将获取到的参数  localStorage 中
      window.localStorage.setItem("params", JSON.stringify(this.rows));
    }
    console.log(this.rows);
  },
  methods: {
    handleClick() {
      this.$refs.layoutInfo.updateType();
    },
    editFun() {
      if (this.activeName == "second") {
        this.$refs.layoutInfo.getType();
      } else {
        this.$router.push({
          path: "/ui-workbench/layout/" + this.rows.id + "/" + "null",
        });
      }
    },
    cancelFun() {
      this.$router.push({
        path: "/resource/layouts",
      });
    },
  },
  beforeDestroy() {
    // window.localStorage.removeItem("params");
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
.tabs {
  height: 100%;
  position: relative;
  .btnEdit {
    position: absolute;
    top: 0;
    right: 70px;
  }
  .btnBack {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
