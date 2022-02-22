import request from "@/utils/request";
const WAPI = process.env.NODE_ENV == "production" ? "/wapi" : "";
// 获取分组数据
export function get(data) {
  return request({
    url: WAPI + "/wbi/group/get",
    method: "post",
    data,
  });
}

// 新增分组
export function post(data) {
  return request({
    url: WAPI + "/wbi/group/post",
    method: "post",
    data,
  });
}

// 更新分组
export function update(data) {
  return request({
    url: WAPI + "/wbi/group/update",
    method: "post",
    data,
  });
}

// 删除分组
export function del(data) {
  return request({
    url: WAPI + "/wbi/group/delect",
    method: "post",
    data,
  });
}
