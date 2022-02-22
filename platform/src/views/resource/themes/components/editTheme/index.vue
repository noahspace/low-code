// 主题编辑及查看
<template>
  <div class="theme-create">
    <el-form
      :model="themeForm"
      label-width="130px"
      :rules="themeFormRules"
      ref="themeForm"
      class="form"
    >
      <el-form-item label="主题ID:">
        <div>{{ themeForm.id }}</div>
      </el-form-item>
      <el-form-item label="主题名称:" v-if="todo != 'edit'">
        <div>{{ themeForm.name }}</div>
      </el-form-item>
      <el-form-item label="主题名称:" v-if="todo == 'edit'">
        <el-input v-model="themeForm.name" placeholder="请输入主题名称">
        </el-input>
      </el-form-item>
      <el-form-item label="主题状态:" v-if="todo != 'edit'">
        <div>
          <span v-if="themeForm.status == '2'">开放</span>
          <span v-if="themeForm.status == '1'">开发中</span>
          <span v-if="themeForm.status == '0'">锁定</span>
        </div>
      </el-form-item>
      <el-form-item label="主题状态:" v-if="todo == 'edit'">
        <el-select
          v-model="themeForm.status"
          placeholder="主题状态"
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
      <el-form-item label="主题分类:" v-if="todo != 'edit'">
        <div>{{ themeForm.categoryName }}</div>
      </el-form-item>
      <el-form-item label="主题分类:" v-if="todo == 'edit'">
        <el-cascader
          v-model="themeForm.category"
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

      <el-form-item label="自定义标签:" v-if="todo != 'edit'">
        <div>{{ dynamicTags.join(",") }}</div>
      </el-form-item>
      <el-form-item label="自定义标签:" v-if="todo == 'edit'">
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
      <!-- <el-form-item label="主题配置内容:" v-if="todo != 'edit'">
        <div>{{ themeForm.config }}</div>
      </el-form-item>
      <el-form-item label="主题配置内容:" v-if="todo == 'edit'">
        <el-input v-model="themeForm.config" placeholder="请输入主题配置内容">
        </el-input>
      </el-form-item> -->
      <el-form-item label="创建时间:">
        <div>{{ themeForm.createdTime }}</div>
      </el-form-item>
      <el-form-item label="创建人:">
        <div>{{ themeForm.createdBy }}</div>
      </el-form-item>
      <el-form-item label="最近修改时间:">
        <div>{{ themeForm.updatedTime }}</div>
      </el-form-item>
      <el-form-item label="修改人:">
        <div>{{ themeForm.updatedBy }}</div>
      </el-form-item>
    </el-form>

    <el-row class="btn">
      <el-button @click="cancelFun()" v-if="todo == 'edit'">取消</el-button>
      <el-button @click="cancelFun()" v-if="todo !== 'edit'">返回</el-button>
      <el-button type="primary" v-if="todo == 'edit'" @click="save"
        >保存</el-button
      >
    </el-row>
  </div>
</template>

<script>
import { updateTheme } from "@/apis/resources-components";
import * as API from "@/apis/group";

export default {
  data() {
    return {
      themeForm: {},
      // 项目校验规则
      themeFormRules: {
        name: [{ trigger: "blur", required: true, message: "名称不能为空" }],
      },
      // 自动生成标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      classlist: [],
      groupShow: false,
      disabled: false,
      group: [],
      rows: {},
      statusList: [
        { name: "锁定", id: "0" },
        { name: "开发中", id: "1" },
        { name: "开放", id: "2" },
      ],
    };
  },

  watch: {},
  computed: {
    todo() {
      return this.$route.params.type;
    },
  },
  created() {},
  mounted() {
    if (!this.$route.params.rows) {
      // 表示 为空对象，页面状态为刷新状态  则从localStorage 中获取值
      this.rows = JSON.parse(window.localStorage.getItem("params"));
    } else {
      // 表示为从其他页面跳转过来 获取从父页面传过来的参数
      this.rows = this.$route.params.rows;
      // 将获取到的参数  localStorage 中
      window.localStorage.setItem("params", JSON.stringify(this.rows));
    }
    this.themeForm = this.rows;
    if (this.themeForm.status == "1") {
      this.disabled = false;
    }
    this.dynamicTags = this.rows.tags.split(",");
    console.log(this.$route.params.type);
    this.getGroup();
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
    cancelFun() {
      this.$router.push({
        path: "/resource/themes",
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
        let res = await API.get({ type: "03", main_id: this.rows.category });
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
    //编辑
    save() {
      let params = {
        category_id: this.themeForm.category,
        id: this.rows.id,
        name: this.themeForm.name,
        tags: this.dynamicTags.join(","),
      };
      updateTheme(params).then((res) => {
        if (res.code == 200) {
          this.$messageBox("success");
          this.cancelFun();
        } else {
          this.$messageBox("error");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.theme-create {
  height: 100%;
  overflow: auto;
  scrollbar-gutter: stable;
  background: #fff;
  padding: 20px 0 0 30px;
  .form {
    width: 40%;
  }
  .btn {
    padding-top: 20px;
    border-top: 1px solid #ddd;
    text-align: center;
  }
}
</style>
