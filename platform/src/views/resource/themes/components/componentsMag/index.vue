// 组件信息及编辑
<template>
  <div class="com-create">
    <div class="item-left">
      <!-- <GroupTree type="04" @current-change="treeCurrentChange"></GroupTree> -->
      <el-tree
        ref="tree"
        node-key="id"
        :data="datas"
        :props="defaultProps"
        class="tree"
        @node-click="treeClick"
      >
      </el-tree>
    </div>
    <div class="item-right">
      <div>
        <el-form
          :model="themeForm"
          label-width="200px"
          ref="themeForm"
          class="form"
          style="width: 60%"
        >
          <div v-for="(item, index) in optionData" :key="index">
            <el-form-item :label="item.name + ':'">
              <!-- <el-input
                v-model="item.value"
                placeholder="请输入变量内容"
                v-if="item.type == 'number'"
                type="number"
              >
              </el-input>
              <el-input
                v-model="item.value"
                type="color"
                placeholder="请输入变量内容"
                v-if="item.type == 'color'"
              >
              </el-input>
              <el-input
                v-model="item.value"
                type="textarea"
                placeholder="请输入变量内容"
                v-if="item.type == 'textarea'"
              >
              </el-input> -->
              <el-input v-model="item.value" placeholder="请输入变量内容">
              </el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <el-row class="btn">
        <el-button @click="cancelFun()">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
// import GroupTree from "@/components/GroupTree";
import {
  updateThemeOption,
  componentsList,
  getThemeOption,
} from "@/apis/resources-components";
import * as API from "@/apis/group";

export default {
  data() {
    return {
      themeForm: {
        val: "变量值",
      },
      classlist: [],
      leftId: "",
      optionData: [{ name: "变量", type: "", value: "" }],
      group: [],
      defaultProps: {
        label: "name",
        id: "id",
        children: "children",
      },
      comId: "",
      datas: [],
    };
  },
  components: {},
  created() {},

  mounted() {
    this.loadNode();
  },
  watch: {},
  computed: {
    rows() {
      return JSON.parse(window.localStorage.getItem("params"));
    },
  },
  methods: {
    cancelFun() {
      this.$router.push({
        path: "/resource/themes",
      });
    },

    save() {
      if (this.comId) {
        console.log(this.optionData);
        let params = {
          id: this.rows.id,
          option: JSON.stringify(this.optionData),
          cmp_id: this.comId,
        };
        updateThemeOption(params).then((res) => {
          if (res.code == 200) {
            this.$messageBox("success");
            this.getThemeOption(this.comId);
          }
        });
      } else {
        this.$message("请先选择组件");
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

    iteration(arr) {
      let newArr = [];
      if (arr != undefined && arr.length > 0) {
        newArr = arr.map((item) => {
          if (item.children != undefined && item.children.length > 0) {
            this.iteration(item.children);
            componentsList({ id: item.id, name: "", enable: "" }).then(
              (res) => {
                if (res.code == 200) {
                  if (res.data.list.length > 0) {
                    item.children.push(...res.data.list);
                    // this.comId = res.data.list[0].id;
                    // this.getThemeOption(this.comId);
                  }
                }
              }
            );
          } else {
            componentsList({ id: item.id, name: "", enable: "" }).then(
              (res) => {
                if (res.code == 200) {
                  if (res.data.list.length > 0) {
                    this.$set(item, "children", res.data.list);
                    // this.comId = res.data.list[0].id;
                    // this.getThemeOption(this.comId);
                  }
                }
              }
            );
          }
          return item;
        });
      }
      return newArr;
    },
    // 树图
    loadNode() {
      API.get({ type: "04", main_id: "" }).then((res) => {
        const datas = [
          ...this.toTreeData(res.data.list, {
            id: "id",
            pid: "parent_id",
          }),
        ];
        this.iteration(datas);
        this.datas = [...datas];
        console.log(this.datas);
      });
    },
    // 点击树
    treeClick(row) {
      this.comId = row.id;
      this.getThemeOption(row.id);
      console.log(this.optionData);
      this.$forceUpdate();
    },
    //查询主题配置
    getThemeOption(id) {
      let params = {
        id: this.rows.id,
        cmp_id: id,
      };
      getThemeOption(params).then((res) => {
        if (res.code == 200) {
          this.optionData = [];
          if (res.data.config != "" || res.data.themeVar != "") {
            let config = JSON.parse(res.data.config);
            let themeVar = JSON.parse(res.data.themeVar);
            themeVar.forEach((element) => {
              config.forEach((item) => {
                if (item.name == element.name) {
                  element.value = item.value;
                }
              });
            });
            this.optionData = themeVar;
          } else {
            this.optionData = [{ name: "变量", type: "", value: "" }];
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.com-create {
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 100%;
  background: #fff;
  gap: 20px;
  .item-left {
    border: 1px solid #ddd;
    height: 100%;
    padding: 10px;
    overflow: auto;
  }
  .item-right {
    border: 1px solid #ddd;
    height: 100%;
    padding-top: 50px;
    padding-left: 20px;
    > div {
      height: 87%;
      overflow: auto;
    }
  }
}
.btn {
  padding-top: 22px;
  border-top: 1px solid #ddd;
  text-align: center;
}
</style>
