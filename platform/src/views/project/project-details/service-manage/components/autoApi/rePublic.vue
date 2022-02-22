<template>
  <div class="data-base">
    <div class="data-search">
      <el-form class="filter-form" :model="filterForm" :inline="true">
        <el-form-item label="字段名称：">
          <el-input
            v-model="filterForm.dataName"
            placeholder="请输入字段名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-input
            v-model="filterForm.tabName"
            placeholder="请选择类型"
          ></el-input>
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
          type="selection"
          align="center"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="字段名称"
          align="center"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="name"
          label="类型"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="address"
          label="注释"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
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
        dataName: "",
        apiName: "",
        tabName: "",
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
  methods: {
    closeAddApi() {
      this.$refs["addApi"].close();
    },
    closeRePublic() {
      this.$refs["rePublic"].close();
    },
  },
};
</script>

<style lang="scss" scoped>
.data-base {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 20px;
  .data-search {
    border: 1px solid #ddd;
    padding: 15px 0 0 20px;
  }
}
</style>
