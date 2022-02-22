<template>
  <div class="components-manage">
    <el-menu :default-active="activeIndex" mode="horizontal" router>
      <el-menu-item index="/resource/components/resource"
        >组件资源</el-menu-item
      >
      <el-menu-item index="/resource/components/category"
        >组件分类</el-menu-item
      >
    </el-menu>
    <div class="components-manage-main">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    activeIndex() {
      return this.$route.path.split("/").splice(0, 4).join("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
