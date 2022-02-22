<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="item in breadcrumbData"
        :key="item.title"
        :to="null"
        >{{ item.title }}</el-breadcrumb-item
      >
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    breadcrumbData() {
      return this.$route.matched.map((obj) => obj.meta);
    },
  },
};
</script>

<style lang="scss" scoped></style>
