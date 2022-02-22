<template>
  <div class="picture-library-pane">
    <div class="header">
      <span class="title">图片库</span>
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
          v-for="item in pictureGroup"
          :key="item.id"
          class="lib-item"
          @click="openDetails(item.id, item.name)"
          :title="item.name"
        >
          <span class="title">{{ item.name }}</span>
        </li>
      </ul>
      <ul v-else class="img-list">
        <li
          v-for="item in pictureList"
          :key="item.id"
          class="img-item"
          draggable
          @dragstart="
            handleDragStart($event, {
              src: '/resource_file/' + item.filePath,
            })
          "
        >
          <img
            class="preview"
            :src="'/resource_file/' + item.filePath"
            alt=""
            draggable="false"
          />
          <span class="title">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as groupAPI from "@/apis/group";
import * as resourcesAPI from "@/apis/resources-components";
export default {
  data() {
    return {
      pictureGroup: [],
      pictureList: [],
      details: false,
      categoryId: "",
      backName: "",
    };
  },
  created() {
    this.getPictureGroup();
  },
  methods: {
    async getPictureGroup() {
      this.pictureGroup = [];
      try {
        const res = await groupAPI.get({
          type: "05",
        });
        this.pictureGroup = res.data.list;
      } catch (error) {
        console.error(error);
      }
    },
    async getPicture() {
      this.pictureList = [];
      try {
        const res = await resourcesAPI.getImg({
          page_size: 9999,
          page_index: 1,
          category_id: this.categoryId,
          name: "",
          created_start_time: "",
          created_by: "",
          created_end_time: "",
        });
        this.pictureList = res.data.list;
      } catch (error) {
        console.error(error);
      }
    },
    openDetails(id, name) {
      this.details = true;
      this.categoryId = id;
      this.backName = name;
      this.getPicture();
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
