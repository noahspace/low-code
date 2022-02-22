// 删除解锁布局
<template>
  <div class="Layout-create">
    <el-form
      :model="LayoutForm"
      label-width="130px"
      :rules="LayoutFormRules"
      ref="LayoutForm"
      class="form"
    >
      <el-form-item label="密码校验:" prop="pwd">
        <el-input v-model="LayoutForm.pwd" placeholder="请输入密码"> </el-input>
      </el-form-item>

      <el-row class="btn">
        <el-button type="primary">删除服务器</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import formValid from "@/utils/form-validation";
export default {
  props: ["ID"],
  data() {
    return {
      LayoutForm: {
        pwd: "",
      },
      // 项目校验规则
      LayoutFormRules: {
        pwd: [{ validator: formValid.phone, trigger: "blur", required: true }],
      },
    };
  },
  components: {},
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.btn {
  text-align: center;
}
</style>
