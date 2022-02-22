//新增接口模型
<template>
  <div class="api-div">
    <div class="api-div-top">
      <div class="api-tree"></div>
      <div class="api-base">
        <div class="api-search">
          <el-form class="filter-form" :model="filterForm" :inline="true">
            <el-form-item label="API：">
              <el-input
                v-model="filterForm.dataName"
                placeholder="API搜索"
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
          <el-table height="100%" :data="tableData" border row-key="id">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              type="index"
              align="center"
              label="编号"
              width="55"
            >
            </el-table-column>

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
          </el-table>
        </div>
        <div class="pagination">
          <pagination
            :pageSize="pager.pageSize"
            :total="total"
            @change="paginationChange"
          />
        </div>
      </div>
    </div>
    <el-row class="btn">
      <el-button @click="cancelFun()">取消</el-button>
      <el-button type="primary">创建</el-button>
    </el-row>
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
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      pager: {
        pageIndex: 1,
        pageSize: 5,
      },
      total: 0,
      expand: [1],
    };
  },
  components: { pagination },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    // 分页改变
    paginationChange(data) {
      console.log(data);
      this.pager = data;
      // this.dataListFun();
    },
    //设置表格行的样式
    tableRowStyle() {
      let styletd = {
        "border-right": "none",
        background: "#F9F9F9",
      };
      return styletd;
    },
    //设置表头行的样式
    tableHeaderColor() {
      let styleTh = {
        "border-right": "none",
        background: "#F9F9F9",
      };
      return styleTh;
    },
    cancelFun() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.api-div {
  height: 600px;
  background: #fff;
  .api-div-top {
    height: calc(100% - 60px);
    display: flex;
    justify-content: space-around;
    .api-tree {
      border-right: 1px solid #ddd;
      width: 220px;
      margin-right: 20px;
      overflow: auto;
    }
    .api-base {
      width: calc(100% - 220px);
      .api-search {
        border: 1px solid #ddd;
        height: 60px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        .el-form-item {
          margin-bottom: 0;
        }
        margin-bottom: 15px;
      }
      .table-content {
        height: calc(100% - 135px);
      }
    }
    .pagination {
      height: 60px;
      display: flex;
      align-items: center;
    }
  }
  .btn {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #ddd;
  }
}
</style>
