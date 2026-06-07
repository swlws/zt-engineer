---
name: taro-weapp/build
description: 构建命令、调试、多端差异、常见报错
type: project-skill-fragment
---

# 构建与调试

## 命令

```bash
yarn dev:weapp     # 微信小程序 watch 构建（开发常用）
yarn build:weapp   # 生产构建
yarn dev:h5        # H5 调试
yarn build:h5      # H5 生产
```

产物：`dist/`。用微信开发者工具打开**项目根目录**（`project.config.json` 已配 `miniprogramRoot: dist/`）。

## 多端

- 平台分支用 `process.env.TARO_ENV`：`'weapp' | 'h5' | 'alipay' | 'tt' | 'swan' | 'qq' | 'jd' | 'rn' | 'harmony-hybrid'`

```ts
if (process.env.TARO_ENV === 'weapp') {
  // 仅小程序
}
```

- 组件优先 `@tarojs/components`（`View` / `Text` / `ScrollView` / `Image` / `Button`）
- 不要直接写 `<div>` / `<span>`，多端不通
- 不要假设 `document` / `window` / `localStorage` 存在

## 常见报错

| 报错 / 现象 | 原因 | 处理 |
| --- | --- | --- |
| `definePageConfig is not defined` | 缺 `*.config.ts` 或路径错 | 补三件套并在 app.config 注册 |
| 页面白屏 / 找不到 | 未注册到 `app.config.ts > pages` | 追加路径 |
| 样式不生效 | 未 `import './index.scss'` / class 拼写 / `px → rpx` 误转 | 检查 import；细节像素用 `1Px` |
| `Taro.xxx is not a function` | 版本不对 / 拼写错 | 确认 `@tarojs/taro@4.2.0` |
| tabBar 跳转无效 | 用了 `navigateTo` | 改 `switchTab`，且不能带 query |
| 真机分包加载报错 | 分包目录与 `root` 不一致 | 对齐目录结构 |
| 真机存储满 | 单 key > 1MB 或总量 > 10MB | 拆分 / 清理 |
| `getLocation` 失败 | 未在 `requiredPrivateInfos` 声明 | 在 app.config 补声明 |
| 上传报 `urlCheck` 错误 | 域名未配 / 未关闭检查 | 后台配域名，禁用临时调试 |

## 性能要点

- 首页避免大图（>200KB）和大 JSON
- 长列表用 `ScrollView` + 虚拟化或 `recycle-view`
- `setData` 等价物：函数组件的 `setState` 频繁调用要合批
- 图片走 CDN，列表项 `image` 加 `lazy-load`
- `app.config.lazyCodeLoading = 'requiredComponents'` 减少首屏

## 调试技巧

- `Taro.getCurrentInstance().router` 拿当前路由信息
- 真机调试看 `console` + `vConsole`（开发者工具左下角）
- 网络请求看 Network 面板，注意 `header` 与 `referer`
- 性能用「Trace」面板看启动时长
