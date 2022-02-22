<template>
  <div class="ui-workbench">
    <div class="ui-workbench-header">
      <div class="page-info">
        <i @click="back" class="icon ri-arrow-go-back-line"></i>
        <div class="title">
          <span>{{ projectName }}</span>
          <i class="title-icon ri-arrow-right-s-line"></i>
          <span class="page-name">{{ pageName }}</span>
        </div>
      </div>
      <div class="header-tools">
        <div class="tool" @click="openThemePane">
          <el-tooltip content="主题" placement="bottom">
            <i class="ri-magic-line"></i>
          </el-tooltip>
        </div>
        <div class="tool" @click="openLayout">
          <el-tooltip content="辅助布局" placement="bottom">
            <i class="ri-layout-3-line"></i>
          </el-tooltip>
        </div>
        <el-button @click="reset">重置</el-button>
        <el-button @click="preview">预览</el-button>
        <el-button :loading="loading.saveLoading" @click="save" type="primary"
          >保存</el-button
        >
      </div>
    </div>
    <div class="ui-workbench-body">
      <div class="ui-workbench-aside">
        <div
          :class="{ active: asideActive === 'OutlineTreePane' }"
          class="menu-item"
          @click="openAsidePane('OutlineTreePane')"
        >
          <el-tooltip content="大纲树" placement="right">
            <i class="ri-node-tree"></i>
          </el-tooltip>
        </div>
        <div
          :class="{ active: asideActive === 'ComponentLibraryPane' }"
          class="menu-item"
          @click="openAsidePane('ComponentLibraryPane')"
        >
          <el-tooltip content="组件库" placement="right">
            <i class="ri-function-line"></i>
          </el-tooltip>
        </div>
        <div
          :class="{ active: asideActive === 'IconLibraryPane' }"
          class="menu-item"
          @click="openAsidePane('IconLibraryPane')"
        >
          <el-tooltip content="图标库" placement="right">
            <i class="ri-star-line"></i>
          </el-tooltip>
        </div>
        <div
          :class="{ active: asideActive === 'PictureLibraryPane' }"
          class="menu-item"
          @click="openAsidePane('PictureLibraryPane')"
        >
          <el-tooltip content="图片库" placement="right">
            <i class="ri-image-line"></i>
          </el-tooltip>
        </div>
        <div
          :class="{ active: asideActive === 'IllustrationLibraryPane' }"
          class="menu-item"
          @click="openAsidePane('IllustrationLibraryPane')"
        >
          <el-tooltip content="插图库" placement="right">
            <i class="ri-gallery-line"></i>
          </el-tooltip>
        </div>
        <div
          :class="{ active: asideActive === 'GlobalVariablePane' }"
          class="menu-item"
          @click="openAsidePane('GlobalVariablePane')"
        >
          <el-tooltip content="全局变量" placement="right">
            <i class="ri-link"></i>
          </el-tooltip>
        </div>
      </div>
      <div v-show="asideActive" class="ui-workbench-aside-pane">
        <component
          @closeAsidePane="openAsidePane('')"
          :is="asideActive"
        ></component>
      </div>
      <div class="ui-workbench-center">
        <div class="ui-workbench-main">
          <WorkbenchMain :workbenchslider="workbenchslider"></WorkbenchMain>
        </div>
        <div class="ui-workbench-tools">
          <div class="ui-workbench-slider">
            <el-slider
              :min="0"
              :max="200"
              v-model="workbenchslider"
              :format-tooltip="
                (val) => {
                  return val + '%';
                }
              "
            >
            </el-slider>
          </div>
        </div>
      </div>
      <div
        v-if="currentActive.component || themePane"
        class="ui-workbench-options"
      >
        <OptionsPane
          v-show="!themePane"
          @close="closeOptionsPane"
        ></OptionsPane>
        <div class="theme" v-show="themePane">
          <div class="header">
            <span class="title">切换主题</span>
            <div @click="closeThemePane" class="close">
              <i class="ri-close-line"></i>
            </div>
          </div>
          <div class="body">
            <div class="item" v-for="item in themeList" :key="item.id">
              <el-radio v-model="themeRadio" :label="item.id">{{
                item.name
              }}</el-radio>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DialogWrapper ref="dialogWrapperRef">
      <template slot-scope="scope">
        <LayoutDialog @success="scope.success" />
      </template>
    </DialogWrapper>
  </div>
