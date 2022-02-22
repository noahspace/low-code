<template>
  <el-pagination
    class="w-pagination"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper"
    v-bind="data.attribs"
    v-on="events"
  >
  </el-pagination>
</template>

<script>
import componentMixin from "../../../componentMixin";
export default {
  mixins: [componentMixin],
  data() {
    return {
      total: this.data.datas.find((obj) => obj.attribs === "total")
        .defaultValue,
      currentPage: this.data.datas.find((obj) => obj.attribs === "currentPage")
        .defaultValue,
      pageSizes: this.data.datas.find((obj) => obj.attribs === "pageSizes")
        .defaultValue,
      pageSize: this.data.datas.find((obj) => obj.attribs === "pageSize")
        .defaultValue,
    };
  },
};
</script>

<style lang="scss" scoped></style>
