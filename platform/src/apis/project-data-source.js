import request from "@/utils/request";
const WAPI = process.env.NODE_ENV == "production" ? "/wapi" : "";

// 获取数据源列表
export function dataList(data) {
  return request({
    url: WAPI + "/wbi/data_source/get",
    method: "post",
    data,
  });
}
//dataGet
export function dataGet(data) {
  return request({
    url: WAPI + "/wbi/data_source/get_dev ",
    method: "post",
    data,
  });
}
// 新增数据源
export function dataAdd(data) {
  return request({
    url: WAPI + "/wbi/data_source/post",
    method: "post",
    data,
  });
}
// 修改
export function dataEdit(data) {
  return request({
    url: WAPI + "/wbi/data_source/post/update",
    method: "post",
    data,
  });
}
// 删除
export function dataDel(data) {
  return request({
    url: WAPI + "/wbi/data_source/post/delete",
    method: "post",
    data,
  });
}
// 查看详情
export function getDetail(data) {
  return request({
    url: WAPI + "/wbi/data_source/getinfo",
    method: "post",
    data,
  });
}
// 连通性测试
export function test(data) {
  return request({
    url: WAPI + "/wbi/data_source/test",
    method: "post",
    data,
  });
}
// 数据表字段查询
export function dataColumn(data) {
  return request({
    url: WAPI + "/wbi/data_source/get_column",
    method: "post",
    data,
  });
}
//数据源表查询
export function dataTable(data) {
  return request({
    url: WAPI + "/wbi/data_source/get_table",
    method: "post",
    data,
  });
}
//数据字典
export function dataTest(data) {
  return request({
    url: WAPI + "/wbi/data_source/dict/get",
    method: "post",
    data,
  });
}
//api自动接口列表查询
export function autoApiList(data) {
  return request({
    url: WAPI + "/wbi/api_manage/auto_api/get",
    method: "post",
    data,
  });
}
//api自动接口新增
export function autoApiAdd(data) {
  return request({
    url: WAPI + "/wbi/api_manage/auto_api/post",
    method: "post",
    data,
  });
}
//api自动接口查看详情
export function autoApiDetail(data) {
  return request({
    url: WAPI + "/wbi/api_manage/auto_api/get_info",
    method: "post",
    data,
  });
}
//api本地接口查看详情
export function localApiDetail(data) {
  return request({
    url: WAPI + "/wbi/api_manage/local_api/get_info",
    method: "post",
    data,
  });
}
//api本地接口新增
export function localApiAdd(data) {
  return request({
    url: WAPI + "/wbi/api_manage/local_api/post",
    method: "post",
    data,
  });
}
//api本地接口列表
export function localApiList(data) {
  return request({
    url: WAPI + "/wbi/api_manage/local_api/get",
    method: "post",
    data,
  });
}
