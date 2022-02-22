<template>
  <div class="icons-details">
    <div class="filter">
      <el-form class="filter-form" :model="filterForm" :inline="true">
        <el-form-item label="插图名称">
          <el-input
            v-model="filterForm.name"
            placeholder="请输入插图名称或关键词"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button @click="quit" class="quit" type="text">返回</el-button>
    </div>
    <div class="data">
      <div class="content">
        <div class="content-wrap">
          <div
            class="item"
            @contextmenu.prevent="contextMenuHandle($event, item)"
            v-for="(item, index) in tableData"
            :key="index"
          >
            <div class="preview">
              <el-image
                style="width: 100%; height: 100%"
                fit="contain"
                :src="'/resource_file/' + item.filePath"
                :preview-src-list="['/resource_file/' + item.filePath]"
              >
              </el-image>
            </div>

            <span class="icon-name">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="pagination">
        <pagination />
      </div>
    </div>
    <dialog-wrapper ref="editWrapper">
      <template slot-scope="{ close, params }">
        <Edit :params="params" @close="close" @success="getListFun()" />
      </template>
    </dialog-wrapper>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import Edit from "./components/Edit";
import { geticonslib } from "@/apis/resources-components";

export default {
  components: { Pagination, Edit },
  data() {
    return {
      filterForm: {
        name: "",
      },
      pager: {
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: [],
      total: 0,
      rows: {},
    };
  },
  computed: {},
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
    this.getListFun();
  },
  methods: {
    quit() {
      this.$router.push({ path: "/resource/illustrations/list" });
    },
    contextMenuHandle(event, row) {
      if (this.rows.status != "0") {
        this.$contextmenu({
          items: [
            {
              label: "编辑",
              icon: "",
              onClick: () => {
                this.$refs["editWrapper"].show(
                  {
                    title: "编辑插图信息",
                    width: "500px",
                  },
                  {
                    params: {
                      id: row.id,
                      name: row.name,
                      tags: row.tags.split(","),
                    },
                    close: () => {
                      this.$refs["editWrapper"].visible = false;
                    },
                    success: (data) => {
                      console.log(data);
                      this.$refs["editWrapper"].visible = false;
                    },
                  }
                );
              },
            },
          ],
          event,
          zIndex: 10000,
          minWidth: 60,
        });
      }
    },

    // 分页改变
    paginationChange(data) {
      console.log(data);
      this.pager = data;
      this.getListFun();
    },
    // 获取列表
    getListFun() {
      console.log(this.rows);
      let params = {
        lib_id: this.rows.id,
        name: this.filterForm.name,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
      };
      geticonslib(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    search() {
      this.getListFun();
    },
    reset() {
      this.filterForm = {
        name: "",
      };
      this.getListFun();
    },
  },
  beforeDestroy() {
    window.localStorage.removeItem("params");
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
