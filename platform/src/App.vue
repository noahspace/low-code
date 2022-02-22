<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import * as iconLibraryAPI from "@/apis/icon-library";
export default {
  created() {
    this.loadResource();
  },
  methods: {
    //加载图标文件
    includeLinkStyle(url) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = url;
      document.getElementsByTagName("head")[0].appendChild(link);
    },
    // 加载资源
    async loadResource() {
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
        res.data.list.forEach((obj) => {
          this.includeLinkStyle("/resource_file/" + obj.filePath);
        });
      } catch (error) {
        console.error(error);
      }
    },
    themeParse() {},
  },
};
</script>

<style lang="scss" scoped></style>
