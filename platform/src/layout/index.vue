<template>
  <div class="layout">
    <div class="layout-header">
      <div class="logo-wrap">
        <img class="logo" :src="require('./images/logo.png')" alt="whayer" />
        <h1 class="title">华雁智科低代码平台</h1>
      </div>
      <div class="tools">
        <div class="user">
          <i class="icon el-icon-s-custom"></i>
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
    <div class="layout-body">
      <div @click="toggleButton($event)" class="arrowDiv">
        <i class="el-icon-caret-right" v-show="!isCollapse"></i>
        <i class="el-icon-caret-left" v-show="isCollapse"></i>
      </div>
      <transition name="el-zoom-in-center">
        <ul
          class="layout-aside"
          v-click-outside="hideSubmenu"
          v-show="isCollapse"
        >
          <li @click="jump($event, '/')" class="menu-item">
            <i class="icon el-icon-house"></i>
            <span>首页</span>
          </li>
          <li
            @click="jump($event, '/project/project-list')"
            class="menu-item"
            :class="{ active: level1Routing === 'project' }"
          >
            <i class="icon el-icon-monitor"></i>
            <span>项目管理</span>
          </li>
          <li
            class="menu-item"
            @click="submenuToggle('resource')"
            :class="{ active: level1Routing === 'resource' }"
          >
            <i class="icon el-icon-document"></i>
            <span>资源管理</span>
            <ul v-show="showSubmenu === 'resource'" class="sub-menu">
              <li
                @click="jump($event, '/resource/themes')"
                :class="{ active: level2Routing === 'themes' }"
              >
                主题管理
              </li>
              <li
                @click="jump($event, '/resource/icons')"
                :class="{ active: level2Routing === 'icons' }"
              >
                图标管理
              </li>
              <li
                @click="jump($event, '/resource/images')"
                :class="{ active: level2Routing === 'images' }"
              >
                图片管理
              </li>
              <li
                @click="jump($event, '/resource/illustrations')"
                :class="{ active: level2Routing === 'illustrations' }"
              >
                插图管理
              </li>
              <li
                @click="jump($event, '/resource/layouts')"
                :class="{ active: level2Routing === 'layouts' }"
              >
                布局管理
              </li>
              <li
                @click="jump($event, '/resource/components')"
                :class="{ active: level2Routing === 'components' }"
              >
                组件管理
              </li>
              <li
                @click="jump($event, '/resource/servers')"
                :class="{ active: level2Routing === 'servers' }"
              >
                服务器管理
              </li>
            </ul>
          </li>
          <li
            class="menu-item"
            @click="submenuToggle('monitor')"
            :class="{ active: level1Routing === 'monitor' }"
          >
            <i class="icon el-icon-document-checked"></i>
            <span>平台监测</span>
            <ul v-show="showSubmenu === 'monitor'" class="sub-menu">
              <!-- <li
              @click="jump($event, '/monitor/system')"
              :class="{ active: level2Routing === 'system' }"
            >
              系统运行资源监测
            </li>
            <li
              @click="jump($event, '/monitor/db')"
              :class="{ active: level2Routing === 'db' }"
            >
              数据库运行监测
            </li>
            <li
              @click="jump($event, '/monitor/sql')"
              :class="{ active: level2Routing === 'sql' }"
            >
              SQL 执行监测
            </li>
            <li
              @click="jump($event, '/monitor/access-audit')"
              :class="{ active: level2Routing === 'access-audit' }"
            >
              访问审计
            </li> -->
              <li
                @click="jump($event, '/monitor/operation-log')"
                :class="{ active: level2Routing === 'operation-log' }"
              >
                操作日志
              </li>
            </ul>
          </li>
          <li
            @click="jump($event, '/help')"
            class="menu-item"
            :class="{ active: level1Routing === 'help' }"
          >
            <i class="icon el-icon-tickets"></i>
            <span>帮助中心</span>
          </li>
        </ul>
      </transition>

      <div class="layout-wrap">
        <div class="layout-breadcrumb">
          <breadcrumb />
        </div>
        <div class="layout-main">
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </div>
      </div>
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
import ClickOutside from "vue-click-outside";
import Breadcrumb from "./components/Breadcrumb";
import UserInfo from "../views/home/components/UserInfo";

export default {
  components: { Breadcrumb, UserInfo },
  directives: {
    ClickOutside,
  },
  data() {
    return {
      isCollapse: true,
      showSubmenu: "",
      username: auth.getUserInfo().username,
    };
  },
  computed: {
    level1Routing() {
      return this.$route.path.split("/")[1];
    },
    level2Routing() {
      return this.$route.path.split("/")[2];
    },
  },
  methods: {
    toggleButton(e) {
      this.isCollapse = !this.isCollapse;

      if (!this.isCollapse) {
        e.currentTarget.style.left = "-2px";
      } else {
        e.currentTarget.style.left = "78px";
      }
    },
    openUserInfo() {
      this.$refs.userInfoWrapper.show({ title: "用户信息", width: "600px" });
    },
    /**
     * 资源子菜单切换
     */
    submenuToggle(type) {
      if (this.showSubmenu !== "type") {
        this.showSubmenu = type;
      } else {
        this.showSubmenu = "";
      }
    },
    /**
     * 资源子菜单隐藏
     */
    hideSubmenu() {
      this.showSubmenu = "";
    },
    /**
     * 路由跳转
     */
    jump(event, path) {
      event.stopPropagation();
      this.showSubmenu = "";
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
