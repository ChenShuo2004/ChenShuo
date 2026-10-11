# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable Prototype Design Preferences

首页最新视觉方向（2026-10-10）：以用户提供的蓝色油画截图为色调和氛围参考，使用钴蓝 / 群青绘画底纹、烟白文字与少量朱红点缀。页面保持安静、朦胧、极简；不放人物、角色或肖像。

左上角品牌标识统一采用 `BrandSignature`：烟白衬线 KAI 字标、朱红句点、纤细竖向分隔线与小字号 CHEN SHUO / 定位说明；不再使用红色方框 K 印章。首页与公开二级页面共用，手机端紧凑缩放。

首页主区只呈现简洁的 KAI 身份标记与主要入口，下方保留品牌文字滚动条与固定账号入口；不再堆叠个人介绍、创业成绩、定位长文或页尾联系板块。个人内容放到二级页面，联系信息通过「联系我」弹窗按需展开；`/#contact` 直接打开弹窗。

首页 01 入口名称固定为「业务合作」，同步共享导航和 `/work` 页面标题；沿用 `/work` 路由，简介为「企业培训 / 商务 / 咨询 / GEO」。

首页主入口按钮为 5 个：业务合作 → `/work`、我的社区 → `/community`、自媒体 → `/media`、开源工具 → `/github`、联系我 → 首页 `#contact`；按钮网格换行为 3 + 2。入口居中呈现，顶部保留博客入口，不再展示自我介绍。

站点导航（共享头部）与首页主入口对齐：业务合作 `/work`、我的社区 `/community`、自媒体 `/media`、开源工具 `/github`、联系我 `/#contact`。

「联系我」弹窗保留邮箱、X、知识库、微信/社群四个入口；支持键盘焦点、Esc 关闭和手机滚动。首页默认不展示这些联系明细。

`/work` 采用 5 个均匀竖排条目：有温度空间、企业培训、商务 / 企业合作、1 对 1 咨询、GEO 服务；有温度空间不要做成过大的横向主卡，卡内清晰标注工具库、阅览室、知识地图；企业服务条目点击直接展示微信咨询二维码与微信号，手机端单列。

全站公开二级页面均需适配手机：共享头部转为紧凑导航、内容列表和阅读正文单列；尊重 `prefers-reduced-motion`。

首页不使用 halftone 肖像；蓝色油画参考只用于氛围和色彩，不复刻其中的人物。动效保持克制，尊重 reduced-motion 偏好。

The 代充业务 page and its `/sales-hub` route should remain deleted; do not restore or expose that business flow from the homepage.

首页下方只有品牌文字横向无缝循环滚动，文案固定为「一个持续生长的知识产品空间 · AI 社群 · 内容资产 · build in public ·」，采用截图里的薄线与大字样式；支持暂停和悬停暂停，reduced-motion 下静态呈现。滚动条下方的抖音、X、微信、邮箱四个入口固定展示，不滚动、不复制；保留图标与账号信息，桌面四列、平板两列、手机单列。抖音公开账号为「陈硕 KAI（30w 粉速通版）」、抖音号 22802710799，链接固定为 https://www.douyin.com/user/MS4wLjABAAAAUXlQ1xsLrrjEWb3v_k-0orHhnmz0HV-l0KfvqT9SaMtyti9DdR4mMAoIxb4tQi4I ，首页固定入口与 /media 使用同一链接；不使用 /user/self，不把昵称中的 30w 当作当前粉丝数。

站内邮箱统一为 `800354@gmail.com`，展示文字与 `mailto:` 链接共同维护在 `src/data/contactDetails.js`。

站内当前微信号统一为 `chenshuo8886669`，用于首页固定入口、联系弹窗、企业咨询与社区联系区；修改时统一维护 `src/data/contactDetails.js`。

自我介绍页面与所有公开入口移除；旧 `/about` 地址回到首页。WE30 当前有 500 位成员：首页社区入口、社区首屏、自媒体社区信息统一使用该数字。WE30 只保留一个社群，费用 499 元/人，同时需满足门槛（二选一）：00 后已跑通商业闭环并拿到实际结果，或有认知、有思考的人群（有自己的判断，愿意独立思考、深入交流，并已拿到一定的实际结果）。

业务合作新增「GEO 服务」，描述为 AI 搜索内容诊断、网站与知识内容优化、可见性跟踪；作为 `/work` 的第五项，与已有服务使用相同微信咨询入口，不预设价格或效果承诺。

## Durable Content Preferences

Do not position Chen Shuo as "04 大学生", "04 年生", or "大学休学" on the personal website. Use the current positioning: AI 连续创业者 / 国家一级写作专家（自封）, focused on products, knowledge base, information structure, and using information gaps plus knowledge organization to build monetizable systems.

