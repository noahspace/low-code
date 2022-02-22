<template>
  <div class="data-base">
    <div class="data-search">
      <el-form class="filter-form" :model="filterForm" :inline="true">
        <el-form-item label="数据库类型：">
          <el-select v-model="filterForm.db_type" placeholder="请选择类型">
            <el-option
              v-for="item in dataTypeList"
              :label="item.name"
              :value="item.code"
              :key="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据库IP：">
          <el-input v-model="filterForm.ip" placeholder="请输入ip"></el-input>
        </el-form-item>
        <el-form-item label="数据源名称：">
          <el-input
            v-model="filterForm.name"
            placeholder="请输入数据源名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="serchFun">搜索</el-button>
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
        @click="toDoData()"
        >新增数据源</el-button
      >
    </div>
    <div class="table-content">
      <el-table
        :data="tableData"
        border
        :span-method="objectSpanMethod"
        :row-class-name="rowClassName"
      >
        <el-table-column width="50" align="center" label="序号">
          <template slot-scope="scope">{{ scope.row.group + 1 }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="数据源名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="db_type"
          label="数据库类型"
          align="center"
          show-overflow-tooltip
        >
          <!-- <template slot-scope="scope">
            <span v-for="item in dataTypeList" :key="item.id">
              <span v-if="item.id == scope.row.db_type">{{ item.name }}</span>
            </span>
          </template> -->
        </el-table-column>

        <el-table-column
          prop="ip"
          label="连接信息"
          align="left"
          show-overflow-tooltip
          width="200"
        >
          <template slot-scope="scope">
            <div><span style="color: #999">IP:</span>{{ scope.row.ip }}</div>
            <div>
              <span style="color: #999">端口号:</span>{{ scope.row.port }}
            </div>
            <div>
              <span style="color: #999">数据库名称:</span
              >{{ scope.row.instance }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="instance"
          label="数据库名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="description"
          label="数据源描述"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="created_time"
          label="创建时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="environment"
          label="使用环境"
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
          prop="username"
          label="负责人"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column width="300" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="operateHandle(1, scope.row)" type="text"
              >查看</el-button
            >
            <el-button @click="operateHandle(2, scope.row)" type="text"
              >编辑</el-button
            >
            <el-button
              @click="operateHandle(3, scope.row)"
              type="text"
              v-if="scope.row.environment == 'dev'"
              >删除</el-button
            >
            <el-button @click="operateHandle(4, scope.row)" type="text"
              >数据库工作台</el-button
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
    <dialog-wrapper ref="addEditData">
      <template slot-scope="{ projectId }">
        <addEditData
          :projectId="projectId"
          @close="closeFun"
          :row="rowData"
          @updateList="dataListFun"
        />
      </template>
    </dialog-wrapper>
    <dialog-wrapper ref="dataDetail">
      <template slot-scope="{ projectId }">
        <dataDetail :projectId="projectId" :row="rowData" />
      </template>
    </dialog-wrapper>
  </div>
</template>

<script>
import pagination from "@/components/Pagination";
import addEditData from "./components/addEditData";
import dataDetail from "./components/dataDetail";
import { dataList, dataDel } from "@/apis/project-data-source";
import { dataTypeList } from "@/apis/dictionary";

export default {
  data() {
    return {
      filterForm: {
        ip: "",
        db_type: "",
        name: "",
      },
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },
      ],
      indexArr: [],
      pager: {
        pageIndex: 1,
        pageSize: 6,
      },
      dataTypeList: [],
      rowData: {},
      total: 0,
      position: 0, //用于存储相同项的开始index
    };
  },
  components: { pagination, addEditData, dataDetail },
  created() {},
  mounted() {
    this.getDataTypeList();
    this.dataListFun();
  },
  watch: {},
  computed: {
    projectId() {
      return this.$route.params.id;
    },
    spanArr() {
      const megre = ["name"];
      const data = this.tableData;
      const spanArr = {};
      megre.forEach((m) => {
        spanArr[m] = { spanArr: [], pos: 0 };
      });
      data.forEach((row, i) => {
        megre.forEach((m) => {
          if (i == 0) {
            spanArr[m].spanArr.push(1);
            spanArr[m].pos = 0;
          } else {
            if (row[m] === data[i - 1][m]) {
              spanArr[m].spanArr[spanArr[m].pos] += 1;
              spanArr[m].spanArr.push(0);
            } else {
              // 不相等push 1,并且可修改下标指向
              spanArr[m].spanArr.push(1);
              spanArr[m].pos = i;
            }
          }
        });
      });
      return spanArr;
    },
  },
  methods: {
    operateHandle(type, data) {
      this.rowData = data;
      if (type == 1) {
        this.$refs["dataDetail"].show(
          { title: "数据源详情", width: "1000px" },
          { projectId: this.projectId }
        );
      } else if (type == 2) {
        this.$refs["addEditData"].show(
          { title: "编辑数据源", width: "600px" },
          { projectId: this.projectId }
        );
      } else if (type == 3) {
        this.$confirm("确认删除选中的数据吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            dataDel({
              id: data.id,
              name: data.name,
              project_id: data.project_id,
            }).then((res) => {
              if (res.code == 200) {
                this.$messageBox("success");
                this.dataListFun();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    //获取数据库类型
    getDataTypeList() {
      dataTypeList().then((res) => {
        if (res.code == 200) {
          this.dataTypeList = res.data.list;
        }
      });
    },

    // 分页改变
    paginationChange(data) {
      console.log(data);
      this.pager = data;
      this.dataListFun();
    },
    // 获取数据列表
    dataListFun() {
      let params = {
        project_id: this.$route.params.id,
        db_type: this.filterForm.db_type,
        name: this.filterForm.name,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
        ip: this.filterForm.ip,
      };
      dataList(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.tableData = this.jsonSort(this.tableData, "name");
          this.handleData();
        }
      });
    },
    //排序
    jsonSort(array, field, reverse) {
      //数组长度小于2 或 没有指定排序字段 或 不是json格式数据
      if (array.length < 2 || !field || typeof array[0] !== "object")
        return array;
      //数字类型排序
      if (typeof array[0][field] === "number") {
        array.sort(function (x, y) {
          return x[field] - y[field];
        });
      }
      //字符串类型排序
      if (typeof array[0][field] === "string") {
        array.sort(function (x, y) {
          return x[field].localeCompare(y[field]);
        });
      }
      //倒序
      if (reverse) {
        array.reverse();
      }
      return array;
    },
    //添加序号，数据处理
    handleData() {
      let contactDot = 0;
      this.indexArr = [];
      this.tableData.forEach((item, index) => {
        item.index = index;
        if (index === 0) {
          this.indexArr.push(1);
          item.group = index; //先设置组号赋值为0 也就是序号
        } else {
          // a b c d四个字段相同进行合并
          if (item.name === this.tableData[index - 1].name) {
            this.indexArr[contactDot] += 1;
            this.indexArr.push(0);
            item.group = this.tableData[index - 1].group; //如果一样 将组号改为和上一个数据相同
          } else {
            this.indexArr.push(1);
            contactDot = index;
            item.group = this.tableData[index - 1].group + 1; //如果不一样 将组号设置为上一个数据的组号加1
          }
        }
      });
      console.log(this.indexArr);
    },

    //表格单元格合并
    objectSpanMethod({ rowIndex, columnIndex }) {
      const spanArr = this.spanArr;
      switch (columnIndex) {
        case 0:
          return {
            rowspan: spanArr.name.spanArr[rowIndex],
            colspan: spanArr.name.spanArr[rowIndex] == 0 ? 0 : 1,
          };
          // eslint-disable-next-line no-unreachable
          break;
        case 1:
          return {
            rowspan: spanArr.name.spanArr[rowIndex],
            colspan: spanArr.name.spanArr[rowIndex] == 0 ? 0 : 1,
          };
          // eslint-disable-next-line no-unreachable
          break;
        // case 2:
        //   return {
        //     rowspan: spanArr.db_type.spanArr[rowIndex],
        //     colspan: spanArr.db_type.spanArr[rowIndex] == 0 ? 0 : 1,
        //   };
        //   // eslint-disable-next-line no-unreachable
        //   break;
        default:
          return {
            rowspan: 1,
            colspan: 1,
          };
          // eslint-disable-next-line no-unreachable
          break;
      }
    },
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1;
    },
    //查询
    serchFun() {
      this.dataListFun();
    },
    reset() {
      this.filterForm = {};
      this.pager.pageIndex = 1;
      this.dataListFun();
    },
    toDoData() {
      this.rowData = {};
      this.$refs["addEditData"].show(
        { title: "新增数据源", width: "600px" },
        { projectId: this.projectId }
      );
    },
    closeFun() {
      this.$refs["addEditData"].close();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
