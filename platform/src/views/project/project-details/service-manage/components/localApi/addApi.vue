//新增接口模型
<template>
  <div class="api-divs">
    <el-form
      :model="filterForm"
      ref="filterForms"
      :rules="rules"
      label-width="130px"
    >
      <!-- <el-form-item label="所属系统名称:" prop="name">
        <el-input v-model="filterForm.name" placeholder="请填写所属系统名称">
        </el-input>
      </el-form-item> -->
      <el-form-item label="Swagger文件:" prop="files">
        <el-upload
          class="upload-demo"
          drag
          action=""
          :on-change="beforeUpload"
          ref="uploadFile"
          :auto-upload="false"
          :file-list="fileList"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">请上传swagger文件</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-row class="btn">
      <el-button @click="cancelFun()">取消</el-button>
      <el-button type="primary" @click="addFun()">创建</el-button>
    </el-row>
  </div>
</template>

<script>
import { localApiAdd } from "@/apis/project-data-source";
import { upload } from "@/apis/dictionary";
export default {
  data() {
    const validateFile = (rule, value, callback) => {
      if (!this.$refs.uploadFile.uploadFiles.length) {
        callback(new Error("请选择要上传的文件"));
        // } else if (this.$refs.uploadMaterialFile.uploadFiles.length > 1) {
        //   callback(new Error('每次上传只支持一个文件'));
      } else {
        callback();
      }
      // else {
      //   var regx = new RegExp("(.xlsx)$|(.doc)$|(.docx)$|(.xls)$");
      //   /**这里有个坑，单文件上传，第一次上传错误格式接着上传第二次格式，列表中数组值有两个*/
      //   if (
      //     !regx.test(
      //       this.$refs.uploadFile.uploadFiles[
      //         this.$refs.uploadFile.uploadFiles.length - 1
      //       ].name
      //     )
      //   ) {
      //     callback(new Error("文件格式只支持xlsx、doc、docx、xls"));
      //   }
      //   callback();
      // }
    };
    return {
      filterForm: {
        name: "",
      },
      // 项目校验规则
      rules: {
        name: [{ required: true, message: "请填写名称" }],
        files: [{ validator: validateFile, trigger: "change" }],
      },
      upload_url: "aaa",
      uploadForm: new FormData(), // 一个formdata
      fileid: "",
      fileList: [], //封面url
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
    beforeUpload(file) {
      this.uploadForm.append("file", file.raw);
      this.uploadForm.append("fileType", "13");
      let that = this;
      upload(that.uploadForm).then((res) => {
        if (res.code == 200) {
          that.fileid = res.data.id;
        } else {
          that.$messageBox("error");
        }
      });
      return false;
    },
    //新增
    addFun() {
      this.$refs.filterForms.validate((valid) => {
        console.log(this.fileid);
        let params = {
          file_id: this.fileid,
          project_id: this.$route.params.id,
        };
        if (valid) {
          //新增
          localApiAdd(params).then((res) => {
            if (res.code == 200) {
              this.$messageBox("success");
              this.cancelFun();
              this.$emit("updateList");
              // this.$refs.uploadFile.submit();
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
  margin-top: 20px;
  padding-top: 20px;
  text-align: center;
}
</style>
