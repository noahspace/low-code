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
import { getlayoutsOption } from "@/apis/resources-components";
import ProdRenderer from "@/components/ProdRenderer";
export default {
  components: { ProdRenderer },
  provide() {
    return {
      // 配置
      config: this.config,
    };
  },
  data() {
    return {
      // 配置
      config: {
        // 组件
        components: [],
        // 变量
        variables: [],
      },
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.getConfig();
    }, 500);
  },
  watch: {},
  computed: {
    // 布局 ID
    layId() {
      return JSON.parse(window.localStorage.getItem("params")).id;
    },
  },
  methods: {
    // 获取布局配置
    async getConfig() {
      try {
        const res = await getlayoutsOption({
          id: this.layId,
        });
        if (res.code === 200) {
          if (res.data) {
            const configData = JSON.parse(res.data.layoutConfig);
            this.$nextTick(function () {
              this.config.components = configData.components;
              this.config.variables = configData.variables;
            });
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
