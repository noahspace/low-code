<template>
  <div class="data-base">
    <div class="data-search">
      <el-form class="filter-form" :model="filterForm" :inline="true">
        <el-form-item label="所属系统名称：">
          <el-input
            v-model="filterForm.sysName"
            placeholder="请输入系统名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="接口名称：">
          <el-input
            v-model="filterForm.apiName"
            placeholder="请输入接口名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset()">重置</el-button>
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
      <el-table height="100%" :data="tableData" border>
        <el-table-column
          type="index"
          label="编号"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="title"
          label="所属系统名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="name"
          label="接口名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="request_type"
          label="请求方式"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="request_path"
          label="请求路径"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="tag"
          label="接口标签列表"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="create_by"
          label="创建人"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column width="200" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="operateHandle(1, scope.row)" type="text"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <pagination
        :pageSize="pager.pageSize"
        :total="total"
        @change="paginationChange"
      />
    </div>
    <dialog-wrapper ref="serviceDetail">
      <template slot-scope="{ ID }">
        <serviceDetail :projectId="ID" :rows="rows" />
      </template>
    </dialog-wrapper>
    <dialog-wrapper ref="addApi">
      <template slot-scope="{ projectId }">
        <addApi
          :projectId="projectId"
          @close="closeAddApi"
          @updateList="dataListFun"
        />
      </template>
    </dialog-wrapper>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import addApi from "./addApi";
import serviceDetail from "./serviceDetail";
import { localApiList } from "@/apis/project-data-source";

export default {
  data() {
    return {
      filterForm: {
        sysName: "",
        apiName: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      pager: {
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
      rows: [],
    };
  },
  components: { pagination, serviceDetail, addApi },
  created() {},
  mounted() {
    this.dataListFun();
  },
  watch: {},
  computed: {},
  methods: {
    operateHandle(type, data) {
      if (type == 0) {
        this.$refs["addApi"].show(
          { title: "新增接口模型", width: "600px" },
          { projectId: "" }
        );
      } else if (type == 1) {
        this.rows = data;
        this.$refs["serviceDetail"].show(
          { title: "接口详情", width: "1000px" },
          { projectId: data }
        );
      } else if (type == 2) {
        this.$refs["addApi"].show(
          { title: "编辑接口模型", width: "100%" },
          { projectId: data }
        );
      }
    },
    // 分页改变
    paginationChange(data) {
      console.log(data);
      this.pager = data;
      this.dataListFun();
    },
    // 获取api列表
    dataListFun() {
      let params = {
        project_id: this.$route.params.id,
        system_name: this.filterForm.sysName,
        name: this.filterForm.apiName,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
      };
      localApiList(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    closeAddApi() {
      this.$refs["addApi"].close();
    },
    search() {
      this.dataListFun();
    },
    reset() {
      this.filterForm = {};
      this.dataListFun();
    },
  },
};
</script>

<style lang="scss" scoped>
.data-base {
  height: 100%;
  .data-search {
    border: 1px solid #ddd;
    height: 60px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding: 0 20px;
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
