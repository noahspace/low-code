<template>
  <div class="icons-details">
    <div class="filter">
      <el-form class="filter-form" :model="filterForm" :inline="true">
        <el-form-item label="组件名称">
          <el-input
            v-model="filterForm.name"
            placeholder="请输入组件名称"
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
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button @click="quit" class="quit" type="text">返回</el-button>
    </div>
    <div class="data">
      <div class="content">
        <div class="item-name">{{ comName }}</div>

        <div class="content-wrap">
          <div class="item" v-for="(item, index) in tableData" :key="index">
            <div class="preview" @click="toDetail(item)">
              <img :src="'/resource_file/' + item.previewUrl" alt="" />
              <div class="states">
                <div class="stop" v-if="item.enable == '0'">停用</div>
                <div class="auto" v-if="item.enable == '1'">启用</div>
              </div>
            </div>
            <div class="more" v-show="status != '0'">
              <el-popover width="100" trigger="hover" popper-class="popBtncom">
                <div
                  class="btn"
                  v-if="item.status !== '0'"
                  @click="clickFun('edit', item)"
                >
                  编辑
                </div>
                <!-- <div class="btn" @click="clickFun('del', item)">删除</div> -->

                <div
                  class="btn"
                  v-if="item.enable == '0'"
                  @click="clickFun('begin', item)"
                >
                  启用
                </div>
                <div
                  class="btn"
                  v-if="item.enable == '1'"
                  @click="clickFun('stop', item)"
                >
                  停用
                </div>

                <i slot="reference" class="el-icon-more"></i>
              </el-popover>
            </div>
            <span class="name">{{ item.name }}</span>
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
    <dialog-wrapper ref="editWrapper">
      <template slot-scope="{ close, params }">
        <Edit :params="params" @close="close" @success="getListFun" />
      </template>
    </dialog-wrapper>
    <dialog-wrapper ref="detailWrapper">
      <template slot-scope="{ params }">
        <detail :params="params" />
      </template>
    </dialog-wrapper>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import Edit from "./components/Edit";
import detail from "./components/detail";

import { component } from "@/apis/resources-components";
export default {
  components: { Pagination, Edit, detail },
  data() {
    return {
      filterForm: {
        name: "",
        state: "",
      },
      total: 0,
      pager: {
        pageIndex: 1,
        pageSize: 10,
      },
      states: [
        { name: "全部", id: "" },
        { name: "停用", id: "0" },
        { name: "启用", id: "1" },
      ],
      tableData: [],
    };
  },
  computed: {
    comName() {
      return this.$route.query.name;
    },
    status() {
      return this.$route.query.status;
    },
  },
  mounted() {
    this.getListFun();
  },
  methods: {
    // 分页改变
    paginationChange(data) {
      this.pager = data;
      this.getListFun();
    },
    // 获取主题列表
    getListFun() {
      let params = {
        id: this.$route.params.id,
        name: this.filterForm.name,
        enable: this.filterForm.state,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
      };
      component(params).then((res) => {
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
        state: "",
      };
      this.getListFun();
    },
    quit() {
      this.$router.push({ path: "/resource/components/resource" });
    },
    clickFun(type, row) {
      if (type == "edit") {
        this.$refs["editWrapper"].show(
          {
            title: "编辑组件",
            width: "500px",
          },
          {
            ID: this.leftId,
            params: row,
          }
        );
      } else if (type == "nolock") {
        this.types = "nolock";
        this.$refs["delPic"].show(
          {
            title: "解锁",
            width: "600px",
          },
          {
            ID: " Id",
          }
        );
      } else if (type == "lock") {
        this.$refs["lock"].show(
          {
            title: "温馨提示",
            width: "600px",
          },
          {
            ID: " Id",
          }
        );
      }
    },
    toDetail(row) {
      this.$refs["detailWrapper"].show(
        {
          title: "组件详情",
          width: "1000px",
        },
        {
          params: row,
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
.popBtncom {
  min-width: 100px;
  .btn {
    text-align: center;
    cursor: pointer;
    color: #3694f3;
    line-height: 30px;
  }
}
</style>
