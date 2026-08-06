source visual truth path: C:/Users/Administrator/AppData/Local/Packages/MicrosoftWindows.Client.CBS_cw5n1h2txyewy/TempState/ScreenClip/{33C159E3-0172-42D3-9B50-BEDF9D69F601}.png
implementation screenshot path: D:/6.个人介绍网站/qa-font-desktop.png
mobile screenshot path: D:/6.个人介绍网站/qa-font-mobile.png
viewport: desktop 1728x1117, mobile 390x1100
state: initial hero load with web fonts ready

**Findings**
- No P0/P1/P2 findings.

**Required Fidelity Surfaces**
- Fonts and typography: added an editorial font system inspired by the reference. Chinese hero/title/body typography uses `Noto Serif SC` with Songti fallbacks. English display typography uses `Bebas Neue`/`Oswald` for a narrow poster-like look.
- Spacing and layout rhythm: title remains inside the hero composition on desktop and mobile. Mobile viewport reports `scrollWidth = 390`.
- Colors and visual tokens: typography remains monochrome-led with restrained red accents, matching the current film poster direction.
- Image quality and asset fidelity: no image changes in this pass.
- Copy and content: content remains unchanged; typography styling only.

**Patches Made Since Previous QA Pass**
- Added Google Font imports for `Bebas Neue`, `Oswald`, and `Noto Serif SC`.
- Added font variables and applied them to hero title, Roman title, nav, side rail, metrics, cards, sections, and body copy.
- Strengthened hero-specific selectors so the new title fonts are not overridden by legacy hero rules.
- Verified production build with `npm.cmd run build`.
- Verified actual browser font loading with `document.fonts.status = loaded`.

**Open Questions**
- If the site must work fully offline, local font files can be bundled later instead of using Google Fonts.

**Implementation Checklist**
- Keep preview server running for review.

**Follow-up Polish**
- If you want the reference style pushed further, the next pass should tighten spacing and make the English/number labels even more editorial.

final result: passed

---

GitHub Build page QA pass: 2026-08-06
source visual truth path: C:/Users/ADMINI~1/AppData/Local/Temp/codex-clipboard-d29c774c-4608-4527-9472-537adc3610a7.png
comparison image path: D:/coding/1.个人blog/audit/2026-08-06-github-build/comparison-source-implementation.jpg
implementation screenshot path: D:/coding/1.个人blog/audit/2026-08-06-github-build/implementation-desktop.png
mobile screenshot path: D:/coding/1.个人blog/audit/2026-08-06-github-build/implementation-mobile.png
viewport: desktop 1280x720 CSS px, mobile 390x844 CSS px
source pixels: 1735x803; implementation pixels: 1265x712 desktop and 375x812 mobile; device scale factor: 1; browser captures exclude the visible scrollbar, so raw screenshot width is smaller than the CSS viewport
state: `/github` route with the shared editorial header, GitHub profile stats loaded, commit rail, build terminal, queue, progress axis, and external CTA visible

**Findings**
- No actionable P0/P1/P2 findings.
- The shared site header adds a navigation band above the reference artwork; this is intentional so the new page remains part of the site's common editorial system. The Build composition, terminal, commit rail, queue, and progress axis remain the first content block.

**Required Fidelity Surfaces**
- Fonts and typography: the page reuses the existing Cormorant Garamond / Noto Serif SC / Oswald editorial stack. `Build` uses the large serif display treatment; commit hashes, terminal logs, axis labels, and metadata use the compact mono treatment with restrained letter spacing.
- Spacing and layout rhythm: the desktop composition uses a left copy column and right build stage; the terminal overlaps the stage at the same upper-right relationship as the source. Mobile switches to a stacked copy/stage layout, keeping the commit rail and terminal inside a 390px CSS viewport with `scrollWidth = 375` and no horizontal overflow.
- Colors and visual tokens: warm paper `#f4f0e8`, ink `#191817`, muted guide lines, and coral `#ff744c` are shared with the existing Sac-inspired site system. The terminal border, nodes, progress fill, and CTA underline use the same token family.
- Image quality and asset fidelity: no raster art was required for this reference. GitHub, branch, arrow, and plus marks use the existing Phosphor icon library; no custom SVG or placeholder image was introduced.
- Copy and content: the page exposes `创 — BUILD`, `Build`, `公开建造中 · 持续开源`, a real `ChenShuo2004` GitHub CTA, a commit/build visualization, and live profile metrics. The profile API returned `11` public repositories, `6` followers, and `3` following during QA; the commit rail keeps a stable visual fallback when the public events API has no recent push event.

