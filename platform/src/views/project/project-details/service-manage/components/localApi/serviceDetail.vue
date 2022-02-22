//查看详情
<template>
  <div class="source-info">
    <div class="sources-div">
      <div class="info-div">
        <div>
          <div>接口ID：</div>
          <div>{{ apiForm.id }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>发布状态：</div>
          <div>{{ apiForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>接口名称：</div>
          <div>{{ apiForm.name }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>数据源ID：</div>
          <div>{{ apiForm.projectCode }}</div>
        </div>
      </div>

      <div class="info-div">
        <div>
          <div>请求方式：</div>
          <div>{{ apiForm.request_type }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>数据表名称：</div>
          <div>{{ apiForm.table_name }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>请求路径：</div>
          <div>{{ apiForm.request_path }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>创建时间：</div>
          <div>{{ apiForm.created_time }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>接口标签：</div>
          <div>{{ apiForm.tag }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>创建人：</div>
          <div>{{ apiForm.created_by }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>最近修改时间：</div>
          <div>{{ apiForm.updated_time }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>修改人：</div>
          <div>{{ apiForm.updated_by }}</div>
        </div>
      </div>
      <div class="info-div info-divs">
        <div>
          <div>请求参数描述：</div>
          <div>{{ apiForm.request_desc }}</div>
        </div>
      </div>
      <div class="info-div info-divs">
        <div>
          <div>响应内容描述：</div>
          <div>{{ apiForm.response_desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ID", "rows"],
  data() {
    return {
      // 源项目相关信息
      apiForm: {},
    };
  },
  components: {},
  created() {},
  mounted() {
    console.log(this.rows);
    this.apiForm = this.rows;
  },
  watch: {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.source-info {
  background: #fff;
  min-height: 600px;
  overflow: auto;
  scrollbar-gutter: stable;
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
    .info-divs {
      width: 100%;
      > div {
        div:first-child {
          width: 18%;
        }
        div:last-child {
          width: 82%;
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
