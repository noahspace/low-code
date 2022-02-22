# whayer-bi-present-platform

低代码平台前端项目

## 项目设置

```
yarn install
```

### 开发编译并启动热刷新

```
yarn serve
```

### 生产打包压缩

```
yarn build
```

## 开发资源

### 图标

[remixicon](https://remixicon.com/)

### UI 组件

[ElementUI](https://element.eleme.cn/)

## 重要文件夹介绍

```
│  App.vue 入口文件
│  main.js  入口文件
│
├─apis 接口资源
│
├─assets 公共资源
│
├─components 全局组件库
│  ...
│  ...
│  ├─ElxComponents ElementUI 组件二次封装
│  └─ProdRenderer 生产渲染器
│
├─library 拖拽组件库
│  ...
│  ...
│  │  componentMixin.js 组件公共混入代码
│  │  index.js 暴露插件安装器
│  │  Instance.js 组件全局实例工具
│  │
│  └─components 组件代码库
│      ├─WButton 某一个组件文件夹
│      │  │  bootstrap.js 组件引导程序
│      │  │  index.js 组件配置
│      │  │
│      │  ├─component 组件代码
│      │  │      index.vue
│      │  │
│      │  └─option 组件配置项
│      │          index.vue
│      │
│      ├─WContainer
│      │  │  bootstrap.js
│      │  │  index.js
│      │  │
│      │  ├─component
│      │  │      index.vue
│      │  │
│      │  └─option
│      │          index.vue
│      │
│      ├─WIcon
│      │  │  bootstrap.js
│      │  │  index.js
│      │  │
│      │  ├─component
│      │  │      index.scss
│      │  │      index.vue
│      │  │
│      │  └─option
│      │          index.vue
│      │
│      ├─WImage
│      │  │  bootstrap.js
│      │  │  index.js
│      │  │
│      │  ├─component
│      │  │      index.vue
│      │  │
│      │  └─option
│      │          index.vue
│      │
│      ├─WPagination
│      │  │  bootstrap.js
│      │  │  index.js
│      │  │
│      │  ├─component
│      │  │      index.vue
│      │  │
│      │  └─option
│      │          index.vue
│      │
│      └─WTable
│          │  bootstrap.js
│          │  index.js
│          │
│          ├─component
│          │      index.vue
│          │
│          └─option
│                  index.vue
│
├─router 路由
│
├─store 全局状态
│
├─utils 工具库
│
└─views
    ...
    ...
    └─ui-workbench 工作台
        └─components
            ├─ComponentLibraryPane 组件库面板
            │
            ├─GlobalVariablePane 全局变量面板
            │
            ├─IconLibraryPane 图标库面板
            │
            ├─IllustrationLibraryPane 插图库面板
            │
            ├─OptionsPane 右侧配置面板
            │
            ├─OutlineTreePane 组件树
            │
            ├─PictureLibraryPane 图片库面板
            │
            └─WorkbenchMain 工作区
                └─components
                    └─DevRenderer 开发渲染器
```

## 自定义组件使用

### MessageBox 提示弹窗消息


#### 使用方式

```
this.$messageBox({
  type: "success", // 提示类型，默认成功
  message: "", // 提示消息
});
```

### Pagination 分页组件

#### 属性

| 属性名称  | 属性介绍     | 是否必填 |
| --------- | ------------ | -------- |
| total     | 总条数       | 是       |
| pageSize  | 分页大小     | 否       |
| pageSizes | 分页大小列表 | 否       |

#### 事件

| 事件名称 | 事件介绍             | 事件参数                              |
| -------- | -------------------- | ------------------------------------- |
| change   | 分页大小和当前页改变 | {pageSize: Number, pageIndex: Number} |

### DialogWrapper 弹窗包裹器

#### 模板
```
<dialog-wrapper ref="projectOnline">
  <template slot-scope="{ projectId, close }">
    <projectOnline :projectId="projectId" @close="close" />
  </template>
</dialog-wrapper>
```

#### Slot

| name | 说明       | slot-scope           |
| ---- | ---------- | -------------------- |
| -    | 弹窗的内容 | 方法 show 传递的数据 |

#### 方法

| 事件名称 | 事件介绍 | 事件参数                                                       |
| -------- | -------- | -------------------------------------------------------------- |
| show     | 显示弹窗 | attributes（el-dialog 属性）, data(数据，通过 slot-scope 接收) |
| close    | 关闭弹窗 | 无                                                             |

