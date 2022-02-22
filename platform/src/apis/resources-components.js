import request from "@/utils/request";
const WAPI = process.env.NODE_ENV == "production" ? "/wapi" : "";

/***********
 * **********
 * 主题
 */
// 主题查询
export function getThemeList(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/themes/get",
    method: "post",
    data,
  });
}
// 主题删除
export function delThemes(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/themes/delete",
    method: "post",
    data,
  });
}
// 主题新增
export function addTheme(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/themes/post",
    method: "post",
    data,
  });
}
// 更新主题信息
export function updateTheme(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/themes/update_info",
    method: "post",
    data,
  });
}
// 主题配置查询
export function getThemeOption(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/themes/get_option",
    method: "post",
    data,
  });
}
// 更新主题配置
export function updateThemeOption(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/themes/update_option",
    method: "post",
    data,
  });
}

/********图标*********/
// 图标库查询
export function getIconsList(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/icons/get_lib",
    method: "post",
    data,
  });
}
// 图标库删除
export function delIcons(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/iconslib/delete",
    method: "post",
    data,
  });
}
// 图标库新增
export function addIcons(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/iconslib/post",
    method: "post",
    data,
  });
}
// 更新图标库
export function updateIcons(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/iconslib/update",
    method: "post",
    data,
  });
}
// 图标查询
export function getIcon(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/icons/get",
    method: "post",
    data,
  });
}
// 更新图标
export function updateIcon(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/icons/update",
    method: "post",
    data,
  });
}
/**************图片*****/
// 图片新增
export function addImg(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/images/post",
    method: "post",
    data,
  });
}
// 更新图片
export function updateImg(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/images/update",
    method: "post",
    data,
  });
}
// 图片查询
export function getImg(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/images/get",
    method: "post",
    data,
  });
}
// 删除图片
export function delImg(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/images/delete",
    method: "post",
    data,
  });
}
/********插图*********/
// 插图库查询
export function geticonslibsList(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/illustrationslib/get",
    method: "post",
    data,
  });
}
// 插图库删除
export function deliconslibs(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/illustrationslib/delete",
    method: "post",
    data,
  });
}
// 插图库新增
export function addiconslibs(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/illustrationslib/post",
    method: "post",
    data,
  });
}
// 更新插图库
export function updateiconslibs(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/illustrationslib/update",
    method: "post",
    data,
  });
}
// 插图查询
export function geticonslib(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/illustrations/get",
    method: "post",
    data,
  });
}
// 更新插图
export function updateiconslib(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/illustrations/update",
    method: "post",
    data,
  });
}
/***************组件 */
// 通过分类查询组件通过分类查询组件
export function componentsList(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/components/get_by_cat",
    method: "post",
    data,
  });
}
// 组件库查询
export function components(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/components/get_lib",
    method: "post",
    data,
  });
}
// 组件库新增
export function addComponents(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/components/post_lib",
    method: "post",
    data,
  });
}
// 组件库修改
export function updateComponents(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/components/update_lib",
    method: "post",
    data,
  });
}
// 组件库删除
export function delComponents(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/components/delete_lib",
    method: "post",
    data,
  });
}
// 组件查询
export function component(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/components/get",
    method: "post",
    data,
  });
}
// 组件修改
export function updateComponent(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/components/update",
    method: "post",
    data,
  });
}
/********服务器***********/
// 服务器新增
export function addServer(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/servers/post",
    method: "post",
    data,
  });
}
// 服务器查询
export function server(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/servers/get_list",
    method: "post",
    data,
  });
}
// 服务器修改
export function updateServer(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/servers/update",
    method: "post",
    data,
  });
}
// 服务器信息查询
export function infoServer(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/servers/get_info",
    method: "post",
    data,
  });
}
// 服务器删除
export function deleteServer(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/servers/delete",
    method: "post",
    data,
  });
}
// 服务器连通性测试
export function connectServer(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/servers/connect_test",
    method: "post",
    data,
  });
}
//项目查询
export function serverPro(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/project/get",
    method: "post",
    data,
  });
}
/**************布局管理******/
// 布局查询
export function layouts(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/layouts/get",
    method: "post",
    data,
  });
}
// 新增布局
export function addlayouts(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/layouts/post",
    method: "post",
    data,
  });
}
// 更新布局
export function updatelayouts(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/layouts/update",
    method: "post",
    data,
  });
}
// 布局配置查询
export function getlayoutsOption(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/layouts/get_option",
    method: "post",
    data,
  });
}
// 布局配置更新
export function updateLayoutsOption(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/layouts/option_update",
    method: "post",
    data,
  });
}
// 删除布局
export function deleteLayout(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/layouts/delete",
    method: "post",
    data,
  });
}
// 锁定解锁
export function lockOrUnlock(data) {
  return request({
    url: WAPI + "/wbi/resource_manage/lock_unlock",
    method: "post",
    data,
  });
}