**Primary Interactions Tested**
- Header action, hero CTA, and metrics CTA resolve to `https://github.com/ChenShuo2004` with `target="_blank"` and `rel="noreferrer"`.
- Homepage GitHub signal row resolves internally to `/github`, while the dedicated page retains the external GitHub destination.
- `/github` renders four commit rows, the terminal progress state, queue labels, axis labels, and live metric values.
- Desktop and mobile states report no horizontal overflow; the mobile metrics switch to a two-column grid.
- Local page console check filtered to `127.0.0.1` returned no errors. `npm.cmd run build` passes.

**Comparison History**
- Initial source/implementation comparison was captured as a single side-by-side composite at `audit/2026-08-06-github-build/comparison-source-implementation.jpg`.
- The first comparison found no actionable P0/P1/P2 mismatch, so no visual correction iteration was required after the final desktop and mobile captures.

**Open Questions**
- The source mock intentionally omits the site's shared header; the implementation keeps it because the project instruction requires one shared editorial navigation system. If the desired GitHub page should be completely standalone, the header can be hidden in a later content decision.

**Implementation Checklist**
- [x] Added the `/github` route and dedicated Build composition.
- [x] Connected GitHub profile and public events APIs with stable fallback content.
- [x] Routed the homepage GitHub signal row to the new page.
- [x] Verified desktop, mobile, CTA destinations, console, and production build.

final result: passed

---

Platform signal board QA pass: 2026-08-06
source visual truth path: C:/Users/ADMINI~1/AppData/Local/Temp/codex-clipboard-0b6a4f91-cc56-4fee-bbc2-7ed0ddb51182.png
comparison image path: D:/coding/1.个人blog/audit/2026-08-06-platform-signal/comparison-source-implementation.jpg
implementation screenshot path: D:/coding/1.个人blog/audit/2026-08-06-platform-signal/implementation-desktop.png
mobile screenshot path: D:/coding/1.个人blog/audit/2026-08-06-platform-signal/implementation-mobile.png
viewport: desktop 1280x720 CSS px, mobile 390x844 CSS px
source pixels: 1001x802; implementation pixels: 1280x720 desktop and 390x844 mobile; device scale factor: 1; no density normalization required
state: homepage platform signal board rendered with GitHub public API data loaded

**Findings**
- No P0/P1/P2 findings.
- The implementation intentionally keeps the reference's warm paper canvas, serif display heading, coral metadata, thin rules, and rising data bars while reducing the list to the three platforms requested by the user.

**Open Questions**
- The user's X handle was not present in the brief or public GitHub profile. The X row currently links to `https://x.com/`, and the single `xProfileUrl` constant in `src/App.jsx` is ready for the exact profile URL when provided.

**Required Fidelity Surfaces**
- Fonts and typography: the existing Cormorant Garamond / Noto Serif SC / Oswald editorial system is reused; heading, metadata, stat labels, and row hierarchy remain consistent with the reference.
- Spacing and layout rhythm: desktop rows are equal-height bordered bands with aligned identity, data, status, and arrow columns; mobile rows stack without clipping. Desktop `scrollWidth` is 1265 at a 1280 viewport; mobile `scrollWidth` is 375 at a 390 viewport.
- Colors and visual tokens: the board uses the existing `#f4f0e8` paper, `#191817` ink, and `#ff744c` coral tokens; hover/focus states invert the row without changing the system.
- Image quality and asset fidelity: no new raster assets were needed; X, Feishu, and GitHub use the existing Phosphor icon library instead of approximated artwork. The supplied halftone portrait remains unchanged.
- Copy and content: Feishu links to the supplied wiki URL, GitHub links to `ChenShuo2004`, and GitHub shows the live public values `11 repos · 6 followers` with a fallback. The homepage contact knowledge-base link and `/knowledge` page now use Feishu; no old FlowUs links remain.

