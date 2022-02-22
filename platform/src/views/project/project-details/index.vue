<template>
  <div class="project-details">
    <div class="project-card">
      <div class="project-preview">
        <img :src="imgurl" alt="" />
      </div>
      <div class="project-title-wrap">
        <div class="l">
          <div class="title">
            <h1>{{ prodata.project_name }}</h1>
            <p>创建人：{{ prodata.created_by }}</p>
            <p>版本号：{{ prodata.project_version }}</p>
          </div>
          <div class="tools">
            <el-button type="primary" @click="toolsHandle(1)"
              >项目页面管理</el-button
            >
            <el-button plain @click="toolsHandle(2)"
              >将项目作为模板来源创建项目</el-button
            >
            <el-button icon="el-icon-download" plain @click="toolsHandle(3)"
              >项目离线包下载</el-button
            >
          </div>
        </div>
        <div class="l">
          <div class="operate">
            <el-button
              @click="operateHandle(1)"
              type="text"
              v-if="prodata.project_state == '2'"
              >下线</el-button
            >
            <el-button
              @click="operateHandle(3)"
              type="text"
              v-if="prodata.project_state == 1 || prodata.project_state == 3"
              >上线</el-button
            >

            <!-- <el-divider direction="vertical" /> -->
            <!-- <el-button @click="operateHandle(2)" type="text">授权</el-button> -->
            <el-divider direction="vertical" />
            <el-button
              @click="editFun()"
              type="text"
              v-if="prodata.project_state != '2'"
              >编辑</el-button
            >
            <el-divider
              direction="vertical"
              v-if="prodata.project_state != '2'"
            />
            <el-button
              @click="operateHandle(4)"
              type="text"
              v-if="prodata.project_state != '2'"
              >删除</el-button
            >
            <el-divider
              direction="vertical"
              v-if="prodata.project_state != '2'"
            />
            <el-button @click="operateHandle(5)" type="text">返回</el-button>
          </div>
          <div class="pro-progress">
            <div class="pro-progress-pic">
              <el-tooltip
                class="item"
                effect="light"
                content="Top Left 提示文字"
                placement="top-start"
              >
                <div class="now-pic"></div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="light"
                content="Top Left 提示文字"
                placement="top-start"
              >
                <div class="now-pic-two"></div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="light"
                content="Top Left 提示文字"
                placement="top-start"
              >
                <div class="now-pic-three"></div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="light"
                content="Top Left 提示文字"
                placement="top-start"
              >
                <div class="now-pic-four"></div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="light"
                content="Top Left 提示文字"
                placement="top-start"
              >
                <div class="now-pic-five"></div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="light"
                content="Top Left 提示文字"
                placement="top-start"
              >
                <div class="now-pic-six"></div>
              </el-tooltip>
            </div>
            <div class="pro-progress-now">
              <div>
                创建项目<i
                  class="el-icon-arrow-right"
                  :style="{
                    color: prodata.project_state == 1 ? '#B1F3D8' : '#6e6c6c',
                  }"
                ></i>
              </div>
              <div>项目配置<i class="el-icon-arrow-right"></i></div>
              <div>项目开发<i class="el-icon-arrow-right"></i></div>
              <div>项目测试<i class="el-icon-arrow-right"></i></div>
              <div>部署上线</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="project-info">
      <el-menu :default-active="activeIndex" mode="horizontal" router>
        <el-menu-item :index="'/project/project-details/base-info/' + projectId"
          >项目基本信息</el-menu-item
        >
        <!-- <el-menu-item
          :index="'/project/project-details/run-monitor/' + projectId"
          >项目运行</el-menu-item
        > -->
        <el-menu-item
          :index="'/project/project-details/data-resource-manage/' + projectId"
          >数据资源管理</el-menu-item
        >
        <el-menu-item
          :index="'/project/project-details/service-manage/' + projectId"
          >服务资源管理</el-menu-item
        >
        <el-menu-item
          style="float: right"
          class="editItem"
          v-if="
            activeIndex == '/project/project-details/base-info/' + projectId
          "
        >
          <div
            class="edit-btn"
            @click="editFun"
            v-if="prodata.project_state != '2'"
          >
            <i class="el-icon-edit-outline"></i>
            <span>编辑</span>
          </div></el-menu-item
        >
      </el-menu>
      <div class="project-main">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </div>
      <dialog-wrapper ref="projectInfo">
        <template slot-scope="{ projectId }">
          <projectInfo :projectId="projectId" @close="closeProjectInfo" />
        </template>
      </dialog-wrapper>
      <dialog-wrapper ref="arrange">
        <template slot-scope="{ projectId, types }">
          <arrange :projectId="projectId" :type="types" />
        </template>
      </dialog-wrapper>
    </div>
  </div>
