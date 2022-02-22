<template>
  <div class="layouts-manage">
    <div class="tree">
      <GroupTree type="08" @current-change="treeCurrentChange" />
    </div>
    <div class="content">
      <div class="filter">
        <el-form class="filter-form" :model="filterForm" :inline="true">
          <el-form-item label="布局名称">
            <el-input
              v-model="filterForm.user"
              placeholder="请输入布局名称或关键词"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input
              v-model="filterForm.user"
              placeholder="请输入创建人"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="filterForm.startTime"
              type="date"
              placeholder="选择开始日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>至</el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="filterForm.endTime"
              type="date"
              placeholder="选择结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="data">
        <div class="tools">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="clickFun('add')"
            >新增</el-button
          >
        </div>
        <div class="content">
          <ul class="content-wrap">
            <li class="item" v-for="(item, index) in tableData" :key="index">
              <div class="sign" @click="clickFun('info', item)">
                <div>
                  <img :src="'/resource_file/' + item.previewUrl" alt="" />
                </div>
                <div class="subscript" v-if="item.status == 0">
                  <i class="el-icon-lock"></i>
                </div>
              </div>
              <div class="info">
                <h3 class="title">
                  {{ item.name
                  }}<span class="state-1" v-if="item.status == 2">开放</span
                  ><span class="state-2" v-if="item.status == 1">开发中</span
                  ><span class="state-3" v-if="item.status == 0">锁定中</span>
                </h3>
                <div class="user-info">
                  <div class="user-l">
                    <p class="user">
                      <el-avatar
                        :size="20"
                        :src="require('./images/avatar.png')"
                      ></el-avatar>
                    </p>
                    <span class="username">{{ item.createdBy }}</span>
                    <!-- <span class="username">{{ item.createdTime }}</span> -->
                  </div>
                  <div class="more">
                    <el-popover
                      width="100"
                      trigger="hover"
                      popper-class="popBtn"
                    >
                      <div
                        class="btn"
                        v-if="item.status == 1"
                        @click="clickFun('edit', item)"
                      >
                        编辑
                      </div>
                      <div
                        class="btn"
                        v-if="item.status == 1"
                        @click="clickFun('del', item)"
                      >
                        删除
                      </div>
                      <div
                        class="btn"
                        v-if="item.status == 0"
                        @click="clickFun('nolock', item)"
                      >
                        解锁
                      </div>
                      <div
                        class="btn"
                        v-if="item.status == 2"
                        @click="clickFun('lock', item)"
                      >
                        锁定
                      </div>
                      <i slot="reference" class="el-icon-more"></i>
                    </el-popover>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="pagination">
          <pagination
            :pageSize="pager.pageSize"
            :total="total"
            @change="paginationChange"
          />
        </div>
      </div>
      <dialog-wrapper ref="editLayout">
        <template slot-scope="{ ID }">
          <editLayout :ID="ID" @close="close" @success="getListFun(leftId)" />
        </template>
      </dialog-wrapper>
      <dialog-wrapper ref="nolock">
        <template slot-scope="{ ID, type }">
          <nolock :ID="ID" :type="type" @close="close" />
        </template>
      </dialog-wrapper>
      <dialog-wrapper ref="lock">
        <template slot-scope="{ ID, type }">
          <lock @close="close" :ID="ID" :type="type" />
        </template>
      </dialog-wrapper>
    </div>
  </div>
</template>

<script>
import GroupTree from "@/components/GroupTree";
import Pagination from "@/components/Pagination";
import editLayout from "./components/editLayout";
import lock from "../resource-components/lock";
import nolock from "../resource-components/nolock";
import { layouts, deleteLayout } from "@/apis/resources-components";

export default {
  components: { GroupTree, Pagination, editLayout, nolock, lock },
  data() {
    return {
      filterForm: {
        created_by: "",
        created_time_begin: "",
        created_time_end: "",
        name: "",
      },
      states: 1,
      types: "nolock",
      pager: {
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: [],
      total: 0,
      leftId: "",
    };
  },
  mounted() {
    this.getListFun(this.leftId);
  },
  methods: {
    treeCurrentChange(data) {
      this.leftId = data.id;
      this.getListFun(this.leftId);
    },
    // 分页改变
    paginationChange(data) {
      this.pager = data;
      this.getListFun(this.leftId);
    },
    // emitList(name) {
    //   this.getListFun(this.leftId);
    //   if (name) {
    //     let id = this.tableData.filter((item) => {
    //       if (item.name == name) {
    //         return item.id;
    //       }
    //       this.$router.push({
    //         path: "/ui-workbench/layout/" + id + "/" + "null",
    //       });
    //     });
    //   }
    // },
    // 获取列表
    getListFun(id) {
      let params = {
        category_id: id,
        name: this.filterForm.name,
        created_end_time: this.filterForm.created_time_end,
        created_start_time: this.filterForm.created_time_begin,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
        created_by: this.filterForm.created_by,
      };
      layouts(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    search() {
      this.getListFun(this.leftId);
    },
    reset() {
      this.filterForm = {
        created_by: "",
        created_time_begin: "",
        created_time_end: "",
        name: "",
      };
      this.getListFun(this.leftId);
    },
    clickFun(type, row) {
      if (type == "del") {
        console.log(deleteLayout);
        // this.types = "del";
        // this.$refs["delLayout"].show(
        //   { title: "删除布局", width: "600px" },
        //   { ID: " Id" }
        // );
        this.$confirm("确认删除该布局吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleteLayout({ id: row.id }).then((res) => {
              if (res.code == 200) {
                this.$messageBox("success");
                this.getListFun(this.leftId);
              } else {
                this.$messageBox("error");
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else if (type == "edit") {
        //项目id传null过去，不然报错
        this.$router.push({
          path: "/ui-workbench/layout/" + row.id + "/" + "null",
        });
      } else if (type == "nolock") {
        this.types = "nolock";
        this.$refs["nolock"].show(
          { title: "解锁布局库", width: "600px" },
          { ID: row.id, type: "布局库" }
        );
      } else if (type == "lock") {
        this.$refs["lock"].show(
          { title: "温馨提示", width: "600px" },
          { ID: row.id, type: "布局库" }
        );
      } else if (type == "add") {
        if (this.leftId) {
          this.$refs["editLayout"].show(
            { title: "新增布局", width: "600px" },
            { ID: this.leftId }
          );
        } else {
          this.$message({
            type: "info",
            message: "请选择布局分组",
          });
        }
      } else if (type == "info") {
        let params = {
          rows: row,
        };
        this.$router.push({
          name: "layout-info",
          params,
        });
      }
    },
    close() {
      this.$refs["editLayout"].close();
      this.$refs["lock"].close();
      this.$refs["nolock"].close();
      this.getListFun(this.leftId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
.popBtn {
  min-width: 100px;
  .btn {
    text-align: center;
    cursor: pointer;
    color: #7dc1ff;
    line-height: 30px;
  }
}
</style>