**Primary Interactions Tested**
- Platform rows expose working external `href`, `target="_blank"`, and `rel="noreferrer"` values for X, Feishu, and GitHub.
- `/knowledge` contains three Feishu links and zero FlowUs links.
- `npm.cmd run build` passes.
- Fresh homepage console check reports no error logs.
- Desktop and mobile states render with no horizontal overflow.

**Comparison History**
- Initial source/implementation comparison found no actionable P0/P1/P2 differences; no visual fix iteration was required after the captured desktop and mobile evidence.

**Follow-up Polish**
- Replace `xProfileUrl` with the user's exact X profile URL and optionally add a verified follower snapshot once the handle is confirmed.

final result: passed

---

Full-site Sac editorial unification QA pass: 2026-08-06
implementation screenshot path: local in-app browser captures from the fresh final preview tab
reference source: https://sac-ai.com/ and https://github.com/Sac-Y/sac-ai.com
viewport: desktop 1280x900, mobile 390x844
state: shared editorial shell and detail-page system applied to the homepage, tools, reading room, knowledge map, and community routes

**Findings**
- No P0/P1/P2 findings.

**Required Fidelity Surfaces**
- Shared header: all five routes use the same CS mark, bilingual navigation, active-section marker, and outline action.
- Editorial language: warm paper canvas, black serif display type, coral section labels, thin rules, numbered metadata, and square/outline actions are consistent across home and details.
- Detail hierarchy: tools, reading room, knowledge map, and community pages each use a title hero, specification panel or access panel, clear actions, and responsive content sections.
- Knowledge detail: the origin section keeps a long-form reading rhythm with a large title, two-column copy, numbered content blocks, and a quote treatment.
- Layout safety: desktop and mobile checks report no horizontal overflow on all five routes.
- Interaction safety: home content CTA reaches the product-lines section; header links preserve route or external knowledge-base destinations; community CTA reaches the contact card.
- Fresh preview console: no runtime errors were reported after the final reload.

**Patches Made Since Previous QA Pass**
- Replaced the old route-specific pixel navigation with a reusable editorial header.
- Rebuilt tools, reading room, knowledge map, and community detail shells around one Sac-inspired information hierarchy.
- Removed the homepage strengths and current-signal sections per the latest content direction; the contact section remains in the shared system.
- Added mobile-safe header wrapping, type scaling, action sizing, and content grids.
- Verified production build with `npm run build`.

final result: passed

---

Knowledge product heading QA pass: 2026-08-06
state: “知识产品空间” adjusted to a single line in the product-lines section
viewport: desktop 1280px and mobile 390x844

**Findings**
- No P0/P1/P2 findings.

**Required Fidelity Surfaces**
- Desktop heading renders on one line beside the supporting description.
- Mobile heading remains contained within the section width and does not create horizontal overflow.
- Production build passed with `cmd.exe /d /c npm run build`.

final result: passed

---

Sac-inspired editorial homepage QA pass: 2026-08-06
implementation screenshot path: local in-app browser, desktop 1816x819 and mobile 390x844
reference image path: C:/Users/ADMINI~1/AppData/Local/Temp/codex-clipboard-1e03d951-e260-4177-89b4-151f048b472f.png
state: homepage hero rebuilt as a warm editorial layout with the supplied halftone portrait; 代充业务 page and route removed

**Findings**
- No P0/P1/P2 findings.

**Required Fidelity Surfaces**
- Warm off-white canvas, thin guide lines, large serif KAI wordmark, coral community kicker, two outline actions, and oversized right-side portrait match the supplied Sac reference composition.
- Founder positioning remains visible: AI 连续创业者、知识产品空间、工具与方法商业化。
- `查看内容` scrolls to the product-line section and `加入社群` links to `/community`.
- `/sales-hub` is no longer handled by a sales page component or route.
- Desktop screenshot checked at 1816x819; mobile screenshot checked at 390x844.
- Layout safety: desktop and mobile states report no horizontal overflow; supplied halftone portrait loads successfully.

