// 图片编辑及新增
<template>
  <div class="pic-create">
    <el-form
      :model="picForm"
      label-width="130px"
      :rules="picFormRules"
      ref="picForm"
      class="form"
    >
      <el-form-item label="图片名称:" prop="name">
        <el-input v-model="picForm.name" placeholder="请输入图片名称">
        </el-input>
      </el-form-item>

      <el-form-item label="自定义标签:">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          style="width: 30%; margin-right: 1%"
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
      <el-form-item label="图片分类:">
        <el-cascader
          v-model="picForm.category"
          :options="group"
          :props="{
            checkStrictly: true,
            emitPath: false,
            value: 'id',
            label: 'name',
          }"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="图片文件:" prop="file" v-if="!rows">
        <!-- <el-upload
          :action="upload_url"
          :class="{ disabled: uploadDisabled }"
          list-type="picture-card"
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
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="removePic(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload> -->
        <el-upload
          class="upload-demo"
          drag
          :action="upload_url"
          multiple
          :on-change="beforeUpload"
          ref="uploadPic"
          :auto-upload="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            支持上传图片文件，图片zip压缩包
          </div>
        </el-upload>
        <!-- <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog> -->
      </el-form-item>
    </el-form>

    <el-row class="btn">
      <el-button @click="cancelFun()">取消</el-button>
      <el-button type="primary" v-if="rows" @click="save">确定</el-button>
      <el-button type="primary" v-if="!rows" @click="save">保存</el-button>
    </el-row>
  </div>
</template>

<script>
import { addImg, updateImg } from "@/apis/resources-components";
import * as API from "@/apis/group";

export default {
  props: ["ID", "rows"],
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
      picForm: {
        name: "",
        pic_id: "",
        category: "",
      },
      fileList: [],
      // 项目校验规则
      picFormRules: {
        name: [{ trigger: "blur", required: true, message: "名称不能为空" }],
        file: [{ validator: fileValid, required: true }],
      },
      // 自动生成标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      classlist: [],
      // 文件上传
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      upload_url: "aaa",
      uploadForm: new FormData(),
      group: [],
    };
  },
  components: {},
  created() {},
  mounted() {
    console.log(this.rows);
    if (this.rows) {
      this.picForm = this.rows;
      if (this.rows.tags) {
        this.dynamicTags = this.rows.tags.split(",");
      }
    }
    this.picForm.category = this.ID;
    this.getGroup();
  },
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
    removePic(file) {
      this.$refs.uploadPic.handleRemove(file);
      this.fileList = [];
    },
    handlePictureCardPreview(file) {
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
    cancelFun() {
      this.$emit("close");
    },
    // 树格式化
    toTreeData(data, props = { id: "id", pid: "pid" }) {
      const { id: _id, pid: _pid } = props;
      const map = data.reduce((obj, item) => {
        obj[item[_id]] = item;
        return obj;
      }, {});
      let treeData = [];
      data.forEach((child) => {
        const mapItem = map[child[_pid]];

        if (mapItem) {
          (mapItem.children || (mapItem.children = [])).push(child);
        } else {
          treeData.push(child);
        }
      });
      return treeData;
    },
    // 查询分组
    async getGroup() {
      try {
        let res = await API.get({
          type: "05",
          main_id: this.ID || this.picForm.category,
        });
        if (res.code === 200) {
          this.group = [
            { id: "-1", name: "根节点" },
            ...this.toTreeData(res.data.list, {
              id: "id",
              pid: "parent_id",
            }),
          ];
        }
      } catch (error) {
        console.error(error);
      }
    },
    save() {
      this.$refs.picForm.validate((valid) => {
        if (valid) {
          this.uploadForm.append(
            "category_id",
            this.ID || this.picForm.category
          );
          this.uploadForm.append("name", this.picForm.name);
          this.uploadForm.append("tags", this.dynamicTags.join(","));

          if (this.rows) {
            this.uploadForm.append("id", this.rows.id);

            updateImg(this.uploadForm).then((res) => {
              if (res.code == 200) {
                this.$messageBox("success");
                this.$emit("success");
                this.cancelFun();
              } else {
                this.$messageBox("error");
              }
            });
          } else {
            addImg(this.uploadForm).then((res) => {
              if (res.code == 200) {
                this.$messageBox("success");
                this.$emit("success");
                this.cancelFun();
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
.btn {
  padding-top: 20px;
  text-align: center;
}
</style>
