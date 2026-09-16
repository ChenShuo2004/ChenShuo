# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable Prototype Design Preferences

For the homepage editorial style, use a warm off-white Sac-inspired layout with a large serif KAI wordmark, restrained typography, thin guide lines, and a coral accent.

首页保持极简：只保留 Hero（大号 KAI 字标 + 定位文案 + 四个主入口按钮）和最底部的「Let's talk / 联系我」区块。四个按钮之外的内容（在做的事情、自媒体、自我介绍等）全部放到二级页面，首页中间不再堆叠长内容板块。入口要一眼看清“我在干嘛”。

首页主入口按钮为 5 个：在做的事情 → `/work`、我的社区 → `/community`、自媒体 → `/media`、自我介绍 → `/about`、联系我 → 首页 `#contact`；按钮网格换行为 3 + 2，「自我介绍」落在左下角。左侧保留创始人文案与个人介绍，右侧保留 halftone 肖像。

站点导航（共享头部）与四个主入口对齐：在做的事情 `/work`、自媒体 `/media`、自我介绍 `/about`、我的社区 `/community`、联系我 `/#contact`。

「Let's talk / 联系我」联系卡固定为 5 个入口：桌面/平板端前 4 个（邮箱、X、知识库、微信/社群）保持等宽网格，第 5 个「读我的自我介绍与复盘」→ `/about` 作为整行横向 feature 卡，避免出现空缺格；手机端全部单列堆叠。

`/work` 只保留一个「有温度空间」产品总入口，卡内清晰标注工具库、阅览室、知识地图；企业培训、商单 / 企业合作、1 对 1 咨询作为三张等宽服务卡，点击直接展示微信咨询二维码与微信号，手机端单列。

全站二级页面（/work、/media、/about）均需适配手机：共享头部转为紧凑两行、编辑网格与信号列表单列、复盘章节单列、肖像框高度收窄；尊重 `prefers-reduced-motion`。

For the hero visual, use the provided halftone portrait as the source image and keep motion subtle, optional, and respectful of reduced-motion preferences.

The 代充业务 page and its `/sales-hub` route should remain deleted; do not restore or expose that business flow from the homepage.

## Durable Content Preferences

Do not position Chen Shuo as "04 大学生", "04 年生", or "大学休学" on the personal website. Use the current positioning: AI 连续创业者 / 国家一级写作专家（自封）, focused on products, knowledge base, information structure, and using information gaps plus knowledge organization to build monetizable systems.

首页个人介绍尽量保留原来的创业经历与“一个持续生长的知识产品空间”主线，社区定位以“打造全国最大的 AI 社区”为核心。

工具库、阅览室和知识地图是社区共建生态的组成部分，连接成一个持续生长的ai社区。

For the full site, use one shared Sac-inspired editorial system: warm paper canvas, black serif display type, coral metadata labels, thin rules, numbered specs, square outline actions, and one shared header. Detail pages should keep the same system while adding a clear reading hierarchy: title, metadata, long-form content grid, and return path.
- 自媒体（原「全平台信号台」）独立成 `/media` 二级页面，作为单栏满宽的薄线信号列表（X、飞书、GitHub、全国 AI 社区），使用清晰可见的平台图标；不再与 About me 拼在同一区块，也不再出现两栏中缝分割线。
- 自我介绍独立成 `/about` 二级页面：顶部沿用参考稿的大号中文标题、当前定位文案与带技术规格标记的肖像框，其下放个人复盘全文（按章节卡片呈现，来源为 X 复盘连帖 2086710313219727862）。复盘同时从首页「Let's talk / 联系我」区块与首页左下角「自我介绍」按钮提供入口。
- `/about` 自我介绍文案以真实 X 资料为准（陈硕 KAI、AI 连续创业者、厦门带团队、AI 产品/内容/知识库主线，跨境/YouTube 数亿播放/Crypto 支线、BTC·ETH 持有者、组建 WE30）。复盘章节内嵌从 X 连帖（2086710313219727862）提取的证据截图：复盘引言处放理想汽车建联的微信截图（顶部对齐裁切，`review-figure-portrait`），孙哥播客网盘（02）、闲鱼 AI 绘本店铺 ¥95,626（04）、YouTube「potato」橘猫频道（05）、欧易 VIP / 代充信息差（06）、抬光·Everlight 团队知识库（08）。图片存放于 `public/assets/review/`。
- `/work` 的「有温度空间」(https://aiyouwendu.com/home) 是工具库、阅览室、知识地图的唯一聚合入口；企业培训、商单 / 企业合作、1 对 1 咨询均通过站内微信二维码承接，其中 1 对 1 咨询明确报价 999 元/小时。
- 知识地图只呈现信息结构与路径入口；“关于这个知识库的起点”等长文内容放在独立的知识库页面，不在知识地图页下方展示。
- 社区页不展示价格、付费或早鸟价信息；将“加入社区”与微信咨询入口置于全部社区内容之后，作为最终咨询入口。
- 社区页以 WE30 为一个三层社区呈现：核心群、一群（业务与增长）、二群（开放孵化）。不再展示 X AI 创作者增长群；通过一个微信二维码人工匹配，首页右侧保留简洁的三层入口说明。
- 社区页首屏左侧只保留一行清晰主张；右侧说明 WE30 的核心群、一群与二群价值，并使用清晰的现代中文无衬线标题，避免过度装饰的中文展示字体。
- 阅览室的正式外部入口固定为 FlowUs：https://flowus.cn/c712040f-ef98-44b9-b37d-dd187d92fc4d；导航、产品卡和“进入阅览室”按钮均指向该地址。

## Durable Motion Preference

- 公开页面使用克制的一次性进入动效：首屏分段淡入，滚动进入视口时轻微上移并淡入；尊重 `prefers-reduced-motion`，`/admin` 不参与。
