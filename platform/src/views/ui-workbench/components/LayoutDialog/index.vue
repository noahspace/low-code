<template>
  <div class="layout-dialog">
    <el-upload
      class="file"
      action=""
      :show-file-list="false"
      :before-upload="beforeUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="img" />
      <i v-else class="el-icon-circle-plus-outline"></i>
    </el-upload>
    <span class="title">点击选择SVG图片</span>
    <el-button @click="upload" size="medium" type="primary">确认上传</el-button>
  </div>
</template>

<script>
import { auxiliaryLayoutPost } from "@/apis/project-page";
export default {
  data() {
    return {
      imageUrl: "",
      file: "",
    };
  },
  methods: {
    beforeUpload(file) {
      const isSVG = file.type === "image/svg+xml";
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isSVG) {
        this.$message.error("上传图片只能是 SVG 格式!");
      }
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      if (isSVG && isLt10M) {
        this.imageUrl = URL.createObjectURL(file);
        this.file = file;
      }
      return false;
    },
    async upload() {
      let formData = new FormData();
      formData.append("file", this.file);
      try {
        const res = await auxiliaryLayoutPost(formData);
        if (res.code == 200) {
          this.$emit("success", JSON.parse(res.data.layout));
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
