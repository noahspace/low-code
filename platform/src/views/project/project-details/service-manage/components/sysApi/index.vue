<template>
  <div class="sys-api">
    <div class="data-search">
      <el-form class="filter-form" :model="filterForm" :inline="true">
        <el-form-item label="接口名称：">
          <el-input
            v-model="filterForm.apiName"
            placeholder="请输入接口名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="发布状态：">
          <el-select v-model="filterForm.state" placeholder="请选择状态">
            <el-option label="" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tools">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="operateHandle(0)"
        >新增接口模型</el-button
      >
    </div>
    <div class="table-content">
      <el-table :data="tableData" border>
        <el-table-column
          prop="date"
          label="项目编号"
          align="center"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="name"
          label="项目名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="address"
          label="行业分类"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="address"
          label="行业公司"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="address"
          label="区域信息"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="address"
          label="运行模式"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="address"
          label="创建人"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="address"
          label="负责人"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="address"
          label="负责人联系方式"
          align="center"
          show-overflow-tooltip
          width="130"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="运行状态"
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
            <el-button @click="operateHandle(3, scope.row)" type="text"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <pagination />
    </div>
    <dialog-wrapper ref="serviceDetail">
      <template slot-scope="{ projectId }">
        <serviceDetail :projectId="projectId" />
      </template>
    </dialog-wrapper>
    <el-drawer
      title="新增接口模型"
      :visible.sync="drawer"
      :direction="direction"
      size="70%"
    >
      <template>
        <addApi @close="closeAddApi" @updateList="dataListFun" />
      </template>
    </el-drawer>
    <dialog-wrapper ref="editApi">
      <template slot-scope="{ projectId }">
        <editApi :projectId="projectId" @close="closeAddApi" />
      </template>
    </dialog-wrapper>
    <el-drawer
      title="数据模型编辑"
      :visible.sync="editdrawer"
      :direction="direction"
      size="85%"
    >
      <template>
        <editApi :projectId="projectId" @close="closeAddApi" />
      </template>
    </el-drawer>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import serviceDetail from "./serviceDetail";
import addApi from "./addApi";
import editApi from "./editApi";

export default {
  data() {
    return {
      drawer: false,
      editdrawer: false,
      direction: "btt",
      filterForm: {
        apiName: "",
        state: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      total: 0,
    };
  },
  components: { pagination, serviceDetail, addApi, editApi },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    operateHandle(type, data) {
      if (type == 2) {
        this.editdrawer = true;
      } else if (type == 1) {
        this.$refs["serviceDetail"].show(
          { title: "接口详情", width: "1000px" },
          { projectId: data }
        );
      } else if (type == 0) {
        this.drawer = true;
      }
    },
    closeAddApi() {
      this.$refs["editApi"].close();
      this.editdrawer = false;
    },
    dataListFun() {},
  },
};
</script>

<style lang="scss" scoped>
.sys-api {
  height: 100%;
  .data-search {
    border: 1px solid #ddd;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-radius: 6px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .tools {
    height: 60px;
    display: flex;
    align-items: center;
  }
  .table-content {
    height: calc(100% - 180px);
  }
  .pagination {
    height: 60px;
    display: flex;
    align-items: center;
  }
}
</style>
