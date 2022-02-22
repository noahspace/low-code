// 主题编辑及查看
<template>
  <div class="layout-create">
    <el-form
      :model="layoutForm"
      label-width="130px"
      :rules="layoutFormRules"
      ref="layoutForm"
      class="form"
    >
      <el-form-item label="布局名称:" v-if="type == 'info'">
        <div>{{ layoutForm.name }}</div>
      </el-form-item>
      <el-form-item label="布局名称:" v-if="type == 'edit'">
        <el-input v-model="layoutForm.name" placeholder="请输入布局名称">
        </el-input>
      </el-form-item>
      <el-form-item label="布局状态:" v-if="type == 'info'">
        <div v-if="layoutForm.status == 0">锁定</div>
        <div v-if="layoutForm.status == 1">开发中</div>
        <div v-if="layoutForm.status == 2">开放</div>
      </el-form-item>
      <el-form-item label="布局状态:" v-if="type == 'edit'">
        <el-select
          v-model="layoutForm.status"
          placeholder="布局状态"
          clearable
          filterable
          :disabled="!disabled"
        >
          <el-option
            v-for="item in statusList"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="布局分类:">
        <div>{{ layoutForm.category }}</div>
      </el-form-item> -->
      <el-form-item label="自定义标签:" v-if="type == 'info'">
        <div>{{ layoutForm.tags }}</div>
      </el-form-item>
      <el-form-item label="自定义标签:" v-if="type == 'edit'">
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
      <el-form-item label="布局封面:" v-if="type == 'info'">
        <div style="display: flex">
          <div class="preview">
            <el-image
              style="width: 100%; height: 100%"
              fit="contain"
              :src="imgurl"
              :preview-src-list="[imgurl]"
            >
            </el-image>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="布局封面:" v-if="type == 'edit'">
        <div class="files">
          <!-- <el-image
            v-if="imgurl"
            style="width: 50%; height: auto"
            fit="contain"
            :src="imgurl"
            :preview-src-list="[imgurl]"
          >
          </el-image> -->
          <el-upload
            :action="upload_url"
            list-type="picture-card"
            :class="{ disabled: uploadDisabled }"
            accept="image/*"
            :on-change="beforeUpload"
            ref="uploadPic"
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
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="removePic(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="创建时间:">
        <div>{{ layoutForm.createdTime }}</div>
      </el-form-item>
      <el-form-item label="创建人:">
        <div>{{ layoutForm.createdBy }}</div>
      </el-form-item>
      <el-form-item label="最近修改时间:">
        <div>{{ layoutForm.updatedTime }}</div>
      </el-form-item>
      <el-form-item label="修改人:">
        <div>{{ layoutForm.updatedBy }}</div>
      </el-form-item>
    </el-form>

    <el-row class="btn">
      <el-button @click="cancelFun()" v-if="type == 'edit'">取消</el-button>
      <el-button @click="save" type="primary" v-if="type == 'edit'"
        >保存</el-button
      >
    </el-row>
  </div>
</template>

<script>
import { updatelayouts } from "@/apis/resources-components";

export default {
  data() {
    return {
      layoutForm: {
        name: "名称",
        layout_id: "4333333333333333",
      },
      // 项目校验规则
      layoutFormRules: {
        name: [{ trigger: "blur", required: true, message: "名称不能为空" }],
      },
      // 自动生成标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      classlist: [],
      type: "info",
      imgurl: "",
      upload_url: "aaa",
      uploadForm: new FormData(), // 一个formdata
      fileid: "",
      fileList: [], //封面url
      disabled: false,
      rows: {},
      statusList: [
        { name: "锁定", id: "0" },
        { name: "开发中", id: "1" },
        { name: "开放", id: "2" },
      ],
    };
  },
  components: {},
  computed: {
    uploadDisabled: function () {
      return this.fileList.length > 0;
    },
  },
  created() {},
  mounted() {
    this.$nextTick(function () {
      this.rows = JSON.parse(window.localStorage.getItem("params"));
      this.layoutForm = this.rows;
      if (this.layoutForm.status == "1") {
        this.disabled = false;
      }
      this.imgurl = "/resource_file/" + this.layoutForm.previewUrl;
      console.log(this.rows);
      this.fileList.push({
        url: this.imgurl,
      });
    });
  },
  watch: {},

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
      this.$router.push({
        path: "/resource/layouts",
      });
    },
    getType() {
      this.type = "edit";
    },
    updateType() {
      this.type = "info";
    },
    //文件上传
    removePic(file) {
      this.$refs.uploadPic.handleRemove(file);
      this.fileList = [];
    },

    beforeUpload(file, fileList) {
      this.fileList = fileList;
      this.imgurl = "";
      this.uploadForm.append("file", file.raw);
      return false;
    },
    save() {
      this.$refs.layoutForm.validate((valid) => {
        if (valid) {
          this.uploadForm.append("category_id", this.rows.category);
          this.uploadForm.append("id", this.rows.id);
          this.uploadForm.append("name", this.layoutForm.name);
          this.uploadForm.append("tags", this.dynamicTags.join(","));
          this.uploadForm.append("option", []);

          updatelayouts(this.uploadForm).then((res) => {
            if (res.code == 200) {
              this.$messageBox("success");
              this.cancelFun();
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
.layout-create {
  height: 100%;
  padding-top: 20px;
  background: #fff;
  padding-left: 30px;

  .form {
    width: 40%;
    height: 90%;
    overflow: auto;
    .preview {
      width: 148px;
      height: 148px;
      margin-right: 20px;
    }
    .files {
      display: flex;
      width: 80%;
      justify-content: space-between;
    }
  }
  .btn {
    padding-top: 20px;
    border-top: 1px solid #ddd;
    text-align: center;
  }
}
</style>