**Patches Made Since Previous QA Pass**
- Added `public/assets/chen-shuo-halftone.png` from the user-provided portrait.
- Replaced the homepage CardNav/pixel hero with the Sac-inspired editorial hero in `src/App.jsx` and `src/styles.css`.
- Removed `SalesHubPage`, its route, navigation data, and copy helper from `src/App.jsx`.
- Updated `AGENTS.md` with the durable editorial hero and removed-sales-page preferences.
- Verified production build with `cmd.exe /d /c npm run build`.

final result: passed

---

Homepage knowledge CTA destination QA pass: 2026-06-30
implementation screenshot path: D:/6.个人介绍网站/qa-knowledge-cta-to-intro.png
viewport: desktop 1440x1000
state: homepage top navigation knowledge CTA now opens the site-hosted knowledge intro page

**Findings**
- No P0/P1/P2 findings.

**Required Fidelity Surfaces**
- Homepage top navigation CTA now reads `知识地图`.
- Homepage top navigation CTA links to `/knowledge` instead of the FlowUs external URL.
- Homepage hero secondary knowledge CTA also links to `/knowledge`.
- Real mouse click verification: clicking the homepage top navigation CTA navigated to `/knowledge`.
- Knowledge page still renders `《关于这个知识库的起点》` and 7 chapter cards.
- Knowledge page top CTA still opens the FlowUs URL with `target="_blank"`.
- Layout safety: verified state reports `overflowX = false`.

**Patches Made Since Previous QA Pass**
- Updated homepage `CardNav` CTA label and href in `src/App.jsx`.
- Updated the hero knowledge action to point at the site-hosted intro page.
- Verified production build with `npm.cmd run build`.

final result: passed

---

Knowledge page separation QA pass: 2026-06-30
implementation screenshot path: D:/6.个人介绍网站/qa-knowledge-page-desktop.png
mobile screenshot path: D:/6.个人介绍网站/qa-knowledge-page-mobile.png
viewport: desktop 1440x1000, mobile 390x844
state: knowledge origin content moved out of the homepage and into a standalone `/knowledge` page

**Findings**
- No P0/P1/P2 findings.

**Required Fidelity Surfaces**
- Homepage `/` no longer renders `.knowledge-section`.
- Homepage `/` no longer contains the text `关于这个知识库的起点`.
- Homepage expanded navigation includes `知识地图` linking to `/knowledge`.
- Real mouse click verification: clicking `知识地图` navigates from `/` to `/knowledge`.
- Knowledge page `/knowledge` renders one `.knowledge-section`, the framed title `《关于这个知识库的起点》`, and 7 chapter cards.
- Knowledge page top CTA reads `打开知识库` and links to the FlowUs URL with `target="_blank"`.
- Layout safety: desktop and mobile homepage and knowledge page states report `overflowX = false`.

**Patches Made Since Previous QA Pass**
- Extracted the knowledge origin block into `KnowledgeOriginSection`.
- Added a standalone `KnowledgePage` rendered at `/knowledge`.
- Changed the homepage navigation item from an in-page anchor to `/knowledge`.
- Added page-specific navigation data for the knowledge page.
- Updated `CardNav` so only `#hash` links are smooth-scrolled; page links now navigate normally.
- Added page-shell spacing for the standalone knowledge page.
- Verified production build with `npm.cmd run build`.

final result: passed

---

Knowledge origin and TextCursor title QA pass: 2026-06-30
implementation screenshot path: D:/6.个人介绍网站/qa-knowledge-origin-desktop.png
mobile screenshot path: D:/6.个人介绍网站/qa-knowledge-origin-mobile.png
viewport: desktop 1440x1000, mobile 390x844
state: FlowUs link promoted into the top navigation and knowledge origin section added with React Bits `TextCursor`

**Findings**
- No P0/P1/P2 findings.

**Required Fidelity Surfaces**
- Top navigation CTA now reads `知识库` and links to `https://flowus.cn/c712040f-ef98-44b9-b37d-dd187d92fc4d`.
- Top navigation CTA uses `target="_blank"` and `rel="noreferrer"`.
- Expanded navigation includes `知识库起点` as an in-page link and `公开知识库` as the FlowUs external link.
- Real mouse click verification: clicking `知识库起点` scrolled to the title frame; title frame rendered at top 118px after scroll.
- Knowledge origin section title renders `《关于这个知识库的起点》` inside a framed title block.
- React Bits `TextCursor` integration is active in the title frame; verification generated 18 `.text-cursor-item` trail nodes.
- Knowledge origin content renders 7 chapter cards.
- Layout safety: desktop and mobile states report `overflowX = false`.

