<template>
  <div class="global-variable-pane">
    <div class="header">
      <span class="title">全局变量</span>
      <i @click="close" class="close ri-close-line"></i>
    </div>
    <div class="body">
      <el-form class="option" label-width="68px">
        <el-collapse class="collapse" accordion>
          <el-collapse-item
            v-for="(item, index) in config.variables"
            :key="item.id"
          >
            <template slot="title">
              <div class="event-li">
                <div class="info">
                  <span class="name" :title="item.name">{{ item.name }}</span>
                  <span class="desc" :title="item.desc">{{ item.desc }}</span>
                </div>
                <el-button
                  @click.stop="removeVariable(index)"
                  type="text"
                  icon="el-icon-delete"
                ></el-button>
              </div>
            </template>
            <el-form label-width="68px">
              <div class="option">
                <div class="card">
                  <div class="header">基本配置</div>
                  <div class="body">
                    <el-form-item label="变量名称">
                      <elx-input :value.sync="item.name"></elx-input>
                    </el-form-item>
                    <el-form-item label="变量描述">
                      <elx-input
                        type="textarea"
                        :value.sync="item.desc"
                      ></elx-input>
                    </el-form-item>
                    <el-form-item label="动态数据">
                      <elx-switch :value.sync="item.dynamicData"></elx-switch>
                    </el-form-item>
                  </div>
                </div>
                <div v-if="item.dynamicData" class="card">
                  <div class="header">动态数据配置</div>
                  <div class="body">
                    <el-form-item label="接口类型">
                      <elx-select
                        :value.sync="item.requestAPIType"
                        @change="handleAPITypeChange(index)"
                      >
                        <el-option label="本地接口" value="local"></el-option>
                        <el-option label="自动接口" value="auto"></el-option>
                      </elx-select>
                    </el-form-item>
                    <el-form-item
                      v-if="item.requestAPIType === 'local'"
                      label="本地接口"
                    >
                      <elx-select
                        :value.sync="item.requestAPIId"
                        clearable
                        filterable
                        @change="handleRequestAPIIdChange(index, $event)"
                      >
                        <el-option
                          v-for="item in localAPIList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </elx-select>
                    </el-form-item>
                    <el-form-item
                      v-if="item.requestAPIType === 'auto'"
                      label="操作表"
                    >
                      <elx-select
                        :value.sync="item.operationTable"
                        clearable
                        filterable
                        @change="handleRequestAPIIdChange(index, $event)"
                      >
                        <el-option
                          v-for="item in autoAPIList"
                          :key="item.id"
                          :label="item.table_name"
                          :value="item.id"
                        ></el-option>
                      </elx-select>
                    </el-form-item>
                    <el-form-item
                      v-if="item.requestAPIType === 'auto'"
                      label="操作类型"
                    >
                      <elx-select :value.sync="item.operationType">
                        <el-option label="查询" value="QUERY"></el-option>
                        <el-option label="更新" value="UPDATE"></el-option>
                        <el-option label="删除" value="DELETE"></el-option>
                        <el-option label="添加" value="SAVE"></el-option>
                      </elx-select>
                    </el-form-item>
                  </div>
                </div>
                <div
                  class="card"
                  v-if="item.requestAPIType === 'local' && item.dynamicData"
                >
                  <div class="header">参数</div>
                  <div class="body">
                    <el-table :data="item.requestParams" style="width: 100%">
                      <el-table-column label="字段名称" align="center">
                        <template slot-scope="scope">
                          <elx-input
                            :title="scope.row.field + '：' + scope.row.desc"
                            :value.sync="scope.row.field"
                          ></elx-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="默认值" align="center">
                        <template slot-scope="scope">
                          <elx-input
                            :title="scope.row.defaultValue"
                            v-model="scope.row.defaultValue"
                            :placeholder="scope.row.desc"
                          ></elx-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="绑定变量" align="center">
                        <template slot-scope="scope">
                          <elx-select
                            clearable
                            :value.sync="scope.row.bindVariable"
                          >
                            <el-option
                              v-for="variable in config.variables"
                              :key="variable.id"
                              :label="variable.name"
                              :value="variable.id"
                            ></el-option>
                          </elx-select>
                        </template>
                      </el-table-column>
                      <el-table-column width="50" label="操作" align="center">
                        <template slot-scope="scope">
                          <el-button
                            size="mini"
                            type="text"
                            @click="removeParam(index, scope.$index)"
                            >删除</el-button
                          >
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="footer">
                    <el-form-item
                      v-show="item.requestAPIType === 'local'"
                      label-width="0"
                    >
                      <el-button
                        @click="addParam(index)"
                        type="primary"
                        style="width: 100%"
                        >添加一项</el-button
                      >
                    </el-form-item>
                  </div>
                </div>
                <div
                  v-if="
                    item.dynamicData &&
                    item.requestAPIType === 'auto' &&
                    item.operationTable &&
                    item.operationType === 'QUERY'
                  "
                  class="card"
                >
                  <div class="header">分页配置</div>
                  <div class="body">
                    <el-form-item label="每页条数">
                      <div style="display: flex">
                        <elx-input-number
                          :value.sync="item.page.pageSize.defaultValue"
                          style="margin-right: 5px"
                        >
                        </elx-input-number>
                        <elx-select
                          clearable
                          :value.sync="item.page.pageSize.bindVariable"
                          placeholder="绑定变量"
                        >
                          <el-option
                            v-for="variable in config.variables"
                            :key="variable.id"
                            :label="variable.name"
                            :value="variable.id"
                          ></el-option>
                        </elx-select>
                      </div>
                    </el-form-item>
                    <el-form-item label="当前页">
                      <div style="display: flex">
                        <elx-input-number
                          style="margin-right: 5px"
                          :value.sync="item.page.pageIndex.defaultValue"
                        >
                        </elx-input-number>
                        <elx-select
                          clearable
                          :value.sync="item.page.pageIndex.bindVariable"
                          placeholder="绑定变量"
                        >
                          <el-option
                            v-for="variable in config.variables"
                            :key="variable.id"
                            :label="variable.name"
                            :value="variable.id"
                          ></el-option>
                        </elx-select>
                      </div>
                    </el-form-item>
                  </div>
                </div>
                <div
                  v-if="
                    item.dynamicData &&
                    item.requestAPIType === 'auto' &&
                    item.operationTable &&
                    item.operationType === 'QUERY'
                  "
                  class="card"
                >
                  <div class="header">排序配置</div>
                  <div
                    class="body"
                    v-for="orderBy in item.orderBys"
                    :key="orderBy.id"
                  >
                    <el-form-item label="排序字段">
                      <div style="display: flex">
                        <elx-input
                          :value.sync="orderBy.field.defaultValue"
                          style="margin-right: 5px"
                        >
                        </elx-input>
                        <elx-select
                          clearable
                          :value.sync="orderBy.field.bindVariable"
                          placeholder="绑定变量"
                        >
                          <el-option
                            v-for="variable in config.variables"
                            :key="variable.id"
                            :label="variable.name"
                            :value="variable.id"
                          ></el-option>
                        </elx-select>
                      </div>
                    </el-form-item>
                    <el-form-item label="是否顺序">
                      <div style="display: flex; align-items: center">
                        <elx-switch
                          style="margin-right: 5px"
                          :value.sync="orderBy.asc.defaultValue"
                        >
                        </elx-switch>
                        <elx-select
                          clearable
                          :value.sync="orderBy.asc.bindVariable"
                          placeholder="绑定变量"
                        >
                          <el-option
                            v-for="variable in config.variables"
                            :key="variable.id"
                            :label="variable.name"
                            :value="variable.id"
                          ></el-option>
                        </elx-select>
                      </div>
                    </el-form-item>
                  </div>
                  <div class="footer">
                    <el-form-item label-width="0">
                      <el-button
                        @click="addOrderBy(index)"
                        type="primary"
                        style="width: 100%"
                        >添加一项</el-button
                      >
                    </el-form-item>
                  </div>
                </div>
                <div
                  class="card"
                  v-if="
                    item.dynamicData &&
                    item.requestAPIType === 'auto' &&
                    item.operationTable &&
                    (item.operationType === 'QUERY' ||
                      item.operationType === 'UPDATE' ||
                      item.operationType === 'DELETE')
                  "
                >
                  <div class="header">条件</div>
                  <div class="body">
                    <el-form-item label-width="0">
                      <Where
                        v-for="(item, index) in item.where"
                        :key="item.id"
                        :whereItem="item"
                        :fieldList="fieldList(index)"
                        :parentData="null"
                        :parentIndex="index"
                      />
                    </el-form-item>
                  </div>
                </div>
                <div
                  class="card"
                  v-if="
                    item.dynamicData &&
                    item.requestAPIType === 'auto' &&
                    item.operationTable &&
                    (item.operationType === 'UPDATE' ||
                      item.operationType === 'SAVE')
                  "
                >
                  <div class="header">参数</div>
                  <div class="body">
                    <el-table :data="item.requestParams" style="width: 100%">
                      <el-table-column label="字段名称" align="center">
                        <template slot-scope="scope">
                          <elx-input
                            :title="scope.row.field + '：' + scope.row.desc"
                            disabled
                            size="mini"
                            :value.sync="scope.row.field"
                          ></elx-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="默认值" align="center">
                        <template slot-scope="scope">
                          <elx-input
                            :title="scope.row.desc"
                            size="mini"
                            :value.sync="scope.row.defaultValue"
                            :placeholder="scope.row.desc"
                          >
                          </elx-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="绑定变量" align="center">
                        <template slot-scope="scope">
                          <elx-select
                            clearable
                            size="mini"
                            :value.sync="scope.row.bindVariable"
                          >
                            <el-option
                              v-for="variable in config.variables"
                              :key="variable.id"
                              :label="variable.name"
                              :value="variable.id"
                            ></el-option>
                          </elx-select>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="footer">
                    <el-form-item
                      v-show="item.requestAPIType === 'local'"
                      label-width="0"
                    >
                      <el-button
                        @click="addParam(index)"
                        type="primary"
                        style="width: 100%"
                        >添加一项</el-button
                      >
                    </el-form-item>
                  </div>
                </div>
                <div class="card">
                  <div class="header">处理函数</div>
                  <div class="body">
                    <el-form-item label-width="0">
                      <elx-input
                        type="textarea"
                        :value.sync="item.handleFunction"
                      ></elx-input>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form>
          </el-collapse-item>
          <div class="empty" v-if="config.variables.length === 0">无数据</div>
        </el-collapse>
      </el-form>
      <el-form class="option" label-width="68px">
        <div class="card">
          <div class="body">
            <el-form-item label="添加变量">
              <el-input v-model="newVariableName">
                <el-button
                  @click="addVariable"
                  slot="append"
                  icon="el-icon-plus"
                ></el-button>
              </el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import * as projectDataSourceAPI from "@/apis/project-data-source";
