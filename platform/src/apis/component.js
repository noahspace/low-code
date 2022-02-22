import request from "@/utils/request";
const WAPI = process.env.NODE_ENV == "production" ? "/wapi" : "";

// 通过分类查询组件
export function getByCat(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/components/get_by_cat",
    method: "post",
    data,
  });
}
