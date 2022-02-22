<template>
  <div class="source-info">
    <div class="label-title">
      <div><span>|</span>系统资源状态信息</div>
    </div>
    <div class="sources-div">
      <div class="info-div">
        <div>
          <div>CPU信息：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>CPU型号：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>CPU用户使用占比：</div>
          <div>{{ projectForm.projectName }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>CPU系统使用占比：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>

      <div class="info-div">
        <div>
          <div>CPU空闲使用占比：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>内存信息：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>内存总容量：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>内存已使用：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>内存空闲：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>内存缓存：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>JVM虚拟使用情况：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>JVM运行参数：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>JVN堆大小：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>JVM最大堆大小：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>硬盘使用情况：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>硬盘总容量：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>硬盘已使用：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>硬盘空闲：</div>
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
@import "./index.scss";
</style>
