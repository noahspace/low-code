<template>
  <div class="component-library-pane">
    <div class="header">
      <span class="title">组件库</span>
      <i @click="close" class="close ri-close-line"></i>
    </div>
    <div v-show="isShowItemList" class="back">
      <i @click="closeItemList" class="el-icon-arrow-left"></i>
      <span>{{ backName }}</span>
      <el-input
        size="mini"
        style="width: 160px; margin-left: auto"
        v-model="filterText1"
        clearable
        placeholder="输入关键字过滤"
      ></el-input>
    </div>
    <el-input
      v-show="!isShowItemList"
      size="mini"
      style="width: 160px; position: absolute; top: 6px; left: 156px"
      v-model="filterText"
      clearable
      placeholder="输入关键字过滤"
    ></el-input>
    <div
      class="body"
      :style="{
        height: isShowItemList ? 'calc(100% - 80px)' : 'calc(100% - 40px)',
      }"
    >
      <div class="list" v-if="!isShowItemList">
        <div
          v-for="item in typeList.filter((data) =>
            data.name.toLowerCase().includes(filterText.toLowerCase())
          )"
          :key="item.id"
          @click="openItemList(item.id, item.name)"
          class="item"
          :title="item.name"
        >
          <span class="title">{{ item.name }}</span>
        </div>
      </div>
      <div v-if="isShowItemList" class="item-list-wrapper">
        <ItemList
          :typeData="currentTypeData"
          :filterText="filterText1"
        ></ItemList>
      </div>
    </div>
  </div>
</template>

<script>
import * as groupAPI from "@/apis/group";
import ItemList from "./components/ItemList";
export default {
  components: { ItemList },
  inject: ["config", "currentActive"],
  data() {
    return {
      filterText: "",
      filterText1: "",
      isShowItemList: false,
      currentTypeData: "",
      typeList: [],
      backName: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const res = await groupAPI.get({ type: "04" });
        if (res.code == 200) {
          this.typeList = res.data.list;
        }
      } catch (error) {
        //
      }
    },
    closeItemList() {
      this.isShowItemList = false;
    },
    openItemList(id, name) {
      this.currentTypeData = { id, name };
      this.backName = name;
      this.isShowItemList = true;
    },
    close() {
      this.$emit("closeAsidePane");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
