// 项目添加编辑信息组件
<template>
  <div class="project-create">
    <div class="project-create-title" v-if="!(pId || projectId)">
      <span>|</span>新增项目
    </div>
    <div class="project-create-title" v-if="pId && !projectId">
      <span>|</span>将<span style="color: #1985f1">{{
        projectForm.projectName
      }}</span
      >作为模板来创建项目
    </div>
    <div class="formDiv">
      <el-form
        :model="projectForm"
        label-width="130px"
        :rules="projectFormRules"
        ref="projectForm"
        class="form"
      >
        <el-form-item
          label="项目运行模式"
          class="labelTitle"
          v-if="!projectId"
        ></el-form-item>
        <el-form-item label="项目运行方式:" prop="projectRunType">
          <el-select
            v-model="projectForm.projectRunType"
            placeholder="请选择项目运行方式"
            clearable
            filterable
            style="width: 40%"
          >
            <el-option
              v-for="item in projectTypeList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="项目基本信息"
          class="labelTitle"
          v-if="!projectId"
        ></el-form-item>
        <el-form-item label="项目编号:" prop="projectCode">
          <el-input
            v-model="projectForm.projectCode"
            placeholder="请填写项目编号"
            style="width: 40%"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="项目名称:" prop="projectName">
          <el-input
            v-model="projectForm.projectName"
            placeholder="请填写项目名称"
            style="width: 40%"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="项目封面:">
          <div class="files">
            <!-- <el-image
              v-if="imgurl"
              style="width: 50%; height: auto"
              fit="contain"
              :src="imgurl"
              :preview-src-list="[imgurl]"
            >
            </el-image> -->
            <el-upload
              :action="upload_url"
              list-type="picture-card"
              :class="{ disabled: uploadDisabled }"
              accept="image/*"
              :on-change="beforeUpload"
              ref="uploadPic"
              :auto-upload="false"
              :file-list="fileList"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="removePic(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="项目描述:">
          <el-input
            v-model="projectForm.projectDesc"
            placeholder="请填写项目描述"
            type="textarea"
            rows="4"
            style="width: 50%"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="行业分类:">
          <el-select
            v-model="projectForm.projectClass"
            placeholder="请填写行业分类"
            clearable
            filterable
            style="width: 40%"
          >
            <el-option
              v-for="item in projectClassList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业公司:">
          <el-input
            v-model="projectForm.projectCompany"
            placeholder="请填写行业公司"
            style="width: 40%"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="部门:">
          <el-input
            v-model="projectForm.department"
            placeholder="请填写部门"
            style="width: 40%"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="专业分类:">
          <el-select
            v-model="projectForm.specialty"
            placeholder="请选择专业分类"
            clearable
            filterable
            style="width: 40%"
          >
            <el-option
              v-for="item in specialtyList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域信息:">
          <areaSel
            @serArea="serArea"
            :provinceProp="projectForm.province"
            :cityProp="projectForm.city"
            :countryProp="projectForm.country"
            :width="iptWidth"
          ></areaSel>
        </el-form-item>
        <el-form-item label="项目所属地址:">
          <el-input
            v-model="projectForm.address"
            placeholder="请填写项目所属地址"
            style="width: 40%"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="自定义标签:">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
            @click="editTag(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            style="width: 10%"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            icon="el-icon-plus"
            circle
            v-else
            class="button-new-tag"
            @click="showInput"
          ></el-button>
        </el-form-item>
        <el-form-item label="项目版本:" prop="version">
          <el-input
            v-model="projectForm.version"
            placeholder="请填写项目版本"
            style="width: 40%"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="模板来源:">
          <el-input
            v-model="projectForm.template"
            placeholder="请填写模板来源"
            style="width: 40%"
            disabled
          >
          </el-input>
        </el-form-item>
        <el-form-item label="负责人:" prop="charger">
          <el-input
            v-model="projectForm.charger"
            placeholder="请填写负责人"
            style="width: 40%"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="负责人联系方式:" prop="phone">
          <el-input
            v-model="projectForm.phone"
            placeholder="请填写联系方式"
            style="width: 40%"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="负责人部门:" prop="chargerDept">
          <el-input
            v-model="projectForm.chargerDept"
            placeholder="请填写部门"
            style="width: 40%"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="负责人邮箱:" prop="chargerEmail">
          <el-input
            v-model="projectForm.chargerEmail"
            placeholder="请填写邮箱"
            style="width: 40%"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="主题样式:" prop="themeStyle">
          <el-select
            v-model="projectForm.themeStyle"
            placeholder="请选择主题样式"
            clearable
            filterable
            style="width: 40%"
          >
            <el-option
              v-for="item in themeStyleList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="项目里程碑计划:">
        <el-input
          v-model="projectForm.plan"
          placeholder="请填写计划"
          style="width: 30%"
        >
        </el-input>
      </el-form-item> -->
      </el-form>
    </div>
    <el-row class="btn">
      <el-button @click="cancelFun()">取消</el-button>
      <el-button type="primary" v-if="!projectId" @click="addproFun"
        >创建</el-button
      >
      <el-button type="primary" v-if="projectId" @click="addproFun"
        >保存</el-button
      >
    </el-row>
  </div>
