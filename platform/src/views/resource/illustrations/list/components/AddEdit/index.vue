<template>
  <div class="edit-icon">
    <el-form :v-model="form" label-width="100px">
      <!-- <el-form-item label="自定义标签">
        <el-tag
          :key="tag"
          v-for="tag in form.tags"
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
      <el-form-item label="插图库分类">
        <el-cascader
          v-model="form.category"
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
      <el-form-item label="插图库文件">
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
import * as API from "@/apis/group";
import { updateiconslibs, addiconslibs } from "@/apis/resources-components";
export default {
  props: ["params", "type"],
  data() {
    return {
      form: {
        category: "",
        tags: [],
      },
      tagInput: "",
      tagInputVisible: false,
      group: [],
      uploadForm: new FormData(),
      fileList: [],
    };
  },
  created() {
    this.form.category = this.params.category;
    if (this.type == "edit") {
      this.form.tags = this.params.rows.tags.split(",");
      // let path = this.params.rows.filePath;
      // let i = path.lastIndexOf("/");
      // let fileName = path.slice(i + 1, path.length);
      // this.fileList.push({
      //   name: fileName,
      //   url: path,
      // });
    }
  },
  mounted() {
    this.getGroup();
  },

  methods: {
    tagClose(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
    },
    showTagInput() {
      this.tagInputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    editTag(tag) {
      this.tagClose(tag);
      this.showTagInput();
      this.tagInput = tag;
    },
    tagInputConfirm() {
      let tagInput = this.tagInput;
      if (tagInput) {
        this.form.tags.push(tagInput);
      }
      this.tagInputVisible = false;
      this.tagInput = "";
    },
    beforeUpload(file) {
      this.uploadForm.append("file", file.raw);
      return false;
    },
    close() {
      this.$refs.uploadFile.clearFiles();
      this.$emit("close");
    },
    success() {
      this.uploadForm.append("category_id", this.form.category);
      this.uploadForm.append("tags", this.form.tags.join(","));
      if (this.type == "edit") {
        this.uploadForm.append("id", this.params.rows.id);
        updateiconslibs(this.uploadForm).then((res) => {
          if (res.code == 200) {
            this.$messageBox("success");
            this.$emit("close");
            this.$emit("success");
            // this.$refs.uploadFile.submit();
          } else {
            this.$messageBox("error");
          }
        });
      } else {
        addiconslibs(this.uploadForm).then((res) => {
          if (res.code == 200) {
            this.$messageBox("success");
            this.$emit("close");
            this.$emit("success");
            // this.$refs.uploadFile.submit();
          } else {
            this.$messageBox("error");
          }
        });
      }
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
        let res = await API.get({ type: "06", main_id: this.form.category });
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
