<template>
  <div class="edit-icon">
    <el-form :model="form" label-width="100px">
      <el-form-item label="组件名称">
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
      <el-form-item label="组件分类">
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
      <el-form-item label="组件状态">
        <el-select v-model="form.status">
          <el-option
            v-for="item in states"
            :value="item.id"
            :label="item.name"
            :key="item.id"
          ></el-option>
        </el-select>
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
import { updateComponent } from "@/apis/resources-components";

export default {
  props: ["params"],
  data() {
    return {
      form: {
        name: "",
        tags: [],
        status: "",
        category: "",
      },
      tagInput: "",
      tagInputVisible: false,
      group: [],
      states: [
        { name: "停用", id: "1" },
        { name: "启用", id: "2" },
      ],
    };
  },
  created() {
    this.form = this.params;
    this.form.tags = this.params.tags.split(",");
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
      updateComponent({
        category_id: this.form.category,
        id: this.params.id,
        name: this.form.name,
        state: this.form.status,
        tags: this.form.tags.join(","),
      }).then((res) => {
        if (res.code == 200) {
          this.$messageBox("success");
          this.$emit("close");
          this.$emit("success");
        } else {
          this.$messageBox("error");
        }
      });
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
        let res = await API.get({ type: "04", main_id: "" });
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
