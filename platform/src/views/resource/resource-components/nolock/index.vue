// 删除解锁主题
<template>
  <div class="theme-create">
    <el-form
      :model="themeForm"
      label-width="130px"
      :rules="themeFormRules"
      ref="themeForm"
      class="form"
    >
      <!-- <el-form-item label="密码校验:" prop="pwd">
        <el-input v-model="themeForm.pwd" placeholder="请输入密码"> </el-input>
      </el-form-item> -->

      <el-row class="btn">
        <!-- <el-button type="primary" v-if="type == 'del'">删除主题</el-button> -->
        <el-button type="primary" @click="lockFun">解锁</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import formValid from "@/utils/form-validation";
import { lockOrUnlock } from "@/apis/resources-components";

export default {
  props: ["ID", "type"],
  data() {
    return {
      themeForm: {
        pwd: "",
      },
      // 项目校验规则
      themeFormRules: {
        pwd: [{ validator: formValid.phone, trigger: "blur", required: true }],
      },
    };
  },
  components: {},
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
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
.btn {
  text-align: center;
}
</style>
