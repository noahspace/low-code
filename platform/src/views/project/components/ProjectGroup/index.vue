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
      ref="treeRef"
      :data="data"
      :props="defaultProps"
      @node-contextmenu.stop="contextmenuHandle"
      highlight-current
      @current-change="currentChangeHandle"
      node-key="project_group_id"
      :filter-node-method="filterNode"
    ></el-tree>
    <dialog-wrapper ref="dialogWrapperRef">
      <template slot-scope="{ close, success, data, type }">
        <add-update-group
          ref="addUpdateGroupRef"
          :type="type"
          :data="data"
          @close="close"
          @success="success"
        />
      </template>
    </dialog-wrapper>
  </div>
</template>

<script>
import AddUpdateGroup from "./components/AddUpdateGroup";
import * as API from "@/apis/project-group";
export default {
  components: { AddUpdateGroup },
  data() {
    return {
      loading: false,
      filterText: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "project_group_name",
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
        let res = await API.get();
        if (res.code === 200) {
          this.data = this.toTreeData(res.data, {
            id: "project_group_id",
            pid: "parent_group_id",
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
      return data.project_group_name.indexOf(value) !== -1;
    },
    // 创建根节点分组
    createHandle() {
      this.$refs["dialogWrapperRef"].show(
        {
          title: "新增分组",
          width: "500px",
        },
        {
          type: "add",
          data: {
            name: "",
            parent: "",
            desc: "",
          },
          success: async (data) => {
            try {
              this.$refs["addUpdateGroupRef"].loading = true;
              let res = await API.post({
                parent_group_id: data.parent,
                project_group_name: data.name,
                project_group_desc: data.desc,
              });
              if (res.code === 200) {
                this.$refs["treeRef"].append(
                  {
                    project_group_id: res.data.project_group_id,
                    project_group_name: data.name,
                    project_group_desc: data.desc,
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
                  type: "add",
                  data: {
                    name: "",
                    parent: parentData ? parentData.project_group_id : "-1",
                    desc: "",
                  },
                  success: async (data) => {
                    try {
                      this.$refs["addUpdateGroupRef"].loading = true;
                      let res = await API.post({
                        parent_group_id: data.parent,
                        project_group_name: data.name,
                        project_group_desc: data.desc,
                      });
                      if (res.code === 200) {
                        this.$refs["treeRef"].append(
                          {
                            project_group_id: res.data.project_group_id,
                            project_group_name: data.name,
                            project_group_desc: data.desc,
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
                  type: "add",
                  data: {
                    name: "",
                    parent: currentData.project_group_id,
                    desc: "",
                  },
                  success: async (data) => {
                    try {
                      this.$refs["addUpdateGroupRef"].loading = true;
                      let res = await API.post({
                        parent_group_id: data.parent,
                        project_group_name: data.name,
                        project_group_desc: data.desc,
                      });
                      if (res.code === 200) {
                        this.$refs["treeRef"].append(
                          {
                            project_group_id: res.data.project_group_id,
                            project_group_name: data.name,
                            project_group_desc: data.desc,
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
                  type: "edit",
                  data: {
                    id: currentData.project_group_id,
                    name: currentData.project_group_name,
                    parent: parentData ? parentData.project_group_id : "-1",
                    desc: currentData.project_group_desc,
                  },
                  success: async (data) => {
                    try {
                      this.$refs["addUpdateGroupRef"].loading = true;
                      let res = await API.update({
                        project_group_id: currentData.project_group_id,
                        parent_group_id: data.parent,
                        project_group_name: data.name,
                        project_group_desc: data.desc,
                      });
                      if (res.code === 200) {
                        // 删除
                        this.$refs["treeRef"].remove(
                          currentData.project_group_id
                        );
                        // 添加
                        currentData.project_group_name = data.name;
                        currentData.project_group_desc = data.desc;
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
                      let res = await API.delect({
                        project_group_id: currentData.project_group_id,
                      });
                      if (res.code === 200) {
                        this.$refs["treeRef"].remove(
                          currentData.project_group_id
                        );
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
  ::v-deep.el-tree-node__content {
    height: 30px;
  }
}
</style>
