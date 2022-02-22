// 之前右键菜单版本
<template>
  <div v-loading="loading" class="project-group">
    <el-input
      class="filter"
      placeholder="输入关键字进行过滤"
      v-model="filterText"
    >
    </el-input>
    <el-button v-if="data.length === 0" type="text" @click="createHandle"
      >创建分组</el-button
    >
    <el-tree
      class="groupTree"
      ref="treeRef"
      :data="data"
      :props="defaultProps"
      @node-contextmenu.stop="contextmenuHandle"
      highlight-current
      @current-change="currentChangeHandle"
      node-key="id"
      :filter-node-method="filterNode"
      draggable
    ></el-tree>
    <dialog-wrapper ref="dialogWrapperRef">
      <template slot-scope="{ close, success, data, type, code, mainId }">
        <add-update-group
          ref="addUpdateGroupRef"
          :type="type"
          :data="data"
          :code="code"
          :mainId="mainId"
          @close="close"
          @success="success"
        />
      </template>
    </dialog-wrapper>
  </div>
</template>

<script>
import AddUpdateGroup from "./components/AddUpdateGroup";
import * as API from "@/apis/group";
export default {
  props: ["type", "mainId"],
  components: { AddUpdateGroup },
  data() {
    return {
      loading: false,
      filterText: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs["treeRef"].filter(val);
    },
  },
  created() {
    this.getData();
  },
  methods: {
    toTreeData(data, props = { id: "id", pid: "pid" }) {
      const { id: _id, pid: _pid } = props;
      const map = data.reduce((obj, item) => {
        obj[item[_id]] = item;
        return obj;
      }, {});
      let treeData = [];
      data.forEach((child) => {
        const mapItem = map[child[_pid]];
        if (mapItem) {
          (mapItem.children || (mapItem.children = [])).push(child);
        } else {
          treeData.push(child);
        }
      });
      return treeData;
    },
    // 查询分组
    async getData() {
      try {
        this.loading = true;
        let res = await API.get({
          type: this.type,
          main_id: this.mainId,
        });
        if (res.code === 200) {
          this.data = this.toTreeData(res.data.list, {
            id: "id",
            pid: "parent_id",
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    // 节点过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 创建根节点分组
    createHandle() {
      this.$refs["dialogWrapperRef"].show(
        {
          title: "新增分组",
          width: "500px",
        },
        {
          code: this.type,
          mainId: this.mainId,
          type: "add",
          data: {
            name: "",
            parent: "",
            description: "",
          },
          success: async (data) => {
            try {
              this.$refs["addUpdateGroupRef"].loading = true;
              let res = await API.post({
                main_id: this.mainId,
                type: this.type,
                parent_id: data.parent,
                name: data.name,
                description: data.description,
              });
              if (res.code === 200) {
                this.$refs["treeRef"].append(
                  {
                    id: res.data.id,
                    name: data.name,
                    description: data.description,
                  },
                  data.parent === "-1" ? "" : data.parent
                );
              }
            } catch (error) {
              console.log(error);
            } finally {
              this.$messageBox();
              this.$refs["dialogWrapperRef"].close();
            }
          },
        }
      );
    },
    // 节点右键
    contextmenuHandle(event, data, node) {
      const currentData = data;
      const parentData = node.parent.data;
      // 打开菜单
      this.$contextmenu({
        items: [
          {
            label: "新增分组",
            icon: "el-icon-folder",
            onClick: () => {
              this.$refs["dialogWrapperRef"].show(
                {
                  title: "新增分组",
                  width: "500px",
                },
                {
                  code: this.type,
                  mainId: this.mainId,
                  type: "add",
                  data: {
                    name: "",
                    parent: parentData ? parentData.id : "-1",
                    description: "",
                  },
                  success: async (data) => {
                    try {
                      this.$refs["addUpdateGroupRef"].loading = true;
                      let res = await API.post({
                        main_id: this.mainId,
                        type: this.type,
                        parent_id: data.parent,
                        name: data.name,
                        description: data.description,
                      });
                      if (res.code === 200) {
                        this.$refs["treeRef"].append(
                          {
                            id: res.data.id,
                            name: data.name,
                            description: data.description,
                          },
                          data.parent === "-1" ? "" : data.parent
                        );
                      }
                    } catch (error) {
                      console.log(error);
                    } finally {
                      this.$messageBox();
                      this.$refs["dialogWrapperRef"].close();
                    }
                  },
                }
              );
            },
          },
          {
            label: "新增子分组",
            icon: "el-icon-folder-opened",
            divided: true,
            onClick: () => {
              this.$refs["dialogWrapperRef"].show(
                { title: "新增子分组", width: "500px" },
                {
                  code: this.type,
                  mainId: this.mainId,
                  type: "add",
                  data: {
                    name: "",
                    parent: currentData.id,
                    description: "",
                  },
                  success: async (data) => {
                    try {
                      this.$refs["addUpdateGroupRef"].loading = true;
                      let res = await API.post({
                        main_id: this.mainId,
                        type: this.type,
                        parent_id: data.parent,
                        name: data.name,
                        description: data.description,
                      });
                      if (res.code === 200) {
                        this.$refs["treeRef"].append(
                          {
                            id: res.data.id,
                            name: data.name,
                            description: data.description,
                          },
                          data.parent === "-1" ? "" : data.parent
                        );
                      }
                    } catch (error) {
                      console.log(error);
                    } finally {
                      this.$messageBox();
                      this.$refs["dialogWrapperRef"].close();
                    }
                  },
                }
              );
            },
          },
          {
            label: "编辑分组",
            icon: "el-icon-edit-outline",
            onClick: () => {
              this.$refs["dialogWrapperRef"].show(
                { title: "编辑分组", width: "500px" },
                {
                  code: this.type,
                  mainId: this.mainId,
                  type: "edit",
                  data: {
                    id: currentData.id,
                    name: currentData.name,
                    parent: parentData ? parentData.id : "-1",
                    description: currentData.description,
                  },
                  success: async (data) => {
                    try {
                      this.$refs["addUpdateGroupRef"].loading = true;
                      let res = await API.update({
                        type: this.type,
                        id: currentData.id,
                        parent_id: data.parent,
                        name: data.name,
                        description: data.description,
                      });
                      if (res.code === 200) {
                        // 删除
                        this.$refs["treeRef"].remove(currentData.id);
                        // 添加
                        currentData.name = data.name;
                        currentData.description = data.description;
                        this.$refs["treeRef"].append(
                          currentData,
                          data.parent === "-1" ? "" : data.parent
                        );
                      }
                    } catch (error) {
                      console.error(error);
                    } finally {
                      this.$messageBox();
                      this.$refs["dialogWrapperRef"].close();
                    }
                  },
                }
              );
            },
          },
          {
            label: "删除分组",
            icon: "el-icon-folder-delete",
            onClick: () => {
              this.$confirm("此操作将永久删除该分组, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                beforeClose: async (action, instance, done) => {
                  if (action === "confirm") {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = "执行中...";
                    try {
                      let res = await API.del({
                        type: this.type,
                        id: currentData.id,
                      });
                      if (res.code === 200) {
                        this.$refs["treeRef"].remove(currentData.id);
                      }
                    } catch (error) {
                      console.error(error);
                    } finally {
                      instance.confirmButtonLoading = false;
                      this.$messageBox();
                      done();
                    }
                  } else {
                    done();
                  }
                },
              })
                .then(() => {})
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消删除",
                  });
                });
            },
          },
        ],
        event,
        zIndex: 10000,
        minWidth: 230,
      });
    },
    // 当前节点改变
    currentChangeHandle(data, node) {
      this.$emit("current-change", data, node);
    },
  },
};
</script>

<style lang="scss" scoped>
.project-group {
  .filter {
    margin-bottom: 10px;
  }
}
</style>
<style lang="scss">
.groupTree {
  .el-tree-node__content {
    height: 35px;
  }
  .el-tree-node__content:hover {
    background-color: #f9f9f9;
  }
  .el-tree-node.is-current {
    > .el-tree-node__content {
      background-color: #eaf5ff;
    }
  }
}
</style>
