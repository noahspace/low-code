<template>
  <div class="outline-tree-pane">
    <div class="header">
      <span class="title">大纲树</span>
      <i @click="close" class="close ri-close-line"></i>
    </div>
    <div class="body">
      <el-tree
        ref="treeRef"
        :data="config.components"
        node-key="id"
        highlight-current
        default-expand-all
        @current-change="currentChangeHandle"
        :expand-on-click-node="false"
        draggable
      >
        <span class="tree-node" slot-scope="{ data, node }">
          <span class="title">
            <i class="el-icon-document"></i>
            <span class="text-sm">{{ data.options.title }}</span>
          </span>
          <span class="delete">
            <!-- <el-switch
              style="margin-right: 6px"
              size="mini"
              v-model="data.show"
              @click.native.stop
            ></el-switch> -->

            <el-button
              v-show="data.show"
              type="text"
              size="mini"
              @click="data.show = !data.show"
              @click.native.stop
            >
              <i class="ri-eye-line"></i>
            </el-button>
            <el-button
              v-show="!data.show"
              type="text"
              size="mini"
              @click="data.show = !data.show"
              @click.native.stop
            >
              <i class="ri-eye-off-line"></i>
            </el-button>
            <el-button
              type="text"
              size="mini"
              icon="el-icon-delete"
              @click="deleteComponent(node, data)"
              @click.native.stop
            ></el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["config", "currentActive"],
  watch: {
    currentActive: {
      handler(currentActive) {
        this.$nextTick(() => {
          if (currentActive.component) {
            this.$refs["treeRef"].setCurrentNode(currentActive.component);
          } else {
            this.$refs["treeRef"].setCurrentKey(null);
          }
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    close() {
      this.$emit("closeAsidePane");
    },
    deleteComponent(node, data) {
      if (node.level > 1) {
        const parentData = node.parent.data.children;
        parentData.splice(
          parentData.findIndex((obj) => obj.id === data.id),
          1
        );
      } else {
        this.config.components.splice(
          this.config.components.findIndex((obj) => obj.id === data.id),
          1
        );
      }
    },
    currentChangeHandle(data) {
      this.currentActive.component = data;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
