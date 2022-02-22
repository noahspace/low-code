// 新增主题
<template>
  <div class="theme-create">
    <el-form
      :model="themeForm"
      label-width="100px"
      :rules="themeFormRules"
      ref="themeForm"
      class="form"
    >
      <el-form-item label="主题名称:" prop="name">
        <el-input v-model="themeForm.name" placeholder="请输入主题名称">
        </el-input>
      </el-form-item>
      <el-form-item label="自定义标签:">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
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

      <el-row class="btn">
        <el-button @click="cancelFun()">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { addTheme } from "@/apis/resources-components";

export default {
  props: ["ID"],
  data() {
    return {
      themeForm: {
        name: "",
      },
      // 项目校验规则
      themeFormRules: {
        name: [{ trigger: "blur", required: true, message: "名称不能为空" }],
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
    cancelFun() {
      this.$emit("close");
    },
    //新增
    save() {
      this.$refs.themeForm.validate((valid) => {
        let params = {
          category_id: this.ID,
          name: this.themeForm.name,
          tags: this.dynamicTags.join(","),
        };
        if (valid) {
          addTheme(params).then((res) => {
            if (res.code == 200) {
              this.$messageBox("success");
              this.cancelFun();
              this.$emit("updateList");
            } else {
              this.$messageBox("error");
            }
          });
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
