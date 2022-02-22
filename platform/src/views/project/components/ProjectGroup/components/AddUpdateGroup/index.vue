<template>
  <div class="add-update-group">
    <el-form ref="formRef" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="分组名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="上级分组" prop="parent">
        <el-cascader
          v-model="form.parent"
          :options="group"
          :props="{
            checkStrictly: true,
            emitPath: false,
            value: 'project_group_id',
            label: 'project_group_name',
          }"
          clearable
          :disabled="type === 'add'"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="分组描述" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="close" :loading="loading">取消</el-button>
        <el-button @click="submitForm" type="primary" :loading="loading"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as API from "@/apis/project-group";
export default {
  props: ["type", "data"],
  data() {
    return {
      loading: false,
      rules: {
        name: [
          { required: true, message: "请输入分组名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      group: [],
      form: {
        name: "",
        parent: "",
        desc: "",
      },
    };
  },
  created() {
    this.form = this.data;
    this.form.parent = this.form.parent ? this.form.parent : "-1";
    this.getGroup();
  },
  methods: {
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
        // 去掉自己节点
        if (child.project_group_id !== this.data.id) {
          if (mapItem) {
            (mapItem.children || (mapItem.children = [])).push(child);
          } else {
            treeData.push(child);
          }
        }
      });
      return treeData;
    },
    // 查询分组
    async getGroup() {
      try {
        let res = await API.get();
        if (res.code === 200) {
          this.group = [
            { project_group_id: "-1", project_group_name: "根节点" },
            ...this.toTreeData(res.data, {
              id: "project_group_id",
              pid: "parent_group_id",
            }),
          ];
        }
      } catch (error) {
        console.error(error);
      }
    },
    close() {
      this.$emit("close");
    },
    submitForm() {
      this.$refs["formRef"].validate((valid) => {
        if (valid) {
          this.success();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    success() {
      this.$emit("success", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-update-group {
  padding: 20px;
}
</style>
