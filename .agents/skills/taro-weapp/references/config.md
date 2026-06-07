---
name: taro-weapp/config
description: app.config / 页面 config / tabBar / 分包 / 权限声明
type: project-skill-fragment
---

# 配置规则

## `src/app.config.ts`

模板：

```ts
export default defineAppConfig({
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black'
  }
})
```

常用字段：

| 字段 | 说明 |
| --- | --- |
| `pages` | 注册页面，**第一项为首页**，新页面必须追加 |
| `window` | 全局导航栏、下拉背景 |
| `tabBar` | tab 配置，`list` 长度 2–5 |
| `subPackages` | 分包，键名 `root`，页面相对 root |
| `permission` | 隐私接口声明（位置等） |
| `requiredPrivateInfos` | 调用 `getLocation` 等必须声明 |
| `lazyCodeLoading` | 一般设 `'requiredComponents'` 优化首启 |

## tabBar

```ts
tabBar: {
  color: '#999',
  selectedColor: '#1677ff',
  backgroundColor: '#fff',
  list: [
    { pagePath: 'pages/index/index', text: '首页', iconPath: '...', selectedIconPath: '...' },
    { pagePath: 'pages/mine/index',  text: '我的', iconPath: '...', selectedIconPath: '...' }
  ]
}
```

规则：

- `pagePath` 必须出现在 `pages` 中
- 图标推荐 81x81 px，PNG，**不要 SVG**（小程序不稳定）
- 用 `Taro.switchTab` 跳转 tabBar 页

## 分包

容量上限：主包 ≤ 2MB，单分包 ≤ 2MB，整包 ≤ 20MB。

```ts
subPackages: [
  {
    root: 'pages-order',
    pages: ['detail/index', 'list/index']
  }
]
```

- 文件目录与 `root` 对齐：`src/pages-order/detail/index.tsx`
- 跳转用完整路径：`/pages-order/detail/index`
- 仅首页和 tabBar 页必须在主包

## 页面 config（`*.config.ts`）

```ts
export default definePageConfig({
  navigationBarTitleText: '订单详情',
  enablePullDownRefresh: false,
  onReachBottomDistance: 50,
  usingComponents: {}
})
```

- 标题为空时也要写 `''`，避免显示上级标题残留
- 需要下拉刷新必须同时打开 `enablePullDownRefresh` 且页面用 `usePullDownRefresh`

## `project.config.json`

- `miniprogramRoot` 应指向 `dist/`（已配置）
- `appid` 不要随手改，更换需与用户确认
- `setting.urlCheck` 开发期可关，**上传前必须开**

## `config/index.ts`（Taro 构建配置）

- `designWidth: 750` — 不要改
- 修改 `mini.postcss.pxtransform` 会影响所有 `px → rpx` 转换，慎动
- 新增 webpack 插件走 `webpackChain`
