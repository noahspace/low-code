<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSizeData"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalData"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50],
    },
  },
  data() {
    return {
      totalData: 0,
      pageSizeData: 0,
      currentPage: 1,
    };
  },
  watch: {
    total: {
      handler(val) {
        this.totalData = val;
      },
      immediate: true,
      deep: true,
    },
    pageSize: {
      handler(val) {
        this.pageSizeData = val;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 当前页改变
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit("change", {
        pageSize: this.pageSizeData,
        pageIndex: this.currentPage,
      });
    },
    // 页数改变
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSizeData = val;
      this.$emit("change", {
        pageSize: this.pageSizeData,
        pageIndex: this.currentPage,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
