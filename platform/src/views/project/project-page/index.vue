<template>
  <div class="project-page">
    <div class="tree">
      <GroupTree
        ref="groupTree"
        type="02"
        :mainId="projectId"
        @current-change="treeCurrentChange"
      />
    </div>
    <div class="content">
      <!-- <el-button class="exit" type="" @click="exit">返回</el-button> -->
      <el-button v-show="!isEdit" class="edit" type="primary" @click="edit"
        >编辑</el-button
      >
      <el-button
        v-show="isEdit"
        class="edit"
        type="success"
        @click="editSuccess"
        >完成</el-button
      >
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="menuActiveHandle($event, pageId)"
      >
        <el-menu-item index="1">页面预览</el-menu-item>
        <el-menu-item index="2">基本信息</el-menu-item>
      </el-menu>
      <div class="content-main">
        <transition name="fade-transform" mode="out-in">
          <router-view ref="routeMain" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import GroupTree from "./components/GroupTree";
export default {
  components: { GroupTree },
  data() {
    return {
      activeIndex: "",
      isEdit: false,
    };
  },
  watch: {
    $route: {
      handler(route) {
        const uri = route.path.split("/")[4];
        if (uri === "preview") {
          this.activeIndex = "1";
        } else if (uri === "baseinfo") {
          this.activeIndex = "2";
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    // 项目 ID
    projectId() {
      return this.$route.params.id;
    },
    pageId() {
      return this.$route.params.pageId;
    },
  },
  methods: {
    edit() {
      if (!this.pageId) {
        this.$message({
          type: "info",
          message: "请选择展示页面",
        });
        return;
      }
      if (this.activeIndex == 1) {
        this.$router.push({
          path: "/ui-workbench/page/" + this.pageId + "/" + this.projectId,
        });
      } else {
        this.$refs.routeMain.isEdit = true;
        this.isEdit = true;
      }
    },
    editSuccess() {
      this.isEdit = false;
      this.$refs.routeMain.save();
    },
    exit() {
      this.$router.push({
        path: "/project/project-details/base-info/" + this.projectId,
      });
    },
    treeCurrentChange(data) {
      if (data.type === "page") {
        if (this.activeIndex) {
          this.menuActiveHandle(this.activeIndex, data.id);
        } else {
          this.menuActiveHandle("1", data.id);
        }
      }
    },
    menuActiveHandle(index, pageId) {
      if (!pageId) {
        this.$message({
          type: "info",
          message: "请选择展示页面",
        });
        return;
      }
      if (index === "1") {
        this.$router.push({
          path:
            "/project/project-page/" + this.projectId + "/preview/" + pageId,
        });
      } else if (index === "2") {
        this.$router.push({
          path:
            "/project/project-page/" + this.projectId + "/baseinfo/" + pageId,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
