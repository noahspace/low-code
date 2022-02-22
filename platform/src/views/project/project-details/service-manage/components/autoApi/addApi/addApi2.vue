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
                v-model="filterForm.table_name"
                placeholder="请输入表名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="表类型：">
              <el-select
                v-model="filterForm.table_type"
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
          <el-tree
            ref="tree"
            :data="tableData"
            show-checkbox
            node-key="id"
            :render-content="renderContent"
            :props="defaultProps"
            class="treeTab"
            :default-expanded-keys="[1]"
            @check="checkNode"
            @node-expand="expandFun"
          >
          </el-tree>
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
import { dataGet, dataTable, autoApiAdd } from "@/apis/project-data-source";
import { tabTypeList } from "@/apis/dictionary";

export default {
  data() {
    return {
      filterForm: {
        table_name: "",
        table_type: "",
      },
      lists: [],
      tabTypeList: [],
      itemIdx: 0,
      data: [
        {
          id: 10000,
          name: "一级 1",
          columns: [
            {
              id: 1,
              name: "二级 1-1",
              columns: [
                {
                  tr: "表头",
                },
                {
                  id: 9,
                  name: "三级 1-1-1",
                },
                {
                  id: 10,
                  name: "三级 1-1-2",
                },
              ],
            },
            {
              id: 2,
              date: "2016-05-01",
              name: "王小虎3",
              address: "上海市普陀区金沙江路 1519 弄",
              columns: [
                {
                  tr: "表头",
                },
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
        },
      ],
      defaultProps: {
        children: "columns",
        label: "name",
        tr: "tr",
        id: "id",
        annotation: "annotation",
        type: "type",
        created_time: "created_time",
      },
      tableData: [],

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
    this.gettabTypeList();
    this.dataTableFun();
  },
  watch: {},
  computed: {},
  methods: {
    renderContent(h, { node }) {
      if (node.level == 1) {
        return (
          <div class="custom-tree-node" style="margin-left:18px;">
            <div class="tb th">
              <div>序号</div>
              <div>表名称</div> <div>表注释</div> <div>数据类型</div>
              <div>创建时间</div>
            </div>
          </div>
        );
      } else if (node.level == 2) {
        console.log(node);
        return (
          <div class="custom-tree-node">
            <div class="tb tbFirst">
              <div>{node.data.id}</div>
              <div>{node.data.name}</div> <div>{node.data.annotation}</div>
              <div>{node.data.type}</div>
              <div>{node.data.created_time}</div>
            </div>
          </div>
        );
      } else if (node.level == 3) {
        if (node.data.tr) {
          return (
            <div class="custom-tree-node-ddddd">
              <div class="tb tbchildren">
                <div>字段名称</div>
                <div>类型</div> <div>注释</div>
                <div></div>
              </div>
            </div>
          );
        } else {
          return (
            <div class="custom-tree-node">
              <div class="tb tbchildren">
                <div>{node.data.name}</div>
                <div>{node.data.type}</div> <div>{node.data.annotation}</div>
                <div></div>
              </div>
            </div>
          );
        }
      }
    },
    checkNode() {
      this.checkData = [];
      //let result = this.$refs.tree.getCheckedNodes();
      let keys = this.$refs.tree.getCheckedKeys();
      let cols = [];
      let p = [];
      let s = {};
      let i = 0;
      keys.forEach((item) => {
        if (item && item != 10000) {
          let d = this.$refs.tree.getNode(item);
          console.log(d);
          if (d.isLeaf) {
            p = d.parent.data;
            console.log(cols.length + "jjj" + p.columns.length);
            if (cols.length === p.columns.length) {
              //this.checkData.push(p);
            } else {
              cols.push(d.data);
              i++;
              if (i == 1) {
                s = { ...p };
                this.$set(s, "columns", cols);
                this.checkData.push(s);
              }
            }
          } else {
            this.checkData.push(d.data);
          }
        }
      });

      this.checkData = this.repeat2(this.checkData);
      console.log(this.checkData);
    },
    //根据id去重
    repeat2(arr) {
      for (var a = 0, result = [], hash = {}; a < arr.length; a++) {
        for (var key in arr[a]) {
          console.log(key);
          if (hash[arr[a].id] === undefined) {
            hash[arr[a].id] = true;
            result.push(arr[a]);
          }
        }
      }
      return result;
    },

    expandFun() {
      this.$nextTick(function () {
        let d = document.getElementsByClassName("custom-tree-node-ddddd");
        if (d) {
          for (var i = 0; i < d.length; i++) {
            d[i].previousElementSibling.style.visibility = "hidden";
          }
        }
      });
    },
    leftTab(item, index) {
      this.itemIdx = index;
      this.leftId = item.id;
      this.dataTableColFun(item.id);
    },
    // 分页改变
    paginationChange(data) {
      this.pager = data;
      this.dataTableColFun(this.leftId);
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
      };
      dataGet(params).then((res) => {
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
        table_name: this.filterForm.table_name,
        table_type: this.filterForm.table_type,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
      };
      dataTable(params).then((res) => {
        this.tableData = [];
        if (res.code == 200) {
          let dataList = res.data.list;
          this.total = res.data.total;
          let columns = [],
            data = [];
          dataList.forEach((element, index) => {
            columns = [{ tr: "表头" }];
            element.columns.forEach((item) => {
              columns.push({
                id: item.id,
                annotation: item.annotation,
                name: item.name,
                type: item.type,
              });
            });
            data.push({
              id: index + 1,
              annotation: element.annotation,
              name: element.name,
              type: element.type,
              columns: columns,
              created_time: element.created_time,
            });
          });

          this.tableData.push({
            id: 10000,
            name: "一级 1",
            columns: data,
          });
          console.log(this.tableData);
          this.$nextTick(function () {
            let d = document.getElementsByClassName("custom-tree-node-ddddd");
            if (d) {
              for (var i = 0; i < d.length; i++) {
                d[i].previousElementSibling.style.visibility = "hidden";
              }
            }
          });
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

    cancelFun() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
.treeTab {
  .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
  }
  .el-icon-caret-right:before {
    content: "\e6e0";
  }
  > div:first-child {
    > .el-tree-node__content:first-child {
      .el-tree-node__expand-icon {
        color: transparent;
      }
    }
  }
  border: 1px solid #e5e5e5;
  height: 100%;
  overflow: auto;
  scrollbar-gutter: stable;

  .el-tree-node__content {
    border: 1px solid #e5e5e5;
    border-left: none;
    border-right: none;
    border-top: none;
    > label.el-checkbox {
      margin-right: 20px;
    }

    height: 45px;
    .custom-tree-node,
    .custom-tree-node-ddddd {
      width: 100%;
      .tb {
        width: 100%;
        display: flex;
        justify-content: space-between;
        div {
          height: 45px;
          border: 1px solid #e5e5e5;
          line-height: 40px;
          width: calc((100% - 55px) / 4);
          text-align: center;
          border-top: none;
          box-sizing: border-box;
          border-right: none;
        }
        div:nth-child(1) {
          width: 55px;
        }
      }
      .th {
        > div {
          border-bottom: none;
        }
      }
      .tbchildren {
        > div {
          width: calc((100% - 110px) / 4);
          border-left: none;
          border: none !important;
          background: none;
        }
        div:nth-child(1) {
          width: calc((100%) / 4);
        }
      }
      .tbFirst {
        > div {
          background: #fff;
        }
      }
    }
  }

  .el-tree-node__children {
    .el-tree-node__children {
      background: #f6f6f6;
      padding-left: 74px;
      .el-tree-node__content {
        padding-left: 0 !important;
      }
    }
  }
}
</style>
