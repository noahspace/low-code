// 组件信息及编辑
<template>
  <div class="content">
    <div class="data-search">
      <el-form class="filter-form" :model="filterForm" :inline="true">
        <el-form-item label="项目名称">
          <el-input
            v-model="filterForm.name"
            placeholder="请输入项目名称或关键词"
          ></el-input>
        </el-form-item>
        <el-form-item label="上下线状态">
          <el-select v-model="filterForm.state" placeholder="请选择上下线状态">
            <el-option label="未发布" value="1"></el-option>
            <el-option label="上线" value="2"></el-option>
            <el-option label="下线" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业分类">
          <el-select
            v-model="filterForm.industry_category"
            placeholder="请填写行业分类"
            clearable
            filterable
          >
            <el-option
              v-for="item in projectClassList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input
            v-model="filterForm.manager_name"
            placeholder="请输入负责人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <a style="color: #1890fe; cursor: pointer" @click="back()">返回</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="serchFun()">查询</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="data">
      <div class="content-wrap">
        <div class="table-content">
          <el-table height="100%" :data="tableData" border>
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
            >
              <template slot-scope="scope">
                <span class="proimg" v-if="imgurls">
                  <img :src="imgurls[scope.$index].url" alt="" />{{
                    scope.row.project_name
                  }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="industry_category"
              label="行业分类"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span v-for="item in projectClassList" :key="item.id">
                  <span v-if="item.id == scope.row.industry_category">{{
                    item.name
                  }}</span>
                </span>
              </template></el-table-column
            >
            <el-table-column
              prop="industry_company"
              label="行业公司"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="address"
              label="区域信息"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>
                  {{ scope.row.province + scope.row.city + scope.row.county }}
                </span>
              </template></el-table-column
            >
            <el-table-column
              prop="running_mode"
              label="运行模式"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span v-for="item in projectTypeList" :key="item.id">
                  <span v-if="item.code == scope.row.running_mode">{{
                    item.name
                  }}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="created_by"
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
                <span v-if="scope.row.project_state == 2" style="color: #54bc90"
                  >上线</span
                >
                <span v-if="scope.row.project_state == 3">下线</span>
                <span v-if="scope.row.project_state == 1">未发布</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="pagination">
        <Pagination
          :pageSize="pager.pageSize"
          :total="total"
          @change="paginationChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { serverPro } from "@/apis/resources-components";
import { projectClass, readFile, runType } from "@/apis/dictionary";

export default {
  data() {
    return {
      filterForm: {
        manager_name: "",
        industry_category: "",
        name: "",
        state: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          project_name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      pager: {
        pageIndex: 1,
        pageSize: 10,
      },
      projectTypeList: [],
      imgurls: [],
      total: 0,
      projectClassList: [],
    };
  },
  components: { Pagination },
  created() {},
  mounted() {
    this.proListFun();
    this.getRunList();
    this.getClassList();
  },
  watch: {},
  computed: {
    serverId() {
      return this.$route.params.id;
    },
  },
  methods: {
    //获取项目运行方式
    getRunList() {
      runType().then((res) => {
        if (res.code == 200) {
          this.projectTypeList = res.data.list;
        }
      });
    },
    //获取项目行业分类
    getClassList() {
      projectClass().then((res) => {
        if (res.code == 200) {
          this.projectClassList = res.data.list;
        }
      });
    },
    // 分页改变
    paginationChange(data) {
      this.pager = data;
      this.proListFun();
    },
    serchFun() {
      this.proListFun();
    },
    reset() {
      this.filterForm = {
        manager_name: "",
        industry_category: "",
        name: "",
        state: "",
      };
      this.proListFun();
    },
    // 获取项目列表
    proListFun() {
      let params = {
        industry_category: this.filterForm.industry_category,
        manager_name: this.filterForm.manager_name,
        project_name: this.filterForm.name,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
        project_state: this.filterForm.state,
        server_id: this.serverId,
      };
      serverPro(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.tableData.forEach((item) => {
            this.getPic(item.project_cover);
          });
        }
      });
    },
    //获取文件图片
    getPic(id) {
      readFile({
        id: id,
      }).then((res) => {
        const src = window.URL.createObjectURL(new Blob([res]));
        this.$nextTick(() => {
          this.imgurls.push({
            url: src,
          });
        });
      });
    },
    back() {
      this.$router.push("/resource/servers");
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  .data-search {
    height: 9%;
    border: 1px solid #ddd;
    padding: 17px 0 0 20px;
    background: #fff;
    margin-bottom: 20px;
  }
  .data {
    height: 91%;
  }
  .content-wrap {
    height: 90%;
    overflow: auto;
    scrollbar-gutter: stable;
    margin-bottom: 20px;
    .table-content {
      height: 100%;
      .proimg {
        img {
          width: 50px;
          height: auto;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
