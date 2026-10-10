# Chen Shuo · Personal Site

> 一个持续生长的个人商业系统：把经历、内容、工具和知识，连接成可以被看见、理解并持续复用的产品空间。

[![Live Site](https://img.shields.io/badge/Live%20Site-everlightai.top-0f5fb8?style=flat-square&logo=vercel&logoColor=white)](https://everlightai.top/)
[![Repository](https://img.shields.io/badge/Repository-GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/ChenShuo2004/ChenShuo)
[![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)

![Chen Shuo personal site preview](./public/assets/hero-cinematic-reference.jpg)

## 这是什么

这是陈硕的个人介绍网站，也是一个持续迭代中的知识产品空间。

陈硕是一名 AI 连续创业者，长期关注：

- AI 产品与工具实验
- 内容资产与个人品牌
- 知识库、信息结构与认知路径
- 独立创业与个人商业化

网站不只是个人简历，而是把“我是谁、我在做什么、我如何思考、你可以从哪里开始”组织成一个可探索的入口。

## 三条产品线

| 产品线 | 解决的问题 | 入口 |
| --- | --- | --- |
| **工具库** | 把 AI 想法快速做成可体验、可验证的产品 | [打开工具库](https://everlightai.top/tools) |
| **阅览室** | 把心理、认知与行动方法整理成阅读路径 | [打开阅览室](https://everlightai.top/reading) |
| **知识地图** | 把分散信息组织成可理解、可执行的结构 | [打开知识地图](https://everlightai.top/knowledge) |

## 页面结构

- [`/`](https://everlightai.top/) — 个人主页：定位、产品线、能力与联系方式
- [`/tools`](https://everlightai.top/tools) — AI 工具与产品实验室介绍
- [`/reading`](https://everlightai.top/reading) — “有温度阅览室”入口
- [`/knowledge`](https://everlightai.top/knowledge) — 知识库起点与信息结构说明
- [`/community`](https://everlightai.top/community) — AI、产品、内容与个人商业化实践社群
- `/admin` — 私有数据分析面板

## 技术栈

- **Frontend**: React 19 + Vite 6
- **UI / Motion**: CSS、GSAP、Motion、Three.js、React Bits 风格交互组件
- **Icons**: Phosphor Icons
- **Analytics**: Vercel Functions + Supabase
- **Deployment**: Vercel

## 本地运行

### 环境要求

- Node.js 18+
- npm 9+

### 安装与启动

```bash
npm install
npm run dev
```

打开 [http://127.0.0.1:5173](http://127.0.0.1:5173) 即可查看。

### 构建检查

```bash
npm run build
npm run preview
```

## 环境变量

复制 `.env.example` 为 `.env.local`，按需配置：

```bash
ADMIN_ANALYTICS_PASSWORD=
BLOB_READ_WRITE_TOKEN=
SUPABASE_URL=
SUPABASE_SECRET_KEY=
```

分析功能使用服务端 API，Supabase 密钥只能放在服务端环境变量中，不能提交到仓库，也不能写入 `VITE_*` 变量或浏览器代码。

如果只想本地查看网站首页，不配置这些变量也可以运行前端页面。

## 项目结构

```text
.
├── api/                    # Vercel Serverless Functions
├── public/assets/          # 图片、头像与产品视觉资源
├── src/
│   ├── App.jsx             # 页面路由与主要页面内容
│   ├── styles.css          # 全局视觉系统与响应式样式
│   └── *.jsx / *.css       # 可复用交互组件
├── supabase/migrations/    # Analytics 数据表迁移
├── index.html
├── package.json
└── vercel.json
```

## 设计原则

这个站点遵循几条简单的原则：

1. **先让人看懂，再让人惊喜**：视觉服务于定位和行动路径。
2. **Less Code, More Product**：优先验证真实需求，再增加复杂度。
3. **把信息变成路径**：内容不是收藏，而是理解与行动之间的桥梁。
4. **持续实验**：工具、页面和表达方式都可以快速迭代。

## 部署

项目适合直接部署到 Vercel：

1. 导入 GitHub 仓库。
2. 使用默认的 Vite 构建配置。
3. 在项目设置中添加服务端环境变量。
4. 部署后检查 `/`、`/tools`、`/reading`、`/knowledge` 和 `/community`。

`vercel.json` 已配置 SPA fallback，支持直接访问站内路径。

## 联系我

- Email: [800354@gmail.com](mailto:800354@gmail.com)
- 微信: `chenshuo8886669`
- 知识库: [FlowUs 知识库](https://flowus.cn/c712040f-ef98-44b9-b37d-dd187d92fc4d)
- 产品库: [aiyouwendu.com/products](https://aiyouwendu.com/products)

如果你正在做 AI 产品、内容系统、知识管理或个人商业化，欢迎交流。

---

© Chen Shuo · AI / Content / Product / System
