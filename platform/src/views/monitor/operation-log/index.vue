<template>
  <div class="operation-log">
    <div class="filter">
      <el-form class="filter-form" :model="filterForm" :inline="true">
        <el-form-item label="项目名称">
          <el-input
            v-model="filterForm.projectName"
            placeholder="请输入项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input
            v-model="filterForm.operationUser"
            placeholder="请输入创建人"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="filterForm.startTime"
            type="date"
            placeholder="选择开始日期"
            value-format="yyyy-MM-dd 00:00:00"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>至</el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="filterForm.endTime"
            type="date"
            placeholder="选择结束日期"
            value-format="yyyy-MM-dd 23:59:59"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="getData" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="data">
      <div class="content-wrap" v-loading="loading">
        <el-table height="100%" :data="tableData" border>
          <el-table-column
            type="index"
            label="编号"
            align="center"
            width="80"
            show-overflow-tooltip
          ></el-table-column>
          <!-- <el-table-column
            prop="project_id"
            label="日志类型"
            align="center"
            width="100"
            show-overflow-tooltip
          ></el-table-column> -->
          <el-table-column
            prop="project_name"
            label="所属项目名称"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="opr_target_name"
            label="操作目标名称"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="opr_target_type"
            label="操作目标类别"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="opr_type"
            label="操作类型"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="opr_desc"
            label="操作描述"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="created_time"
            label="操作时间"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="created_by"
            label="操作人"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <pagination
          :total="page.total"
          :page-size="page.pageSize"
          @change="paginationChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import * as API from "@/apis/operation-log";
export default {
  components: { Pagination },
  data() {
    return {
      loading: true,
      filterForm: {
        projectName: "",
        operationUser: "",
        startTime: "",
        endTime: "",
      },
      tableData: [],
      page: {
        total: 0,
        pageSize: 10,
        pageIndex: 1,
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 分页改变
    paginationChange(data) {
      this.page = data;
      this.getData();
    },
    async getData() {
      try {
        let res = await API.get({
          page_size: this.page.pageSize,
          page_index: this.page.pageIndex,
          project_name: this.filterForm.projectName,
          operation_user: this.filterForm.operationUser,
          start_time: this.filterForm.startTime,
          end_time: this.filterForm.endTime,
        });
        if (res.code === 200) {
          this.page.total = res.data.total;
          this.tableData = res.data.list;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
