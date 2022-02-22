<template>
  <div class="images-manage">
    <div class="tree">
      <GroupTree type="05" @current-change="treeCurrentChange" />
    </div>
    <div class="content">
      <div class="filter">
        <el-form class="filter-form" :model="filterForm" :inline="true">
          <el-form-item label="图片名称">
            <el-input
              v-model="filterForm.name"
              placeholder="请输入图片名称或关键词"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input
              v-model="filterForm.created_by"
              placeholder="请输入创建人"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="filterForm.created_time_begin"
              type="date"
              placeholder="选择开始日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>至</el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="filterForm.created_time_end"
              type="date"
              placeholder="选择结束日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="尺寸">
            <el-select v-model="filterForm.size">
              <el-option
                v-for="item in sizes"
                :label="item.value"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="data">
        <div class="tools">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="clickFun('add')"
            >新增</el-button
          >
        </div>
        <div class="content">
          <ul class="content-wrap">
            <li class="item" v-for="(item, index) in tableData" :key="index">
              <div class="info" @click="clickPic(item)">
                <div>
                  <img
                    :src="'/resource_file/' + item.filePath"
                    alt=""
                    :onerror="errorImage"
                  />
                  <div class="more">
                    <el-popover
                      :width="110"
                      trigger="hover"
                      popper-class="popBtns"
                    >
                      <div
                        class="btn"
                        v-if="item.status !== '0'"
                        @click="clickFun('edit', item)"
                      >
                        编辑
                      </div>
                      <div
                        class="btn"
                        v-if="item.status !== '0'"
                        @click="clickFun('del', item)"
                      >
                        删除
                      </div>
                      <div
                        class="btn"
                        v-if="item.status == '0'"
                        @click="clickFun('nolock', item)"
                      >
                        解锁
                      </div>
                      <div
                        class="btn"
                        v-if="item.status !== '0'"
                        @click="clickFun('lock', item)"
                      >
                        锁定
                      </div>
                      <i slot="reference" class="el-icon-more"></i>
                    </el-popover>
                  </div>
                </div>
                <div class="title">{{ item.name }}</div>
                <div class="subscript" v-if="item.status == '0'">
                  <i class="el-icon-lock"></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="pagination">
          <pagination
            :pageSize="pager.pageSize"
            :total="total"
            @change="paginationChange"
          />
        </div>
      </div>
      <!-- 图片预览 -->
      <div>
        <el-dialog
          :visible.sync="picshow"
          width="50%"
          :show-close="false"
          custom-class="picDialog"
        >
          <div class="img-div">
            <div>
              <img
                :src="'/resource_file/' + picData.filePath"
                alt=""
                :onerror="errorImage"
              />
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <div class="title">
              {{ picData.name }}
              <span v-if="picData.status == '1'">开发中</span>
              <span v-if="picData.status == '0'">锁定</span>
              <span v-if="picData.status == '2'">开放</span>
            </div>
            <div class="pic-info">
              <div>
                <span>图片id:</span><span>{{ picData.id }}</span>
              </div>
              <div>
                <span>分类:</span><span>{{ picData.categoryName }}</span>
              </div>
              <div>
                <span>分辨率:</span
                ><span>{{ picData.wide }}*{{ picData.high }}</span>
              </div>
              <div>
                <span>标签:</span><span>{{ picData.tags }}</span>
              </div>
              <div>
                <span>创建人:</span><span>{{ picData.createdBy }}</span>
              </div>
              <div>
                <span>创建时间:</span><span>{{ picData.createdTime }}</span>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
    <dialog-wrapper ref="editPic">
      <template slot-scope="{ ID, rows }">
        <editPic
          :ID="ID"
          @close="close"
          :rows="rows"
          @success="getImgListFun(leftId)"
        />
      </template>
    </dialog-wrapper>
    <dialog-wrapper ref="nolock">
      <template slot-scope="{ ID, type }">
        <nolock :ID="ID" :type="type" @close="closeFun" />
      </template>
    </dialog-wrapper>
    <dialog-wrapper ref="lock">
      <template slot-scope="{ ID, type }">
        <lock @close="closeFun" :ID="ID" :type="type" />
      </template>
    </dialog-wrapper>
  </div>
</template>

<script>
import GroupTree from "@/components/GroupTree";
import Pagination from "@/components/Pagination";
import editPic from "./components/editPic";
import lock from "../resource-components/lock";
import nolock from "../resource-components/nolock";
import { getImg, delImg } from "@/apis/resources-components";

