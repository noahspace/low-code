//查看详情
<template>
  <div class="source-info">
    <div class="sources-div">
      <div class="info-div">
        <div>
          <div>接口ID：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>发布状态：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>接口名称：</div>
          <div>{{ projectForm.projectName }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>数据源ID：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>

      <div class="info-div">
        <div>
          <div>请求方式：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>数据表名称：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>请求路径：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>创建时间：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>接口标签：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>创建人：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>请求参数描述：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>最近修改时间：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>响应内容描述：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>修改人：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 源项目相关信息
      projectForm: {
        projectRunType: "",
        projectCode: "测试",
        projectName: "",
        projectDesc: "",
        projectClass: "",
        projectCompany: "",
        department: "",
        specialty: "",
        area: "",
        address: "",
        template: "华雁低代码平台",
        version: "",
        charger: "",
        phone: "",
        chargerDept: "",
        chargeEmail: "",
        themeStyle: "",
        themeStyleList: "",
        plan: "",
        imgurl: "aaa",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  components: {},
  created() {},
  mounted() {},
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
