<template>
  <div class="project-page-create">
    <div class="list">
      <div class="item" @click="openWork(null)">
        <div class="preview">
          <i class="el-icon-plus"></i>
          <span class="empty-title">空白页面</span>
        </div>
        <span class="title">空白页面</span>
      </div>
      <div
        class="item"
        @click="openWork(item.layoutConfig)"
        v-for="item in layoutList"
        :key="item.id"
      >
        <div
          class="preview"
          :style="{
            backgroundImage: `url(/resource_file/${item.previewUrl})`,
          }"
        ></div>
        <span class="title">{{ item.name }}</span>
      </div>
    </div>
    <div class="pagination">
      <pagination :pageSize="10" :total="total" @change="paginationChange" />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { layouts } from "@/apis/resources-components";
export default {
  components: { Pagination },
  data() {
    return {
      total: 0,
      pager: {
        pageIndex: 1,
        pageSize: 10,
      },
      layoutList: [],
    };
  },
  created() {
    this.getListFun();
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
  methods: {
    openWork(config) {
      this.$store.commit("currentLayoutConfig", config);
      this.$router.push({
        path: "/ui-workbench/page/" + this.pageId + "/" + this.projectId,
      });
    },
    // 分页改变
    paginationChange(data) {
      this.pager = data;
      this.getListFun();
    },
    getListFun() {
      let params = {
        category_id: "",
        name: "",
        created_end_time: "",
        created_start_time: "",
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
        created_by: "",
      };
      layouts(params).then((res) => {
        if (res.code == 200) {
          this.layoutList = res.data.list;
          this.total = res.data.total;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.project-page-create {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: rgb(245, 245, 245);
  > .list {
    height: calc(100% - 50px);
    overflow: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    align-content: flex-start;
    gap: 20px;
    padding: 20px;
    .item {
      height: 230px;
      .preview {
        width: 100%;
        height: 200px;
        border: 1px solid rgb(229, 229, 229);
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: rgb(58, 133, 243);
        cursor: pointer;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        .el-icon-plus {
          font-size: 26px;
          margin-bottom: 6px;
        }
      }
      .title {
        display: flex;
        height: 30px;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .pagination {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
