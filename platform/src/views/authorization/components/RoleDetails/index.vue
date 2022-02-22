<template>
  <div class="role-details">
    <div class="info">
      <el-avatar :src="require('./images/avatar.png')"></el-avatar>
      <el-descriptions :column="2" size="medium">
        <el-descriptions-item label="用户名">zgq</el-descriptions-item>
        <el-descriptions-item label="登录名">zgq</el-descriptions-item>
        <el-descriptions-item label="用户编码">zgq</el-descriptions-item>
        <el-descriptions-item label="邮箱">zgq@whayer.cn</el-descriptions-item>
        <el-descriptions-item label="用户类型">常规用户</el-descriptions-item>
        <el-descriptions-item label="授权状态">已授权</el-descriptions-item>
        <el-descriptions-item label="角色类型">管理角色</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="tools">
      <el-button type="primary" size="small">编辑权限</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["roleId"],
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
