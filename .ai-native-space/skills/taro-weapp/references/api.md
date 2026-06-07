---
name: taro-weapp/api
description: Taro API、生命周期 Hook、路由、网络请求、Storage、事件
type: project-skill-fragment
---

# Taro API 使用

## 总原则

- **必须用 `@tarojs/taro` 暴露的 API**，禁止直接 `wx.*`，否则失去多端能力
- 异步 API 用 Promise / `await`，不用 `success/fail` 回调

```ts
// ✅
const res = await Taro.request<Resp>({ url, method: 'GET' })

// ❌
Taro.request({ url, success(res) { ... } })
```

## 生命周期 Hook

| Hook | 用途 |
| --- | --- |
| `useLaunch` | App 启动（仅 `src/app.ts(x)`） |
| `useLoad` | 页面加载，拿到路由参数 |
| `useReady` | 页面初次渲染完成 |
| `useDidShow` / `useDidHide` | 页面前后台切换 |
| `useUnload` | 页面卸载，**清理事件 / 定时器** |
| `usePullDownRefresh` | 下拉刷新（需 page config 打开） |
| `useReachBottom` | 上拉到底 |
| `useShareAppMessage` | 转发好友 |
| `useShareTimeline` | 分享朋友圈 |

不要写 class 生命周期（项目无类组件）。

## 路由

| 场景 | API | 说明 |
| --- | --- | --- |
| 普通跳转 | `Taro.navigateTo` | 保留当前页 |
| 替换 | `Taro.redirectTo` | 当前页不入栈 |
| tabBar | `Taro.switchTab` | **不能传 query** |
| 清栈 | `Taro.reLaunch` | 关闭所有页面 |
| 返回 | `Taro.navigateBack` | `{ delta }` |

参数传递：

- 简单可序列化 → URL query
- 复杂对象 → 全局 store 或 `Taro.eventCenter`，**不要 JSON.stringify 后塞 URL**

## 网络请求

- 统一封装在 `src/services/request.ts`，组件内**禁止裸调** `Taro.request`
- 封装必须包含：超时、错误统一处理、登录态失效跳转、（可选）加载态

```ts
// src/services/request.ts
import Taro from '@tarojs/taro'

interface Options<B = unknown> {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: B
  header?: Record<string, string>
}

export async function request<T>(opts: Options): Promise<T> {
  const res = await Taro.request<{ code: number; data: T; msg: string }>({
    timeout: 10_000,
    ...opts,
    header: { 'content-type': 'application/json', ...opts.header }
  })
  if (res.statusCode !== 200) throw new Error(`HTTP ${res.statusCode}`)
  if (res.data.code !== 0) throw new Error(res.data.msg)
  return res.data.data
}
```

业务接口按域划分文件：`src/services/user.ts`、`src/services/order.ts`…

## Storage

- 同步小数据 → `Taro.setStorageSync` / `getStorageSync`
- 大数据或不阻塞 → 异步版本
- 单 key 上限 1MB，总量 10MB
- 推荐对 key 集中常量化：`src/constants/storage-keys.ts`

## 事件中心

```ts
Taro.eventCenter.on('order:paid', handler)
// 卸载时必须解绑
useUnload(() => Taro.eventCenter.off('order:paid', handler))
```

## 选择器 / DOM

小程序端没有 `document` / `window`。需要节点信息用：

```ts
const query = Taro.createSelectorQuery()
query.select('.my-node').boundingClientRect().exec(res => { ... })
```
