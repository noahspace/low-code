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
          <div>表名称:</div>
          <div>{{ apiForm.table_name }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>数据源名称：</div>
          <div>{{ apiForm.datasource_name }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>数据源ID：</div>
          <div>{{ apiForm.datasource_id }}</div>
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
          <div>表注释：</div>
          <div>{{ apiForm.table_comment }}</div>
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
          <div>创建时间：</div>
          <div>{{ apiForm.created_time }}</div>
        </div>
      </div>
      <!-- <div class="info-div">
        <div>
          <div>请求参数描述：</div>
          <div>{{ apiForm.request_desc }}</div>
        </div>
      </div> -->
      <div class="info-div">
        <div>
          <div>最近修改时间：</div>
          <div>{{ apiForm.updated_time }}</div>
        </div>
      </div>
      <!-- <div class="info-div">
        <div>
          <div>响应内容描述：</div>
          <div>{{ apiForm.response_desc }}</div>
        </div>
      </div> -->
      <div class="info-div">
        <div>
          <div>修改人：</div>
          <div>{{ apiForm.updated_by }}</div>
        </div>
      </div>
      <div class="info-div info-divs">
        <div>
          <div>表字段信息：</div>
          <div id="colums">{{ apiForm.colums }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { default as AnsiUp } from 'ansi_up'
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
    // const txt = this.apiForm.colums;
    // console.log(txt, "rizhi");
    // this.$nextTick(() => {
    //   const ansi_up = new AnsiUp();
    //   const html = ansi_up.ansi_to_html(txt);
    //   const cdiv = document.getElementById("colums");
    //   console.log(cdiv, "页面元素");
    //   cdiv.innerHTML = html;
    // });
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
