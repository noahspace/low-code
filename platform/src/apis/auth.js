import request from "@/utils/request";

const baseURL = "/wbi";

// 获取登录用户信息
export function getUserInfo(data) {
  return request({
    url: baseURL + "/get_psnk",
    method: "get",
    data,
  });
}

// 退出登录
export function logout(data) {
  return request({
    url: baseURL + "/logout",
    method: "get",
    data,
  });
}

// 获取登录用户资源数据
export function getResource(data) {
  return request({
    url: baseURL + "/api/tacsresource/res_permission_tree",
    method: "post",
    data,
  });
}
