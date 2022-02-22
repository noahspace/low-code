<template>
  <div class="edit-icon">
    <el-form
      :model="forms"
      label-width="100px"
      :rules="formRules"
      ref="comform"
    >
      <!-- <el-form-item label="自定义标签" v-if="type == 'edit'">
        <el-tag
          :key="tag"
          v-for="tag in forms.tags"
          closable
          :disable-transitions="false"
          @close="tagClose(tag)"
          @click="editTag(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="tagInputVisible"
          v-model="tagInput"
          ref="saveTagInput"
          @keyup.enter.native="tagInputConfirm"
          @blur="tagInputConfirm"
        >
        </el-input>
        <el-button
          icon="el-icon-plus"
          circle
          v-else
          class="button-new-tag"
          @click="showTagInput"
        ></el-button>
      </el-form-item> -->

      <el-form-item label="组件库文件" prop="file">
        <el-upload
          class="upload-demo"
          drag
          action=""
          multiple
          :on-change="beforeUpload"
          ref="uploadFile"
          :file-list="fileList"
          :auto-upload="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传 ZIP 文件，且不超过 10MB
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="close">取消</el-button>
        <el-button @click="success" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addComponents, updateComponents } from "@/apis/resources-components";

export default {
  props: ["params", "type"],
  data() {
    let that = this;
    let fileValid = (rule, value, callback) => {
      if (that.fileList.length > 0) {
        callback();
      } else {
        return callback(new Error("组件库文件不能为空"));
      }
    };
    return {
      forms: {
        tags: [],
      },
      // 校验规则
      formRules: {
        file: [{ validator: fileValid, trigger: "blur", required: true }],
      },
      tagInput: "",
      tagInputVisible: false,
      uploadForm: new FormData(),
      fileList: [],
    };
  },
  created() {
    console.log(this.params);
    if (this.params) {
      if (this.params.rows.tags) {
        this.forms.tags = this.params.rows.tags.split(",");
      }
    }
  },
  methods: {
    tagClose(tag) {
      this.forms.tags.splice(this.forms.tags.indexOf(tag), 1);
    },
    showTagInput() {
      this.tagInputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    tagInputConfirm() {
      let tagInput = this.tagInput;
      if (tagInput) {
        this.forms.tags.push(tagInput);
      }
      this.tagInputVisible = false;
      this.tagInput = "";
    },
    editTag(tag) {
      this.tagClose(tag);
      this.showTagInput();
      this.tagInput = tag;
    },
    close() {
      this.$refs.uploadFile.clearFiles();
      this.$emit("close");
    },
    beforeUpload(file, fileList) {
      this.fileList = fileList;
      this.uploadForm.append("file", file.raw);

      return false;
    },
    success() {
      this.$refs.comform.validate((valid) => {
        if (valid) {
          this.uploadForm.append("tags", this.forms.tags.join(","));
          if (this.type == "edit") {
            this.uploadForm.append("id", this.params.rows.id);
            updateComponents(this.uploadForm).then((res) => {
              if (res.code == 200) {
                this.$messageBox("success");
                this.$emit("close");
                this.$emit("success");
              } else {
                this.$messageBox("error");
              }
            });
          } else {
            addComponents(this.uploadForm).then((res) => {
              if (res.code == 200) {
                this.$messageBox("success");
                this.$emit("close");
                this.$emit("success");
              } else {
                this.$messageBox("error");
              }
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-icon {
  .el-tag {
    margin-right: 10px;
  }
  .input-new-tag {
    width: 90px;
  }
}
</style>
