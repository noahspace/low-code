import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // 首页
  {
    path: "/",
    name: "home",
    meta: { title: "首页", requiresAuth: true },
    component: () => import(/* webpackChunkName: "home" */ "../views/home"),
  },
  // 项目管理
  {
    path: "/project",
    name: "project",
    meta: {
      title: "项目管理",
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "layout" */ "../layout"),
    redirect: "/project/project-list",
    children: [
      {
        path: "/project/project-list",
        name: "project-list",
        meta: {
          title: "项目列表",
          requiresAuth: true,
          // roles: ["admin", "general"],
        },
        component: () =>
          import(/* webpackChunkName: "project-details" */ "../views/project/"),
      },
      // 项目管理 -> 项目详情
      {
        path: "/project/project-details",
        name: "project-details",
        meta: {
          title: "项目详情",
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "project-details" */ "../views/project/project-details"
          ),
        children: [
          {
            path: "/project/project-details/base-info/:id",
            name: "base-info",
            meta: {
              title: "项目基本信息",
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "base-info" */ "../views/project/project-details/base-info"
              ),
          },
          {
            path: "/project/project-details/run-monitor/:id",
            name: "run-monitor",
            meta: {
              title: "项目运行",
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "run-monitor" */ "../views/project/project-details/run-monitor"
              ),
          },
          {
            path: "/project/project-details/data-resource-manage/:id",
            name: "data-resource-manage",
            meta: {
              title: "数据资源管理",
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "data-resource-manage" */ "../views/project/project-details/data-resource-manage"
              ),
          },
          {
            path: "/project/project-details/service-manage/:id",
            name: "service-manage",
            meta: {
              title: "服务资源管理",
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "service-manage" */ "../views/project/project-details/service-manage"
              ),
          },
        ],
      },
      // 项目管理 -> 项目页面管理
      {
        path: "/project/project-page/:id",
        name: "project-page",
        meta: {
          title: "项目页面管理",
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "project-page" */ "../views/project/project-page"
          ),
        children: [
          {
            path: "/project/project-page/:id/preview/:pageId?",
            name: "page-preview",
            meta: {
              title: "页面查看",
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "preview" */ "../views/project/project-page/preview"
              ),
          },
          {
            path: "/project/project-page/:id/baseinfo/:pageId?",
            name: "baseinfo",
            meta: {
              title: "基本信息",
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "baseinfo" */ "../views/project/project-page/baseinfo"
              ),
          },
        ],
      },
      // 页面创建选择模板
      {
        path: "/project/project-page-create/:id/:pageId",
        name: "project-page",
        meta: {
          title: "项目页面创建",
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "project-page" */ "../views/project/project-page-create"
          ),
      },
      // 项目管理 -> 创建项目
      {
        path: "/project/project-create/:id?",
        name: "project-create",
        meta: {
          title: "创建项目",
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "project-create" */ "../views/project/project-create"
          ),
      },
      // 项目管理 -> 项目授权
      {
        path: "/project/authorization/:id",
        name: "authorization",
        meta: {
          title: "项目授权",
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "authorization" */ "../views/authorization"
          ),
      },
    ],
  },
  // 资源管理
  {
    path: "/resource",
    name: "resource",
    meta: {
      title: "资源管理",
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "layout" */ "../layout"),
    redirect: "/resource/components",
    children: [
      // 资源管理 -> 组件管理
      {
        path: "/resource/components",
        name: "components",
        meta: {
          title: "组件管理",
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "components" */ "../views/resource/components"
          ),
        redirect: "/resource/components/resource",
        children: [
          // 资源管理 -> 组件管理 -> 资源管理
          {
            path: "/resource/components/resource",
            name: "components-resource",
            meta: {
              title: "组件资源",
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "components-resource" */ "../views/resource/components/resource"
              ),
            redirect: "/resource/components/resource/list",
            children: [
              {
                path: "/resource/components/resource/list",
                name: "components-resource-list",
                meta: {
                  title: "组件库列表",
                  requiresAuth: true,
                },
                component: () =>
                  import(
                    /* webpackChunkName: "components-resource-list" */ "../views/resource/components/resource/list"
                  ),
              },
              {
                path: "/resource/components/resource/details/:id",
                name: "components-resource-details",
                meta: {
                  title: "组件库详情",
                  requiresAuth: true,
                },
                component: () =>
                  import(
                    /* webpackChunkName: "components-resource-details" */ "../views/resource/components/resource/details"
                  ),
              },
            ],
          },
          // 资源管理 -> 组件管理 -> 分类管理
          {
            path: "/resource/components/category",
            name: "category",
            meta: {
              title: "组件分类",
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "category" */ "../views/resource/components/category"
              ),
          },
        ],
      },
      // 资源管理 -> 图标管理
      {
        path: "/resource/icons",
        name: "icons",
        meta: {
          title: "图标管理",
          requiresAuth: true,
        },
        component: () =>
          import(/* webpackChunkName: "icons" */ "../views/resource/icons"),
        redirect: "/resource/icons/list",
        children: [
          {
            path: "/resource/icons/list",
            name: "icons-list",
            meta: {
              title: "图标列表",
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "icons-list" */ "../views/resource/icons/list"
              ),
          },
          {
            path: "/resource/icons/details",
            name: "icons-details",
            meta: {
              title: "图标详情",
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "icons-details" */ "../views/resource/icons/details"
              ),
          },
        ],
      },
      // 资源管理 -> 插图管理
      {
        path: "/resource/illustrations",
        name: "illustrations",
        meta: {
          title: "插图管理",
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "illustrations" */ "../views/resource/illustrations"
          ),
        redirect: "/resource/illustrations/list",
        children: [
          {
            path: "/resource/illustrations/list",
            name: "illustrations-list",
            meta: {
              title: "插图列表",
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "illustrations-list" */ "../views/resource/illustrations/list"
              ),
          },
          {
            path: "/resource/illustrations/details/:id",
            name: "illustrations-details",
            meta: {
              title: "插图详情",
              requiresAuth: true,
            },
            component: () =>
              import(
                /* webpackChunkName: "illustrations-details" */ "../views/resource/illustrations/details"
              ),
          },
        ],
      },
      // 资源管理 -> 图片管理
      {
        path: "/resource/images",
        name: "images",
        meta: {
          title: "图片管理",
          requiresAuth: true,
        },
        component: () =>
          import(/* webpackChunkName: "images" */ "../views/resource/images"),
      },
      // 资源管理 -> 布局管理
      {
        path: "/resource/layouts",
        name: "layouts",
        meta: {
          title: "布局管理",
          requiresAuth: true,
        },
        component: () =>
          import(/* webpackChunkName: "layouts" */ "../views/resource/layouts"),
      },
      {
        path: "/resource/layouts/layout-info",
        name: "layout-info",
        meta: {
          title: "布局管理详情",
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "theme-info" */ "../views/resource/layouts/layout-info"
          ),
      },
      // 资源管理 -> 服务器管理
      {
        path: "/resource/servers",
        name: "servers",
        meta: {
          title: "服务器管理",
          requiresAuth: true,
        },
        component: () =>
          import(/* webpackChunkName: "servers" */ "../views/resource/servers"),
      },
      {
        path: "/resource/servers/server-info/:id",
        name: "server-info",
        meta: {
          title: "服务器管理详情",
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "theme-info" */ "../views/resource/servers/server-info"
          ),
      },
      // 资源管理 -> 主题管理
      {
        path: "/resource/themes",
        name: "themes",
        meta: {
          title: "主题管理",
          requiresAuth: true,
        },
        component: () =>
          import(/* webpackChunkName: "themes" */ "../views/resource/themes"),
      },
      {
        path: "/resource/themes/theme-info/",
        name: "theme-info",
        meta: {
          title: "主题管理详情",
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "theme-info" */ "../views/resource/themes/theme-info"
          ),
      },
    ],
  },
  // 平台监测
  {
    path: "/monitor",
    name: "monitor",
    meta: { title: "平台监测", requiresAuth: true },
    component: () => import(/* webpackChunkName: "layout" */ "../layout"),
    redirect: "/monitor/system",
    children: [
      // 平台监测 -> 系统运行资源监测
      {
        path: "/monitor/system",
        name: "system",
        meta: {
          title: "系统运行资源监测",
          requiresAuth: true,
        },
        component: () =>
          import(/* webpackChunkName: "system" */ "../views/monitor/system"),
      },
      // 平台监测 -> 数据库运行监测
      {
        path: "/monitor/db",
        name: "db",
        meta: {
          title: "数据库运行监测",
          requiresAuth: true,
        },
        component: () =>
          import(/* webpackChunkName: "db" */ "../views/monitor/db"),
      },
      // 平台监测 -> SQL 执行监测
      {
        path: "/monitor/sql",
        name: "sql",
        meta: {
          title: "SQL 执行监测",
          requiresAuth: true,
        },
        component: () =>
          import(/* webpackChunkName: "sql" */ "../views/monitor/sql"),
      },
      // 平台监测 -> 访问审计
      {
        path: "/monitor/access-audit",
        name: "access-audit",
        meta: {
          title: "访问审计",
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "access-audit" */ "../views/monitor/access-audit"
          ),
      },
      // 平台监测 -> 操作日志
      {
        path: "/monitor/operation-log",
        name: "operation-log",
        meta: {
          title: "操作日志",
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "operation-log" */ "../views/monitor/operation-log"
          ),
      },
    ],
  },
  // UI 工作台
  {
    path: "/ui-workbench/:type/:pageId?/:projectId?",
    name: "ui-workbench",
    meta: { title: "UI 工作台", requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "ui-workbench" */ "../views/ui-workbench"),
  },
  // 预览
  {
    path: "/preview/:type/:pageId?/:projectId?",
    name: "preview",
    meta: { title: "预览", requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "preview" */ "../views/preview"),
  },
  // 帮助中心
  {
    path: "/help",
    name: "help",
    meta: { title: "帮助中心", requiresAuth: true },
    component: () => import(/* webpackChunkName: "layout" */ "../layout"),
    redirect: "/help/center",
    children: [
      {
        path: "/help/center",
        name: "center",
        meta: {
          title: "帮助文档",
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "help" */ "../views/help"),
      },
    ],
  },
  // 登录
  {
    path: "/login",
    name: "login",
    meta: { title: "登录", requiresAuth: true },
    component: () => import(/* webpackChunkName: "login" */ "../views/login"),
  },
  // 错误
  {
    path: "/error",
    name: "error",
    meta: { title: "错误", requiresAuth: true },
    component: () => import(/* webpackChunkName: "layout" */ "../layout"),
    children: [
      // 错误 -> 无权限
      {
        path: "/error/401",
        name: "401",
        meta: {
          title: "无权限",
          requiresAuth: true,
        },
        component: () =>
          import(/* webpackChunkName: "401" */ "../views/error/401"),
      },
      // 错误 -> 404
      {
        path: "/error/404",
        name: "404",
        meta: {
          title: "404",
          requiresAuth: true,
        },
        component: () =>
          import(/* webpackChunkName: "404" */ "../views/error/404"),
      },
    ],
  },
  { path: "*", redirect: "/error/404" },
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};

export default router;
