<template>
  <div v-loading="loading" class="project-group">
    <div class="tools">
      <div class="item" @click="createPage">
        <i class="el-icon-plus"></i>
      </div>
      <div class="item" @click="createHandle">
        <i class="el-icon-folder"></i>
      </div>
    </div>
    <div class="tree-wrap">
      <el-input
        class="filter"
        placeholder="输入关键字进行过滤"
        v-model="filterText"
      >
      </el-input>
      <!-- <el-button v-if="data.length === 0" type="text" @click="createHandle"
        >创建分组</el-button
      > -->
      <el-tree
        ref="treeRef"
        :data="data"
        :props="defaultProps"
        highlight-current
        @current-change="currentChangeHandle"
        node-key="id"
        :filter-node-method="filterNode"
        default-expand-all
        draggable
      >
        <!-- @node-contextmenu.stop="contextmenuHandle" -->
        <span class="tree-node" slot-scope="{ data, node }">
          <div class="name" :title="data.name">
            <i v-if="data.type === 'group'" class="el-icon-folder"></i>
            <i v-else class="el-icon-tickets"></i>
            <span style="margin-left: 3px">{{ data.name }}</span>
          </div>
          <span v-if="data.type !== 'group'" class="tool1">
            <el-dropdown placement="right-start">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native="editGroup(data, node)"
                  icon="el-icon-edit-outline"
                  >编辑</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="cloneGroup(data, node)"
                  icon="el-icon-edit-outline"
                  >复制</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="deleteGroup(data, node)"
                  icon="el-icon-delete"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </span>
          <span v-else class="tool1">
            <el-dropdown placement="right-start">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native="editGroup(data, node)"
                  icon="el-icon-edit-outline"
                  >编辑</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="addChildrenPage(data, node)"
                  icon="el-icon-edit-outline"
                  >添加子页面</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="addChildrenGroup(data, node)"
                  icon="el-icon-edit-outline"
                  >添加子分组</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="deleteGroup(data, node)"
                  icon="el-icon-delete"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </span>
      </el-tree>
    </div>

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
import * as ProjectPage from "@/apis/project-page";
import { nanoid } from "nanoid";
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
  computed: {
    // 项目 ID
    projectId() {
      return this.$route.params.id;
    },
  },
  created() {
    this.getData();
  },
  methods: {
    // 复制
    async cloneGroup(data, node) {
      const parentData = node.parent.data;
      const name = data.name + "_" + nanoid();
      try {
        let res = await ProjectPage.post({
          project_id: this.mainId,
          page_group_id: parentData ? parentData.id : "-1",
          name: name,
          description: data.description,
        });
        if (res.code === 200) {
          this.$refs["treeRef"].append(
            {
              id: res.data.id,
              name: name,
              description: data.description,
              type: "page",
            },
            parentData.id === "-1" ? "" : parentData.id
          );

          // 添加配置
          if (data.page_config) {
            try {
              let res1 = await ProjectPage.updatePageOption({
                id: res.data.id,
                option: data.page_config,
              });

              if (res1.code === 200) {
                this.$messageBox();
              } else {
                this.$messageBox("error");
              }
            } catch (error) {
              console.log(error);
              //
            }
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        //
      }
    },
    // 添加子页面
    addChildrenPage(data) {
      const currentData = data;
      this.$refs["dialogWrapperRef"].show(
        { title: "新增子页面", width: "500px" },
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
              let res = await ProjectPage.post({
                project_id: this.mainId,
                page_group_id: data.parent,
                name: data.name,
                description: data.description,
              });
              if (res.code === 200) {
                this.$refs["treeRef"].append(
                  {
                    id: res.data.id,
                    name: data.name,
                    description: data.description,
                    type: "page",
                  },
                  data.parent === "-1" ? "" : data.parent
                );
                this.$router.push({
                  path: `/project/project-page-create/${this.projectId}/${res.data.id}`,
                });
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
    // 添加子分组
    addChildrenGroup(data) {
      const currentData = data;
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
                    type: "group",
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
    setCurrentKey() {
      this.$nextTick(() => {
        this.$refs["treeRef"].setCurrentKey(this.$route.path.split("/")[5]);
      });
    },
    // 编辑
    async editGroup(data, node) {
      const currentData = data;
      const parentData = node.parent.data;
      this.$refs["dialogWrapperRef"].show(
        { title: "编辑", width: "500px" },
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
            // 如果是分组
            if (currentData.type === "group") {
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
            } else if (currentData.type === "page") {
              // 如果是页面
              try {
                this.$refs["addUpdateGroupRef"].loading = true;
                let res = await ProjectPage.update({
                  id: currentData.id,
                  page_group_id: data.parent,
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
            }
          },
        }
      );
    },
    // 删除
    async deleteGroup(data) {
      const currentData = data;
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            // 如果是分组删除
            if (currentData.type === "group") {
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
            } else if (currentData.type === "page") {
              // 如果是页面删除
              try {
                let res = await ProjectPage.del({
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
          this.getPage(res.data.list);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    // 查询项目页面
    async getPage(data) {
      try {
        let res = await ProjectPage.get({
          project_id: this.mainId,
        });
        if (res.code === 200) {
          this.data = this.toTreeData(
            [
              ...data.map((obj) => ({ ...obj, type: "group" })),
              ...res.data.list.map((obj) => {
                return {
                  ...obj,
                  parent_id: obj.page_group_id,
                  type: "page",
                };
              }),
            ],
            {
              id: "id",
              pid: "parent_id",
            }
          );
          this.setCurrentKey();
        }
      } catch (error) {
        console.error(error);
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
                    type: "group",
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
    createPage() {
      this.$refs["dialogWrapperRef"].show(
        {
          title: "新增页面",
          width: "500px",
        },
        {
          code: this.type,
          mainId: this.mainId,
          type: "add",
          data: {
            name: "",
            parent: "-1",
            description: "",
          },
          success: async (data) => {
            try {
              this.$refs["addUpdateGroupRef"].loading = true;
              let res = await ProjectPage.post({
                project_id: this.mainId,
                page_group_id: data.parent,
                name: data.name,
                description: data.description,
              });
              if (res.code === 200) {
                this.$refs["treeRef"].append(
                  {
                    id: res.data.id,
                    name: data.name,
                    description: data.description,
                    type: "page",
                  },
                  data.parent === "-1" ? "" : data.parent
                );
                this.$router.push({
                  path: `/project/project-page-create/${this.projectId}/${res.data.id}`,
                });
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
    // 节点右键(已弃用)
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
                            type: "group",
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
            disabled: currentData.type === "page",
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
                            type: "group",
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
            label: "新增页面",
            icon: "el-icon-folder",
            onClick: () => {
              this.$refs["dialogWrapperRef"].show(
                {
                  title: "新增页面",
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
                      let res = await ProjectPage.post({
                        project_id: this.mainId,
                        page_group_id: data.parent,
                        name: data.name,
                        description: data.description,
                      });
                      if (res.code === 200) {
                        this.$refs["treeRef"].append(
                          {
                            id: res.data.id,
                            name: data.name,
                            description: data.description,
                            type: "page",
                          },
                          data.parent === "-1" ? "" : data.parent
                        );
                        this.$router.push({
                          path: `/project/project-page-create/${this.projectId}/${res.data.id}`,
                        });
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
            label: "新增子页面",
            icon: "el-icon-folder-opened",
            divided: true,
            disabled: currentData.type === "page",
            onClick: () => {
              this.$refs["dialogWrapperRef"].show(
                { title: "新增子页面", width: "500px" },
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
                      let res = await ProjectPage.post({
                        project_id: this.mainId,
                        page_group_id: data.parent,
                        name: data.name,
                        description: data.description,
                      });
                      if (res.code === 200) {
                        this.$refs["treeRef"].append(
                          {
                            id: res.data.id,
                            name: data.name,
                            description: data.description,
                            type: "page",
                          },
                          data.parent === "-1" ? "" : data.parent
                        );
                        this.$router.push({
                          path: `/project/project-page-create/${this.projectId}/${res.data.id}`,
                        });
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
            label: "编辑",
            icon: "el-icon-edit-outline",
            onClick: () => {
              this.$refs["dialogWrapperRef"].show(
                { title: "编辑", width: "500px" },
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
                    // 如果是分组
                    if (currentData.type === "group") {
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
                    } else if (currentData.type === "page") {
                      // 如果是页面
                      try {
                        this.$refs["addUpdateGroupRef"].loading = true;
                        let res = await ProjectPage.update({
                          id: currentData.id,
                          page_group_id: data.parent,
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
                    }
                  },
                }
              );
            },
          },
          {
            label: "删除",
            icon: "el-icon-folder-delete",
            onClick: () => {
              this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                beforeClose: async (action, instance, done) => {
                  if (action === "confirm") {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = "执行中...";
                    // 如果是分组删除
                    if (currentData.type === "group") {
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
                    } else if (currentData.type === "page") {
                      // 如果是页面删除
                      try {
                        let res = await ProjectPage.del({
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
  height: 100%;
  .filter {
    margin: 10px 0;
  }
  .tools {
    height: 40px;
    border-bottom: 1px solid rgb(220, 223, 230);
    display: flex;
    align-items: center;
    .item {
      font-size: 18px;
      cursor: pointer;
      margin-right: 10px;
      color: #666;
      &:hover {
        color: rgb(85, 158, 255);
      }
    }
  }
  .tree-wrap {
    height: calc(100% - 40px);
    overflow: auto;
  }
  .tree-node {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
    .name {
      width: calc(100% - 30px);
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      flex: none;
    }
    .tool1 {
      margin: 0 10px;
      font-size: 16px;
      visibility: hidden;
      &:hover {
        .el-dropdown-link {
          color: #1985f1;
        }
      }
    }
    &:hover {
      .tool1 {
        visibility: visible;
      }
    }
  }
  ::v-deep.el-tree-node__content {
    height: 30px;
  }
}
</style>
