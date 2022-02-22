import request from "@/utils/request";
const WAPI = process.env.NODE_ENV == "production" ? "/wapi" : "";

// 项目运行模式
export function runType(data) {
  data = { dict_id: "RUNNING_MODE" };
  return request({
    url: WAPI + "/wbi/dict/get",
    method: "post",
    data,
  });
}

// 行业分类
export function projectClass(data) {
  data = { dict_id: "INDUSTRY_CATEGORY" };
  return request({
    url: WAPI + "/wbi/dict/get",
    method: "post",
    data,
  });
}

// 专业分类
export function specialtyList(data) {
  data = { dict_id: "PRO_CLASS" };
  return request({
    url: WAPI + "/wbi/dict/get",
    method: "post",
    data,
  });
}
// 数据库类型
export function dataTypeList(data) {
  data = { dict_id: "RELATIONAL_DB" };
  return request({
    url: WAPI + "/wbi/dict/get",
    method: "post",
    data,
  });
}
// 数据表类型
export function tabTypeList(data) {
  data = { dict_id: "TABLE_TYPE" };
  return request({
    url: WAPI + "/wbi/dict/get",
    method: "post",
    data,
  });
}

// 文件上传
export function upload(data) {
  return request({
    url: WAPI + "/wbi/file_manage/post",
    method: "post",
    data,
  });
}
// 文件预览
export function readFile(data) {
  return request({
    url: WAPI + "/wbi/file_manage/preview",
    method: "post",
    responseType: "blob",
    data,
  });
}
