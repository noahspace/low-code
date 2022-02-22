<template>
  <div class="home">
    <div class="header">
      <div class="logo-wrap">
        <img class="logo" :src="require('./images/logo.png')" alt="whayer" />
        <h1 class="title">华雁智科低代码平台</h1>
      </div>
      <div class="tools">
        <div class="user">
          <i class="user-icon"></i>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">{{ username }}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                @click.native="openUserInfo"
                icon="el-icon-tickets"
                >用户信息</el-dropdown-item
              >
              <el-dropdown-item @click.native="logout" icon="el-icon-upload2"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="body">
      <div v-show="recentActions.length === 0" class="banner"></div>
      <div v-show="recentActions.length !== 0" class="recent-actions">
        <div class="title">最近操作项目</div>
        <ul class="project-list">
          <li class="item">
            <img src="" alt="" />
            <div class="info">
              <div class="name">华雁低代码平台</div>
              <div class="time">2 小时前</div>
            </div>
          </li>
          <li class="item">
            <img src="" alt="" />
            <div class="info">
              <div class="name">华雁低代码平台</div>
              <div class="time">2 小时前</div>
            </div>
          </li>
          <li class="item">
            <img src="" alt="" />
            <div class="info">
              <div class="name">华雁低代码平台</div>
              <div class="time">2 小时前</div>
            </div>
          </li>
          <li class="item">
            <img src="" alt="" />
            <div class="info">
              <div class="name">华雁低代码平台</div>
              <div class="time">2 小时前</div>
            </div>
          </li>
          <li class="item">
            <img src="" alt="" />
            <div class="info">
              <div class="name">华雁低代码平台</div>
              <div class="time">2 小时前</div>
            </div>
          </li>
          <li class="item">
            <img src="" alt="" />
            <div class="info">
              <div class="name">华雁低代码平台</div>
              <div class="time">2 小时前</div>
            </div>
          </li>
        </ul>
      </div>
      <ul class="menu">
        <li @click="jump('/project')">
          <i class="icon icon-project"></i>
          <span>项目管理</span>
        </li>
        <li @click="jump('/resource/components')">
          <i class="icon icon-source"></i>
          <span>资源管理</span>
        </li>
        <li @click="jump('/help/center')">
          <i class="icon icon-help"></i>
          <span>帮助中心</span>
        </li>
      </ul>
    </div>
    <div class="footer">
      <!-- <span>上次登录时间：2021/11/10 22:00:00</span> -->
    </div>
    <DialogWrapper ref="userInfoWrapper">
      <template slot-scope="">
        <UserInfo></UserInfo>
      </template>
    </DialogWrapper>
  </div>
</template>

<script>
import auth from "@/utils/auth";
import * as authAPI from "@/apis/auth";
import UserInfo from "./components/UserInfo";
export default {
  components: { UserInfo },
  data() {
    return {
      recentActions: [],
      username: auth.getUserInfo().username,
    };
  },
  methods: {
    openUserInfo() {
      this.$refs.userInfoWrapper.show({ title: "用户信息", width: "600px" });
    },
    jump(path) {
      this.$router.push({ path });
    },
    async logout() {
      try {
        const res = await authAPI.logout();
        if (res.code == 200) {
          auth.clearAll();
          location.href = res.result;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
