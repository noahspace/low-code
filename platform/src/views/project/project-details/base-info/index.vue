<template>
  <div class="base-info">
    <div class="container">
      <div class="info-div">
        <div>
          <div>项目编号：</div>
          <div>{{ projectForm.project_no }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>项目名称：</div>
          <div>{{ projectForm.project_name }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>项目封面：</div>
          <div class="preview">
            <el-image
              style="width: 20%; height: auto"
              fit="contain"
              :src="imgurl"
              :preview-src-list="[imgurl]"
            >
            </el-image>
          </div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>项目描述：</div>
          <div>{{ projectForm.project_desc }}</div>
        </div>
      </div>
      <!-- <div class="info-div">
        <div>
          <div>项目部署服务器：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div> -->
      <div class="info-div">
        <div>
          <div>行业分类：</div>
          <div>{{ industry_category }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>行业公司：</div>
          <div>{{ projectForm.industry_company }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>部门：</div>
          <div>{{ projectForm.department_name }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>专业分类：</div>
          <div>{{ pro_class }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>区域信息：</div>
          <div>
            {{ projectForm.province + projectForm.city + projectForm.county }}
          </div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>项目所属地址：</div>
          <div>{{ projectForm.address }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>自定义标签：</div>
          <div>{{ projectForm.tag }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>项目版本：</div>
          <div>{{ projectForm.project_version }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>基础平台版本：</div>
          <div>{{ projectForm.platform_version }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>版本来源：</div>
          <div>{{ projectForm.template_id }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>来源ID：</div>
          <div>{{ projectForm.template_id }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>运行模式：</div>
          <div>{{ running_mode }}</div>
        </div>
      </div>
      <!-- <div class="info-div">
        <div>
          <div>服务器信息：</div>
          <div>{{ projectForm.server_id }}</div>
        </div>
      </div> -->
      <div class="info-div">
        <div>
          <div>负责人：</div>
          <div>{{ projectForm.manager_name }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>负责人联系方式：</div>
          <div>{{ projectForm.manager_phone }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>负责人部门：</div>
          <div>{{ projectForm.manager_department }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>负责人邮箱：</div>
          <div>{{ projectForm.manager_mail }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>创建人：</div>
          <div>{{ projectForm.created_by }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>创建时间：</div>
          <div>{{ projectForm.created_time }}</div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>创建人部门：</div>
          <div>{{ projectForm.department_name }}</div>
        </div>
      </div>
      <!-- <div class="info-div">
        <div>
          <div>创建人邮箱：</div>
          <div>{{ projectForm.projectCode }}</div>
        </div>
      </div> -->
      <div class="info-div">
        <div>
          <div>运行状态：</div>
          <div>
            <span v-if="projectForm.project_state == 1">上线</span>
            <span v-if="projectForm.project_state == 0">下线</span>
          </div>
        </div>
      </div>
      <div class="info-div">
        <div>
          <div>主题ID：</div>
          <div>{{ projectForm.theme_id }}</div>
        </div>
      </div>
      <!-- <div class="info-div">
        <div>
          <div>页面数：</div>
          <div>{{ projectForm.project_pages }}</div>
        </div>
      </div> -->
      <div class="info-div">
        <div>
          <div>资源案例库ID：</div>
          <div>{{ projectForm.resource_case_id }}</div>
        </div>
      </div>
      <!-- <div class="info-div">
        <div>
          <div>项目里程碑计划：</div>
          <div>{{ projectForm.project_milestone }}</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { getDetail } from "@/apis/project-list";
import {
  runType,
  projectClass,
  specialtyList,
  readFile,
} from "@/apis/dictionary";

export default {
  data() {
    return {
      // 源项目相关信息
      projectForm: {},
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      projectTypeList: [],
      projectClassList: [],
      running_mode: "",
      industry_category: "",
      pro_class: "",
      imgurl: "",
    };
  },
  components: {},

  watch: {},
  computed: {
    // 项目 ID
    projectId() {
      return this.$route.params.id;
    },
  },
  created() {},
  mounted() {
    if (this.projectId) {
      this.getDetails();
    }
  },
  methods: {
    handlePictureCardPreview() {
      this.dialogImageUrl = this.imgurl;
      this.dialogVisible = true;
    },
    //获取项目运行方式
    getRunList() {
      runType().then((res) => {
        if (res.code == 200) {
          this.projectTypeList = res.data.list;
          this.projectTypeList.map((item) => {
            if (item.id == this.projectForm.running_mode) {
              this.$nextTick(function () {
                this.running_mode = item.name;
              });
            }
          });
        }
      });
    },
    //获取项目行业分类
    getClassList() {
      projectClass().then((res) => {
        if (res.code == 200) {
          this.projectClassList = res.data.list;
          this.projectClassList.map((item) => {
            if (item.id == this.projectForm.industry_category) {
              this.$nextTick(function () {
                this.industry_category = item.name;
              });
            }
          });
        }
      });
    },
    //获取专业分类
    getspecialtyList() {
      specialtyList().then((res) => {
        if (res.code == 200) {
          res.data.list.map((item) => {
            if (item.id == this.projectForm.pro_class) {
              this.$nextTick(function () {
                this.pro_class = item.name;
              });
            }
          });
        }
      });
    },
    //获取项目详情
    getDetails() {
      getDetail({
        project_id: this.projectId,
      }).then((res) => {
        if (res.code == 200) {
          this.$nextTick(function () {
            this.projectForm = res.data;
            this.getRunList();
            this.getClassList();
            this.getspecialtyList();
            this.getPic(res.data.project_cover);
          });
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
        this.$nextTick(() => {
          this.imgurl = src;
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