**Patches Made Since Previous QA Pass**
- Added `src/TextCursor.jsx` and `src/TextCursor.css`.
- Added `knowledgeOriginIntro` and `knowledgeOriginChapters` content in `src/App.jsx`.
- Added the `#knowledge-origin` section with framed title, FlowUs CTA, and structured origin cards.
- Changed the CardNav top CTA from contact to the FlowUs knowledge base.
- Updated `src/CardNav.jsx` so the top CTA also handles external links safely.
- Added desktop and mobile styles for the knowledge origin section and title frame.
- Verified production build with `npm.cmd run build`.

final result: passed

---

FlowUs knowledge base link QA pass: 2026-06-30
implementation screenshot path: D:/6.个人介绍网站/qa-flowus-desktop.png
mobile screenshot path: D:/6.个人介绍网站/qa-flowus-mobile.png
viewport: desktop 1440x1000, mobile 390x844
state: FlowUs knowledge base link added to navigation, hero actions, and contact actions

**Findings**
- No P0/P1/P2 findings.

**Required Fidelity Surfaces**
- Knowledge base URL: `https://flowus.cn/c712040f-ef98-44b9-b37d-dd187d92fc4d`.
- Three FlowUs links render: `公开知识库`, `知识库`, and `打开知识库`.
- All FlowUs links use `target="_blank"` and `rel="noreferrer"`.
- CardNav now treats `https` links as external links instead of trying to smooth-scroll them.
- Desktop and mobile navigation expansion shows the `公开知识库` link.
- Layout safety: desktop and mobile states report `overflowX = false`.

**Patches Made Since Previous QA Pass**
- Added a shared `knowledgeBaseUrl` constant in `src/App.jsx`.
- Added the FlowUs link to the `系统` CardNav group.
- Added a hero CTA for the knowledge base.
- Added a contact-section action for the knowledge base.
- Updated `src/CardNav.jsx` to support external links safely.
- Verified production build with `npm.cmd run build`.

final result: passed

---

Hero image replacement QA pass: 2026-06-30
implementation screenshot path: D:/6.个人介绍网站/qa-hero-replaced-desktop.png
mobile screenshot path: D:/6.个人介绍网站/qa-hero-replaced-mobile.png
viewport: desktop 1440x1000, mobile 390x844
state: hero background image replaced with user-provided vertical black-and-white artwork

**Findings**
- No P0/P1/P2 findings.

**Required Fidelity Surfaces**
- Hero image now uses `/assets/hero-cinematic-reference.jpg`.
- Removed unused old hero image `/assets/hero-cinematic.png`.
- Desktop image verification: source loaded complete, natural size 1185x2569, object position `50% 58%`.
- Mobile image verification: source loaded complete, natural size 1185x2569, object position `50% 50%`.
- Layout safety: desktop and mobile states report `overflowX = false`.

**Patches Made Since Previous QA Pass**
- Copied the user-provided JPG into `public/assets`.
- Updated hero image reference in `src/App.jsx`.
- Adjusted hero image object positioning for desktop and mobile.
- Verified production build with `npm.cmd run build`.

final result: passed

---

Project generated images and clickable detail QA pass: 2026-06-30
implementation screenshot path: D:/6.个人介绍网站/qa-project-click-desktop-final.png
mobile screenshot path: D:/6.个人介绍网站/qa-project-click-mobile-final.png
viewport: desktop 1440x1000, mobile 390x844
state: project cards updated with generated theme images and in-page detail links

**Findings**
- No P0/P1/P2 findings.

**Generated Assets**
- `/assets/project-web3-generated.jpg`
- `/assets/project-ai-system-generated.jpg`
- `/assets/project-content-engine-generated.jpg`

