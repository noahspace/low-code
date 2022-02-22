<template>
  <el-dialog :visible.sync="dialogVisible" width="420px" custom-class="messBox">
    <div class="message-box">
      <i class="icon" :class="iconClass"></i>
      <span class="message">{{ text }}</span>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      type: "success",
      message: null,
      dialogVisible: false,
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.dialogVisible = false;
        }, 1000);
      }
    },
  },
  computed: {
    iconClass() {
      switch (this.type) {
        case "success":
          return "el-icon-success";
        case "error":
          return "el-icon-error";
        default:
          return "el-icon-success";
      }
    },
    text() {
      if (this.message) {
        return this.message;
      } else {
        switch (this.type) {
          case "success":
            return "操作成功!";
          case "error":
            return "操作失败";
          default:
            return "操作成功";
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
.messBox {
  .el-dialog__footer,
  .el-dialog__header {
    display: none;
  }
}
</style>
