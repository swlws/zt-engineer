---
name: taro-weapp/structure
description: 项目目录约定、页面三件套、组件放置规则
type: project-skill-fragment
---

# 目录结构与文件约定

## 总体结构

```
src/
├── app.ts(x)            # 应用入口（与 app.config.ts 必须同时存在）
├── app.config.ts        # 全局配置：pages / window / tabBar / subPackages
├── app.scss             # 全局样式（仅放真正全局的）
├── pages/               # 页面
│   └── <name>/
│       ├── index.tsx
│       ├── index.scss
│       ├── index.config.ts
│       └── components/  # 页面私有子组件
├── components/          # 公共组件（PascalCase 目录）
├── services/            # 网络请求、SDK 封装
├── store/               # 全局状态（按需引入）
├── utils/               # 纯函数工具
├── styles/              # 全局 SCSS 变量 / mixin
└── types/               # 全局类型
```

## 页面三件套（缺一不可）

`src/pages/<name>/`：

1. `index.tsx` — 组件，默认导出函数组件，名 PascalCase
2. `index.scss` — 样式，根 class 与目录名一致（kebab-case）
3. `index.config.ts` — `definePageConfig({...})`

随后必须在 `src/app.config.ts` 的 `pages` 数组追加 `'pages/<name>/index'`，否则编译不到。

## 组件放置规则

| 复用范围 | 放置位置 | 命名 |
| --- | --- | --- |
| 多页面公用 | `src/components/<PascalName>/index.tsx` | PascalCase 目录 |
| 单页面专用 | `src/pages/<page>/components/<PascalName>/` | 同上 |
| 一次性内联 | 直接定义在页面文件内 | — |

公共组件目录同样推荐三件套（`index.tsx` + `index.scss` + 可选 `index.config.ts`）。

## 命名

- 目录 / 文件：kebab-case（页面、模块）；公共组件目录用 PascalCase
- React 组件：PascalCase
- 变量 / 函数：camelCase
- 常量：UPPER_SNAKE_CASE
- 类型 / 接口：PascalCase，不要加 `I` 前缀

## 禁止

- 不要在 `src/pages/` 下放非页面文件（工具、常量请移到 `utils/` 或 `constants/`）
- 不要把页面私有组件提升到 `src/components/`，除非确实被 2+ 页面使用
- 不要提交 `dist/`