</template>
<script>
import projectInfo from "../components/projectInfo";
import arrange from "./components/arrange";
import { readFile } from "@/apis/dictionary";
import { delPro, projectProgress } from "@/apis/project-list";

export default {
  data() {
    return {
      num: 0,
      imgurl: "",
      prodata: {},
    };
  },
  computed: {
    activeIndex() {
      return this.$route.path;
    },
    // 项目 ID
    projectId() {
      return this.$route.params.id;
    },
  },
  components: {
    projectInfo,
    arrange,
  },
  mounted() {
    if (!this.$route.query.data) {
      // 表示 为空对象，页面状态为刷新状态  则从localStorage 中获取值
      this.prodata = JSON.parse(window.localStorage.getItem("params"));
    } else {
      // 表示为从其他页面跳转过来 获取从父页面传过来的参数
      this.prodata = JSON.parse(this.$route.query.data);
      // 将获取到的参数  localStorage 中
      window.localStorage.setItem("params", JSON.stringify(this.prodata));
    }
    this.getPic(this.prodata.project_cover);
    this.getProgress(this.projectId);
  },
  methods: {
    //项目进度查询
    getProgress(id) {
      projectProgress({
        project_id: id,
      }).then((res) => {
        let data = res.list;
        console.log(data);
      });
    },
    // 打开项目页面管理
    toolsHandle(type) {
      if (type === 1) {
        this.$router.push({ path: "/project/project-page/" + this.projectId });
      }
      if (type === 2) {
        this.$router.push({
          path: "/project/project-create/" + this.projectId,
        });
      }
    },
    // 项目操作
    operateHandle(type) {
      // 上线部署
      if (type === 3) {
        this.$refs["arrange"].show(
          { title: "项目上线", width: "800px" },
          { projectId: "这是项目 Id", types: "online " }
        );
      }
      // 下线
      if (type === 1) {
        this.$refs["arrange"].show(
          { title: "项目下线", width: "800px" },
          { projectId: "这是项目 Id", types: "offline " }
        );
      }
      // 授权
      if (type === 2) {
        this.$router.push({
          path: "/project/authorization/" + this.projectId,
        });
      }
      // 删除
      if (type === 4) {
        this.$confirm("确认删除选中的项目吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            delPro({
              project_id: this.projectId,
            }).then((res) => {
              if (res.code == 200) {
                this.$messageBox("success");
                this.$router.push({
                  path: "/project/project-list",
                });
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
      // 返回
      if (type === 5) {
        this.$router.push({ path: "/project" });
      }
    },
    editFun() {
      this.$refs["projectInfo"].show(
        { title: "编辑项目信息", width: "980px", "custom-class": "editpro" },
        { projectId: this.projectId }
      );
    },
    closeProjectInfo() {
      this.$refs["projectInfo"].close();
      location.reload();
    },
    //获取文件图片
    getPic(id) {
      readFile({
        id: id,
      }).then((res) => {
        const src = window.URL.createObjectURL(new Blob([res]));
        this.$nextTick(() => {
          this.imgurl = src;
        });
      });
    },
  },
  beforeDestroy() {
    window.localStorage.removeItem("params");
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
