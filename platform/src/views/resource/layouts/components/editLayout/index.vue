// 布局新增
<template>
  <div class="layout-create">
    <el-form
      :model="layoutForm"
      label-width="130px"
      :rules="layoutFormRules"
      ref="layoutForm"
      class="form"
    >
      <el-form-item label="名称:" prop="name">
        <el-input
          v-model="layoutForm.name"
          placeholder="请输入布局名称"
          style="width: 80%"
        >
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
      <el-form-item label="布局封面图:" prop="layfile">
        <el-upload
          :action="upload_url"
          :class="{ disabled: uploadDisabled }"
          list-type="picture-card"
          accept="image/*"
          :on-change="beforeUpload"
          ref="uploadlayout"
          :auto-upload="false"
          :file-list="fileList"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlelayouttureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="removelayout(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
    </el-form>

    <el-row class="btn">
      <el-button @click="cancelFun()">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import { addlayouts } from "@/apis/resources-components";

export default {
  props: ["ID"],
  data() {
    let that = this;
    let fileValid = (rule, value, callback) => {
      if (that.fileList.length > 0) {
        callback();
      } else {
        return callback(new Error("图片不能为空"));
      }
    };
    return {
      layoutForm: {
        name: "",
      },
      // 项目校验规则
      layoutFormRules: {
        name: [{ trigger: "blur", required: true, message: "名称不能为空" }],
        layfile: [{ validator: fileValid, required: true }],
      },
      // 自动生成标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      // 文件上传
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      upload_url: "aaa",
      uploadForm: new FormData(),
      fileList: [],
    };
  },
  components: {},
  created() {},
  mounted() {},
  watch: {},
  computed: {
    uploadDisabled: function () {
      return this.fileList.length > 0;
    },
  },
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
    //文件上传
    removelayout(file) {
      this.$refs.uploadlayout.handleRemove(file);
      this.fileList = [];
    },
    handlelayouttureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    beforeUpload(file, fileList) {
      this.fileList = fileList;
      this.uploadForm.append("file", file.raw);

      return false;
    },
    save() {
      this.$refs.layoutForm.validate((valid) => {
        if (valid) {
          this.uploadForm.append("category_id", this.ID);
          this.uploadForm.append("name", this.layoutForm.name);
          this.uploadForm.append("tags", this.dynamicTags.join(","));

          addlayouts(this.uploadForm).then((res) => {
            if (res.code == 200) {
              // this.$messageBox("success");
              // this.$emit("success");
              this.cancelFun();
              this.$router.push({
                path: "/ui-workbench/layout/" + res.data + "/" + "null",
              });
            } else {
              this.$messageBox("error");
            }
          });
        }
      });
    },
    cancelFun() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  padding-top: 20px;
  text-align: center;
}
</style>
