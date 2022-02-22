// 新增编辑服务器
<template>
  <div class="server-create">
    <el-form
      :model="serverForm"
      label-width="130px"
      :rules="serverFormRules"
      ref="serverForm"
      class="form"
    >
      <el-form-item label="服务器名称:" prop="server_name">
        <el-input
          v-model="serverForm.server_name"
          placeholder="请输入服务器名称"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="服务器ip地址:" prop="server_ip">
        <el-input
          v-model="serverForm.server_ip"
          placeholder="请输入服务器ip地址"
          :disabled="testVal == '1' ? true : false"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="服务器端口:" prop="server_port">
        <el-input
          v-model="serverForm.server_port"
          placeholder="请输入服务器端口"
          :disabled="testVal == '1' ? true : false"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="登录用户名:" prop="username">
        <el-input
          v-model="serverForm.username"
          placeholder="请输入登录用户名"
          disabled
        >
        </el-input>
      </el-form-item>
      <el-form-item label="登录密码:" prop="password">
        <el-input
          v-model="serverForm.password"
          placeholder="请输入登录密码"
          :disabled="testVal == '1' ? true : false"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="服务器运行模式:" prop="running_mode">
        <el-select
          v-model="serverForm.running_mode"
          placeholder="请选择服务器运行模式"
          clearable
          filterable
          style="width: 100%"
          :disabled="testVal == '1' ? true : false"
        >
          <el-option
            v-for="item in running_mode_data"
            :label="item.name"
            :value="item.code"
            :key="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务器运行环境:" prop="running_env">
        <el-select
          v-model="serverForm.running_env"
          placeholder="请选择服务器运行环境"
          clearable
          filterable
          style="width: 100%"
          :disabled="testVal == '1' ? true : false"
        >
          <el-option
            v-for="item in running_env_data"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="选择项目:" prop="project">
        <el-select
          v-model="serverForm.project"
          placeholder="请选择选择项目"
          clearable
          filterable
          style="width: 100%"
        >
          <el-option
            v-for="item in projectList"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="服务器描述:" prop="server_desc">
        <el-input
          v-model="serverForm.server_desc"
          type="textarea"
          rows="4"
          placeholder="请输入服务器描述"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button
        class="btns"
        @click="testFun"
        :disabled="testVal == '1' ? true : false"
        >服务器连通性测试</el-button
      >
    </el-row>
    <el-row class="btn">
      <el-button @click="cancelFun()">取消</el-button>
      <el-button type="primary" @click="success" v-if="pid">保存</el-button>
      <el-button type="primary" @click="success" v-if="!pid">确定</el-button>
    </el-row>
  </div>
</template>

<script>
import { runType } from "@/apis/dictionary";
import {
  addServer,
  updateServer,
  connectServer,
} from "@/apis/resources-components";
import formValid from "@/utils/form-validation";
export default {
  props: ["row", "pid"],
  data() {
    return {
      serverForm: {
        created_by: "",
        created_time: "",
        password: "",
        running_env: "",
        running_mode: "",
        server_desc: "",
        server_ip: "",
        server_name: "",
        server_port: "",
        test: "",
        updated_by: "",
        updated_time: "",
        username: "",
      },
      // 项目校验规则
      serverFormRules: {
        server_name: [
          { trigger: "blur", required: true, message: "名称不能为空" },
        ],
        server_ip: [
          { required: true, message: "IP不能为空" },
          { validator: formValid.isIp },
        ],
        server_port: [
          { required: true, message: "端口号不能为空" },
          { validator: formValid.isPort },
        ],
        username: [
          { trigger: "blur", required: true, message: "登录用户不能为空" },
        ],
        password: [
          { trigger: "blur", required: true, message: "密码不能为空" },
        ],
        running_mode: [{ required: true, message: "运行模式不能为空" }],
        running_env: [{ required: true, message: "环境不能为空" }],
        project: [{ required: true, message: "项目不能为空" }],
        server_desc: [
          { trigger: "blur", required: true, message: "描述不能为空" },
        ],
      },
      running_mode_data: [],
      running_env_data: [
        {
          name: "test",
          id: "test",
        },
        {
          name: "dev",
          id: "dev",
        },
        {
          name: "pro",
          id: "pro",
        },
      ],
      projectList: [],
      testVal: "0",
    };
  },
  components: {},
  created() {},
  mounted() {
    this.serverForm.username = JSON.parse(
      window.sessionStorage.userinfo
    ).username;
    this.getRunList();
    if (!this.pid) {
      console.log(this.row);
      this.serverForm.server_name = this.row.serverName;
      this.serverForm.password = this.row.password;
      this.serverForm.username = this.row.username;
      this.serverForm.running_env = this.row.runningEnv;
      this.serverForm.running_mode = this.row.runningMode;
      this.serverForm.server_desc = this.row.serverDesc;
      this.serverForm.server_ip = this.row.serverIp;
      this.serverForm.server_port = this.row.serverPort;
      this.testVal = this.row.test;
    }
  },
  watch: {},
  computed: {
    //  ID
  },
  methods: {
    //获取项目运行方式
    getRunList() {
      runType().then((res) => {
        if (res.code == 200) {
          this.running_mode_data = res.data.list;
        }
      });
    },
    //连通性测试
    testFun() {
      connectServer({
        server_id: this.row.serverId,
        server_ip: this.serverForm.server_ip,
      }).then((res) => {
        if (res.code == 200) {
          this.$messageBox("success");
          this.testVal = "1";
        } else {
          this.testVal = "0";
          this.$messageBox("error");
        }
      });
    },
    success() {
      this.$refs.serverForm.validate((valid) => {
        if (valid) {
          let params = this.serverForm;
          params.category_id = this.pid;
          params.test = this.testVal;
          if (!this.pid) {
            params.server_id = this.row.serverId;
            updateServer(params).then((res) => {
              if (res.code == 200) {
                this.$messageBox("success");
                this.cancelFun();
                this.$emit("success");
              } else {
                this.$messageBox("error");
              }
            });
          } else {
            addServer(params).then((res) => {
              if (res.code == 200) {
                this.$messageBox("success");
                this.cancelFun();
                this.$emit("success");
              } else {
                this.$messageBox("error");
              }
            });
          }
        }
      });
    },
    cancelFun() {
      this.$refs.serverForm.clearValidate();
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  padding-top: 20px;
  text-align: center;
}
.btns {
  text-decoration: underline;
  cursor: pointer;
  border: none;
  color: #1985f1;
}
</style>
