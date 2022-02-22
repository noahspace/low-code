<template>
  <div class="preview">
    <div class="body">
      <ProdRenderer
        v-for="component in config.components"
        :key="component.id"
        :current-data="component"
      ></ProdRenderer>
    </div>
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
    };
  },
  created() {
    this.getPageConfig();
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
    back() {
      this.$router.back(-1);
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
        const res = await projectPageAPI.getPageOption({
          id: this.pageId,
        });
        if (res.code === 200) {
          if (res.data) {
            const configData = JSON.parse(res.data);
            this.config.components = configData.components;
            this.config.variables = configData.variables;
            console.log(this.config);
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
@import "./index.scss";
</style>
