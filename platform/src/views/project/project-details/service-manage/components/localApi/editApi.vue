//编辑接口模型
<template>
  <div class="api-div">
    <div class="api-div-top">
      <div>
        <bin-tree-org
          :data="data"
          :horizontal="horizontal"
          :collapsable="collapsable"
          :label-style="style"
          @on-expand="onExpand"
          @on-node-click="onNodeClick"
        ></bin-tree-org>
      </div>
      <div class="drawer" v-if="isshow">
        <div class="setbox">
          <div class="header">
            <i class="el-icon-close" @click="close"></i>
          </div>
          <el-form class="filter-form" :model="filterForm" label-width="100px">
            <el-form-item label-width="0px">
              <el-input
                v-model="filterForm.if"
                placeholder="判断语句"
                style="width: 70%"
              ></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="块名称：">
              <el-input
                v-model="filterForm.name"
                placeholder="用户查询"
                style="width: 80%"
              ></el-input>
            </el-form-item>
            <el-form-item label="块说明：">
              <el-input
                v-model="filterForm.name"
                placeholder="用户鉴权查询用户信息"
                style="width: 80%"
              ></el-input>
            </el-form-item>
            <el-form-item label="数据库类型:">
              <el-select
                v-model="filterForm.projectRunType"
                placeholder="数据库类型"
                clearable
                filterable
                style="width: 80%"
              >
                <el-option
                  v-for="item in typeList"
                  :label="item.name"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据源ID：">
              <el-input
                v-model="filterForm.name"
                placeholder="数据源ID"
                style="width: 80%"
              ></el-input>
            </el-form-item>
            <el-form-item label="SQL：">
              <el-input
                v-model="filterForm.name"
                placeholder="SQL"
                style="width: 80%"
              ></el-input>
            </el-form-item>
            <el-form-item label="输入模型：">
              <div class="r-item">字段列表</div>
              <div class="r-item">
                <span v-for="(item, index) in inmodel" :key="index">
                  <el-input v-model="item.name" style="width: 30%"></el-input>
                </span>
                <el-button type="primary" plain @click="addInmodel"
                  >添加一项</el-button
                >
              </div>
            </el-form-item>
            <el-form-item label="输出模型:">
              <el-select
                v-model="filterForm.projectRunType"
                placeholder="对象"
                clearable
                filterable
                style="width: 80%"
              >
                <el-option
                  v-for="item in typeList"
                  :label="item.name"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
              <div class="r-item">字段列表</div>
              <div class="r-item">
                <span v-for="(item, index) in inmodel" :key="index">
                  <el-input v-model="item.name" style="width: 30%"></el-input>
                </span>
                <el-button type="primary" plain @click="addInmodel"
                  >添加字段</el-button
                >
              </div>
            </el-form-item>
            <el-form-item label="业务处理脚本:">
              <el-input
                v-model="filterForm.projectDesc"
                placeholder="请填写业务处理脚本"
                type="textarea"
                rows="4"
                style="width: 80%"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="业务输出模型:">
              <el-select
                v-model="filterForm.projectRunType"
                placeholder="数据"
                clearable
                filterable
                style="width: 80%"
              >
                <el-option
                  v-for="item in typeList"
                  :label="item.name"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <el-row class="btn">
      <el-button @click="cancelFun()">取消</el-button>
      <el-button type="primary">保存</el-button>
      <el-button type="primary">发布</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterForm: {
        dataName: "",
        apiName: "",
        tabName: "",
      },
      isshow: true,
      typeList: [],
      inmodel: [{ name: "admin" }, { name: "pass" }],
      data: {
        id: 0,
        label: "xxx科技有限公司",
        children: [
          {
            id: 2,
            label: "产品研发部",
            style: { color: "#fff", backgroundColor: "#108ffe" },
            children: [
              {
                id: 5,
                label: "研发-前端",
              },
              {
                id: 6,
                label: "研发-后端",
              },
              {
                id: 9,
                label: "UI设计",
              },
              {
                id: 10,
                label: "产品经理",
              },
            ],
          },
          {
            id: 3,
            label: "销售部",
            children: [
              {
                id: 7,
                label: "销售一部",
              },
              {
                id: 8,
                label: "销售二部",
              },
            ],
          },
          {
            id: 4,
            label: "财务部",
          },
          {
            id: 9,
            label: "HR人事",
          },
        ],
      },
      horizontal: false,
      collapsable: true,
      expandAll: true,
      style: {
        background: "#fff",
        color: "#5e6d82",
      },
    };
  },
  components: {},
  created() {},
  mounted() {
    this.toggleExpand(this.data, this.expandAll);
  },
  watch: {},
  computed: {},
  methods: {
    toDrawer() {
      this.isshow = true;
    },
    close() {
      this.isshow = false;
    },
    cancelFun() {
      this.$emit("close");
    },
    addInmodel() {
      this.inmodel = [...this.inmodel, { name: "" }];
    },
    onExpand(e, data) {
      e.stopPropagation();
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    onNodeClick(e, data) {
      this.$message(data.label);
    },
    collapse(list) {
      list.forEach((child) => {
        if (child.expand) {
          child.expand = false;
        }
        child.children && this.collapse(child.children);
      });
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      if (Array.isArray(data)) {
        data.forEach((item) => {
          this.$set(item, "expand", val);
          if (item.children) {
            this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          this.toggleExpand(data.children, val);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.api-div {
  .api-div-top {
    position: relative;
    display: flex;
    min-height: 750px;
    justify-content: space-between;
    background: #fff;
  }
  .btn {
    margin-top: 20px;
    padding: 20px 0;
    border-top: 1px solid #ddd;
    text-align: center;
    background: #fff;
  }
  .drawer {
    height: 100%;
    .setbox {
      text-align: center;
      padding: 0 30px;
      position: absolute;
      z-index: 1000;
      top: 0px;
      bottom: 0px;
      width: 30%;
      height: 100%;
      overflow: auto;
      scrollbar-gutter: stable;
      border-left: 1px solid #ddd;
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
      right: 0;
      .header {
        width: 100%;
        margin: 20px 0;
        text-align: right;
        i {
          cursor: pointer;
          font-size: 20px;
        }
      }
      .r-item {
        text-align: left;
        padding-left: 28px;
      }
    }
  }
}
</style>
