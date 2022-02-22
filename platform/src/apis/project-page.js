import request from "@/utils/request";
const WAPI = process.env.NODE_ENV == "production" ? "/wapi" : "";

// 获取项目下所有页面
export function get(data) {
  return request({
    url: WAPI + "/wbi/page_manage/page/get",
    method: "post",
    data,
  });
}

// 新增页面
export function post(data) {
  return request({
    url: WAPI + "/wbi/page_manage/page/post",
    method: "post",
    data,
  });
}

// 更新页面
export function update(data) {
  return request({
    url: WAPI + "/wbi/page_manage/page/info/update",
    method: "post",
    data,
  });
}

// 删除页面
export function del(data) {
  return request({
    url: WAPI + "/wbi/page_manage/page/delete",
    method: "post",
    data,
  });
}

// 详情
export function getInfo(data) {
  return request({
    url: WAPI + "/wbi/page_manage/page/info/get",
    method: "post",
    data,
  });
}

// 页面配置获取
export function getPageOption(data) {
  return request({
    url: WAPI + "/wbi/page_manage/page/option/get",
    method: "post",
    data,
  });
}

// 页面配置更新
export function updatePageOption(data) {
  return request({
    url: WAPI + "/wbi/page_manage/page/option/update",
    method: "post",
    data,
  });
}

// 辅助布局
export function auxiliaryLayoutPost(data) {
  return request({
    url: WAPI + "/wbi/page_manage/page/auxiliary_layout/post",
    method: "post",
    data,
  });
}
