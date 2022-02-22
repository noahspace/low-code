<template>
  <div class="project-manage">
    <div class="tree">
      <GroupTree type="01" @current-change="currentChangeHandle" />
    </div>
    <div class="content">
      <div class="filter">
        <i
          :class="{ 'expansion-active': filterExpansion }"
          class="expansion-icon el-icon-d-arrow-right"
          @click="filterExpansionToggle"
        ></i>
        <el-form class="filter-form" :model="filterForm" :inline="true">
          <el-form-item label="项目名称">
            <el-input
              v-model="filterForm.name"
              placeholder="请输入项目名称或关键词"
            ></el-input>
          </el-form-item>
          <el-form-item label="上下线状态">
            <el-select
              v-model="filterForm.state"
              placeholder="请选择上下线状态"
            >
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
          <el-form-item label="运行模式" v-if="filterExpansion">
            <el-select
              v-model="filterForm.runType"
              placeholder="请选择项目运行模式"
              clearable
              filterable
            >
              <el-option
                v-for="item in projectTypeList"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属区域:" v-if="filterExpansion">
            <areaSel :width="iptWidth" @serArea="serArea"></areaSel>
          </el-form-item>
          <el-form-item label="创建人" v-if="filterExpansion">
            <el-input
              v-model="filterForm.creat_user"
              placeholder="请输入创建人姓名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="serchFun()">查询</el-button>
            <el-button @click="reset()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="data">
        <div class="tools">
          <el-button
            @click="jump('/project/project-create')"
            type="primary"
            icon="el-icon-circle-plus-outline"
            >新增</el-button
          >
          <el-radio-group v-model="isCard">
            <el-radio-button :label="false">
              <i class="ri-list-check"></i>
            </el-radio-button>
            <el-radio-button :label="true">
              <i class="ri-function-fill"></i>
            </el-radio-button>
          </el-radio-group>
        </div>
        <div class="content-wrap">
          <div v-show="!isCard" class="table-content">
            <el-table
              height="100%"
              style="width: 100%"
              :data="tableData"
              border
              ref="proTable"
            >
              <el-table-column
                prop="project_no"
                label="项目编号"
                align="center"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="project_name"
                label="项目名称"
                align="center"
                show-overflow-tooltip
              >
                <!-- <template slot-scope="scope">
                  <span class="proimg">
                    <img :src="imgurls[scope.$index].url" alt="" />{{
                      scope.row.project_name
                    }}
                  </span>
                </template> -->
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
                width="100"
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
                    <span v-if="item.id == scope.row.running_mode">{{
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
              ></el-table-column>
              <el-table-column
                prop="project_state"
                label="运行状态"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.project_state == 2" class="state"
                    >上线</span
                  >
                  <span v-if="scope.row.project_state == 3">下线</span>
                  <span v-if="scope.row.project_state == 1">未发布</span>
                </template>
              </el-table-column>
              <el-table-column width="250" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="operateHandle(1, scope.row)" type="text"
                    >查看</el-button
                  >
                  <el-button
                    @click="operateHandle(2, scope.row)"
                    type="text"
                    v-if="
                      scope.row.project_state == 1 ||
                      scope.row.project_state == 3
                    "
                    >上线</el-button
                  >
                  <el-button
                    @click="operateHandle(6, scope.row)"
                    type="text"
                    v-if="scope.row.project_state == 2"
                    >下线</el-button
                  >
                  <el-button
                    @click="operateHandle(7, scope.row)"
                    type="text"
                    v-if="
                      scope.row.lock_state == '0' &&
                      scope.row.project_state == '2'
                    "
                    >解锁</el-button
                  >
                  <el-button
                    @click="operateHandle(8, scope.row)"
                    type="text"
                    v-if="
                      scope.row.lock_state == '1' &&
                      scope.row.project_state == '2'
                    "
                    >锁定</el-button
                  >
                  <!-- <el-button @click="operateHandle(3, scope.row)" type="text"
                    >授权</el-button
                  > -->
                  <el-button
                    @click="operateHandle(4, scope.row)"
                    type="text"
                    v-if="scope.row.project_state != '2'"
                    >编辑</el-button
                  >
                  <el-button
                    @click="operateHandle(5, scope.row)"
                    type="text"
                    v-if="scope.row.project_state != '2'"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-show="isCard" class="card-content">
            <div class="card" v-for="(item, index) in tableData" :key="index">
              <div class="preview" @click="operateHandle(1, item)">
                <img :src="item.imgsrc" alt="" />
                <!-- <img :src="imgurls[index].url" alt="" :onerror="errorImage" /> -->
                <div class="subscript" v-if="item.lock_state == '0'">
                  <i class="el-icon-lock"></i>
                </div>
                <div class="project-state">
                  <span v-if="item.project_state == 2" class="state">上线</span>
                  <span v-if="item.project_state == 3" class="state">下线</span>
                  <span v-if="item.project_state == 1" class="state"
                    >未发布</span
                  >
                </div>
              </div>
              <div class="title">
                <h2>{{ item.project_name }}</h2>
                <div class="info">
                  <span>版本号：{{ item.project_version }}</span>
                  <el-dropdown trigger="hover">
                    <span class="el-dropdown-link">
                      <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        @click.native="operateHandle(2, item)"
                        v-if="
                          item.project_state == 1 || item.project_state == 3
                        "
                        >上线</el-dropdown-item
                      >
                      <el-dropdown-item
                        @click.native="operateHandle(6, item)"
                        v-if="item.project_state == 2"
                        >下线</el-dropdown-item
                      >
                      <el-dropdown-item
                        @click.native="operateHandle(7, item)"
                        v-if="item.lock_state == '0' && item.project_state == 2"
                        >解锁</el-dropdown-item
                      >
                      <el-dropdown-item
                        @click.native="operateHandle(8, item)"
                        v-if="item.lock_state == '1' && item.project_state == 2"
                        >锁定</el-dropdown-item
                      >
                      <!-- <el-dropdown-item @click.native="operateHandle(3, item)"
                        >授权</el-dropdown-item
                      > -->
                      <el-dropdown-item
                        @click.native="operateHandle(4, item)"
                        v-if="item.project_state != '2'"
                        >编辑</el-dropdown-item
                      >
                      <el-dropdown-item
                        @click.native="operateHandle(5, item)"
                        v-if="item.project_state != '2'"
                        >删除</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
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
    <dialog-wrapper ref="UpdateProjectInfoWrapper">
      <template slot-scope="{ projectId }">
        <UpdateProjectInfo
          :projectId="projectId"
          @close="hideUpdateProjectInfoWrapper"
          @updateList="proListFun"
        />
      </template>
    </dialog-wrapper>
    <dialog-wrapper ref="projectOnline">
      <template slot-scope="{ projectId, types }">
        <projectOnline
          :projectId="projectId"
          @close="hideOnLine"
          :type="types"
          @success="proListFun"
        />
      </template>
    </dialog-wrapper>
  </div>
</template>

<script>
import GroupTree from "@/components/GroupTree";
import Pagination from "@/components/Pagination";
import UpdateProjectInfo from "./components/projectInfo";
import projectOnline from "./components/projectOnline";
import { proList, delPro } from "@/apis/project-list";
import areaSel from "@/components/AreaSelect";
import { runType, projectClass, readFile } from "@/apis/dictionary";

export default {
  components: {
    GroupTree,
    Pagination,
    UpdateProjectInfo,
    projectOnline,
    areaSel,
  },
  data() {
    return {
      // 筛选框是否展开
      filterExpansion: false,
      filterForm: {
        manager_name: "",
        industry_category: "",
        name: "",
        state: "",
        creat_user: "",
        runType: "",
        province: "",
        city: "",
        country: "",
      },
      isCard: false,
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
      iptWidth: "30%",
      groupId: "", //分组id
      projectTypeList: [],
      projectClassList: [],
      imgurls: [],
      total: 0,
      // errorImage: 'this.src="' + require("./images/default.png") + '"',
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.proListFun();
    });
    this.getRunList();
    this.getClassList();

    //否则出现表格混乱
    this.$refs["proTable"].doLayout();
  },
  filters: {},
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
    currentChangeHandle(data) {
      // 树节点改变
      console.log(data);
      // if (node.isLeaf) {
      this.groupId = data.id;
      this.$nextTick(function () {
        this.proListFun();
      });
      // }
    },
    // 展开切换
    filterExpansionToggle() {
      this.filterExpansion = !this.filterExpansion;
    },

    jump(path) {
      if (this.groupId) {
        this.$router.push({ path, query: { groupId: this.groupId } });
      } else {
        this.$message({
          message: "请选择项目分组",
          type: "info",
          duration: 1200,
        });
      }
    },
    // 操作处理函数
    operateHandle(type, row) {
      let datas = {
        project_name: row.project_name,
        created_by: row.created_by,
        project_version: row.project_version,
        project_cover: row.project_cover,
        project_state: row.project_state,
      };
      let pdata = JSON.stringify(datas);
      // 查看详情
      if (type === 1) {
        this.$router.push({
          path: "/project/project-details/base-info/" + row.project_id,
          query: { data: pdata },
        });
      }
      // 授权
      if (type === 3) {
        this.$router.push({
          path: "/project/authorization/" + row.project_id,
        });
      }
      // 编辑
      if (type === 4) {
        this.$refs["UpdateProjectInfoWrapper"].show(
          { title: "编辑项目信息", width: "980px", "custom-class": "editpro" },
          { projectId: row.project_id }
        );
      }
      // 上线下线
      if (type === 2) {
        this.$refs["projectOnline"].show(
          { title: "项目上线", width: "600px" },
          { projectId: row.project_id, types: "offline" }
        );
      }
      if (type === 6) {
        this.$refs["projectOnline"].show(
          { title: "项目下线", width: "600px" },
          { projectId: row.project_id, types: "offline" }
        );
      }
      // 删除
      if (type === 5) {
        this.$confirm("确认删除选中的项目吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            delPro({
              project_id: row.project_id,
            }).then((res) => {
              if (res.code == 200) {
                this.$messageBox("success");
                this.proListFun();
              } else {
                this.$messageBox("error");
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

    hideUpdateProjectInfoWrapper() {
      this.$refs["UpdateProjectInfoWrapper"].close();
    },
    hideOnLine() {
      this.$refs["projectOnline"].close();
    },
    // 获取项目列表
    proListFun() {
      let params = {
        industry_category: this.filterForm.industry_category,
        manager_name: this.filterForm.manager_name,
        project_name: this.filterForm.name,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
        project_group_id: this.groupId,
        project_state: this.filterForm.state,
        running_mode: this.filterForm.runType,
        createdBy: this.filterForm.creat_user,
        province: this.filterForm.province,
        city: this.filterForm.city,
        county: this.filterForm.country,
      };
      proList(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.tableData.forEach((item) => {
            //this.getPic(item.project_cover);
            readFile({
              id: item.project_cover,
            }).then((res) => {
              const src = window.URL.createObjectURL(new Blob([res]));
              this.$set(item, "imgsrc", src);
            });
          });
        }
      });
    },
    serArea(data) {
      this.filterForm.province = data.province.name;
      if (data.city) {
        this.filterForm.city = data.city.name;
      }
      if (data.country) {
        this.filterForm.country = data.country.name;
      }
    },
    //查询
    serchFun() {
      this.proListFun();
    },
    reset() {
      this.filterForm.industry_category = "";
      this.filterForm.manager_name = "";
      this.filterForm.name = "";
      this.filterForm.state = "";
      this.filterForm.creat_user = "";
      this.filterForm.runType = "";
      this.proListFun();
    },
    // 分页改变
    paginationChange(data) {
      console.log(data);
      this.pager = data;
      this.proListFun();
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
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";

.proimg {
  img {
    width: 50px;
    height: auto;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
}
</style>
<style lang="scss">
.editpro {
  .el-dialog__body {
    padding: 20px 20px 0 0;
  }
}
</style>
