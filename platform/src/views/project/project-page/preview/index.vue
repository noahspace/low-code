<template>
  <div class="page-preview">
    <ProdRenderer
      v-for="component in config.components"
      :key="component.id"
      :current-data="component"
    ></ProdRenderer>
  </div>
</template>

<script>
import * as projectPageAPI from "@/apis/project-page";
import ProdRenderer from "@/components/ProdRenderer";

export default {
  components: { ProdRenderer },
  provide() {
    return {
      // 页面配置
      config: this.config,
    };
  },
  data() {
    return {
      // 页面配置
      config: {
        // 组件
        components: [],
        // 变量
        variables: [],
      },
      total: 0,
      pager: {
        pageIndex: 1,
        pageSize: 10,
      },
      layoutList: [],
    };
  },
  created() {
    this.getPageConfig();
  },
  watch: {
    $route: {
      handler() {
        if (this.pageId) {
          this.getPageConfig();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    // 项目 ID
    projectId() {
      return this.$route.params.id;
    },
    // 页面 ID
    pageId() {
      return this.$route.params.pageId;
    },
  },
  methods: {
    // 获取页面配置
    async getPageConfig() {
      // let configData = window.localStorage.getItem("pageConfig");
      // if (configData) {
      //   configData = JSON.parse(configData);
      //   this.config.components = configData.components;
      //   this.config.variables = configData.variables;
      // }
      try {
        const res = await projectPageAPI.getPageOption({
          id: this.pageId,
        });
        if (res.code === 200) {
          if (res.data) {
            const configData = JSON.parse(res.data);
            this.config.components = configData.components;
            this.config.variables = configData.variables;
          } else {
            this.config.components = [];
            this.config.variables = [];
          }
        }
      } catch (error) {
        //
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-preview {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
