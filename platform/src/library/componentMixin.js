/**
 * avatar: Noah
 * email: noahzhangspace@gmail.com
 */
import axios from "axios";
export default {
  inject: ["config"],
  props: ["data"],
  created() {
    this.$instance.register(this.data.id, this);
  },
  watch: {
    "data.datas": {
      handler() {
        this.handleVariables();
      },
      deep: true,
      immediate: true,
    },
    // 注释目的：避免全局变量更新导致页面所有动态变量参数请求
    // "config.variables": {
    //   handler() {
    //     this.handleVariables();
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },
  computed: {
    // 事件
    events() {
      let events = {};
      this.data.events.forEach((event) => {
        let callback = "";
        // 处理预设事件
        event.presetMethods.forEach((presetMethod) => {
          switch (presetMethod.type) {
            case "bindVariable":
              if (presetMethod.bindVariable && presetMethod.variableValue) {
                const result = /\${(.*?)\}/.exec(presetMethod.variableValue);
                let value;
                if (result && result[1]) {
                  value = `${result[1]}`;
                } else {
                  value = `"${presetMethod.variableValue}"`;
                }
                callback += `this.config.variables.find((variable) => variable.id === "${presetMethod.bindVariable}").data = ${value};`;
              }
              break;
            case "loadData":
              if (presetMethod.componentId) {
                callback += `this.$instance.get("${presetMethod.componentId}").handleVariables(true);`;
              }
              break;
          }
        });
        callback += event.callback;
        events[event.type] = new Function("...args", callback).bind(this);
      });
      return events;
    },
  },
  methods: {
    // 处理变量
    handleVariables(execute = false) {
      if (!this.data.datas) {
        return;
      }
      this.data.datas.forEach((data) => {
        // 判断是否绑定变量，没有绑定则使用静态数据
        // execute 确保数据配置时候不会默认请求绑定变量 --
        if (data.bindVariable && (data.whetherInitialize || execute)) {
          // 变量配置
          const variableConfig = this.config.variables.find(
            (variable) => variable.id === data.bindVariable
          );
          if (!variableConfig) {
            return;
          }
          // 判断是否动态数据
          if (variableConfig.dynamicData) {
            let requestConfig;
            // ---------- 本地接口 ----------
            if (variableConfig.requestAPIType === "local") {
              // 参数处理
              let params = {};
              variableConfig.requestParams.forEach((param) => {
                if (param.bindVariable) {
                  const variable = this.config.variables.find(
                    (variable) => variable.id === param.bindVariable
                  );
                  // 判断参数绑定变量是否赋值，未赋值者使用组件默认数据
                  params[param.field] =
                    variable && variable.data
                      ? variable.data
                      : param.defaultValue;
                } else {
                  params[param.field] = param.defaultValue;
                }
              });
              // 生成请求配置
              requestConfig = {
                method: "POST",
                url: "/wbi/crud/local_request",
                data: {
                  interfaceId: variableConfig.requestAPIId,
                  requestJson: JSON.stringify(params),
                },
              };
            } else if (variableConfig.requestAPIType === "auto") {
              // ---------- 自动接口 ----------
              // 条件处理
              let where = variableConfig.where;
              // 参数处理
              let params = [];
              variableConfig.requestParams.forEach((param) => {
                if (param.bindVariable) {
                  const variable = this.config.variables.find(
                    (variable) => variable.id === param.bindVariable
                  );
                  // 判断参数绑定变量是否赋值，未赋值者使用组件默认数据
                  params.push({
                    name: param.field,
                    value:
                      variable && variable.data
                        ? variable.data
                        : param.defaultValue,
                  });
                } else {
                  params.push({
                    name: param.field,
                    value: param.defaultValue,
                  });
                }
              });
              // 分页处理
              let page = {
                pageNum: 1,
                pageSize: 0,
              };
              // 分页条数
              if (variableConfig.page.pageSize.bindVariable) {
                const variable = this.config.variables.find(
                  (variable) =>
                    variable.id === variableConfig.page.pageSize.bindVariable
                );
                page.pageSize =
                  variable && variable.data
                    ? variable.data
                    : variableConfig.page.pageSize.defaultValue;
              } else {
                page.pageSize = variableConfig.page.pageSize.defaultValue;
              }
              // 当前页
              if (variableConfig.page.pageIndex.bindVariable) {
                const variable = this.config.variables.find(
                  (variable) =>
                    variable.id === variableConfig.page.pageIndex.bindVariable
                );
                page.pageNum =
                  variable && variable.data
                    ? variable.data
                    : variableConfig.page.pageIndex.defaultValue;
              } else {
                page.pageNum = variableConfig.page.pageIndex.defaultValue;
              }

              // 排序字段处理
              let orderBys = [];
              variableConfig.orderBys.forEach((orderBy) => {
                let orderByItem = {
                  field: "",
                  asc: "",
                };
                // 字段名称
                if (orderBy.field.bindVariable !== "") {
                  const variable = this.config.variables.find(
                    (variable) => variable.id === orderBy.field.bindVariable
                  );
                  orderByItem.field =
                    variable && variable.data
                      ? variable.data
                      : orderBy.field.defaultValue;
                } else {
                  orderByItem.field = orderBy.field.defaultValue;
                }
                // 是否顺序
                if (orderBy.asc.bindVariable !== "") {
                  const variable = this.config.variables.find(
                    (variable) => variable.id === orderBy.asc.bindVariable
                  );
                  orderByItem.asc =
                    variable && variable.data
                      ? variable.data
                      : orderBy.asc.defaultValue;
                } else {
                  orderByItem.asc = orderBy.asc.defaultValue;
                }
                orderBys.push(orderByItem);
              });

              // 生成请求配置
              requestConfig = {
                method: "POST",
                url: "/wbi/crud/auto_request",
                data: {
                  interfaceId: variableConfig.operationTable,
                  autoOperation: variableConfig.operationType,
                  requestBody: JSON.stringify({
                    select: ["*"],
                    where: {
                      where_content: JSON.stringify(where),
                      // where 参数列表，去掉为空数据
                      params: this.config.variables
                        .map((obj) => ({
                          variable: obj.id,
                          value: obj.data,
                        }))
                        .filter((obj) => obj.value !== null),
                    },
                    records: [{ columns: params }],
                    orderBys: orderBys,
                    page: page,
                  }),
                },
              };
            }

            // 生成请求函数
            let requestFunction = new Function(
              "axios",
              `return axios.request(${JSON.stringify(requestConfig)})`
            );
            let requestPromise = requestFunction(axios);
            requestPromise.then((response) => {
              // 变量处理函数处理
              if (variableConfig.handleFunction) {
                // 处理函数
                let handleFunction = new Function(
                  "data",
                  variableConfig.handleFunction
                ).bind(this);
                this.handleDatas(data, handleFunction(response));
              } else {
                this.handleDatas(data, response);
              }
            });
          } else {
            // 变量处理函数处理
            if (variableConfig.handleFunction) {
              // 处理函数
              let handleFunction = new Function(
                "data",
                variableConfig.handleFunction
              ).bind(this);
              this.handleDatas(data, handleFunction(variableConfig.data));
            } else {
              this.handleDatas(data, variableConfig.data);
            }
          }
        } else {
          this.handleDatas(data, data.defaultValue);
        }
      });
    },
    // 处理数据
    handleDatas(currentData, data) {
      // 数据处理
      if (currentData.callback) {
        let handleFunction = new Function("data", currentData.callback).bind(
          this
        );
        this[currentData.attribs] = handleFunction(data);
      } else {
        this[currentData.attribs] = data;
      }
      // 受控组件处理
      if (
        currentData.controlledComponents &&
        currentData.controlledComponents.length > 0
      ) {
        currentData.controlledComponents.forEach((controlledComponent) => {
          let handleFunction = new Function(
            "data",
            controlledComponent.callback
          ).bind(this);
          const componentInstance = this.$instance.get(
            controlledComponent.componentId
          );
          if (componentInstance) {
            componentInstance[controlledComponent.field] = handleFunction(data);
          }
        });
      }
    },
  },
};