</template>

<script>
import ComponentLibraryPane from "./components/ComponentLibraryPane";
import GlobalVariablePane from "./components/GlobalVariablePane";
import IconLibraryPane from "./components/IconLibraryPane";
import IllustrationLibraryPane from "./components/IllustrationLibraryPane";
import OutlineTreePane from "./components/OutlineTreePane";
import PictureLibraryPane from "./components/PictureLibraryPane";
import OptionsPane from "./components/OptionsPane";
import WorkbenchMain from "./components/WorkbenchMain";
import LayoutDialog from "./components/LayoutDialog";

import * as projectPageAPI from "@/apis/project-page";
import * as projectListAPI from "@/apis/project-list";
import {
  getlayoutsOption,
  updateLayoutsOption,
} from "@/apis/resources-components";
import { nanoid } from "nanoid";
import { getThemeList } from "@/apis/resources-components";

export default {
  components: {
    ComponentLibraryPane, // 组件库面板
    GlobalVariablePane, // 全局变量
    IconLibraryPane, // 图标库面板
    IllustrationLibraryPane, // 插图库面板
    OutlineTreePane, // 大纲树面板
    PictureLibraryPane, // 图片库面板
    OptionsPane, // 配置面板
    WorkbenchMain, // 工作面板
    LayoutDialog, // 辅助布局
  },
  data() {
    return {
      workbenchslider: 100,
      projectName: "",
      pageName: "",
      // 左侧当前面板激活，为空表示不展示
      asideActive: "",
      // 页面配置
      config: {
        // 组件
        components: [],
        // 变量
        variables: [],
      },
      // 当前激活组件
      currentActive: {
        component: null,
      },
      loading: {
        saveLoading: false,
      },
      themePane: false,
      themeRadio: "",
      themeList: [],
    };
  },
  provide() {
    return {
      // 页面配置
      config: this.config,
      // 当前激活
      currentActive: this.currentActive,
    };
  },
  created() {
    this.getPageInfo();
    this.getThemeListHandle();
    this.getPageConfig();
  },
  computed: {
    // 页面 ID
    pageId() {
      return this.$route.params.pageId;
    },
    // 项目 ID
    projectId() {
      return this.$route.params.projectId;
    },
    //类型
    type() {
      return this.$route.params.type;
    },
    currentLayoutConfig() {
      return this.$store.state.currentLayoutConfig;
    },
  },
  methods: {
    async getThemeListHandle() {
      try {
        const res = await getThemeList({
          category_id: "",
          name: "",
          created_time_end: "",
          created_time_begin: "",
          page_index: 1,
          page_size: 2000,
          created_by: "",
        });
        if (res.code == 200) {
          this.themeList = res.data.list;
        }
      } catch (error) {
        //
      }
    },
    openThemePane() {
      this.themePane = !this.themePane;
    },
    closeThemePane() {
      this.themePane = false;
    },
    openLayout() {
      this.$refs["dialogWrapperRef"].show(
        { title: "上传辅助布局", width: "725px" },
        {
          success: (data) => {
            this.$refs["dialogWrapperRef"].close();
            let formatData = (data) => {
              return data
                .filter((obj) => {
                  return obj.type === "WbiGrid" || obj.type === "WbiDiv";
                })
                .map((obj) => {
                  if (obj.type === "WbiGrid" || obj.type === "WbiDiv") {
                    const containerConfig = JSON.parse(
                      JSON.stringify(this.$configLibrary.WContainer)
                    );
                    containerConfig.attribs.style.gridTemplateColumns =
                      obj.column;
                    containerConfig.attribs.style.gridTemplateRows = obj.row;

                    if (obj.columnMerge) {
                      const columnMerge = obj.columnMerge.split("/");
                      containerConfig.attribs.style.gridColumnStart =
                        columnMerge[0];
                      containerConfig.attribs.style.gridColumnEnd =
                        columnMerge[1];
                    }

                    if (obj.rowMerge) {
                      const rowMerge = obj.rowMerge.split("/");
                      containerConfig.attribs.style.gridRowStart = rowMerge[0];
                      containerConfig.attribs.style.gridRowEnd = rowMerge[1];
                    }

                    containerConfig.attribs.style.display =
                      obj.type === "WbiGrid" ? "grid" : "block";

                    return {
                      ...containerConfig,
                      id: nanoid(),
                      name: "WContainer",
                      slot: "default",
                      show: true,
                      children:
                        obj.children && obj.children.length > 0
                          ? formatData(obj.children)
                          : [],
                    };
                  }
                });
            };
            const layoutData = formatData([data]);
            this.config.components = layoutData;
          },
        }
      );
    },
    closeOptionsPane() {
      this.currentActive.component = null;
    },
    back() {
      this.$router.push({
        path: `/project/project-page/${this.projectId}/preview/${this.pageId}`,
      });
    },
    async getPageInfo() {
      Promise.all([
        projectListAPI.getDetail({ project_id: this.projectId }),
        projectPageAPI.getInfo({
          id: this.pageId,
        }),
      ]).then((result) => {
        this.projectName = result[0].data.project_name;
        this.pageName = result[1].data.name;
      });
    },
    // 获取页面配置
    async getPageConfig() {
      // let configData = window.localStorage.getItem("pageConfig");
      // if (configData) {
      //   configData = JSON.parse(configData);
      //   this.config.components = configData.components;
      //   this.config.variables = configData.variables;
      // }
      try {
        let res;
        //页面
        if (this.type == "page") {
          res = await projectPageAPI.getPageOption({
            id: this.pageId,
          });

          //布局
        } else if (this.type == "layout") {
          res = await getlayoutsOption({
            id: this.pageId,
          });
        }
        if (res.code === 200) {
          if (res.data) {
            let configData;
            if (this.type == "page") {
              configData = JSON.parse(res.data);
            } else if (this.type == "layout") {
              configData = JSON.parse(res.data.layoutConfig);
            }
            this.config.components = configData.components;
            this.config.variables = configData.variables;
          } else {
            if (this.currentLayoutConfig) {
              let defaultConfig = JSON.parse(this.currentLayoutConfig);
              this.config.components = defaultConfig.components;
              this.config.variables = defaultConfig.variables;
            } else {
              this.config.components = [];
              this.config.variables = [];
            }
          }
        }
      } catch (error) {
        //
      }
    },
    reset() {
      this.config.components = [];
      this.config.variables = [];
    },
    // 预览
    preview() {
      this.save();
      window.open(
        `/wbi/index.html#/preview/page/${this.pageId}/${this.projectId}`,
        "target"
      );
    },
    async save() {
      console.log(JSON.stringify(this.config));
      // 变量初始化处理
      this.config.variables.forEach((obj) => {
        obj.data = null;
      });
      window.localStorage.setItem("pageConfig", JSON.stringify(this.config));
      try {
        this.loading.saveLoading = true;
        let res;
        //页面
        if (this.type == "page") {
          res = await projectPageAPI.updatePageOption({
            id: this.pageId,
            option: JSON.stringify(this.config),
            // option: JSON.stringify({
            //   // 组件
            //   components: [],
            //   // 变量
            //   variables: [],
            // }),
          });
          //布局
        } else if (this.type == "layout") {
          res = await updateLayoutsOption({
            id: this.pageId,
            option: JSON.stringify(this.config),
          });
        }

        if (res.code === 200) {
          this.$messageBox();
        } else {
          this.$messageBox("error");
        }
      } catch (error) {
        console.log(error);
        //
      } finally {
        this.loading.saveLoading = false;
      }
    },
    // 打开左侧面板
    openAsidePane(val) {
      if (val !== this.asideActive) {
        this.asideActive = val;
      } else {
        this.asideActive = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
