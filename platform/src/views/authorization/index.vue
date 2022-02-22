<template>
  <div class="authorization">
    <div class="tree">
      <OrganizationTree />
    </div>
    <div class="content">
      <div class="filter">
        <el-form class="filter-form" :model="filterForm" :inline="true">
          <el-form-item label="用户姓名">
            <el-input
              v-model="filterForm.user"
              placeholder="请输入用户姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="授权状态">
            <el-select
              v-model="filterForm.user"
              placeholder="请选择授权状态"
            ></el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="data">
        <div class="tools">
          <el-button
            @click="volumeAuthHandle"
            type="primary"
            icon="ri-user-follow-line"
          >
            批量授权
          </el-button>
        </div>
        <div class="content-wrap">
          <el-table height="100%" :data="tableData" border>
            <el-table-column
              type="selection"
              width="55"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="用户名"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="name"
              label="登录名"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="address"
              label="用户编码"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="address"
              label="邮箱"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="address"
              label="用户类型"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="address"
              label="授权状态"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column width="200" label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="operateHandle(1, scope.row)" type="text"
                  >查看</el-button
                >
                <el-button @click="operateHandle(2, scope.row)" type="text"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <pagination />
        </div>
      </div>
    </div>

    <dialog-wrapper ref="roleDetailsWrapper">
      <template slot-scope="{ id }">
        <RoleDetails :roleId="id" />
      </template>
    </dialog-wrapper>
    <dialog-wrapper ref="editAuthWrapper">
      <template slot-scope="{ id }">
        <EditAuth :roleId="id" />
      </template>
    </dialog-wrapper>
  </div>
</template>

<script>
import OrganizationTree from "@/components/OrganizationTree";
import Pagination from "@/components/Pagination";
import RoleDetails from "./components/RoleDetails";
import EditAuth from "./components/EditAuth";
export default {
  components: { OrganizationTree, Pagination, RoleDetails, EditAuth },
  data() {
    return {
      filterForm: {},
      tableData: [{}],
      total: 0,
    };
  },
  methods: {
    volumeAuthHandle() {
      this.$refs["editAuthWrapper"].show({
        title: "授权项目角色",
        width: "500px",
      });
    },
    operateHandle(type, data) {
      if (type === 1) {
        this.$refs["roleDetailsWrapper"].show(
          { title: "详情", width: "500px" },
          { id: data.id }
        );
      }
      if (type === 2) {
        this.$refs["editAuthWrapper"].show(
          { title: "授权项目角色", width: "500px" },
          { id: data.id }
        );
      }
    },
    // 分页改变
    paginationChange(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
