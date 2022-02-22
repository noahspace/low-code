<template>
  <div class="icons-list">
    <div class="tree">
      <GroupTree type="06" @current-change="treeCurrentChange" />
    </div>
    <div class="content">
      <div class="filter">
        <el-form class="filter-form" :model="filterForm" :inline="true">
          <el-form-item label="插图库名称">
            <el-input
              v-model="filterForm.name"
              placeholder="请输入插图库名称或关键词"
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
              v-model="filterForm.created_start_time"
              type="date"
              placeholder="选择开始日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>至</el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="filterForm.created_end_time"
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
            @click="operateHandle(5)"
            type="primary"
            icon="el-icon-circle-plus-outline"
            >新增插图库</el-button
          >
        </div>
        <div class="content">
          <div class="content-wrap">
            <div class="item" v-for="(item, index) in tableData" :key="index">
              <div @click="openDetails(item)" class="icon-preview">
                <img :src="'/resource_file/' + item.previewUrl" alt="" />
                <div class="subscript" v-if="item.status == '0'">
                  <i class="el-icon-lock"></i>
                </div>
              </div>
              <div class="info">
                <h2 class="title">{{ item.name }}</h2>
                <div class="user">
                  <span
                    ><i class="el-icon-user-solid"></i
                    >{{ item.createdBy }}</span
                  >
                  <el-dropdown trigger="hover">
                    <span class="el-dropdown-link">
                      <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-if="item.status !== '0'"
                        @click.native="operateHandle(1, item)"
                        >编辑</el-dropdown-item
                      >
                      <el-dropdown-item
                        v-if="item.status !== '0'"
                        @click.native="operateHandle(2, item)"
                        >删除</el-dropdown-item
                      >
                      <el-dropdown-item
                        @click.native="operateHandle(3, item)"
                        v-if="item.status !== '0'"
                        >锁定</el-dropdown-item
                      >
                      <el-dropdown-item
                        @click.native="operateHandle(4, item)"
                        v-if="item.status == '0'"
                        >解锁</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>
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
    <dialog-wrapper ref="editWrapper">
      <template slot-scope="{ close, params, type }">
        <AddEdit
          :type="type"
          :params="params"
          @close="close"
          @success="getListFun(leftId)"
        />
      </template>
    </dialog-wrapper>
    <dialog-wrapper ref="nolock">
      <template slot-scope="{ ID, type }">
        <nolock :ID="ID" :type="type" @close="closeFun" />
      </template>
    </dialog-wrapper>
    <dialog-wrapper ref="lock">
      <template slot-scope="{ ID, type }">
        <lock @close="closeFun" :ID="ID" :type="type" />
      </template>
    </dialog-wrapper>
  </div>
</template>

<script>
import GroupTree from "@/components/GroupTree";
import Pagination from "@/components/Pagination";
import AddEdit from "./components/AddEdit";
import lock from "../../resource-components/lock";
import nolock from "../../resource-components/nolock";
import { geticonslibsList, deliconslibs } from "@/apis/resources-components";

export default {
  components: { GroupTree, Pagination, AddEdit, lock, nolock },
  data() {
    return {
      filterForm: {
        name: "",
        created_end_time: "",
        created_start_time: "",
        created_by: "",
      },
      pager: {
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: [],
      total: 0,
      leftId: "",
      previewUrl: "",
      uploadForm: new FormData(),
    };
  },
  mounted() {
    this.getListFun(this.leftId);
  },
  methods: {
    // 卡片操作
    operateHandle(type, row) {
      // 编辑
      if (type === 1) {
        this.$refs["editWrapper"].show(
          {
            title: "编辑插图库",
            width: "500px",
          },
          {
            type: "edit",
            params: {
              rows: row,
              category: this.leftId || row.category,
            },
            close: () => {
              this.$refs["editWrapper"].visible = false;
            },
            success: (data) => {
              console.log(data);
              this.$refs["editWrapper"].visible = false;
            },
          }
        );
      }
      // 新增
      if (type === 5) {
        if (this.leftId) {
          this.$refs["editWrapper"].show(
            {
              title: "新增插图库",
              width: "500px",
            },
            {
              type: "add",
              params: {
                category: this.leftId,
                tags: [],
              },
              close: () => {
                this.$refs["editWrapper"].visible = false;
              },
              success: (data) => {
                console.log(data);
                this.$refs["editWrapper"].visible = false;
              },
            }
          );
        } else {
          this.$message({
            type: "info",
            message: "请选择插图分组",
          });
        }
      }
      if (type === 2) {
        this.uploadForm = new FormData();
        this.$confirm("确认删除该插图库吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.uploadForm.append("id", row.id);
            deliconslibs(this.uploadForm).then((res) => {
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
      }
      if (type === 4) {
        this.types = "nolock";
        this.$refs["nolock"].show(
          { title: "解锁插图库", width: "600px" },
          { ID: row.id, type: "插图库" }
        );
      }
      if (type === 3) {
        this.$refs["lock"].show(
          { title: "温馨提示", width: "600px" },
          { ID: row.id, type: "插图库" }
        );
      }
    },
    // 打开详情页面
    openDetails(row) {
      let params = {
        rows: row,
      };
      this.$router.push({
        name: "illustrations-details",
        params,
      });
    },

    treeCurrentChange(data) {
      console.log(data);
      this.leftId = data.id;
      this.getListFun(this.leftId);
    },
    // 分页改变
    paginationChange(data) {
      this.pager = data;
      this.getListFun(this.leftId);
    },
    closeFun() {
      this.$refs["nolock"].close();
      this.$refs["lock"].close();
      this.getListFun(this.leftId);
    },
    // 获取列表
    getListFun(id) {
      let params = {
        category_id: id,
        name: this.filterForm.name,
        created_time_end: this.filterForm.created_end_time,
        created_time_start: this.filterForm.created_start_time,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
        created_by: this.filterForm.created_by,
      };
      geticonslibsList(params).then((res) => {
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
        name: "",
        created_end_time: "",
        created_start_time: "",
        created_by: "",
      };
      this.getListFun(this.leftId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