个人创业经历与“一个持续生长的知识产品空间”主线保留在博客历史复盘中；首页只保留简洁身份与入口。社区定位仍以“打造全国最大的 AI 社区”为核心。

工具库、阅览室和知识地图是社区共建生态的组成部分，连接成一个持续生长的ai社区。

所有公开二级页面（业务合作、社区、自媒体、开源工具、博客和文章、知识地图、知识库、工具库、阅览室）统一使用首页的钴蓝油画底、烟白文字、克制朱红点缀、细线与简洁排版。通过 `src/DetailPages.css` 共享主题，保留原有业务功能；标题、简介、列表、返回路径清晰，不添加复杂装饰或肖像。管理后台不套用公开页面主题。
- 自媒体（原「全平台信号台」）独立成 `/media` 二级页面，作为单栏满宽的薄线信号列表；优先呈现 X 1W+ 粉丝、YouTube 30万+ 订阅、飞书知识库、开源工具库、全国 AI 社区，使用清晰可见的平台图标；不再与 About me 拼在同一区块，也不再出现两栏中缝分割线。
- `/github` 是「开源工具」入口页，复用现有路由，不另建 `/open-source`。页面主叙事展示 `cs-board`（本地 AI 白板视频工具，Python，v1.0.0）、`cs-skills`（陈硕的 Codex Skills 与 AI 工作流手册）和 `cs-xiaohuang-skill`（小黄统一 Skill，用于品牌 IP 延展、中文轻手绘 PPT、文章封面与正文配图）；GitHub 公开仓库、Followers、Stars 数据只作为辅助证明。
- `/work` 的「有温度空间」(https://aiyouwendu.com/home) 是工具库、阅览室、知识地图的唯一聚合入口；企业培训、商务 / 企业合作、1 对 1 咨询、GEO 服务均通过站内微信二维码承接，其中 1 对 1 咨询明确报价 999 元/小时。
- 微信咨询二维码弹窗的备注提示必须清晰，要求用户添加时备注姓名、需求类型和具体问题，方便快速判断与回复。
- 知识地图只呈现信息结构与路径入口；“关于这个知识库的起点”等长文内容放在独立的知识库页面，不在知识地图页下方展示。
- 社区页只呈现一个「WE30 社群」：当前 500 位成员，入群费用 499 元/人，同时需满足门槛（二选一）：00 后已跑通商业闭环并拿到实际结果，或有认知、有思考的人群（有自己的判断，愿意独立思考、深入交流，并已拿到一定的实际结果）；不需要验资。不再区分核心群与大群，不保留大群入口或粉丝门槛，申请信息使用全宽单栏。首页不另设社区说明板块。
- “加入社区”与微信二维码放在全部社区内容之后。添加微信必须备注姓名、申请加入 WE30、符合哪类门槛和思考与实际成果；00 后商业实践者说明商业闭环与结果，认知与思考类申请者分享判断、思考和已经拿到的实际结果；不备注不通过。
- 社区页首屏左侧只保留一行清晰主张；右侧说明 WE30 社群的价值、费用与二选一入群门槛，并使用清晰的现代中文无衬线标题，避免过度装饰的中文展示字体。
- 阅览室的正式外部入口固定为 FlowUs：https://flowus.cn/c712040f-ef98-44b9-b37d-dd187d92fc4d；导航、产品卡和“进入阅览室”按钮均指向该地址。

## Durable Motion Preference

- 首屏加载动画只在同一标签页首次打开公开网站且等待超过 600 毫秒时出现；加载快时直接进入，成功进入后刷新或访问二级页面不重复播放。加载画面独立于主程序、外部字体和图片，沿用钴蓝底、烟白 KAI 字标、朱红句点与细线动画；正文就绪立即退出，不等待装饰背景图。失败时保留重试入口。手机端适配动态视口、安全区、小屏和横屏滚动，并尊重 reduced-motion。

- 公开页面使用克制的一次性进入动效：首屏分段淡入，滚动进入视口时轻微上移并淡入；尊重 `prefers-reduced-motion`，`/admin` 不参与。

- 业务合作面向个人与企业，1 对 1 咨询也承接企业需求；陈硕主要活跃于深圳、厦门、香港，在 `/work` 首屏简洁说明。

## Durable Appearance and Language Preferences

- 公开网站右上角提供主题色与中英文切换，首页与共享二级页面头部共用；默认保留钴蓝，可选择松绿、墨黑，沿用油画底纹、烟白文字与朱红点缀。用户选择保存在本地，刷新与跨页面保持；管理后台不参与。
- 英文模式翻译公开导航、服务、社区说明、按钮和联系入口；已发布博客原文保留原语言并清晰提示。手机端入口保持紧凑，支持键盘操作。
