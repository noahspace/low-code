<template>
  <div class="service-mag">
    <el-tabs type="border-card">
      <el-tab-pane label="自动接口模型">
        <autoApi></autoApi>
      </el-tab-pane>
      <!-- <el-tab-pane label="平台自定接口模型">
        <sysApi></sysApi>
      </el-tab-pane> -->
      <el-tab-pane label="本地接口模型">
        <localApi></localApi>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import autoApi from "./components/autoApi/index";
// import sysApi from "./components/sysApi/index";
import localApi from "./components/localApi/index";

export default {
  data() {
    return {};
  },
  components: {
    autoApi,
    // sysApi,
    localApi,
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
