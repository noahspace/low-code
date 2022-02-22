import request from "@/utils/request";
const WAPI = process.env.NODE_ENV == "production" ? "/wapi" : "";

// 操作日志查询
export function get(data) {
  return request({
    url: WAPI + "/wbi/run/get_operation_log",
    method: "post",
    data,
  });
}
