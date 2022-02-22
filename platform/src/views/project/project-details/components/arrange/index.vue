//项目部署弹窗
<template>
  <div class="arrange-create">
    <el-steps :active="2" align-center>
      <el-step title="生成项目"></el-step>
      <el-step title="构建项目"></el-step>
      <el-step title="部署项目"></el-step>
    </el-steps>
    <div class="state">项目上线等待中...</div>
    <div class="txt">
      <el-input
        v-model="projectDesc"
        placeholder="部署日志"
        type="textarea"
        rows="10"
        style="width: 80%"
      >
      </el-input>
    </div>
  </div>
</template>

<script>
import { projectProgress } from "@/apis/project-list";
export default {
  props: ["projectId", "type"],
  data() {
    return {
      projectDesc: "",
    };
  },
  components: {},
  created() {},
  mounted() {
    this.getProgress();
  },
  watch: {},
  computed: {},
  methods: {
    //项目进度查询
    getProgress() {
      projectProgress({
        id: this.projectId,
      }).then((res) => {
        let data = res.list;
        console.log(data);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.arrange-create {
  .state {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    margin: 20px 0;
    text-align: center;
    color: #1985f1;
  }
  .txt {
    width: 100%;
    text-align: center;
  }
}
</style>
