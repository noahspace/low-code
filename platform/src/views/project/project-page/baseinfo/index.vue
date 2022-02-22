<template>
  <div class="page-baseinfo">
    <el-form
      :rules="rules"
      class="form"
      ref="form"
      :model="pageInfo"
      label-width="80px"
      :hide-required-asterisk="true"
    >
      <el-form-item label="页面名称" prop="name">
        <el-input v-show="isEdit" v-model="pageInfo.name"></el-input>
        <span v-show="!isEdit">{{ pageInfo.name | emptyFilter }}</span>
      </el-form-item>
      <el-form-item label="页面标签" prop="tags">
        <el-input v-show="isEdit" v-model="pageInfo.tags"></el-input>
        <span v-show="!isEdit">{{ pageInfo.tags | emptyFilter }}</span>
      </el-form-item>
      <el-form-item label="页面描述" prop="description">
        <el-input v-show="isEdit" v-model="pageInfo.description"></el-input>
        <span v-show="!isEdit">{{ pageInfo.description | emptyFilter }}</span>
      </el-form-item>
      <el-form-item label="创建人">
        <span>{{ pageInfo.created_by | emptyFilter }}</span>
      </el-form-item>
      <el-form-item label="创建时间">
        <span>{{ pageInfo.created_time | emptyFilter }}</span>
      </el-form-item>
      <el-form-item label="修改人">
        <span>{{ pageInfo.updated_by | emptyFilter }}</span>
      </el-form-item>
      <el-form-item label="修改时间">
        <span>{{ pageInfo.updated_time | emptyFilter }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as ProjectPage from "@/apis/project-page";
export default {
  data() {
    return {
      pageInfo: {},
      isEdit: false,
      rules: {
        name: [{ required: true, message: "请输入页面名称", trigger: "blur" }],
      },
    };
  },
  filters: {
    emptyFilter: function (val) {
      return val || "无";
    },
  },
  computed: {
    // 项目 ID
    projectId() {
      return this.$route.params.id;
    },
    // 页面 ID
    pageId() {
      return this.$route.params.pageId;
    },
  },
  watch: {
    $route: {
      handler() {
        if (this.pageId) {
          this.getData();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    openEdit() {
      this.isEdit = true;
    },
    // 保存
    save() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          try {
            let res = await ProjectPage.update({
              id: this.pageInfo.id,
              page_group_id: this.pageInfo.page_group_id,
              name: this.pageInfo.name,
              description: this.pageInfo.description,
              tags: this.pageInfo.tags,
            });
            if (res.code === 200) {
              this.$messageBox();
              this.isEdit = false;
              this.getData();
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async getData() {
      try {
        let res = await ProjectPage.getInfo({
          id: this.pageId,
        });
        if (res.code === 200) {
          this.pageInfo = res.data;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
