// 服务器查看
<template>
  <div class="server-create">
    <el-form
      :model="serverForm"
      label-width="130px"
      :rules="serverFormRules"
      ref="serverForm"
      class="form"
    >
      <el-form-item label="服务器ID:">
        <div>{{ serverForm.serverId }}</div>
      </el-form-item>
      <el-form-item label="服务器名称:">
        <div>{{ serverForm.serverName }}</div>
      </el-form-item>
      <el-form-item label="服务器状态:">
        <div v-if="serverForm.test == '1'">已进行连通性测试</div>
        <div v-if="serverForm.test == '0'">未进行连通性测试</div>
      </el-form-item>
      <el-form-item label="服务器IP:">
        <div>{{ serverForm.serverIp }}</div>
      </el-form-item>
      <el-form-item label="服务器端口号:">
        <div>{{ serverForm.serverPort }}</div>
      </el-form-item>
      <el-form-item label="服务器运行环境:">
        <div>{{ serverForm.runningEnv }}</div>
      </el-form-item>
      <el-form-item label="登录用户名:">
        <div>{{ serverForm.username }}</div>
      </el-form-item>
      <el-form-item label="创建时间:">
        <div>{{ serverForm.createdTime }}</div>
      </el-form-item>
      <el-form-item label="创建人:">
        <div>{{ serverForm.createdBy }}</div>
      </el-form-item>
      <el-form-item label="最近修改时间:">
        <div>{{ serverForm.updatedTime }}</div>
      </el-form-item>
      <el-form-item label="修改人:">
        <div>{{ serverForm.updatedBy }}</div>
      </el-form-item>
    </el-form>

    <el-row class="btn">
      <el-button @click="cancelFun()">返回</el-button>
      <el-button
        type="primary"
        @click="testFun"
        :disabled="serverForm.test == '1' ? true : false"
        >服务器连通性测试</el-button
      >
    </el-row>
  </div>
</template>

<script>
import { infoServer, connectServer } from "@/apis/resources-components";

export default {
  data() {
    return {
      serverForm: {
        name: "服务器名称",
        server_id: "4333333333333333",
      },
      // 项目校验规则
      serverFormRules: {
        name: [{ trigger: "blur", required: true, message: "名称不能为空" }],
      },
      // 自动生成标签
      dynamicTags: [],

      classlist: [],
    };
  },
  components: {},
  created() {},
  mounted() {
    this.getServerinfo();
  },
  watch: {},
  computed: {
    //  ID
    serverId() {
      return this.$route.params.id;
    },
    todo() {
      return this.$route.query.type;
    },
  },
  methods: {
    cancelFun() {
      this.$router.push({
        path: "/resource/servers",
      });
    },
    testFun() {
      connectServer({
        server_id: this.serverId,
        server_ip: this.serverForm.serverIp,
      }).then((res) => {
        if (res.code == 200) {
          this.$messageBox("success");
          this.cancelFun();
        } else {
          this.$messageBox("error");
        }
      });
    },
    getServerinfo() {
      infoServer({
        server_id: this.serverId,
      }).then((res) => {
        if (res.code == 200) {
          this.serverForm = res.data;
        } else {
          this.$messageBox("error");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.server-create {
  height: 100%;
  overflow: auto;
  background: #fff;
  padding-top: 20px;
  padding-left: 30px;
  .form {
    width: 40%;
  }
  .btn {
    padding-top: 20px;
    border-top: 1px solid #ddd;
    text-align: center;
  }
}
</style>
