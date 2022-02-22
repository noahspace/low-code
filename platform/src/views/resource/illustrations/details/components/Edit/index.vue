<template>
  <div class="edit-icon">
    <el-form :v-model="form" label-width="100px">
      <el-form-item label="插图名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="自定义标签">
        <el-tag
          :key="tag"
          v-for="tag in form.tags"
          closable
          :disable-transitions="false"
          @close="tagClose(tag)"
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
      </el-form-item>
      <el-form-item>
        <el-button @click="close">取消</el-button>
        <el-button @click="success" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateiconslib } from "@/apis/resources-components";

export default {
  props: ["params"],
  data() {
    return {
      form: {
        name: "",
        tags: [],
      },
      tagInput: "",
      tagInputVisible: false,
    };
  },
  created() {
    this.form.name = this.params.name;
    this.form.tags = this.params.tags;
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
    tagInputConfirm() {
      let tagInput = this.tagInput;
      if (tagInput) {
        this.form.tags.push(tagInput);
      }
      this.tagInputVisible = false;
      this.tagInput = "";
    },
    close() {
      this.$emit("close");
    },
    success() {
      updateiconslib({
        id: this.params.id,
        name: this.form.name,
        tags: this.form.tags.join(","),
      }).then((res) => {
        if (res.code == 200) {
          this.$messageBox("success");
          this.$emit("close");
          this.$emit("success");
          // this.$refs.uploadFile.submit();
        } else {
          this.$messageBox("error");
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
