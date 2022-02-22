<template>
  <div class="icon-library-pane">
    <div class="header">
      <span class="title">图标库</span>
      <i @click="close" class="close ri-close-line"></i>
    </div>
    <div v-show="details" class="back">
      <i @click="closeDetails" class="el-icon-arrow-left"></i>
      <span>{{ backName }}</span>
    </div>
    <div
      class="body"
      :style="{
        height: details ? 'calc(100% - 80px)' : 'calc(100% - 40px)',
      }"
    >
      <ul v-if="!details" class="library">
        <li
          v-for="item in libList"
          :key="item.id"
          @click="openDetails(item.id, item.name)"
          class="icon-item"
        >
          <div class="preview">
            <img
              class="img"
              :src="'/resource_file/' + item.previewUrl"
              alt=""
              draggable="false"
            />
          </div>
          <div class="title">{{ item.name }}</div>
        </li>
      </ul>
      <ul v-else class="icon-list">
        <li class="icon-item" v-for="item in iconList" :key="item.className">
          <div
            class="preview"
            draggable
            @dragstart="handleDragStart($event, { className: item.className })"
          >
            <i class="icon" :class="item.className"></i>
          </div>
          <div class="title">{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as iconLibraryAPI from "@/apis/icon-library";
export default {
  data() {
    return {
      details: false,
      libId: "",
      backName: "",
      libList: [],
      iconList: [
        {
          name: "菜单",
          className: "el-icon-menu",
        },
        {
          name: "用户",
          className: "el-icon-user",
        },
        {
          name: "图片",
          className: "el-icon-picture",
        },
        {
          name: "加载中",
          className: "el-icon-loading",
        },
      ],
    };
  },
  created() {
    this.getLibrary();
  },
  methods: {
    async getLibrary() {
      this.libList = [];
      try {
        const res = await iconLibraryAPI.getIconLibrary({
          page_size: 9999,
          page_index: 1,
          name: "",
          category_id: "",
          created_by: "",
          created_start_time: "",
          created_end_time: "",
        });
        this.libList = res.data.list;
      } catch (error) {
        console.error(error);
      }
    },
    async getIcons() {
      this.iconList = [];
      try {
        const res = await iconLibraryAPI.getIcons({
          page_size: 9999,
          page_index: 1,
          id: this.libId,
          name: "",
        });
        this.iconList = res.data.list;
      } catch (error) {
        console.error(error);
      }
    },
    openDetails(id, name) {
      this.libId = id;
      this.backName = name;
      this.details = true;
      this.getIcons();
    },
    closeDetails() {
      this.details = false;
    },
    close() {
      this.$emit("closeAsidePane");
    },
    // 处理开始拖拽事件
    handleDragStart(e, data) {
      e.dataTransfer.setData(
        "dragData",
        JSON.stringify({
          type: "addIcon",
          class: data.className,
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
