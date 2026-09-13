# Prototype Instructions

Run the local server yourself and open the preview in the in-app browser. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable Prototype Design Preferences

The homepage is a compact one-screen portal: use black, white, and gray, keep the interactive `DepthText` wordmark “陈硕KAI”, and expose only the three core entries 开源工具、知识库、社区. The hero must use the existing particle portrait effect with the user-provided “陈硕角色” character illustration, with no visible source-image base or realistic human portrait. Keep the inline contact links minimal and preserve the longer category/detail content on its existing routes rather than expanding the homepage into a long landing page.

For the homepage editorial style, use a warm off-white Sac-inspired layout with a large serif KAI wordmark, restrained typography, thin guide lines, and a coral accent.

For the homepage editorial layout, keep the founder copy and two outline actions on the left, with the provided halftone portrait large on the right; keep the first viewport focused on this introduction.

For the product-lines section, use the single-line “构建ing” heading at desktop widths, scaling it down before allowing the editorial grid to break.

For the homepage navigation, do not expose a right-side business CTA; keep the hero area focused on the “加入社区” entry.

For the hero visual, use the provided halftone portrait as the source image and keep motion subtle, optional, and respectful of reduced-motion preferences.

The 代充业务 page and its `/sales-hub` route should remain deleted; do not restore or expose that business flow from the homepage.

## Durable Content Preferences

Do not position Chen Shuo as "04 大学生", "04 年生", or "大学休学" on the personal website. Use the current positioning: AI 连续创业者 / 国家一级写作专家（自封）, focused on products, knowledge base, information structure, and using information gaps plus knowledge organization to build monetizable systems.

首页个人介绍尽量保留原来的创业经历与“一个持续生长的知识产品空间”主线，社区定位以“打造全国最大的 AI 社区”为核心。

工具库、阅览室和知识地图是社区共建生态的组成部分，连接成一个持续生长的ai社区。

For the full site, use one shared Sac-inspired editorial system: warm paper canvas, black serif display type, coral metadata labels, thin rules, numbered specs, square outline actions, and one shared header. Detail pages should keep the same system while adding a clear reading hierarchy: title, metadata, long-form content grid, and return path.
- 全平台信号台在桌面端应作为右侧紧凑信息栏呈现，使用清晰可见的平台图标和薄线列表，不再占据整屏宽度。
- About me 模块延续参考稿：左侧使用大号英文标题、三段当前定位文案和带技术规格标记的肖像框，右侧保留紧凑的全平台信号栏。
- 知识地图只呈现信息结构与路径入口；“关于这个知识库的起点”等长文内容放在独立的知识库页面，不在知识地图页下方展示。
- 社区页不展示价格、付费或早鸟价信息；将“加入社区”与微信咨询入口置于全部社区内容之后，作为最终咨询入口。
- 社区页以 WE30 为一个三层社区呈现：核心群、一群（业务与增长）、二群（开放孵化）。不再展示 X AI 创作者增长群；通过一个微信二维码人工匹配，首页右侧保留简洁的三层入口说明。
- 社区页首屏左侧只保留一行清晰主张；右侧说明 WE30 的核心群、一群与二群价值，并使用清晰的现代中文无衬线标题，避免过度装饰的中文展示字体。
- 阅览室的正式外部入口固定为 FlowUs：https://flowus.cn/c712040f-ef98-44b9-b37d-dd187d92fc4d；导航、产品卡和“进入阅览室”按钮均指向该地址。
- 构建ing 区块以「有温度空间」（https://aiyouwendu.com/home）作为主入口，置于工具库、阅览室、知识地图三个入口之上。

## Durable Motion Preference

- 公开页面使用克制的一次性进入动效：首屏分段淡入，滚动进入视口时轻微上移并淡入；尊重 `prefers-reduced-motion`，`/admin` 不参与。
