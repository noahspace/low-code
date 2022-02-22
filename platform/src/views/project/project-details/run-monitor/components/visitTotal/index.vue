<template>
  <div class="data-base">
    <div class="data-search">
      <el-form class="filter-form" :model="filterForm" :inline="true">
        <el-form-item label="URL：">
          <el-input v-model="filterForm.sql" placeholder="请输入url"></el-input>
        </el-form-item>
        <el-form-item label="时间范围：">
          <el-date-picker
            v-model="filterForm.beginTime"
            type="datetime"
            placeholder="起"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="至">
          <el-date-picker
            v-model="filterForm.endTime"
            type="datetime"
            placeholder="止"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-content">
      <el-table height="100%" :data="tableData" border>
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
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <pagination />
    </div>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";

export default {
  data() {
    return {
      filterForm: {
        url: "",
        beginTime: "",
        endTime: "",
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
  components: { pagination },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.data-base {
  height: 100%;
  .data-search {
    border: 1px solid #ddd;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-radius: 6px;
    margin-bottom: 15px;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .table-content {
    height: calc(100% - 135px);
  }
  .pagination {
    height: 60px;
    display: flex;
    align-items: center;
  }
}
</style>
