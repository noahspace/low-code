// 锁定主题
<template>
  <div class="theme-lock">
    <el-form
      :model="themeForm"
      label-width="130px"
      ref="themeForm"
      class="form"
    >
      <el-row class="lock-center">
        <i class="el-icon-warning"></i>
        <div>是否确定锁定该{{ type }}？锁定后不能再进行编辑</div>
      </el-row>

      <el-row class="btn">
        <el-button @click="cancelFun()">取消</el-button>
        <el-button type="primary" @click="lockFun">确定</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { lockOrUnlock } from "@/apis/resources-components";

export default {
  props: ["ID", "type"],
  data() {
    return {
      themeForm: {
        pwd: "",
      },
    };
  },
  components: {},
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    cancelFun() {
      this.$emit("close");
    },
    lockFun() {
      let types = "";
      if (this.type == "主题") {
        types = "06";
      } else if (this.type == "图标库") {
        types = "0401";
      } else if (this.type == "图片") {
        types = "02";
      } else if (this.type == "插图库") {
        types = "0301";
      } else if (this.type == "布局库") {
        types = "05";
      } else if (this.type == "组件库") {
        types = "0101";
      }
      let params = {
        id: this.ID,
        type: types,
      };
      lockOrUnlock(params).then((res) => {
        if (res.code == 200) {
          this.$messageBox("success");
          this.$emit("close");
        } else {
          this.$messageBox("error");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.lock-center {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
  font-size: 20px;
  i {
    color: #409eff;
    font-size: 60px;
    margin-bottom: 10px;
  }
}
.btn {
  text-align: center;
}
</style>
