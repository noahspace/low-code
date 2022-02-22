import request from "@/utils/request";
const WAPI = process.env.NODE_ENV == "production" ? "/wapi" : "";

// 获取项目列表
export function proList(data) {
  return request({
    url: WAPI + "/wbi/project_manage/project/get",
    method: "post",
    data,
  });
}

// 新增项目
export function proAdd(data) {
  return request({
    url: WAPI + "/wbi/project_manage/project/post",
    method: "post",
    data,
  });
}
// 修改项目
export function proEdit(data) {
  return request({
    url: WAPI + "/wbi/project_manage/project/info/update",
    method: "post",
    data,
  });
}

// 查看项目详情
export function getDetail(data) {
  return request({
    url: WAPI + "/wbi/project_manage/project/info/get",
    method: "post",
    data,
  });
}
// 项目删除
export function delPro(data) {
  return request({
    url: WAPI + "/wbi/project_manage/project/delect",
    method: "post",
    data,
  });
}
// 项目上线
export function onlineOffline(data) {
  return request({
    url: WAPI + "/wbi/project_manage/project/online_offline",
    method: "post",
    data,
  });
}
// 项目进度
export function projectProgress(data) {
  return request({
    url: WAPI + "/wbi/project_manage/project_progress/get",
    method: "post",
    data,
  });
}