**Required Fidelity Surfaces**
- Project cards use generated theme images for `Web3 早期项目`, `AI 产品系统`, and `内容商业化引擎`.
- Each project card is clickable and exposes a detail anchor: `#project-web3-detail`, `#project-ai-system-detail`, `#project-content-engine-detail`.
- Desktop click verification: first card reached `#project-web3-detail`; target rendered at top 110px with width 1345px.
- Mobile click verification: first card reached `#project-web3-detail`; target rendered at top 84px with width 358px.
- All generated images loaded complete with natural size 1254x1254.
- Layout safety: tested desktop and mobile states report `overflowX = false`.

**Patches Made Since Previous QA Pass**
- Generated three project-specific dark technology visuals with the ImageGen skill.
- Copied generated outputs into `public/assets`.
- Replaced project gallery/card imagery with generated assets.
- Wrapped each project card with an accessible in-page link.
- Added project detail sections with large image, metric, summary, detail tags, and contact CTA.
- Added focus, target highlight, desktop, and mobile styles for the clickable/detail flow.
- Verified production build with `npm.cmd run build`.

final result: passed

---

Strengths rotating heading QA pass: 2026-06-30
implementation screenshot path: D:/6.个人介绍网站/qa-strengths-rotating-desktop-final2.png
mobile screenshot path: D:/6.个人介绍网站/qa-strengths-rotating-mobile-final2.png
viewport: desktop 1440x820, mobile 390x844
state: advantages heading updated using React Bits `RotatingText` pattern

**Findings**
- No P0/P1/P2 findings.

**Required Fidelity Surfaces**
- Rotating heading: advantages headline now rotates `模糊机会 / 复杂信息 / 内容资产 / 商业线索`.
- Desktop layout: heading renders at 1020x142 with the four advantage cards visible.
- Mobile layout: rotating text remains visible and no longer overlaps the headline.
- Card content: all four cards render: `信息结构`, `产品系统`, `快速验证`, `个人商业化`.
- Layout safety: tested desktop and mobile states report `overflowX = false`.

**Patches Made Since Previous QA Pass**
- Reused existing `RotatingText` component in the advantages heading.
- Added strength-specific rotating text styles and mobile-safe wrapping.
- Switched the strengths animation to a fade/blur transition to avoid blank green-pill frames.
- Verified production build with `npm.cmd run build`.

final result: passed

---

Rotating contact footer QA pass: 2026-06-30
implementation screenshot path: D:/6.个人介绍网站/qa-contact-rotating-desktop-final3.png
mobile screenshot path: D:/6.个人介绍网站/qa-contact-rotating-mobile-final3.png
viewport: desktop 1440x900, mobile 390x844
state: contact section rebuilt using React Bits `RotatingText` pattern

**Findings**
- No P0/P1/P2 findings.

**Required Fidelity Surfaces**
- Footer composition: contact section uses a single-column closing layout with a large headline and two full-width actions.
- Rotating text: `.contact-rotating-text` renders visible text in both tested viewports.
- Desktop layout: title is 1345x140 and rotating text is 151x69.
- Mobile layout: title is 358x202 and rotating text is 110x48.
- Button layout: both tested viewports render two contact actions.
- Layout safety: both tested viewports report `overflowX = false`.

**Patches Made Since Previous QA Pass**
- Added `src/RotatingText.jsx` and `src/RotatingText.css`.
- Rebuilt the contact headline with inline rotating text for `看见 / 理解`.
- Changed the contact section into a wide, screenshot-aligned closing panel with full-width email and back-to-top actions.
- Tuned desktop and mobile typography so the rotating Chinese text is not clipped.
- Verified production build with `npm.cmd run build`.

**Notes**
- Vite still emits the existing non-failing chunk-size warning after the WebGL gallery dependency.

final result: passed

---

Tilted Pixel project cards QA pass: 2026-06-30
implementation screenshot path: D:/6.个人介绍网站/qa-project-tiltpixel-desktop-hover.png
focused card screenshot path: D:/6.个人介绍网站/qa-project-tiltpixel-card-hover.png
mobile screenshot path: D:/6.个人介绍网站/qa-project-tiltpixel-mobile.png
viewport: desktop 1440x1000, mobile 390x844
state: project detail cards rebuilt with React Bits `TiltedCard` and `PixelCard` patterns

