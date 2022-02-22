<template>
  <div class="source-info">
    <div class="sources-div">
      <div class="info-div">
        <div>
          <div>数据源ID：</div>
          <div>{{ dataForm.id }}</div>
        </div>
      </div>
      <!-- <div class="info-div">
        <div>
          <div>最小空闲连接数：</div>
          <div>{{ dataForm.minidle }}</div>
        </div>
      </div> -->
      <div class="info-div">
        <div>
          <div>数据源名称：</div>
          <div>{{ dataForm.name }}</div>
        </div>
      </div>
      <!-- <div class="info-div">
        <div>
          <div>查询超时时间：</div>
          <div>{{ dataForm.querytimeout }}</div>
        </div>
      </div> -->

      <div class="info-div">
        <div>
          <div>描述：</div>
          <div>{{ dataForm.description }}</div>
        </div>
      </div>
      <!-- <div class="info-div">
        <div>
          <div>事务查询超时时间：</div>
          <div>{{ dataForm.transactionquerytimeout }}</div>
        </div>
      </div> -->
      <div class="info-div">
        <div>
          <div>数据库IP：</div>
          <div>{{ dataForm.ip }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>登录超时时间：</div>
          <div>{{ dataForm.logintimeout }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>数据库端口：</div>
          <div>{{ dataForm.port }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>默认autocommit设置：</div>
          <div>{{ dataForm.defaultautocommit }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>用户名：</div>
          <div>{{ dataForm.username }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>默认只读设置：</div>
          <div>{{ dataForm.defaultreadonly }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>密码：</div>
          <div>{{ dataForm.password }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>默认事务隔离：</div>
          <div>{{ dataForm.defaulttransactionisolation }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>数据库名：</div>
          <div>{{ dataForm.instance }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>创建时间：</div>
          <div>{{ dataForm.created_time }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>驱动类名：</div>
          <div>{{ dataForm.driver_class_name }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>创建人：</div>
          <div>{{ dataForm.created_by }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>URL连接：</div>
          <div>{{ dataForm.url }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>最近修改时间：</div>
          <div>{{ dataForm.updated_time }}</div>
        </div>
      </div>
      <!-- <div class="info-div">
        <div>
          <div>初始化连接大小：</div>
          <div>{{ dataForm.initialsize }}</div>
        </div>
      </div> -->
      <div class="info-div">
        <div>
          <div>修改人：</div>
          <div>{{ dataForm.updated_by }}</div>
        </div>
      </div>
    </div>
    <div class="dataBtn">
      <el-button type="primary">数据源检测</el-button>
      <el-button type="primary" @click="dataFun()">数据字典</el-button>
    </div>
  </div>
</template>

<script>
import { dataTest } from "@/apis/project-data-source";

export default {
  props: ["projectId", "row"],
  data() {
    return {
      // 源项目相关信息
      dataForm: {
        dataRunType: "",
        dataCode: "测试",
        dataName: "",
        dataDesc: "",
        dataClass: "",
        dataCompany: "",
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
  mounted() {
    if (Object.keys(this.row).length !== 0) {
      this.disableds = true;
      this.$nextTick(function () {
        this.dataForm = this.row;
      });
    }
  },
  watch: {},
  computed: {},
  methods: {
    dataFun() {
      let params = {
        id: this.row.id,
      };
      dataTest(params).then((res) => {
        // const src = window.URL.createObjectURL(new Blob([res]));
        // window.open(src);
        const content = res;

        const blob = new Blob([content], { type: "application/vnd.ms-excel" });

        if ("download" in document.createElement("a")) {
          const elink = document.createElement("a");

          elink.download = "databasedict.html";

          elink.style.display = "none";

          elink.href = URL.createObjectURL(blob);

          document.body.appendChild(elink);

          elink.click();

          URL.revokeObjectURL(elink.href);

          document.body.removeChild(elink);
          this.$messageBox("success");
        }
      });
    },
  },
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
