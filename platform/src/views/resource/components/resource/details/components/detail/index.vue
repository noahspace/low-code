<template>
  <div class="source-info">
    <div class="sources-div">
      <div class="info-div">
        <div>
          <div>组件ID：</div>
          <div>{{ dataForm.id }}</div>
        </div>
      </div>

      <div class="info-div">
        <div>
          <div>组件名称：</div>
          <div>{{ dataForm.name }}</div>
        </div>
      </div>

      <div class="info-div">
        <div>
          <div>组件标识：</div>
          <div>{{ dataForm.description }}</div>
        </div>
      </div>

      <div class="info-div">
        <div>
          <div>组件状态：</div>
          <div v-if="dataForm.enable == '0'">停用</div>
          <div v-if="dataForm.enable == '1'">启用</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>组件分类：</div>
          <div>{{ dataForm.category_name }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>标签：</div>
          <div>{{ dataForm.tags }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>附件id：</div>
          <div>{{ dataForm.defaultautocommit }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>附件平台访问路径：</div>
          <div>{{ dataForm.username }}</div>
        </div>
      </div>

      <div class="info-div">
        <div>
          <div>创建时间：</div>
          <div>{{ dataForm.createdTime }}</div>
        </div>
      </div>

      <div class="info-div">
        <div>
          <div>创建人：</div>
          <div>{{ dataForm.createdBy }}</div>
        </div>
      </div>

      <div class="info-div">
        <div>
          <div>最近修改时间：</div>
          <div>{{ dataForm.updatedTime }}</div>
        </div>
      </div>

      <div class="info-div">
        <div>
          <div>修改人：</div>
          <div>{{ dataForm.updatedBy }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["params"],
  data() {
    return {
      // 源项目相关信息
      dataForm: {},
    };
  },
  components: {},
  created() {},
  mounted() {
    if (Object.keys(this.params).length !== 0) {
      console.log(this.params);
      this.$nextTick(function () {
        this.dataForm = this.params;
      });
    }
  },
  watch: {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.source-info {
  background: #fff;
  height: 100%;
  padding-left: 20px;
  .sources-div {
    display: flex;
    flex-wrap: wrap;
    padding-left: 10px;
    .info-div {
      width: 50%;
      > div {
        > div {
          line-height: 40px;
        }
        display: flex;
        div:first-child {
          width: 35%;
          color: #666666;
        }
        div:last-child {
          width: 65%;
        }
      }
    }
  }
  .dataBtn {
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }
}
</style>
