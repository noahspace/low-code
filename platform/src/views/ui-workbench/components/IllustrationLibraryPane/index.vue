<template>
  <div class="illustration-library-pane">
    <div class="header">
      <span class="title">插图库</span>
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
          v-for="item in libraryList"
          :key="item.id"
          @click="openDetails(item.id, item.name)"
          class="icon-item"
        >
          <div class="preview">
            <img
              draggable="false"
              :src="'/resource_file/' + item.previewUrl"
              alt=""
            />
          </div>
          <div class="title">{{ item.name }}</div>
        </li>
      </ul>
      <ul v-else class="img-list">
        <li
          v-for="item in imgList"
          :key="item.id"
          class="img-item"
          draggable
          @dragstart="
            handleDragStart($event, {
              src: '/resource_file/' + item.filePath,
            })
          "
        >
          <div class="preview">
            <img
              draggable="false"
              :src="'/resource_file/' + item.filePath"
              alt=""
            />
          </div>
          <span class="title">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as resourcesAPI from "@/apis/resources-components";
export default {
  data() {
    return {
      libId: "",
      backName: "",
      libraryList: [],
      imgList: [],
      details: false,
    };
  },
  created() {
    this.getLibrary();
  },
  methods: {
    // 查询插图库列表
    async getLibrary() {
      this.libraryList = [];
      try {
        const res = await resourcesAPI.geticonslibsList({
          page_size: 9999,
          page_index: 1,
          name: "",
          created_end_time: "",
          created_start_time: "",
          created_by: "",
          category_id: "",
        });
        if (res.code === 200) {
          this.libraryList = res.data.list;
        }
      } catch (error) {
        console.error(error);
      }
    },
    openDetails(id, name) {
      this.details = true;
      this.libId = id;
      this.backName = name;
      this.getList();
    },
    // 查询插图列表
    async getList() {
      this.imgList = [];
      try {
        const res = await resourcesAPI.geticonslib({
          lib_id: this.libId,
          page_size: 9999,
          page_index: 1,
        });
        if (res.code === 200) {
          this.imgList = res.data.list;
        }
      } catch (error) {
        console.error(error);
      }
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
          type: "addImage",
          src: data.src,
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