</template>

<script>
import formValid from "@/utils/form-validation";
import areaSel from "@/components/AreaSelect";
import { proAdd, getDetail, proEdit } from "@/apis/project-list";
import {
  runType,
  projectClass,
  specialtyList,
  upload,
  readFile,
} from "@/apis/dictionary";

export default {
  props: ["projectId"],
  data() {
    return {
      // 源项目相关信息
      projectForm: {
        projectRunType: "",
        projectCode: "",
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
        chargerEmail: "",
        themeStyle: "",
        plan: "",
        province: "",
        city: "",
        country: "",
      },
      // 项目校验规则
      projectFormRules: {
        projectRunType: [{ required: true, message: "请选择项目运行方式" }],
        projectCode: [{ required: true, message: "请填写项目编号" }],
        projectName: [{ required: true, message: "请填写项目名称" }],
        version: [{ required: true, message: "请填写项目版本" }],
        charger: [{ required: true, message: "请填写项目负责人" }],
        phone: [
          { validator: formValid.phone, trigger: "blur", required: true },
        ],
        chargerDept: [{ required: true, message: "请填写项目名称" }],
        chargerEmail: [
          { validator: formValid.isEmail, trigger: "blur", required: true },
        ],
        themeStyle: [{ required: true, message: "请选择主题样式" }],
      },
      // 自动生成标签
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      // 文件上传
      dialogImageUrl: "",
      dialogVisible: true,
      disabled: false,
      projectTypeList: [],
      projectClassList: [],
      specialtyList: [],
      themeStyleList: [{ name: "主题样式1", id: 1 }],
      groupId: "",
      upload_url: "aaa",
      uploadForm: new FormData(), // 一个formdata
      fileid: "",
      fileList: [], //封面url
      iptWidth: "13.3%",
      imgurl: "",
    };
  },
  components: {
    areaSel,
  },
  created() {},
  mounted() {
    this.getRunList();
    this.getClassList();
    this.getspecialtyList();
    if (this.projectId || this.pId) {
      this.getDetails();
    }
  },
  watch: {},
  computed: {
    // 项目 ID创建模板时带过来的id
    pId() {
      return this.$route.params.id;
    },
    uploadDisabled: function () {
      return this.fileList.length > 0;
    },
  },
  methods: {
    //添加标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    editTag(tag) {
      this.handleClose(tag);
      this.showInput();
      this.inputValue = tag;
    },
    //文件上传
    removePic(file) {
      this.$refs.uploadPic.handleRemove(file);
      this.fileList = [];
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    beforeUpload(file, fileList) {
      this.fileList = fileList;
      this.imgurl = "";
      this.uploadForm.append("file", file.raw);
      this.uploadForm.append("fileType", "14");
      let that = this;
      upload(that.uploadForm).then((res) => {
        if (res.code == 200) {
          that.fileid = res.data.id;
        } else {
          that.$messageBox("error");
        }
      });
      return false;
    },
    //回到项目列表
    cancelFun() {
      if (this.projectId) {
        this.$emit("close");
      } else {
        this.projectForm = {
          projectRunType: "",
          projectCode: "",
          projectName: "",
          projectDesc: "",
          projectClass: "",
          projectCompany: "",
          department: "",
          specialty: "",
          area: "",
          areaList: [],
          address: "",
          template: "华雁低代码平台",
          version: "",
          charger: "",
          phone: "",
          chargerDept: "",
          chargerEmail: "",
          themeStyle: "",
          plan: "",
        };
        this.$router.push({
          name: "project-list",
        });
      }
    },
    serArea(data) {
      this.projectForm.province = data.province.name;
      if (data.city) {
        this.projectForm.city = data.city.name;
      }
      if (data.country) {
        this.projectForm.country = data.country.name;
      }
    },
    //获取项目运行方式
    getRunList() {
      runType().then((res) => {
        if (res.code == 200) {
          this.projectTypeList = res.data.list;
        }
      });
    },
    //获取项目行业分类
    getClassList() {
      projectClass().then((res) => {
        if (res.code == 200) {
          this.projectClassList = res.data.list;
        }
      });
    },
    //获取专业分类
    getspecialtyList() {
      specialtyList().then((res) => {
        if (res.code == 200) {
          this.specialtyList = res.data.list;
        }
      });
    },
    //获取项目详情
    getDetails() {
      getDetail({
        project_id: this.projectId || this.pId,
      }).then((res) => {
        if (res.code == 200) {
          this.projectForm.projectCode = res.data.project_no;
          this.projectForm.address = res.data.address;
          this.projectForm.city = res.data.city;
          this.projectForm.country = res.data.county;
          this.projectForm.department = res.data.department_name;
          this.projectForm.projectCompany = res.data.industry_company;
          this.projectForm.projectClass = Number(res.data.industry_category);
          this.projectForm.chargerDept = res.data.manager_department;
          this.projectForm.chargerEmail = res.data.manager_mail;
          this.projectForm.charger = res.data.manager_name;
          this.projectForm.phone = res.data.manager_phone;
          this.projectForm.specialty = Number(res.data.pro_class);
          this.projectForm.projectDesc = res.data.project_desc;
          this.projectForm.plan = res.data.project_milestone;
          this.projectForm.projectName = res.data.project_name;
          this.projectForm.version = res.data.project_version;
          this.projectForm.province = res.data.province;
          this.projectForm.department = res.data.resource_case_id;
          this.projectForm.projectRunType = Number(res.data.running_mode);
          this.dynamicTags = res.data.tag.split(",");
          this.projectForm.template = res.data.template_id;
          this.projectForm.themeStyle = res.data.theme_id;
          this.groupId = res.data.project_group_id;
          this.getPic(res.data.project_cover);
        } else {
          console.log("请求失败");
        }
      });
    },
    //获取文件图片
    getPic(id) {
      readFile({
        id: id,
      }).then((res) => {
        const src = window.URL.createObjectURL(new Blob([res]));
        this.fileList.push({
          url: src,
        });
        this.$nextTick(function () {
          this.imgurl = src;
        });
      });
    },
    //新增
    addproFun() {
      this.$refs.projectForm.validate((valid) => {
        let tags = this.dynamicTags.join(",");

        console.log(this.fileid);
        let params = {
          project_no: this.projectForm.projectCode,
          address: this.projectForm.address,
          city: this.projectForm.city,
          county: this.projectForm.country,
          department_name: this.projectForm.department,
          industry_company: this.projectForm.projectCompany,
          industry_category: this.projectForm.projectClass,
          manager_department: this.projectForm.chargerDept,
          manager_mail: this.projectForm.chargerEmail,
          manager_name: this.projectForm.charger,
          manager_phone: this.projectForm.phone,
          pro_class: this.projectForm.specialty,
          project_desc: this.projectForm.projectDesc,
          project_group_id: this.$route.query.groupId || this.groupId,
          project_cover: this.fileid,
          project_name: this.projectForm.projectName,
          project_version: this.projectForm.version,
          province: this.projectForm.province,
          resource_case_id: this.projectForm.department,
          running_mode: this.projectForm.projectRunType,
          tag: tags,
          template_id: this.projectForm.template,
          theme_id: this.projectForm.themeStyle,
        };
        if (valid) {
          if (this.projectId || this.pId) {
            params.project_id = this.projectId || this.pId;
            //编辑
            proEdit(params).then((res) => {
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
            proAdd(params).then((res) => {
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
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
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
