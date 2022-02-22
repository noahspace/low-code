<template>
  <div class="user-info">
    <div class="avater">
      <i class="ri-user-3-fill"></i>
    </div>
    <div class="info">
      <el-descriptions size="medium" :column="1">
        <el-descriptions-item label="用户名">
          {{ username }}
        </el-descriptions-item>
        <el-descriptions-item label="用户角色">
          {{ role }}
        </el-descriptions-item>
        <el-descriptions-item label="最近登录时间"></el-descriptions-item>
        <el-descriptions-item label="最近登录 IP"></el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import auth from "@/utils/auth";
export default {
  data() {
    return {
      username: auth.getUserInfo().username,
      role: auth.getUserRole(),
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
