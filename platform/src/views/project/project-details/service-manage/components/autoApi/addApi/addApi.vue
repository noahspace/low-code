//新增接口模型
<template>
  <div class="api-div">
    <div class="api-div-top">
      <div class="api-tree">
        <div v-for="(item, index) in lists" :key="index">
          <div
            :class="{ itemActive: itemIdx == index }"
            @click="leftTab(item, index)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="api-base">
        <div class="api-search">
          <el-form class="filter-form" :model="filterForm" :inline="true">
            <el-form-item label="表名称：">
              <el-input
                v-model="filterForm.dataName"
                placeholder="请输入表名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="表类型：">
              <el-select
                v-model="filterForm.dataType"
                placeholder="请选择类型"
                clearable
                filterable
              >
                <el-option
                  v-for="item in tabTypeList"
                  :label="item.name"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-content">
          <el-table
            height="100%"
            :data="tableData"
            ref="multipleTable"
            border
            row-key="name"
            :expand-row-keys="expand"
            @selection-change="checkSelect"
          >
            <el-table-column align="center" type="expand">
              <template slot-scope="props">
                <el-table
                  height="100%"
                  style="width: 100%; padding-left: 159px; background: #f9f9f9"
                  :data="props.row.columns"
                  row-key="name"
                  :ref="`childMultipleTable${props.$index}`"
                  :row-style="tableRowStyle"
                  :header-cell-style="tableHeaderColor"
                  @selection-change="checkSelectSon"
                >
                  <el-table-column type="selection" align="center" width="55">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="字段名称"
                    align="center"
                    width="300"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="annotation"
                    label="注释"
                    width="400"
                    align="center"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="type"
                    label="类型"
                    width="200"
                    align="center"
                    show-overflow-tooltip
                  ></el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              type="index"
              align="center"
              label="编号"
              width="55"
            >
            </el-table-column>

            <el-table-column
              prop="name"
              label="表名称"
              align="center"
              width="300"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="annotation"
              label="表注释"
              align="center"
              width="400"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="type"
              label="数据类型"
              align="center"
              width="200"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="created_time"
              label="创建时间"
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
      <el-button type="primary" @click="addFun">创建</el-button>
    </el-row>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import { dataList, dataTable, autoApiAdd } from "@/apis/project-data-source";
import { tabTypeList } from "@/apis/dictionary";

export default {
  data() {
    return {
      filterForm: {
        dataName: "",
        dataType: "",
      },
      lists: [],
      tabTypeList: [],
      itemIdx: 0,
      tableData: [
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          columns: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎2",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎3",
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-01",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 1519 弄",
          columns: [
            {
              id: 312,
              date: "2016-05-01",
              name: "王小虎24",
            },
            {
              id: 322,
              date: "2016-05-01",
              name: "王小虎343",
            },
          ],
        },
      ],
      pager: {
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
      expand: [],
      checkedKeys: false,
      leftId: "",
      checkDataSon: [],
      checkData: [],
    };
  },
  components: { pagination },
  created() {},
  mounted() {
    // this.gettabTypeList();
    this.dataTableFun();
  },
  watch: {},
  computed: {},
  methods: {
    leftTab(item, index) {
      this.itemIdx = index;
      this.leftId = item.id;
      this.dataTableColFun(item.id);
    },
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
    //获取表类型
    gettabTypeList() {
      tabTypeList().then((res) => {
        if (res.code == 200) {
          this.tabTypeList = res.data.list;
        }
      });
    },
    // 获取数据源
    dataTableFun() {
      let params = {
        project_id: this.$route.params.id,
        page_index: 1,
        page_size: 10000,
      };
      dataList(params).then((res) => {
        this.expand = [];
        if (res.code == 200) {
          this.lists = res.data.list;
          this.dataTableColFun(this.lists[0].id);
          this.expand.push(this.lists[0].name);
          this.leftId = this.lists[0].id;
        }
      });
    },
    // 获取数据源表
    dataTableColFun(id) {
      let params = {
        id: id,
        table_name: this.filterForm.dataName,
        table_type: this.filterForm.dataType,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
      };
      dataTable(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    search() {
      this.dataTableColFun(this.leftId);
    },
    reset() {
      this.filterForm = {};
      this.dataTableColFun(this.leftId);
    },

    // 主页单选框勾选事件
    checkSelect(val) {
      this.checkData = val;
      // console.log(val);
      this.tableData.forEach((item, i) => {
        item.columns.forEach((it) => {
          this.$refs[`childMultipleTable${i}`].toggleRowSelection(it);
        });
      });
    },

    //新增
    addFun() {
      let params = {
        project_id: this.$route.params.id,
        datasource_id: this.leftId,
        table_list: this.checkData,
      };
      autoApiAdd(params).then((res) => {
        if (res.code == 200) {
          this.$messageBox("success");
          this.cancelFun();
          this.$emit("updateList");
        } else {
          this.$messageBox("error");
        }
      });
    },
    // 主页单选框勾选事件
    checkSelectSon(val) {
      console.log(val);
      this.checkDataSon = JSON.parse(JSON.stringify(val));

      // let sel = [];
      // if (this.checkDataSon.length > 0) {
      //   this.tableData.forEach((row) => {
      //     row.columns.forEach((i) => {
      //       this.checkDataSon.forEach((x) => {
      //         if (i.name == x.name) {
      //           console.log(row);
      //           sel.push(row);
      //           this.$refs.multipleTable.toggleRowSelection(row, true);
      //         } else {
      //           this.$refs.multipleTable.toggleRowSelection(sel, false);
      //         }
      //       });
      //     });
      //   });
      //   this.$refs.multipleTable.toggleRowSelection(sel, true);
      // } else {
      //   this.$refs.multipleTable.clearSelection();
      // }
    },

    cancelFun() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.api-div {
  height: 100%;
  .api-div-top {
    display: flex;
    justify-content: space-around;
    .api-tree {
      border-right: 1px solid #ddd;
      width: 300px;
      margin-right: 30px;
      > div {
        width: 100%;
        > div {
          width: 100%;
          line-height: 40px;
          height: 40px;
          overflow: hidden;
          cursor: pointer;
        }
        > div.itemActive {
          background: #eaf5ff;
          color: #3393f3;
        }
      }
    }
    .api-base {
      width: calc(100% - 300px);
      display: grid;
      grid-template-rows: 1fr auto;
      gap: 20px;
      .api-search {
        border: 1px solid #ddd;
        padding: 15px 0 0 20px;
      }
      .table-content {
        min-height: 440px;
      }
    }
  }
  .btn {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
    text-align: center;
  }
}
</style>
