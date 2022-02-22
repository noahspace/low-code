import request from "@/utils/request";
const WAPI = process.env.NODE_ENV == "production" ? "/wapi" : "";

// 图标库查询
export function getIconLibrary(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/icons/get_lib",
    method: "post",
    data,
  });
}

// 图标库查询
export function getIcons(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/icons/get",
    method: "post",
    data,
  });
}