**Findings**
- No P0/P1/P2 findings.

**Required Fidelity Surfaces**
- Card rendering: three project card shells and three pixel cards render in both desktop and mobile checks.
- Tilt interaction: first project card reports a `matrix3d(...)` transform after pointer hover.
- Pixel interaction: first project card pixel canvas reports 1262 non-transparent sampled pixels after hover.
- Content mapping: cards render `Web3 早期项目`, `AI 产品系统`, and `内容商业化引擎`.
- Layout safety: desktop and mobile tested states report `overflowX = false`.

**Patches Made Since Previous QA Pass**
- Added `src/TiltedCard.jsx` and `src/TiltedCard.css`.
- Added `src/PixelCard.jsx` and `src/PixelCard.css`.
- Rebuilt project detail cards as tilted image-backed cards with a pixel canvas effect layer and readable content overlay.
- Added per-card pixel palettes, hover/focus styling, and mobile-safe sizing.
- Verified production build with `npm.cmd run build`.

**Notes**
- Vite still emits the existing non-failing chunk-size warning after the WebGL gallery dependency.

final result: passed

---

CircularGallery projects QA pass: 2026-06-30
implementation screenshot path: D:/6.个人介绍网站/qa-circular-projects-desktop.png
mobile screenshot path: D:/6.个人介绍网站/qa-circular-projects-mobile.png
viewport: desktop 1440x1000, mobile 390x844
state: projects section rebuilt with React Bits `CircularGallery` pattern and OGL canvas

**Findings**
- No P0/P1/P2 findings.

**Required Fidelity Surfaces**
- Gallery rendering: `.project-gallery-stage canvas` exists on desktop and mobile.
- Desktop layout: gallery stage is 1345x619, canvas is 1343x617, detail cards render below the gallery.
- Mobile layout: gallery stage is 358x390, canvas is 356x388, detail cards stack below the gallery.
- Content mapping: detail cards render `Web3 早期项目`, `AI 产品系统`, and `内容商业化引擎`.
- Layout safety: both tested viewports report `overflowX = false`.

**Patches Made Since Previous QA Pass**
- Added `src/CircularGallery.jsx` and `src/CircularGallery.css`.
- Added `ogl` dependency for the WebGL gallery.
- Replaced the old projects card grid with a circular gallery stage plus project detail cards.
- Added responsive styles for gallery height and detail-card grids.
- Verified production build with `npm.cmd run build`.

**Notes**
- Vite emits a non-failing chunk-size warning after adding `ogl`; this is expected for the WebGL dependency and can be optimized later with route/component code splitting if needed.

final result: passed

---

CardNav QA pass: 2026-06-30
implementation screenshot path: D:/6.个人介绍网站/qa-cardnav-desktop-open.png
mobile screenshot path: D:/6.个人介绍网站/qa-cardnav-mobile-open.png
closed desktop screenshot path: D:/6.个人介绍网站/qa-cardnav-desktop-closed.png
closed mobile screenshot path: D:/6.个人介绍网站/qa-cardnav-mobile-closed.png
viewport: desktop 1440x1000, mobile 390x844
state: top navigation rebuilt with React Bits `CardNav` pattern and GSAP expansion

**Findings**
- No P0/P1/P2 findings.

**Required Fidelity Surfaces**
- Navigation motion: hamburger click expands the card nav on desktop and mobile. `expanded = true` after click in both viewports.
- Layout safety: desktop closed nav bottom is 92px and hero title starts at 230px. Mobile closed nav bottom is 78px and hero title starts at 154px.
- Responsive behavior: desktop expanded height is 282px; mobile expanded height is 540px. Both report `overflowX = false`.
- Content mapping: expanded cards render labels `经历`, `项目`, `系统` with nine section links.

**Patches Made Since Previous QA Pass**
- Added `src/CardNav.jsx` and `src/CardNav.css`.
- Replaced the old topbar with `CardNav` in `src/App.jsx`.
- Added `gsap` dependency for the React Bits expansion animation.
- Adjusted hero top spacing for the absolute-positioned navigation.
- Verified production build with `npm.cmd run build`.

final result: passed