import Where from "./components/Where";
export default {
  components: { Where },
  inject: ["config", "currentActive"],
  data() {
    return {
      newVariableName: "",
      localAPIList: [],
      autoAPIList: [],
    };
  },
  created() {
    this.getLocalAPIList();
    this.getAutoAPIList();
  },
  computed: {
    fieldList() {
      return function (index) {
        const autoData = this.autoAPIList.find(
          (obj) => obj.id === this.config.variables[index].operationTable
        );
        if (autoData && autoData.colums) {
          return JSON.parse(autoData.colums);
        } else {
          return [];
        }
      };
    },
    // 页面 ID
    pageId() {
      return this.$route.params.pageId;
    },
    // 项目 ID
    projectId() {
      return this.$route.params.projectId;
    },
  },
  methods: {
    // 查询本地接口列表
    async getLocalAPIList() {
      try {
        const res = await projectDataSourceAPI.localApiList({
          project_id: this.projectId,
          system_name: "",
          name: "",
          page_size: 1,
          page_index: 0,
        });
        if (res.code === 200) {
          this.localAPIList = res.data.list;
        }
      } catch (error) {
        console.error(error);
      }
    },
    // 查询自动接口列表
    async getAutoAPIList() {
      try {
        const res = await projectDataSourceAPI.autoApiList({
          project_id: this.projectId,
          page_size: 1,
          page_index: 0,
        });
        if (res.code === 200) {
          this.autoAPIList = res.data.list;
        }
      } catch (error) {
        console.error(error);
      }
    },
    close() {
      this.$emit("closeAsidePane");
    },
    // 添加变量
    addVariable() {
      if (!this.newVariableName) {
        this.$message({ type: "info", message: "变量名不能为空" });
        return;
      }
      if (
        this.config.variables.find((obj) => obj.name === this.newVariableName)
      ) {
        this.$message({ type: "info", message: "变量名已存在" });
        return;
      }
      this.config.variables.push({
        id: nanoid(),
        name: this.newVariableName, // 变量名称
        desc: "", // 变量描述
        dynamicData: false, // 是否动态变量
        handleFunction: "", // 处理函数体

        requestAPIType: "local",
        requestAPIId: "", // 动态变量，本地请求接口 ID
        requestParams: [], // 动态变量，请求参数

        operationTable: "", // 操作表
        operationType: "QUERY", // 操作类型
        where: [
          // 条件
          {
            id: nanoid(),
            field: "AND",
            list: [],
          },
        ],
        // 分页
        page: {
          pageSize: {
            defaultValue: 0,
            bindVariable: "",
          },
          pageIndex: {
            defaultValue: 1,
            bindVariable: "",
          },
        },
        // 排序
        orderBys: [
          {
            id: nanoid(),
            field: {
              defaultValue: "",
              bindVariable: "",
            },
            asc: {
              defaultValue: true,
              bindVariable: "",
            },
          },
        ],
      });
      this.newVariableName = "";
    },
    // 添加参数
    addParam(index) {
      this.config.variables[index].requestParams.push({
        id: nanoid(),
        field: nanoid(4), // 参数字段
        defaultValue: "", // 参数默认值
        bindVariable: "", // 绑定变量
      });
    },
    // 删除参数
    removeParam(index, index2) {
      this.config.variables[index].requestParams.splice(index2, 1);
    },
    // 添加排序字段
    addOrderBy(index) {
      this.config.variables[index].orderBys.push({
        id: nanoid(),
        field: {
          defaultValue: "",
          bindVariable: "",
        },
        asc: {
          defaultValue: true,
          bindVariable: "",
        },
      });
    },
    // 移除变量
    removeVariable(index) {
      this.config.variables.splice(index, 1);
    },
    // 接口类型改变
    handleAPITypeChange(index) {
      this.config.variables[index].requestAPIId = "";
      this.config.variables[index].requestParams = [];
    },
    // 请求接口 ID 改变
    handleRequestAPIIdChange(index, value) {
      // 本地接口
      if (this.config.variables[index].requestAPIType === "local") {
        const APIData = this.localAPIList.find((obj) => obj.id === value);
        this.config.variables[index].requestParams = [];
        if (APIData && APIData.request_desc) {
          const requestParams = JSON.parse(APIData.request_desc);
          Object.keys(requestParams).forEach((field) => {
            this.config.variables[index].requestParams.push({
              id: nanoid(),
              field: field, // 参数字段
              desc: requestParams[field].description,
              defaultValue: "", // 参数默认值
              bindVariable: "", // 绑定变量
            });
          });
        }
      } else if (this.config.variables[index].requestAPIType === "auto") {
        // 自动接口
        const APIData = this.autoAPIList.find((obj) => obj.id === value);
        this.config.variables[index].requestParams = [];
        if (APIData && APIData.colums) {
          const columns = JSON.parse(APIData.colums);
          columns.forEach((column) => {
            this.config.variables[index].requestParams.push({
              id: nanoid(),
              field: column.name, // 参数字段
              desc: column.annotation,
              defaultValue: "", // 参数默认值
              bindVariable: "", // 绑定变量
            });
          });
        }
        // 初始化 where 数据
        this.config.variables[index].where = [
          {
            id: nanoid(),
            field: "AND",
            list: [],
          },
        ];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
