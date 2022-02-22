<template>
  <div class="components-category-manage">
    <div class="tree">
      <GroupTree type="04" @current-change="treeCurrentChange" />
    </div>
    <div class="content">
      <div class="filter">
        <el-form class="filter-form" :model="filterForm" :inline="true">
          <el-form-item label="组件名称">
            <el-input
              v-model="filterForm.name"
              placeholder="请输入组件名称或关键词"
            ></el-input>
          </el-form-item>
          <el-form-item label="组件状态">
            <el-select v-model="filterForm.state">
              <el-option
                v-for="item in states"
                :value="item.id"
                :label="item.name"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="创建人">
            <el-input
              v-model="filterForm.create_by"
              placeholder="请输入创建人"
            ></el-input>
          </el-form-item> -->

          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="data">
        <div class="data-content">
          <div class="content-wrap">
            <div class="item" v-for="(item, index) in tableData" :key="index">
              <div class="preview">
                <img :src="'/resource_file/' + item.previewUrl" alt="" />
                <!-- <div class="states">
                  <div class="stop" v-if="item.enable == '0'">停用</div>
                  <div class="auto" v-if="item.enable == '1'">启用</div>
                </div> -->
                <img :src="'/resource_file/' + item.previewUrl" alt="" />
              </div>
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <pagination
            :pageSize="pager.pageSize"
            :total="total"
            @change="paginationChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GroupTree from "@/components/GroupTree";
import Pagination from "@/components/Pagination";
import { componentsList } from "@/apis/resources-components";

export default {
  components: { GroupTree, Pagination },
  data() {
    return {
      filterForm: {
        name: "",
        enable: "",
        create_by: "",
      },
      total: 0,
      pager: {
        pageIndex: 1,
        pageSize: 10,
      },
      leftId: "",
      tableData: [],
      states: [
        { name: "全部", id: "" },
        { name: "停用", id: "0" },
        { name: "启用", id: "1" },
      ],
    };
  },
  mounted() {
    this.getListFun(this.leftId);
  },
  methods: {
    treeCurrentChange(data) {
      console.log(data);
      this.leftId = data.id;
      this.getListFun(this.leftId);
    },
    // 分页改变
    paginationChange(data) {
      this.pager = data;
      this.getListFun(this.leftId);
    },
    // 获取列表
    getListFun(id) {
      let params = {
        id: id,
        name: this.filterForm.name,
        enable: this.filterForm.state,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
      };
      componentsList(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    search() {
      this.getListFun(this.leftId);
    },
    reset() {
      this.filterForm = {
        name: "",
        enable: "",
      };
      this.getListFun(this.leftId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
