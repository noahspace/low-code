<template>
  <div class="themes-manage">
    <div class="tree">
      <GroupTree type="03" @current-change="treeCurrentChange" />
    </div>
    <div class="content">
      <div class="filter">
        <el-form class="filter-form" :model="filterForm" :inline="true">
          <el-form-item label="主题名称">
            <el-input
              v-model="filterForm.name"
              placeholder="请输入主题名称或关键词"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input
              v-model="filterForm.created_by"
              placeholder="请输入创建人"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="filterForm.created_time_begin"
              type="datetime"
              placeholder="选择开始日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>至</el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="filterForm.created_time_end"
              type="datetime"
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
            @click="addThemeFun"
            >新增主题</el-button
          >
        </div>
        <div class="content">
          <ul class="content-wrap">
            <li class="item" v-for="(item, index) in tableData" :key="index">
              <div
                class="sign sign-1"
                v-if="item.status == '2'"
                @click="clickFun('edit', 'info', item)"
              ></div>
              <div
                class="sign sign-2"
                v-if="item.status == '1'"
                @click="clickFun('edit', 'info', item)"
              ></div>
              <div
                class="sign sign-3"
                v-if="item.status == '0'"
                @click="clickFun('edit', 'info', item)"
              ></div>
              <div class="info" @click="clickFun('edit', 'info', item)">
                <h3 class="title">{{ item.name }}</h3>
                <p class="user">
                  <el-avatar
                    :size="20"
                    :src="require('./images/avatar.png')"
                  ></el-avatar>
                  <span class="username">{{ item.createdBy }}</span>
                </p>
                <div class="subscript" v-if="item.status == '0'">
                  <i class="el-icon-lock"></i>
                </div>
              </div>
              <div class="more">
                <el-popover width="100" trigger="hover" popper-class="popBtn">
                  <div
                    class="btn"
                    @click="clickFun('edit', 'edit', item)"
                    v-if="item.status == '1'"
                  >
                    编辑
                  </div>
                  <div
                    class="btn"
                    @click="clickFun('del', '', item)"
                    v-if="item.status == '1'"
                  >
                    删除
                  </div>
                  <div
                    class="btn"
                    v-if="item.status == '0'"
                    @click="clickFun('nolock', '', item)"
                  >
                    解锁
                  </div>
                  <div
                    class="btn"
                    v-if="item.status == '2'"
                    @click="clickFun('lock', '', item)"
                  >
                    锁定
                  </div>
                  <i slot="reference" class="el-icon-more"></i>
                </el-popover>
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
    </div>
    <dialog-wrapper ref="nolock">
      <template slot-scope="{ ID, type }">
        <nolock :ID="ID" :type="type" @close="close" />
      </template>
    </dialog-wrapper>
    <dialog-wrapper ref="addTheme">
      <template slot-scope="{ ID }">
        <addTheme
          @close="close"
          :ID="ID"
          @updateList="getThemeListFun(leftId)"
        />
      </template>
    </dialog-wrapper>
    <dialog-wrapper ref="lock">
      <template slot-scope="{ ID, type }">
        <lock @close="close" :ID="ID" :type="type" />
      </template>
    </dialog-wrapper>
  </div>
</template>

<script>
import GroupTree from "@/components/GroupTree";
import Pagination from "@/components/Pagination";
import addTheme from "./components/addTheme";
import lock from "../resource-components/lock";
import nolock from "../resource-components/nolock";

import { getThemeList, delThemes } from "@/apis/resources-components";

export default {
  components: { GroupTree, Pagination, addTheme, lock, nolock },
  data() {
    return {
      filterForm: {
        created_by: "",
        created_time_begin: "",
        created_time_end: "",
        name: "",
      },
      states: 0,
      types: "nolock",
      pager: {
        pageIndex: 1,
        pageSize: 8,
      },
      tableData: [],
      total: 0,
      leftId: "",
    };
  },
  mounted() {
    this.getThemeListFun(this.leftId);
  },
  methods: {
    treeCurrentChange(data) {
      console.log(data);
      this.leftId = data.id;
      this.getThemeListFun(this.leftId);
    },
    // 分页改变
    paginationChange(data) {
      this.pager = data;
      this.getThemeListFun(this.leftId);
    },
    clickFun(type, todo, row) {
      if (type == "del") {
        // this.types = "del";
        // this.$refs["delTheme"].show(
        //   { title: "删除主题", width: "600px" },
        //   { ID: " Id" }
        // );
        this.$confirm("确认删除该主题吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            delThemes({
              id: row.id,
            }).then((res) => {
              if (res.code == 200) {
                this.$messageBox("success");
                this.getThemeListFun(this.leftId);
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
        let params = {
          type: todo,
          rows: row,
        };
        this.$router.push({
          // path: "/resource/themes/theme-info/" + 454,
          // query: { type: todo },
          name: "theme-info",
          params,
        });
      } else if (type == "nolock") {
        this.types = "nolock";
        this.$refs["nolock"].show(
          { title: "解锁主题", width: "600px" },
          { ID: row.id, type: "主题" }
        );
      } else if (type == "lock") {
        this.$refs["lock"].show(
          { title: "温馨提示", width: "600px" },
          { ID: row.id, type: "主题" }
        );
      }
    },
    addThemeFun() {
      if (this.leftId) {
        this.$refs["addTheme"].show(
          { title: "添加主题", width: "600px" },
          { ID: this.leftId }
        );
      } else {
        this.$message({
          type: "info",
          message: "请选择主题分组",
        });
      }
    },
    close() {
      this.$refs["nolock"].close();
      this.$refs["lock"].close();
      this.getThemeListFun(this.leftId);
    },

    // 获取主题列表
    getThemeListFun(id) {
      let params = {
        category_id: id,
        name: this.filterForm.name,
        created_time_end: this.filterForm.created_time_end,
        created_time_begin: this.filterForm.created_time_begin,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
        created_by: this.filterForm.created_by,
      };
      getThemeList(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    search() {
      this.getThemeListFun(this.leftId);
    },
    reset() {
      this.filterForm = {};
      this.getThemeListFun(this.leftId);
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
