<template>
  <div class="servers-manage">
    <div class="tree">
      <GroupTree type="09" @current-change="treeCurrentChange" />
    </div>
    <div class="content">
      <div class="filter">
        <el-form class="filter-form" :model="filterForm" :inline="true">
          <el-form-item label="服务器名称">
            <el-input
              v-model="filterForm.server_name"
              placeholder="请输入服务器名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="服务器 IP 地址">
            <el-input
              v-model="filterForm.server_ip"
              placeholder="请输入服务器 IP 地址"
            ></el-input>
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
            >新增服务器</el-button
          >
        </div>
        <div class="content">
          <ul class="content-wrap">
            <li class="item" v-for="(item, index) in tableData" :key="index">
              <div
                class="sign"
                :class="item.test == '0' ? 'sign-1' : 'sign-2'"
                @click="clickFun('edit', 'info', item)"
              ></div>
              <div class="info" @click="clickFun('edit', 'info', item)">
                <h3 class="title">{{ item.serverName }}</h3>
                <p class="user">
                  <span class="username">服务器ip地址：</span
                  ><span>{{ item.serverIp }}</span>
                </p>
              </div>
              <div class="more">
                <el-popover width="100" trigger="hover" popper-class="popBtn">
                  <div
                    class="btn"
                    v-if="states == 0"
                    @click="clickFun('edit', 'edit', item)"
                  >
                    编辑
                  </div>
                  <div
                    class="btn"
                    v-if="states == 0 && item.test == '0'"
                    @click="clickFun('del', 'del', item)"
                  >
                    删除
                  </div>
                  <!-- <div
                    class="btn"
                    v-if="states == 0"
                    @click="clickFun('nolock')"
                  >
                    解锁
                  </div>
                  <div class="btn" v-if="states == 0" @click="clickFun('lock')">
                    锁定
                  </div> -->
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
      <dialog-wrapper ref="editServer">
        <template slot-scope="{ row, pid }">
          <editServer
            :row="row"
            @close="close"
            @success="getListFun(leftId)"
            :pid="pid"
          />
        </template>
      </dialog-wrapper>
      <dialog-wrapper ref="delServer">
        <template slot-scope="{ ID }">
          <delServer :ID="ID" />
        </template>
      </dialog-wrapper>
    </div>
  </div>
</template>

<script>
import GroupTree from "@/components/GroupTree";
import Pagination from "@/components/Pagination";
import editServer from "./components/editServer";
import delServer from "./components/delServer";
import { server, deleteServer } from "@/apis/resources-components";

export default {
  components: { GroupTree, Pagination, editServer, delServer },
  data() {
    return {
      filterForm: {
        server_ip: "",
        server_name: "",
      },
      pager: {
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: [],
      total: 0,
      leftId: "",
      states: 0,
    };
  },
  mounted() {
    this.getListFun(this.leftId);
  },
  methods: {
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
    // 获取列表
    getListFun(id) {
      let params = {
        category_id: id,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
        server_ip: this.filterForm.server_ip,
        server_name: this.filterForm.server_name,
      };
      server(params).then((res) => {
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
        server_ip: "",
        server_name: "",
      };
      this.getListFun(this.leftId);
    },
    clickFun(type, todo, row) {
      // if (type == "del") {
      //   this.$refs["delServer"].show(
      //     { title: "删除服务器", width: "600px" },
      //     { ID: " Id" }
      //   );
      // }
      if (type == "edit") {
        this.$refs["editServer"].show(
          { title: "编辑服务器", width: "800px" },
          { row: row }
        );
      } else if (type == "add") {
        if (this.leftId) {
          this.$refs["editServer"].show(
            {
              title: "新增服务器",
              width: "800px",
            },
            {
              pid: this.leftId,
            }
          );
        } else {
          this.$message({
            type: "info",
            message: "请选择服务器分组",
          });
        }
      } else if (type == "del") {
        this.$confirm("确认删除该服务器吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let form = new FormData();
            form.append("id", row.serverId);
            deleteServer(form).then((res) => {
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
      if (todo == "info") {
        this.$router.push({
          path: "/resource/servers/server-info/" + row.serverId,
          query: { type: todo },
        });
      }
    },
    close() {
      if (this.$refs["editServer"]) {
        this.$refs["editServer"].close();
      }
      if (this.$refs["lock"]) {
        this.$refs["lock"].close();
      }
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
