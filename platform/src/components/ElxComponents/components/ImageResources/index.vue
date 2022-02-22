<template>
  <div class="image-resources">
    <el-tabs v-model="activeName">
      <el-tab-pane label="图片库" name="image">
        <div class="resource">
          <div class="type">
            <!-- <div
              :class="{ active: imgActiveId === item.id }"
              v-for="item in pictureGroup"
              :key="item.id"
              class="item"
              @click="imgActiveHandle(item)"
              :title="item.name"
            >
              {{ item.name }}
            </div> -->
            <GroupTree
              type="05"
              :isEdit="false"
              @current-change="imgActiveHandle"
            />
          </div>
          <div class="img-list">
            <div
              class="item"
              v-for="item in imgList"
              :key="item.id"
              @click="imgListClick(item)"
              :title="item.name"
            >
              <img
                class="preview"
                :src="'/resource_file/' + item.filePath"
                alt=""
              />
              <span class="title">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="插图库" name="illustration">
        <div class="resource">
          <div class="type">
            <el-input
              class="filter"
              placeholder="输入关键字进行过滤"
              v-model="filterText"
              style="margin-bottom: 10px"
            >
            </el-input>
            <div
              :title="item.name"
              v-for="item in illustrationGroup.filter(
                (data) =>
                  !filterText ||
                  data.name.toLowerCase().includes(filterText.toLowerCase())
              )"
              :key="item.id"
              class="item"
              :class="{ active: illustrationActiveId === item.id }"
              @click="illustrationActiveHandle(item)"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="list">
            <div
              class="item"
              v-for="item in illustrationList"
              :key="item.id"
              @click="illustrationListClick(item)"
              :title="item.name"
            >
              <div
                class="preview"
                :style="
                  'background-image: url(/resource_file/' + item.filePath + ')'
                "
              ></div>
              <span class="title">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import * as groupAPI from "@/apis/group";
import * as resourcesAPI from "@/apis/resources-components";
import GroupTree from "@/components/GroupTree";
export default {
  components: { GroupTree },
  data() {
    return {
      filterText: "",
      activeName: "image",

      imgActiveId: "",
      pictureGroup: [],
      imgList: [],

      illustrationActiveId: "",
      illustrationGroup: [],
      illustrationList: [],
    };
  },
  created() {
    // this.getImgLib();
    this.getIllustrationLib();
  },
  methods: {
    imgListClick(item) {
      this.$emit("success", "/resource_file/" + item.filePath);
    },
    illustrationListClick(item) {
      this.$emit("success", "/resource_file/" + item.filePath);
    },

    imgActiveHandle(item) {
      this.imgActiveId = item.id;
      this.getImg();
    },
    illustrationActiveHandle(item) {
      this.illustrationActiveId = item.id;
      this.getIllustrationList();
    },
    // 获取图片库分类
    async getImgLib() {
      try {
        const res = await groupAPI.get({
          type: "05",
        });
        this.pictureGroup = res.data.list;
      } catch (error) {
        console.error(error);
      }
    },
    async getImg() {
      try {
        const res = await resourcesAPI.getImg({
          page_size: 9999,
          page_index: 1,
          category_id: this.imgActiveId,
          name: "",
          created_start_time: "",
          created_by: "",
          created_end_time: "",
        });
        this.imgList = res.data.list;
      } catch (error) {
        console.error(error);
      }
    },
    // 查询插图库列表
    async getIllustrationLib() {
      try {
        const res = await resourcesAPI.geticonslibsList({
          page_size: 9999,
          page_index: 1,
          name: "",
          created_end_time: "",
          created_start_time: "",
          created_by: "",
          category_id: "",
        });
        if (res.code === 200) {
          this.illustrationGroup = res.data.list;
        }
      } catch (error) {
        console.error(error);
      }
    },
    // 查询插图列表
    async getIllustrationList() {
      try {
        const res = await resourcesAPI.geticonslib({
          lib_id: this.illustrationActiveId,
          page_size: 9999,
          page_index: 1,
        });
        if (res.code === 200) {
          this.illustrationList = res.data.list;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image-resources {
  height: 500px;
  .el-tabs {
    height: 100%;
    ::v-deep .el-tabs__content {
      height: calc(100% - 50px);
      overflow: auto;
    }
  }

  .el-tab-pane {
    height: 100%;
    .resource {
      height: 100%;
      display: flex;
      gap: 10px;
      .type {
        width: 220px;
        overflow: auto;
        .item {
          width: 100%;
          height: 35px;
          line-height: 35px;
          padding: 0 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.3s ease-out;
          color: #606266;
          font-size: 14px;
          &:hover {
            background: rgb(249, 249, 249);
          }
          &.active {
            background: #eaf5ff;
          }
        }
      }
      .list {
        flex: 1;
        overflow: auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        align-content: start;
        gap: 10px;
        .item {
          height: 120px;
          border-radius: 3px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          .preview {
            width: 100%;
            height: 100%;
            background-color: #dfedff;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
          }
          .title {
            font-size: 14px;
            color: #fff;
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            text-shadow: 0 0 6px #000;
            padding: 0 20px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
      .img-list {
        flex: 1;
        overflow: auto;
        display: block;
        column-count: 5;
        gap: 10px;
        .item {
          border-radius: 3px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          break-inside: avoid-column;
          margin-bottom: 10px;
          font-size: 0;
          .preview {
            display: block;
            width: 100%;
            height: auto;
            background-color: #dfedff;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
          }
          .title {
            font-size: 14px;
            color: #fff;
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            text-shadow: 0 0 6px #000;
            padding: 0 20px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
