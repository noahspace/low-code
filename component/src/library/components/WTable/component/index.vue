<template>
  <el-table class="w-button" :data="tableData" style="width: 100%">
    <el-table-column
      prop="project_no"
      label="项目编号"
      align="center"
      width="100"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      prop="project_name"
      label="项目名称"
      align="center"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      prop="industry_company"
      label="行业公司"
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
      prop="manager_name"
      label="负责人"
      align="center"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      prop="manager_phone"
      label="负责人联系方式"
      align="center"
      show-overflow-tooltip
      width="130"
    ></el-table-column>
    <el-table-column
      prop="project_state"
      label="运行状态"
      align="center"
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        <span v-if="scope.row.project_state == 1">上线</span>
        <span v-if="scope.row.project_state == 0">下线</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import componentMixin from "../../../componentMixin";
export default {
  mixins: [componentMixin],
  data() {
    return {
      tableData: this.data.datas.find((obj) => obj.attribs === "tableData")
        .defaultValue,
    };
  },
};
</script>

<style lang="scss" scoped></style>
