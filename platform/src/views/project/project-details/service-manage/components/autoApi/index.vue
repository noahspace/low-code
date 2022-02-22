<template>
  <div class="auto-base">
    <div class="data-search">
      <el-form class="filter-form" :model="filterForm" :inline="true">
        <el-form-item label="数据源名称：">
          <el-select
            v-model="filterForm.dataName"
            style="width: 300px"
            @change="nameChange"
          >
            <el-option
              v-for="item in lists"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="表名称：">
          <el-select v-model="filterForm.tabName" style="width: 300px">
            <el-option
              v-for="item in dataList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接口名称">
          <el-input
            v-model="filterForm.apiName"
            placeholder="请输入接口名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置</el-button>
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
        <el-table-column type="index" align="center" label="编号" width="55">
        </el-table-column>
        <el-table-column
          prop="datasource_name"
          label="数据源名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="table_name"
          label="表名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="table_comment"
          label="表注释"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="colums"
          label="表字段信息"
          align="center"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="created_by"
          label="创建人"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="created_time"
          label="创建时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column width="200" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="operateHandle(1, scope.row)" type="text"
              >查看</el-button
            >
            <el-button @click="operateHandle(3, scope.row)" type="text"
              >重新发布</el-button
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

    <el-drawer
      title="新增接口模型"
      :visible.sync="drawer"
      :direction="direction"
      size="80%"
    >
      <template>
        <addApi @close="closeAddApi" @updateList="dataListFun" />
      </template>
    </el-drawer>

    <el-drawer
      title="重新发布"
      :visible.sync="drawerRePublic"
      :direction="direction"
      size="70%"
    >
      <template slot-scope="{ apiId }">
        <rePublic :apiId="apiId" @close="closeRePublic" />
      </template>
    </el-drawer>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import serviceDetail from "./serviceDetail";
import addApi from "./addApi/addApi2";
import rePublic from "./rePublic";
import { dataList, dataTable, autoApiList } from "@/apis/project-data-source";

export default {
  data() {
    return {
      drawerRePublic: false,
      drawer: false,
      direction: "btt",
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
      pager: {
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
      lists: [],
      dataList: [],
      rows: {},
    };
  },
  components: { pagination, serviceDetail, addApi, rePublic },
  created() {},
  mounted() {
    this.dataListFun();
    this.dataFun();
  },
  watch: {},
  computed: {},
  methods: {
    operateHandle(type, data) {
      if (type == 0) {
        this.drawer = true;
      } else if (type == 1) {
        this.rows = data;
        this.$refs["serviceDetail"].show(
          { title: "接口详情", width: "1000px" },
          { ID: data.id }
        );
      } else if (type == 3) {
        this.drawerRePublic = true;
      }
    },
    search() {
      this.dataListFun();
    },
    reset() {
      this.filterForm = {};
      this.dataListFun();
    },
    // 分页改变
    paginationChange(data) {
      console.log(data);
      this.pager = data;
      this.dataListFun();
    },
    // 获取数据源
    dataFun() {
      let params = {
        project_id: this.$route.params.id,
        page_index: 1,
        page_size: 10000,
      };
      dataList(params).then((res) => {
        this.expand = [];
        if (res.code == 200) {
          this.lists = res.data.list;
        }
      });
    },
    nameChange(val) {
      this.dataTableFun(val);
    },
    // 获取数据源表
    dataTableFun(id) {
      let params = {
        id: id,
        page_index: 1,
        page_size: 100000,
      };
      dataTable(params).then((res) => {
        if (res.code == 200) {
          this.dataList = res.data.list;
        }
      });
    },

    // 获取api列表
    dataListFun() {
      let params = {
        datasource_id: this.filterForm.dataName,
        table_name: this.filterForm.name,
        name: this.filterForm.apiName,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
        project_id: this.$route.params.id,
      };
      autoApiList(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
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
.auto-base {
  height: 100%;
  .data-search {
    border: 1px solid #ddd;
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
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
