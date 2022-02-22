// 添加编辑信息组件
<template>
  <div class="data-create">
    <el-form
      :model="dataForm"
      label-width="130px"
      :rules="dataFormRules"
      ref="dataForm"
      class="form"
    >
      <el-form-item label="数据源名称:" prop="name">
        <el-input
          v-model="dataForm.name"
          placeholder="数据源名称"
          :disabled="disableds"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="数据库类型:" prop="db_type">
        <el-select
          v-model="dataForm.db_type"
          placeholder="请填写数据库类型"
          clearable
          filterable
          style="width: 100%"
          :disabled="disableds"
        >
          <el-option
            v-for="item in dataTypeList"
            :label="item.name"
            :value="item.code"
            :key="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述:">
        <el-input
          v-model="dataForm.description"
          type="textarea"
          rows="3"
          placeholder="描述"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="适用环境:">
        <el-input
          v-model="dataForm.environment"
          placeholder="适用环境"
          disabled
        >
        </el-input>
      </el-form-item>
      <el-form-item label="IP主机名:" prop="ip">
        <el-input v-model="dataForm.ip" placeholder="请填写ip主机名">
        </el-input>
      </el-form-item>
      <el-form-item label="端口:" prop="port">
        <el-input v-model="dataForm.port" placeholder="请填写端口"> </el-input>
      </el-form-item>
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="dataForm.username" placeholder="请填写用户名">
        </el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="dataForm.password" placeholder="请填写密码">
        </el-input>
      </el-form-item>
      <el-form-item label="数据库名称:" prop="instance">
        <el-input v-model="dataForm.instance" placeholder="请填写数据库名称">
        </el-input>
      </el-form-item>
      <el-form-item label="驱动类名:" prop="driver_class_name">
        <el-input
          v-model="dataForm.driver_class_name"
          placeholder="请填写数据库名称"
          :disabled="disableds"
        >
        </el-input>
      </el-form-item>
      <!-- <el-form-item label="url链接:">
        <el-input v-model="dataForm.url" placeholder="请填写url"> </el-input>
      </el-form-item>
      <el-form-item label="初始化连接大小:">
        <el-input v-model="dataForm.link" placeholder="请填写初始化连接大小">
        </el-input>
      </el-form-item>
      <el-form-item label="最小空闲连接数:">
        <el-input v-model="dataForm.minLink" placeholder="请填写最小空闲连接数">
        </el-input>
      </el-form-item>
      <el-form-item label="最大连接数:">
        <el-input v-model="dataForm.maxLink" placeholder="请填写最大连接数">
        </el-input>
      </el-form-item>
      <el-form-item label="查询超时时间:">
        <el-input
          v-model="dataForm.searchTime"
          placeholder="请填写查询超时时间"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="事务查询超时时间:">
        <el-input
          v-model="dataForm.thingTime"
          placeholder="请填写事务查询超时时间"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="登录超时时间:">
        <el-input v-model="dataForm.loginTime" placeholder="请填写登录超时时间">
        </el-input>
      </el-form-item>
      <el-form-item label="默认autocommit设置:">
        <el-input
          v-model="dataForm.autocommit"
          placeholder="请填写默认autocommit设置"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="默认只读设置:">
        <el-input v-model="dataForm.onlyRead" placeholder="请填写默认只读设置">
        </el-input>
      </el-form-item>
      <el-form-item label="默认事务隔离:">
        <el-input v-model="dataForm.noLink" placeholder="请填写默认事务隔离">
        </el-input>
      </el-form-item> -->
      <el-row class="btn">
        <el-button @click="cancelFun()">取消</el-button>
        <el-button type="primary" @click="saveFun">创建</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import formValid from "@/utils/form-validation";
import { dataAdd, dataEdit } from "@/apis/project-data-source";
import { dataTypeList } from "@/apis/dictionary";

export default {
  props: ["projectId", "row"],

  data() {
    return {
      // 源项目相关信息
      dataForm: {
        environment: "开发环境",
      },
      // 项目校验规则
      dataFormRules: {
        db_type: [{ required: true, message: "请选择数据库类型" }],
        name: [{ required: true, message: "请填写数据源名称" }],
        environment: [{ required: true, message: "请选择适应环境" }],
        ip: [
          { required: true, message: "请填写IP主机名" },
          { validator: formValid.isIp },
        ],
        phone: [
          { validator: formValid.phone, trigger: "blur", required: true },
        ],
        port: [
          { required: true, message: "请填写端口号" },
          { validator: formValid.isPort },
        ],
        username: [{ required: true, message: "请填写用户名" }],
        password: [{ required: true, message: "请填写密码" }],
        instance: [{ required: true, message: "请填写数据库名称" }],
        driver_class_name: [{ required: true, message: "请填写驱动类名" }],
        chargerEmail: [
          { validator: formValid.isEmail, trigger: "blur", required: true },
        ],
      },
      dataTypeList: [],
      disableds: false,
    };
  },
  components: {},
  created() {},
  mounted() {
    this.getDataTypeList();
    if (Object.keys(this.row).length !== 0) {
      this.disableds = true;
      this.$nextTick(function () {
        this.dataForm = this.row;
      });
    } else {
      this.dataForm = {};
      this.disableds = false;
    }

    console.log(this.row);
  },
  watch: {},
  computed: {},
  methods: {
    //获取数据库类型
    getDataTypeList() {
      dataTypeList().then((res) => {
        if (res.code == 200) {
          this.dataTypeList = res.data.list;
        }
      });
    },
    saveFun() {
      this.$refs.dataForm.validate((valid) => {
        let params = {
          db_type: this.dataForm.db_type,
          description: this.dataForm.description,
          driver_class_name: this.dataForm.driver_class_name,
          instance: this.dataForm.instance,
          ip: this.dataForm.ip,
          name: this.dataForm.name,
          password: this.dataForm.password,
          port: this.dataForm.port,
          project_id: this.projectId,
          username: this.dataForm.username,
        };
        if (valid) {
          console.log(this.row);
          if (Object.keys(this.row).length !== 0) {
            params = {
              description: this.dataForm.description,
              instance: this.dataForm.instance,
              ip: this.dataForm.ip,
              name: this.dataForm.name,
              password: this.dataForm.password,
              port: this.dataForm.port,
              id: this.row.id,
              username: this.dataForm.username,
            };
            params.id = this.row.id;
            //编辑
            dataEdit(params).then((res) => {
              if (res.code == 200) {
                this.$messageBox("success");
                this.cancelFun();
                this.$emit("updateList");
              } else {
                this.$messageBox("error");
              }
            });
          } else {
            //新增
            dataAdd(params).then((res) => {
              if (res.code == 200) {
                this.$messageBox("success");
                this.cancelFun();
                this.$emit("updateList");
              } else {
                this.$messageBox("error");
              }
            });
          }
        }
      });
    },
    //回到项目列表
    cancelFun() {
      this.$refs.dataForm.resetFields();
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.data-create {
  background: #fff;
  height: 100%;
  overflow: auto;
  scrollbar-gutter: stable;
  padding: 10px;
  .data-create-title {
    span {
      font-weight: bold;
      color: #1985f1;
      margin-right: 10px;
    }
    font-size: 20px;
    font-weight: bold;
    height: 40px;
    line-height: 30px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
  }

  .btn {
    padding-top: 20px;
    border-top: 1px solid #ddd;
    text-align: center;
  }
}
</style>
<style lang="scss">
.form {
  .labelTitle {
    .el-form-item__label {
      color: #1985f1;
      font-weight: bold;
    }
  }
}
</style>
