//项目上线弹窗
<template>
  <div class="online-create">
    <el-form
      :model="onlineForm"
      label-width="100px"
      :rules="onlineFormRules"
      ref="onlineForm"
      class="form"
    >
      <!-- <el-form-item label="自定义标签:">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          style="width: 30%; margin-right: 2%"
          @close="handleClose(tag)"
          @click="editTag(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          style="width: 30%"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button
          icon="el-icon-plus"
          circle
          v-else
          class="button-new-tag"
          @click="showInput"
        ></el-button>
      </el-form-item>
      <el-form-item label="服务器选择:" prop="computer">
        <el-select
          v-model="onlineForm.computer"
          placeholder="请选择服务器选择"
          clearable
          filterable
          style="width: 100%"
        >
          <el-option
            v-for="item in onlineForm.themeStyleList"
            :label="item.name"
            :value="item.code"
            :key="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="密码校验:" prop="pwd">
        <el-input v-model="onlineForm.pwd" placeholder="请输入密码"> </el-input>
      </el-form-item> -->

      <el-row class="btn">
        <el-button type="primary" @click="addproFun">确定</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import formValid from "@/utils/form-validation";
import { onlineOffline } from "@/apis/project-list";

export default {
  props: ["projectId", "type"],
  data() {
    return {
      onlineForm: {
        pwd: "",
        computer: "",
        tags: "",
      },
      // 项目校验规则
      onlineFormRules: {
        pwd: [{ trigger: "blur", required: true, message: "密码不能为空" }],
        computer: [
          { validator: formValid.phone, trigger: "blur", required: true },
        ],
      },
      // 自动生成标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  components: {},
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    //添加标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    editTag(tag) {
      this.handleClose(tag);
      this.showInput();
      this.inputValue = tag;
    },
    //回到列表
    cancelFun() {
      this.$emit("close");
    },
    //上下线
    addproFun() {
      // this.$refs.onlineForm.validate((valid) => {
      //   if (valid) {
      let params = {
        operation_type: this.type,
        project_id: this.projectId,
      };
      onlineOffline(params).then((res) => {
        if (res.code == 200) {
          this.$messageBox("success");
          this.$emit("success");
        }
      });
      //   }
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  text-align: center;
}
</style>