export default {
  components: { GroupTree, Pagination, editPic, nolock, lock },
  data() {
    return {
      filterForm: {
        created_by: "",
        created_time_begin: "",
        created_time_end: "",
        name: "",
        resolution: "",
      },
      pager: {
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
      types: "",
      states: 0,
      tableData: [],
      picshow: false,
      leftId: "",
      sizes: [
        { value: "全部" },
        { value: "1920x1080" },
        { value: "1680x1050" },
        { value: "1440x900" },
        { value: "1090x1080" },
      ],
      uploadForm: new FormData(),
      picData: {},
      nameShow: false,
      errorImage: 'this.src="' + require("./imgs/default.png") + '"',
    };
  },
  computed: {},
  mounted() {
    this.getImgListFun(this.leftId);
  },
  methods: {
    treeCurrentChange(data) {
      console.log(data);
      this.leftId = data.id;
      this.getImgListFun(this.leftId);
    },
    // 分页改变
    paginationChange(data) {
      this.pager = data;
      this.getImgListFun(this.leftId);
    },

    clickFun(type, row) {
      this.uploadForm = new FormData();
      if (type == "del") {
        // this.types = "del";
        // this.$refs["delPic"].show(
        //   { title: "删除图片", width: "600px" },
        //   { ID: " Id" }
        // );
        this.$confirm("确认删除该图片吗, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.uploadForm.append("id", row.id);
            delImg(this.uploadForm).then((res) => {
              if (res.code == 200) {
                this.$messageBox("success");
                this.getImgListFun(this.leftId);
              } else {
                this.$messageBox("error");
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else if (type == "edit") {
        this.$refs["editPic"].show(
          { title: "编辑图片", width: "600px" },
          { ID: this.leftId, rows: row }
        );
      } else if (type == "nolock") {
        this.types = "nolock";
        this.$refs["nolock"].show(
          { title: "解锁图片", width: "600px" },
          { ID: row.id, type: "图片" }
        );
      } else if (type == "lock") {
        this.$refs["lock"].show(
          { title: "温馨提示", width: "600px" },
          { ID: row.id, type: "图片" }
        );
      } else if (type == "add") {
        if (this.leftId) {
          this.$refs["editPic"].show(
            { title: "新增图片", width: "600px" },
            { ID: this.leftId }
          );
        } else {
          this.$message({
            type: "info",
            message: "请选择图片分组",
          });
        }
      }
    },

    close() {
      this.$refs["editPic"].close();
      this.$refs["lock"].close();
    },
    clickPic(item) {
      this.picshow = true;
      this.picData = item;
    },
    closeFun() {
      this.$refs["nolock"].close();
      this.$refs["lock"].close();
      this.getImgListFun(this.leftId);
    },
    // 获取主题列表
    getImgListFun(id) {
      let params = {
        category_id: id,
        name: this.filterForm.name,
        created_end_time: this.filterForm.created_time_end,
        created_start_time: this.filterForm.created_time_begin,
        page_index: this.pager.pageIndex,
        page_size: this.pager.pageSize,
        created_by: this.filterForm.created_by,
        resolution: this.filterForm.size,
      };
      getImg(params).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }
      });
    },
    search() {
      this.getImgListFun(this.leftId);
    },
    reset() {
      this.filterForm = {
        created_by: "",
        created_time_begin: "",
        created_time_end: "",
        name: "",
      };
      this.getImgListFun(this.leftId);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
<style lang="scss">
.popBtns {
  min-width: 100px;
  background: rgba($color: #000, $alpha: 0.3);
  border: none;
  .btn {
    text-align: center;
    cursor: pointer;
    color: #fff;
    line-height: 30px;
  }
}
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: transparent;
}
.el-popper[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: transparent;
}
.picDialog {
  .el-dialog__header {
    padding: 0;
    border: none;
  }
  .el-dialog__body {
    padding-bottom: 0;
  }
  .img-div {
    min-height: 200px;
    text-align: center;
    > div {
      width: 100%;
      height: 100%;
    }
    img {
      display: inline-block;
      max-width: 100%;
      max-height: 500px;
    }
  }
  .dialog-footer {
    text-align: left;
    padding-top: 0;
    .title {
      font-size: 16px;
      margin: 10px 0;
      span {
        display: inline-block;
        width: 64px;
        height: 24px;
        background: #eaf5ff;
        border-radius: 4px;
        text-align: center;
        color: #1890fe;
        margin-left: 5px;
        font-size: 12px;
        line-height: 24px;
      }
    }
    .pic-info {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > div {
        min-width: 30%;
        color: #999;
        span:first-child {
          display: inline-block;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
