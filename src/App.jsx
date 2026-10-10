import { useSitePreferences } from "./SitePreferences.jsx";
import {
  ArrowClockwise,
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  Brain,
  CalendarBlank,
  ChartLineUp,
  CubeFocus,
  CursorClick,
  Eye,
  EnvelopeSimple,
  Flame,
  GithubLogo,
  Network,
  TiktokLogo,
  UsersThree,
  WechatLogo,
  XLogo,
  UserCircle,
  WarningCircle,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import blogArchive from "./data/blogArchive.json";
import HomePage from "./HomePage.jsx";
import AppearanceControls from "./AppearanceControls.jsx";
import BrandSignature from "./BrandSignature.jsx";
import { contactEmail, wechatId } from "./data/contactDetails.js";

const BlogMarkdown = lazy(() => import("./BlogMarkdown.jsx"));

const knowledgeBaseUrl = "https://ji2s5x6u9ag.feishu.cn/wiki/FyDGwZUldiPstLk2xQBc3b3znUg";
const readingRoomUrl = "https://flowus.cn/c712040f-ef98-44b9-b37d-dd187d92fc4d";
const githubProfileUrl = "https://github.com/ChenShuo2004";
const githubApiUrl = "https://api.github.com/users/ChenShuo2004";
const githubReposApiUrl = "https://api.github.com/users/ChenShuo2004/repos?per_page=100&type=owner";
const xProfileUrl = "https://x.com/ChenshuoAI";
const communityFee = "499 元 / 人";
const douyinProfileUrl = "https://www.douyin.com/user/MS4wLjABAAAAUXlQ1xsLrrjEWb3v_k-0orHhnmz0HV-l0KfvqT9SaMtyti9DdR4mMAoIxb4tQi4I";
const productLibraryUrl = "https://aiyouwendu.com/products";
const warmSpaceUrl = "https://aiyouwendu.com/home";
const csBoardRepoUrl = "https://github.com/ChenShuo2004/cs-board";
const csSkillsRepoUrl = "https://github.com/ChenShuo2004/cs-skills";
const csXiaohuangRepoUrl = "https://github.com/ChenShuo2004/cs-xiaohuang-skill";

const fallbackGithubStats = {
  value: "750+ Stars",
  repos: 17,
  followers: 46,
  stars: 752,
  bars: [5, 7, 8, 9, 11, 12, 14],
};

const openSourceTools = [
  {
    name: "cs-board",
    label: "LOCAL AI VIDEO TOOL",
    title: "本地 AI 白板视频工具",
    description:
      "可用参考声音和中文文案生成白板动画视频，把口播脚本、TTS 与白板画面整合成本地可交付的视频工作流。",
    meta: ["Python", "v1.0.0", "Whiteboard Video"],
    proof: "621 Stars · 最新 Release v1.0.0",
    href: csBoardRepoUrl,
    icon: CubeFocus,
  },
  {
    name: "cs-skills",
    label: "CODEX SKILLS / WORKFLOW",
    title: "我的 CS Skill 工具库",
    description:
      "陈硕的 Codex Skills 与 AI 工作流手册，把产品、内容、调研与交付沉淀为可复用的智能工作流。",
    meta: ["Codex Skills", "AI Workflow", "144 Stars"],
    proof: "产品 / 内容 / 调研 / 交付",
    href: csSkillsRepoUrl,
    icon: Brain,
  },
  {
    name: "cs-xiaohuang-skill",
    label: "BRAND IP / VISUAL SKILL",
    title: "小黄统一 Skill",
    description:
      "用于品牌 IP 延展、中文轻手绘 PPT、文章封面与正文配图；先规划，再生成可交付的视觉资产。",
    meta: ["Brand IP", "PPT", "Illustration"],
    proof: "小黄 / 有温度 IP / 中文视觉工作流",
    href: csXiaohuangRepoUrl,
    icon: Flame,
  },
];

const editorialNavItems = [
  { key: "work", label: "业务合作", english: "BUSINESS", href: "/work" },
  { key: "community", label: "我的社区", english: "COMMUNITY", href: "/community" },
  { key: "blog", label: "博客", english: "BLOG", href: "/blog" },
  { key: "media", label: "自媒体", english: "MEDIA", href: "/media" },
  { key: "opensource", label: "开源工具", english: "OPEN SOURCE", href: "/github" },
  { key: "contact", label: "联系我", english: "CONTACT", href: "/#contact" },
];

const homeEntries = [
  { href: "/work", label: "业务合作", description: "企业培训 / 商单 / 咨询 / GEO" },
  { href: "/community", label: "我的社区", description: "WE30 · 500 位成员" },
  { href: "/media", label: "自媒体", description: "各平台的公开实践" },
  { href: "/github", label: "开源工具", description: "带走能用的工作流" },
  { href: "#contact", label: "联系我", description: "交流与业务合作" },
];

const socialChannels = [
  { key: "douyin", label: "抖音", detail: "陈硕 KAI · 22802710799", href: douyinProfileUrl, icon: TiktokLogo },
  { key: "x", label: "X", detail: "@ChenshuoAI", href: xProfileUrl, icon: XLogo },
  { key: "wechat", label: "微信", detail: wechatId, href: "/community#community-contact", icon: WechatLogo },
  { key: "email", label: "邮箱", detail: contactEmail, href: `mailto:${contactEmail}`, icon: EnvelopeSimple },
];

const blogPosts = [
  {
    category: "工具实践",
    date: "2026.09.23",
    title: "妈妈再也不用担心我没有 Claude 用了：使用环境与踩坑整理",
    excerpt: "连续遇到账号问题后，我把网络分流、DNS、邮箱与日常使用习惯重新梳理了一遍。这篇记录当时的实际配置思路，也提醒自己：两周稳定运行只是一次阶段性观察。",
    href: "/blog/claude-environment",
    originalUrl: "https://x.com/ChenshuoAI/article/2102737711052537966",
    source: "X 长文导读",
    sections: [
      { heading: "先把环境看成一整套", paragraphs: ["过去一段时间，我前后遇到过 4 次 Claude 账号问题。重新梳理后，我更关注网络出口、DNS、邮箱、支付和日常使用习惯之间是否一致，而不是只找一个能打开网页的节点。", "这是一份我当时的经验记录，不是服务商封号规则的确定解释。"] },
      { heading: "分流之后，还要检查真实出口", paragraphs: ["我倾向于让 Claude 相关服务固定走同一条线路，同时检查浏览器与终端的实际出口。IPv4、IPv6、DNS、WebRTC、系统代理，以及 Git、npm 和 Claude Code 的历史代理设置，都可能让不同应用走向不同路径。", "配置写好只是第一步。发起真实请求并查看连接记录，才能知道规则是否按预期生效。"] },
      { heading: "账号与邮箱也要长期可控", paragraphs: ["邮箱方面，我更愿意使用自己长期正常使用、来源清楚的账号。对我来说，真实、长期、自己能控制，比一套看起来复杂的注册技巧更重要。", "写原文时，新账号只稳定运行了两周。这个观察值得记录，但不足以保证以后不会再遇到限制。"] },
    ],
  },
  {
    category: "增长实践",
    date: "2026.08.28",
    title: "小红书高手教你：从内容、钩子到渠道，搭一套真正能跑通的获客系统",
    excerpt: "这篇文章从一个具体问题出发：有阅读、有点赞，为什么没有咨询？我把目标人群、内容、行动理由和承接渠道放在同一条获客路径里讨论。",
    href: "/blog/xiaohongshu-leads",
    originalUrl: "https://x.com/ChenshuoAI/article/2093319723031380005",
    source: "X 长文导读",
    sections: [
      { heading: "先看用户带着什么问题来", paragraphs: ["过去两年，我在线下分享过小红书和抖音引流。重新整理时，我发现很多账号有阅读和点赞，却没有咨询。问题往往出在内容之后：用户为什么要进一步联系你，以及联系之后由谁承接。", "在搜索场景中，用户已经把需求写进关键词。比起追求泛流量，更值得研究的是让真正需要解决方案的人找到你。"] },
      { heading: "内容、钩子、渠道要连在一起", paragraphs: ["内容负责吸引对的人，钩子给出值得行动的具体价值，渠道负责稳妥承接。例如工具、清单、案例或解决方案，只有对应目标用户眼前的问题，才有可能促成下一步。", "我在原文里把它概括为“引流 = 内容 + 钩子 + 渠道”。拆开其中任何一环，阅读量都很难自动变成客户。"] },
      { heading: "用有效咨询检验内容", paragraphs: ["爆款数据很显眼，但做业务时，我更想知道一篇内容带来了多少有效咨询，以及最终获客成本是多少。先用自然流量测试内容和转化，再考虑投放放大已经验证的素材。", "承接方式优先使用平台允许的官方渠道；具体功能和规则会变化，执行时仍需看平台当期规则。"] },
    ],
  },
  ...blogArchive,
].sort((a, b) => b.date.localeCompare(a.date));

function usePublicReadership() {
  const [state, setState] = useState({ data: null, error: false });
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/public-stats", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Readership unavailable");
        return response.json();
      })
      .then((data) => setState({ data, error: false }))
      .catch((error) => {
        if (error.name !== "AbortError") setState({ data: null, error: true });
      });
    return () => controller.abort();
  }, []);
  return state;
}

function formatReadershipStart(value) {
  return value ? new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value)) : "";
}

const knowledgeOriginIntro = [
  "这个知识库的诞生，并不是来自“我想做一个整理工具”，而是来自一个更真实、也更长期存在的问题：",
  "在信息爆炸的时代，我们每天都在接触新的内容、新的工具、新的观点。但奇怪的是，信息越多，人反而越容易停在原地。",
];

const knowledgeOriginChapters = [
  {
    index: "01",
    title: "问题的开始：信息从来不是稀缺的",
    paragraphs: [
      "最开始我也和大多数人一样，以为问题在于：我看得还不够多、我学得还不够快、我没有接触到更好的资料。",
      "所以我不断收藏内容、订阅信息源、关注新的工具和方法。但后来我逐渐意识到一个事实：真正的问题，从来不是信息不够，而是“信息无法形成路径”。",
      "收藏夹越来越满，但真正能用起来的东西越来越少。知识在增长，但行动没有变化。",
    ],
  },
  {
    index: "02",
    title: "真正的瓶颈：不是学习，而是结构缺失",
    paragraphs: ["当信息足够多之后，问题会发生变化。你不再缺内容，而是开始缺一条可以持续前进的路径。"],
    points: ["从哪里开始", "哪些是关键", "下一步该做什么", "如何把知识变成结果"],
    quote: "问题已经从“学习问题”变成了结构问题。",
  },
  {
    index: "03",
    title: "这个知识库的核心目标",
    paragraphs: ["这个知识库不是为了“收集信息”，也不是为了“展示内容”。它只有一个更具体的目标：把分散的信息，重新组织成可以被执行的路径。"],
    points: ["将复杂信息拆解成清晰模块", "将零散知识重构为结构体系", "将阅读行为转化为行动路径", "将“看过”转化为“可以用”"],
    quote: "它不是一个资料仓库，而更像一个：信息 → 理解 → 执行 的转换系统。",
  },
  {
    index: "04",
    title: "我希望它解决的不是学习，而是卡住",
    paragraphs: ["现实中很多人的状态其实是：收藏了很多，但没有开始；学了很多，但无法应用；知道很多，但无法判断优先级。问题不在于努力，而在于缺少一个“结构外脑”。"],
    quote: "这个系统存在的意义，是让一个人不需要依赖灵感，也能持续推进认知与行动。",
  },
  {
    index: "05",
    title: "它的本质：不是内容，而是路径设计",
    paragraphs: ["如果一定要定义它的本质，它不是笔记系统、资料库、内容合集，而更接近于一个帮助人建立思考路径与执行路径的认知系统。"],
    points: ["为什么从这里开始", "为什么顺序是这样", "为什么这一步最关键", "下一步如何自然发生"],
    quote: "它关注的不是“有什么”，而是路径如何被设计出来。",
  },
  {
    index: "06",
    title: "最终想解决的，是一种长期困境",
    paragraphs: ["在这个时代，信息获取成本极低，但认知结构成本极高。真正的差距不再来自“知道多少”，而来自你是否拥有一套可以持续运转的思维结构。"],
    quote: "这个知识库尝试把这种结构外化出来，让一个人不只是阅读世界，而是能够用结构理解世界，并推动自己持续前进。",
  },
  {
    index: "07",
    title: "最后一句话总结",
    paragraphs: ["这个知识库的起点很简单：不是为了让你看更多，而是为了让你终于知道从哪里开始，并且能走下去。"],
    isSummary: true,
  },
];

const projects = [
  {
    title: "企业培训",
    tag: "企业服务",
    icon: UsersThree,
    metric: "AI 内训 / 培训 / 分享",
    action: "wechat",
    description:
      "为企业和团队提供 AI 落地培训与内训分享；扫码添加微信，聊清楚具体需求。",
  },
  {
    title: "商单 / 企业合作",
    tag: "商业合作",
    icon: ChartLineUp,
    metric: "商单 / 企业服务 / 联创",
    action: "wechat",
    description:
      "承接 AI 内容、产品与自动化相关的商业合作与企业服务；扫码添加微信沟通。",
  },
  {
    title: "1 对 1 咨询",
    tag: "个人 / 企业咨询",
    icon: CalendarBlank,
    metric: "999 元 / 小时",
    action: "wechat",
    description:
      "面向个人与企业，围绕 AI 落地、商业变现、内容增长、产品与知识库提供一对一咨询，999 元 / 小时；添加微信预约。",
  },
  {
    title: "GEO 服务",
    tag: "AI 搜索优化",
    icon: Network,
    metric: "品牌诊断 / 内容优化 / 可见性跟踪",
    action: "wechat",
    description:
      "面向企业与品牌，提供 AI 搜索内容诊断、网站与知识内容优化、可见性跟踪；添加微信沟通需求与合作方案。",
  },
];

function useEditorialReveal() {
  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll(".editorial-reveal"));
    if (revealElements.length === 0) return undefined;

    revealElements.forEach((element) => {
      const delay = Number(element.getAttribute("data-reveal-delay") || 0);
      if (Number.isFinite(delay) && delay > 0) {
        element.style.setProperty("--editorial-reveal-delay", `${delay}ms`);
      }
    });

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    // Reveal any element that already sits within (or near) the viewport right now.
    // The async IntersectionObserver callback can be dropped or mistimed during initial
    // load (font/image/WebGL layout shifts, StrictMode re-mounts), which previously left
    // above-the-fold content — including the hero — permanently stuck at opacity 0.
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const revealIfInView = (element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < viewportHeight * 0.92 && rect.bottom > 0) {
        element.classList.add("is-visible");
        return true;
      }
      return false;
    };
    revealElements.forEach(revealIfInView);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    revealElements.forEach((element) => {
      if (!element.classList.contains("is-visible")) observer.observe(element);
    });

    // Safety net: never let an element stay hidden if its reveal was somehow missed.
    const fallbackTimer = window.setTimeout(() => {
      revealElements.forEach((element) => {
        if (!element.classList.contains("is-visible") && revealIfInView(element)) {
          observer.unobserve(element);
        }
      });
    }, 1200);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, []);
}

function EditorialSiteHeader({ activeKey = "home", sectionLabel = "AI / CONTENT / PRODUCT", actionLabel = "加入社区", actionHref = "/community", inHero = false }) {
  const { t } = useSitePreferences();
  return (
    <header className={`editorial-site-header editorial-reveal ${inHero ? "editorial-site-header-hero" : ""}`}>
      <BrandSignature caption={sectionLabel} />

      <nav className="editorial-site-nav" aria-label={t("站点导航")}>
        {editorialNavItems.map((item) => (
          <a
            className={activeKey === item.key ? "active" : ""}
            href={item.href}
            key={item.key}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          >
            <span>{t(item.label)}</span>
            <small>{t(item.english)}</small>
          </a>
        ))}
      </nav>

      <div className="editorial-header-actions">
        <a className="editorial-site-action" href={actionHref} target={actionHref.startsWith("http") ? "_blank" : undefined} rel={actionHref.startsWith("http") ? "noreferrer" : undefined}>
        {t(actionLabel)}
        <ArrowRight size={17} weight="bold" aria-hidden="true" />
      </a>
        <AppearanceControls />
      </div>
    </header>
  );
}

function GithubBuildPage() {
  const { t } = useSitePreferences();
  const [githubStats, setGithubStats] = useState(fallbackGithubStats);

  useEffect(() => {
    let isCurrent = true;

    Promise.allSettled([
      fetch(githubApiUrl, { headers: { Accept: "application/vnd.github+json" } }).then((response) => {
        if (!response.ok) throw new Error("GitHub profile unavailable");
        return response.json();
      }),
      fetch(githubReposApiUrl, { headers: { Accept: "application/vnd.github+json" } }).then((response) => {
        if (!response.ok) throw new Error("GitHub repositories unavailable");
        return response.json();
      }),
    ])
      .then(([profileResult, reposResult]) => {
        if (!isCurrent) return;

        const profile = profileResult.status === "fulfilled" ? profileResult.value : {};
        const repositories = reposResult.status === "fulfilled" && Array.isArray(reposResult.value) ? reposResult.value : [];
        const repos = Number.isFinite(profile.public_repos) ? profile.public_repos : fallbackGithubStats.repos;
        const followers = Number.isFinite(profile.followers) ? profile.followers : fallbackGithubStats.followers;
        const stars = repositories.length > 0
          ? repositories.reduce((total, repository) => total + (Number.isFinite(repository.stargazers_count) ? repository.stargazers_count : 0), 0)
          : fallbackGithubStats.stars;
        const activity = Math.min(16, Math.max(6, Math.round(Math.log10(repos + followers + 1) * 6)));

        setGithubStats({
          value: `${stars} Stars`,
          repos,
          followers,
          stars,
          bars: [5, 7, 8, 9, 11, 12, activity],
        });
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <main className="site-shell editorial-page editorial-github-page">
      <EditorialSiteHeader activeKey="opensource" sectionLabel="OPEN SOURCE / TOOLS" actionLabel={t("打开 GitHub")} actionHref={githubProfileUrl} />

      <section className="github-build-hero" id="top" aria-label={t("开源工具页面")}>
        <div className="github-build-guides" aria-hidden="true">
          <span className="github-build-guide github-build-guide-left" />
          <span className="github-build-guide github-build-guide-center" />
          <span className="github-build-guide github-build-guide-right" />
          <span className="github-build-guide-mark github-build-guide-mark-top" />
          <span className="github-build-guide-mark github-build-guide-mark-bottom" />
        </div>

        <div className="github-build-copy editorial-reveal" data-reveal-delay="80">
          <p className="github-build-kicker"><span>{t("开")}</span> — OPEN SOURCE</p>
          <h1>{t("开源工具")}</h1>
          <p className="github-build-lede">{t("这里展示我公开沉淀的 AI 工具、CS Skills 和品牌 IP 工作流。不是做 GitHub 动态墙，而是把能复用、能交付、能继续生长的工具放在一起。")}</p>
          <p className="github-build-status"><span />{t("AI 工具 ")}<b>·</b> CS Skills <b>·</b>{t(" 品牌 IP 工作流")}</p>
          <a className="github-build-link" href={githubProfileUrl} target="_blank" rel="noreferrer">{t("查看完整 GitHub")}<GithubLogo size={20} weight="fill" aria-hidden="true" />
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <div className="github-tool-grid editorial-reveal" data-reveal-delay="160" aria-label={t("开源工具项目")}>
          {openSourceTools.map((tool, index) => {
            const Icon = tool.icon;

            return (
              <article className="github-tool-card" key={tool.name}>
                <div className="github-tool-number">0{index + 1}</div>
                <div className="github-tool-icon" aria-hidden="true">
                  <Icon size={26} weight="regular" />
                </div>
                <div className="github-tool-body">
                  <p>{t(tool.label)}</p>
                  <h2>{t(tool.name)}</h2>
                  <strong>{t(tool.title)}</strong>
                  <span>{t(tool.description)}</span>
                  <div className="github-tool-meta" aria-label={`${tool.name} ${t("技术信息")}`}>
                    {tool.meta.map((item) => (
                      <small key={item}>{t(item)}</small>
                    ))}
                  </div>
                  <em>{t(tool.proof)}</em>
                </div>
                <a className="github-tool-action" href={tool.href} target="_blank" rel="noreferrer" aria-label={`${t("打开")} ${tool.name} ${t("GitHub 仓库")}`}>{t("打开 GitHub")}<ArrowUpRight size={17} weight="bold" aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="github-build-metrics editorial-reveal" data-reveal-delay="100" aria-label={t("GitHub 公开数据")}>
        <div className="github-build-metric">
          <span>PUBLIC REPOSITORIES</span>
          <strong>{t(githubStats.repos)}</strong>
          <small>{t("公开仓库")}</small>
        </div>
        <div className="github-build-metric">
          <span>FOLLOWERS</span>
          <strong>{t(githubStats.followers)}</strong>
          <small>{t("关注者")}</small>
        </div>
        <div className="github-build-metric">
          <span>STARS</span>
          <strong>{t(githubStats.stars)}</strong>
          <small>{t("公开仓库累计 Star")}</small>
        </div>
        <a className="github-build-metric github-build-metric-link" href={githubProfileUrl} target="_blank" rel="noreferrer">
          <span>OPEN SOURCE / LOG</span>
          <strong><GithubLogo size={26} weight="fill" aria-hidden="true" /> @ChenShuo2004</strong>
          <small>{t("查看完整 GitHub 主页 ")}<ArrowUpRight size={15} weight="bold" aria-hidden="true" /></small>
        </a>
      </section>
    </main>
  );
}

function PlatformSignalsSection() {
  const { t } = useSitePreferences();
  const [githubStats, setGithubStats] = useState(fallbackGithubStats);

  useEffect(() => {
    let isCurrent = true;

    Promise.all([
      fetch(githubApiUrl, { headers: { Accept: "application/vnd.github+json" } }).then((response) => {
        if (!response.ok) throw new Error("GitHub profile unavailable");
        return response.json();
      }),
      fetch(githubReposApiUrl, { headers: { Accept: "application/vnd.github+json" } }).then((response) => {
        if (!response.ok) throw new Error("GitHub repositories unavailable");
        return response.json();
      }),
    ])
      .then(([profile, repositories]) => {
        if (!isCurrent) return;
        const repos = Number.isFinite(profile.public_repos) ? profile.public_repos : 11;
        const followers = Number.isFinite(profile.followers) ? profile.followers : 6;
        const stars = repositories.reduce((total, repository) => total + (Number.isFinite(repository.stargazers_count) ? repository.stargazers_count : 0), 0);
        const activity = Math.min(16, Math.max(6, Math.round(Math.log10(repos + followers + 1) * 6)));

        setGithubStats({
          value: stars >= 1000 ? `${(stars / 1000).toFixed(1)}K Stars` : `${stars || fallbackGithubStats.stars} Stars`,
          repos,
          followers,
          stars,
          bars: [5, 7, 8, 9, 11, 12, activity],
        });
      })
      .catch(() => undefined);

    return () => {
      isCurrent = false;
    };
  }, []);

  const signals = [
    {
      key: "x",
      label: "X / TWITTER",
      name: "X 内容入口",
      detail: "AI / 产品 / 商业复盘 / build in public",
      value: "1W+ 粉丝",
      status: "LIVE",
      icon: XLogo,
      href: xProfileUrl,
      bars: [7, 9, 11, 13, 15, 16, 18],
    },
    {
      key: "douyin",
      label: "DOUYIN / KAI",
      name: "陈硕 KAI（30w 粉速通版）",
      detail: "抖音号 22802710799 · AI 实践 / 代码动画",
      value: "公开创作",
      status: "LIVE",
      icon: TiktokLogo,
      href: douyinProfileUrl,
      bars: [5, 8, 10, 12, 14, 16, 18],
    },
    {
      key: "youtube",
      label: "YOUTUBE / CHANNEL MATRIX",
      name: "YouTube 频道矩阵",
      detail: "跨境内容 / 短视频资产 / 30万+ 订阅",
      value: "30万+ 订阅",
      status: "PROOF",
      icon: YoutubeLogo,
      pageHref: "/blog/personal-review-2026-07",
      bars: [10, 12, 14, 16, 18, 20, 22],
    },
    {
      key: "feishu",
      label: "FEISHU / WIKI",
      name: "飞书知识库",
      detail: "路径 / 模块 / 行动 / 1W+ 浏览",
      value: "累计 1W+ 浏览",
      status: "OPEN",
      icon: BookOpenText,
      href: knowledgeBaseUrl,
      bars: [4, 5, 7, 8, 10, 11, 13],
    },
    {
      key: "github",
      label: "OPEN SOURCE / TOOLS",
      name: "开源工具库",
      detail: "cs-board / cs-skills / cs-xiaohuang-skill",
      value: githubStats.value,
      status: "LIVE",
      icon: GithubLogo,
      href: githubProfileUrl,
      pageHref: "/github",
      bars: githubStats.bars,
    },
    {
      key: "community",
      label: "COMMUNITY / AI",
      name: "全国 AI 社区",
      detail: "AI / 内容 / 产品",
      value: "500 位成员",
      status: "OPEN",
      icon: UserCircle,
      href: "/community",
      pageHref: "/community",
      bars: [4, 6, 7, 9, 11, 12, 14],
    },
  ];

  return (
    <section className="platform-signal-section" id="platforms" aria-label={t("自媒体")}>
      <div className="platform-signal-inner platform-signal-inner-solo">
        <div className="platform-signal-heading editorial-reveal" data-reveal-delay="100">
          <div className="platform-signal-heading-title">
            <p className="section-kicker">MEDIA / SIGNALS</p>
            <h2>{t("自媒体")}</h2>
          </div>
          <div className="platform-signal-heading-side">
            <span>LIVE / OPEN</span>
            <p>{t("X、抖音、YouTube、知识库、开源项目和 AI 社群，构成同一条公开增长轨道。")}</p>
          </div>
        </div>

        <div className="platform-signal-grid">
          {signals.map((signal, index) => {
            const Icon = signal.icon;

            return (
              <a
                className={`platform-signal-row platform-signal-row-${signal.key} editorial-reveal`}
                data-reveal-delay={`${index * 80 + 140}`}
                href={signal.pageHref || signal.href}
                key={signal.key}
                target={signal.pageHref ? undefined : "_blank"}
                rel={signal.pageHref ? undefined : "noreferrer"}
              >
                <div className="platform-signal-identity">
                  <span className="platform-signal-icon"><Icon size={28} weight="regular" aria-hidden="true" /></span>
                  <div>
                    <p>{t(signal.label)}</p>
                    <strong>{t(signal.name)}</strong>
                    <small>{t(signal.detail)}</small>
                  </div>
                </div>
                <div className="platform-signal-data">
                  <strong>{t(signal.value)}</strong>
                  <div className="platform-signal-bars" aria-hidden="true">
                    {signal.bars.map((bar, index) => <span key={`${signal.key}-${index}`} style={{ "--signal-bar-height": `${bar * 3}px` }} />)}
                  </div>
                  <small className="platform-signal-status"><span />{t(signal.status)}</small>
                </div>
                <ArrowUpRight className="platform-signal-arrow" size={22} weight="bold" aria-hidden="true" />
              </a>
            );
          })}
        </div>

        <p className="platform-signal-note">DATA // X 1W+ · YOUTUBE 30W+ · GITHUB PUBLIC PROFILE/API · FEISHU // OPEN ENTRY</p>
      </div>
    </section>
  );
}

function BlogArticlePage({ post }) {
  const { t, language } = useSitePreferences();
  const isArchive = Boolean(post.markdown);
  const isFullText = post.source === "全文归档";
  const { data: readership } = usePublicReadership();
  return (
    <main className="site-shell editorial-page editorial-blog-page">
      <EditorialSiteHeader activeKey="blog" sectionLabel={t("BLOG / 写作与复盘")} actionLabel={t("加入社区")} actionHref="/community" />
      <article className="blog-article">
        {language === "en" && <p className="blog-language-note">Published articles are available in their original Chinese.</p>}
        <a className="blog-back-link" href="/blog">{t("← 返回博客")}</a>
        <header className="blog-article-header editorial-reveal">
          <div className="blog-post-meta">
            <span>{t(post.category)}</span>
            <time dateTime={post.date.replaceAll(".", "-")}>{t(post.date)}</time>
            <span>{t(post.source)}</span>
            {readership && <span>{formatNumber(readership.articles[post.href] || 0)}{t(" 次站内阅读")}</span>}
          </div>
          <h1 lang="zh-CN">{post.title}</h1>
          <p lang="zh-CN">{post.excerpt}</p>
          <a href={post.originalUrl} target="_blank" rel="noreferrer">{t("查看 X 原帖 ")}<ArrowUpRight size={17} weight="bold" aria-hidden="true" /></a>
        </header>
        {isArchive ? (
          <div className="blog-markdown editorial-reveal" lang="zh-CN">
            <Suspense fallback={<p>{t("正在加载正文…")}</p>}>
              <BlogMarkdown markdown={post.markdown} />
            </Suspense>
          </div>
        ) : (
          <div className="blog-article-body" lang="zh-CN">
          {post.sections.map((section, index) => (
            <section className="editorial-reveal" key={section.heading}>
              <span>0{index + 1}</span>
              <div>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
          </div>
        )}
        <footer className="blog-article-footer">
          <p>{t(isFullText ? "本文取自已发布文章的本地正文归档。发布后的修改与讨论请以 X 原帖为准。" : post.source === "公开镜像归档" ? "本文依据公开镜像可见内容归档；原帖内容与后续更新请以 X 为准。" : "这是根据已发布内容整理的站内版本，完整细节与后续更新请以 X 原帖为准。")}</p>
          {post.href === "/blog/personal-review-2026-07" && <p>{t("这篇历史复盘保留了写作时的个人信息；项目与合作入口请看")}<a href="/work">{t("业务合作")}</a>。</p>}
          <div>
            <a href={post.originalUrl} target="_blank" rel="noreferrer">{t("打开 X 原帖 ")}<ArrowUpRight size={17} weight="bold" aria-hidden="true" /></a>
            <a href="/work">{t("了解业务合作 ")}<ArrowRight size={17} weight="bold" aria-hidden="true" /></a>
            <a href="/community">{t("了解 WE30 社区 ")}<ArrowRight size={17} weight="bold" aria-hidden="true" /></a>
          </div>
        </footer>
      </article>
    </main>
  );
}

function BlogPage() {
  const { t, language } = useSitePreferences();
  const [activeCategory, setActiveCategory] = useState("全部");
  const { data: readership, error: readershipError } = usePublicReadership();
  const categories = ["全部", ...new Set(blogPosts.map((post) => post.category))];
  const visiblePosts = activeCategory === "全部" ? blogPosts : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <main className="site-shell editorial-page editorial-blog-page">
      <EditorialSiteHeader activeKey="blog" sectionLabel={t("BLOG / 写作与复盘")} actionLabel={t("加入社区")} actionHref="/community" />
      <div className="blog-shell">
        <section className="blog-intro editorial-reveal" aria-labelledby="blog-title">
          <div>
            <p className="section-kicker">{t("FIELD NOTES / 陈硕 KAI")}</p>
            <h1 id="blog-title">{t("写下做过的事。")}<br /><em>Blog & Notes.</em></h1>
            <div className="blog-readership" aria-live="polite">
              {readership ? <><strong>{formatNumber(readership.visitors)}</strong>{t(" 位站内记录访客 ")}<span>/</span> {formatNumber(readership.pageviews)}{t(" 次全站浏览 ")}<small>{t("自 ")}{formatReadershipStart(readership.firstRecordedAt)}{t(" 起")}</small></> : readershipError ? t("阅读统计暂不可用") : t("正在读取站内统计…")}
            </div>
          </div>
          <p>{t("AI 产品、内容增长和创业路上的真实尝试。这里收录已找到来源的 @ChenshuoAI 长文；全文归档、整理版和公开镜像分别标注。读完可以继续看看正在做的产品，或加入 WE30 交流。")}</p>
        </section>

        {language === "en" && <p className="blog-language-note">Published articles are available in their original Chinese.</p>}
        <div className="blog-layout">
          <section className="blog-feed" aria-label={t("博客文章")}>
            <div className="blog-feed-heading">
              <div>
                <span>01 / WRITING</span>
                <h2>{t("最近的文章")}</h2>
              </div>
              <small>{String(visiblePosts.length).padStart(2, "0")} ENTRIES</small>
            </div>

            <div className="blog-filters" aria-label={t("按主题筛选文章")}>
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >{t(category)}</button>
              ))}
            </div>

            <div className="blog-post-list">
              {visiblePosts.map((post) => (
                <article className="blog-post" key={post.href}>
                  <div className="blog-post-meta">
                    <span>{t(post.category)}</span>
                    <time dateTime={post.date.replaceAll(".", "-")}>{t(post.date)}</time>
                    <span>{t(post.source)}</span>
                    {readership && post.href.startsWith("/blog/") && <span>{formatNumber(readership.articles[post.href] || 0)}{t(" 次站内阅读")}</span>}
                  </div>
                  <h3 lang="zh-CN"><a href={post.href}>{post.title}</a></h3>
                  <p lang="zh-CN">{post.excerpt}</p>
                  <a className="blog-post-link" href={post.href}>
                    {t(post.source === "全文归档" || !post.sections && !post.markdown ? "在站内阅读全文" : "阅读站内整理")}
                    <ArrowRight size={18} weight="bold" aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </section>

          <aside className="blog-aside" aria-label={t("关于作者与更多入口")}>
            <div className="blog-aside-card blog-author-card">
              <span>02 / AUTHOR</span>
              <strong>{t("陈硕 KAI")}</strong>
              <p>{t("AI 连续创业者。现在主要做 AI 产品、内容、知识库与社区，喜欢把做过的事和踩过的坑公开写出来。")}</p>
              <a href={xProfileUrl} target="_blank" rel="noreferrer">{t("在 X 上关注我 ")}<ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
            <div className="blog-aside-card blog-next-card">
              <span>03 / KEEP EXPLORING</span>
              <h2>{t("读完以后，")}<br />{t("来看看我在做什么。")}</h2>
              <a href="/work">{t("业务合作 ")}<ArrowRight size={17} weight="bold" aria-hidden="true" /></a>
              <a href="/community">{t("加入 WE30 社区 ")}<ArrowRight size={17} weight="bold" aria-hidden="true" /></a>
              <a href="/#contact">{t("联系我 ")}<ArrowRight size={17} weight="bold" aria-hidden="true" /></a>
            </div>
            <p className="blog-source-note">{t("仅收录 @ChenshuoAI 长文。来源与完整度在每篇文章上方标注，原帖以 X 页面为准。")}</p>
            <p className="blog-source-note">{t("访客按浏览器标识去重，统计从站内采集启用后开始；文章阅读次数只计算本站页面浏览。")}</p>
          </aside>
        </div>
      </div>
    </main>
  );
}

function WorkPage() {
  const { t } = useSitePreferences();
  const [isWechatConsultationOpen, setIsWechatConsultationOpen] = useState(false);

  return (
    <main className="site-shell editorial-page editorial-work-page">
      <EditorialSiteHeader activeKey="work" sectionLabel={t("BUSINESS / 业务合作")} actionLabel={t("联系我")} actionHref="/#contact" />
      <section className="editorial-projects-section editorial-page-section" id="work" aria-label={t("业务合作")}>
        <div className="editorial-projects-heading editorial-reveal" data-reveal-delay="60">
          <p className="section-kicker">{t("BUSINESS / 业务合作")}</p>
          <h2>{t("业务合作")}</h2>
          <p>{t("面向个人与企业，提供企业培训、内容商单、1 对 1 咨询与 GEO 服务。本人主要活跃于深圳、厦门、香港，具体合作形式可添加微信沟通。")}</p>
        </div>
        <div className="hero-system-frame">
          <div className="hero-project-list">
            <a
              className="hero-project-item editorial-reveal"
              data-reveal-delay="90"
              href={warmSpaceUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span className="hero-project-index">01</span>
              <div>
                <strong>
                  <Flame size={18} weight="duotone" aria-hidden="true" />{t("有温度空间")}</strong>
                <em>{t("工具库 / 阅览室 / 知识地图")}</em>
                <p>{t("产品、阅读和信息结构的统一入口，从这里进入有温度空间。")}</p>
              </div>
              <span className="hero-project-item-cta">{t("进入空间")}<ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </span>
            </a>
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <button
                  className="hero-project-item editorial-reveal"
                  data-reveal-delay={`${index * 80 + 170}`}
                  key={project.title}
                  type="button"
                  onClick={() => setIsWechatConsultationOpen(true)}
                >
                  <span className="hero-project-index">0{index + 2}</span>
                  <div>
                    <strong>
                      <Icon size={18} weight="duotone" aria-hidden="true" />
                      {t(project.title)}
                    </strong>
                    <em>{t(project.metric)}</em>
                    <p>{t(project.description)}</p>
                  </div>
                  <span className="hero-project-item-cta">{t("添加微信")}<ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {isWechatConsultationOpen && (
        <div className="wechat-consult-modal" role="dialog" aria-modal="true" aria-labelledby="wechat-consult-title">
          <button className="wechat-consult-modal-backdrop" type="button" aria-label={t("关闭微信咨询二维码")} onClick={() => setIsWechatConsultationOpen(false)} />
          <section className="wechat-consult-modal-card">
            <button className="wechat-consult-modal-close" type="button" onClick={() => setIsWechatConsultationOpen(false)}>{t("关闭")}</button>
            <p>WECHAT / CONSULT</p>
            <h2 id="wechat-consult-title">{t("扫码添加微信咨询")}</h2>
            <img src="/assets/community-wechat-qr.jpg" alt={t("陈硕 KAI 的微信咨询二维码")} />
            <strong>{t(wechatId)}</strong>
            <span>{t("添加时请备注：姓名 + 需求类型 + 具体问题。例如：企业培训 / 商单合作 / 1 对 1 咨询 / GEO 服务。")}</span>
          </section>
        </div>
      )}
    </main>
  );
}

function MediaPage() {
  const { t } = useSitePreferences();
  return (
    <main className="site-shell editorial-page editorial-media-page">
      <EditorialSiteHeader activeKey="media" sectionLabel="MEDIA / SIGNALS" actionLabel={t("联系我")} actionHref="/#contact" />
      <PlatformSignalsSection />
    </main>
  );
}

function KnowledgeOriginSection() {
  const { t } = useSitePreferences();
  return (
    <section className="knowledge-section editorial-article-section" id="knowledge-origin">
      <div className="knowledge-inner">
        <div className="knowledge-title-frame editorial-reveal" data-reveal-delay="80">
          <span className="editorial-index-stamp">ORIGIN / 001</span>
          <p className="section-kicker">KNOWLEDGE BASE ORIGIN</p>
          <h2>{t("《关于这个知识库的起点》")}</h2>
          <div className="knowledge-title-copy">
            {knowledgeOriginIntro.map((paragraph) => (
              <p key={paragraph}>{t(paragraph)}</p>
            ))}
          </div>
          <a className="knowledge-title-link" href={knowledgeBaseUrl} target="_blank" rel="noreferrer">{t("打开飞书知识库")}<ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <div className="knowledge-origin-grid">
          {knowledgeOriginChapters.map((chapter) => (
            <article
              className={`knowledge-origin-card editorial-reveal ${chapter.isSummary ? "knowledge-origin-card-summary" : ""}`}
              data-reveal-delay={`${Math.min(Number(chapter.index) * 70, 420)}`}
              key={chapter.index}
            >
              <span>{t(chapter.index)}</span>
              <h3>{t(chapter.title)}</h3>
              {chapter.paragraphs.map((paragraph) => (
                <p key={paragraph}>{t(paragraph)}</p>
              ))}
              {chapter.points?.length > 0 && (
                <ul>
                  {chapter.points.map((point) => (
                    <li key={point}>{t(point)}</li>
                  ))}
                </ul>
              )}
              {chapter.quote && <strong>{t(chapter.quote)}</strong>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function KnowledgePage() {
  const { t } = useSitePreferences();
  return (
    <main className="site-shell editorial-page editorial-knowledge-page">
      <EditorialSiteHeader activeKey="knowledge" sectionLabel="KNOWLEDGE / STRUCTURE" actionLabel={t("打开飞书知识库")} actionHref={knowledgeBaseUrl} />
      <section className="editorial-detail-hero editorial-knowledge-hero" id="top" aria-label={t("知识地图页面介绍")}>
        <div className="editorial-detail-copy editorial-reveal" data-reveal-delay="80">
          <p className="editorial-page-kicker"><span>01</span> KNOWLEDGE MAP / ORIGIN</p>
          <h1>{t("知识地图")}</h1>
          <p className="editorial-detail-description">{t("这里不是资料仓库，而是一个持续生长的结构外脑：把分散的内容、工具和观点，重新组织成可以理解、可以行动的路径。")}</p>
          <div className="editorial-detail-actions">
            <a className="editorial-outline-action editorial-outline-action-fill" href={knowledgeBaseUrl} target="_blank" rel="noreferrer">{t("打开飞书知识库")}<ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a className="editorial-outline-action" href="/knowledge-base">{t("查看知识库起点")}</a>
          </div>
        </div>
        <aside className="editorial-spec-sheet editorial-reveal" data-reveal-delay="180" aria-label={t("知识地图规格信息")}>
          <p>SPEC.001</p>
          <dl>
            <div><dt>FOCUS</dt><dd>{t("信息结构 / 知识产品")}</dd></div>
            <div><dt>FORMAT</dt><dd>{t("路径 / 模块 / 行动")}</dd></div>
            <div><dt>VALUE</dt><dd>{t("从看过到可以使用")}</dd></div>
            <div><dt>STATUS</dt><dd>{t("持续生长中")}</dd></div>
          </dl>
          <span className="editorial-spec-foot">ID // CHEN SHUO / 2026</span>
        </aside>
      </section>
    </main>
  );
}

function KnowledgeBasePage() {
  const { t } = useSitePreferences();
  return (
    <main className="site-shell editorial-page editorial-knowledge-base-page">
      <EditorialSiteHeader activeKey="knowledge" sectionLabel="KNOWLEDGE BASE / ORIGIN" actionLabel={t("打开飞书知识库")} actionHref={knowledgeBaseUrl} />
      <section className="editorial-detail-hero editorial-knowledge-hero" id="top" aria-label={t("知识库页面介绍")}>
        <div className="editorial-detail-copy editorial-reveal" data-reveal-delay="80">
          <p className="editorial-page-kicker"><span>01</span> KNOWLEDGE BASE / ORIGIN</p>
          <h1>{t("知识库")}</h1>
          <p className="editorial-detail-description">{t("这是把正在使用的内容、工具和判断路径持续沉淀下来的结构外脑。先了解它从哪里开始，再进入完整知识库。")}</p>
          <div className="editorial-detail-actions">
            <a className="editorial-outline-action editorial-outline-action-fill" href={knowledgeBaseUrl} target="_blank" rel="noreferrer">{t("打开飞书知识库")}<ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a className="editorial-outline-action" href="/knowledge">{t("返回知识地图")}</a>
          </div>
        </div>
        <aside className="editorial-spec-sheet editorial-reveal" data-reveal-delay="180" aria-label={t("知识库规格信息")}>
          <p>SPEC.002</p>
          <dl>
            <div><dt>FOCUS</dt><dd>{t("结构化沉淀 / 可复用")}</dd></div>
            <div><dt>FORMAT</dt><dd>{t("起点 / 章节 / 路径")}</dd></div>
            <div><dt>VALUE</dt><dd>{t("从阅读到执行")}</dd></div>
            <div><dt>STATUS</dt><dd>{t("持续维护中")}</dd></div>
          </dl>
          <span className="editorial-spec-foot">ID // CHEN SHUO / 2026</span>
        </aside>
      </section>
      <KnowledgeOriginSection />
    </main>
  );
}

function EditorialCollectionPage({
  activeKey,
  pageClass,
  sectionLabel,
  kicker,
  pageNumber,
  title,
  subtitle,
  small,
  description,
  actionLabel,
  actionHref,
  points,
}) {
  const { t } = useSitePreferences();
  return (
    <main className={`site-shell editorial-page editorial-collection-page ${pageClass}`}>
      <EditorialSiteHeader activeKey={activeKey} sectionLabel={sectionLabel} actionLabel={actionLabel} actionHref={actionHref} />
      <section className="editorial-detail-hero editorial-collection-hero" id="top" aria-label={`${t(title)} ${t("页面介绍")}`}>
        <div className="editorial-detail-copy editorial-reveal" data-reveal-delay="80">
          <p className="editorial-page-kicker"><span>{t(pageNumber)}</span> {t(kicker)}</p>
          <h1>
            <span>{t(title)}</span>
            <span>{t(subtitle)}</span>
            <small>{t(small)}</small>
          </h1>
          <p className="editorial-detail-description">{t(description)}</p>
          <div className="editorial-detail-actions">
            <a className="editorial-outline-action editorial-outline-action-fill" href={actionHref} target={actionHref.startsWith("http") ? "_blank" : undefined} rel={actionHref.startsWith("http") ? "noreferrer" : undefined}>
              {t(actionLabel)}
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a className="editorial-outline-action" href="/work">{t("返回业务合作")}</a>
          </div>
        </div>
        <aside className="editorial-spec-sheet editorial-reveal" data-reveal-delay="180" aria-label={`${t(title)} ${t("页面规格信息")}`}>
          <p>SPEC.{t(pageNumber)}</p>
          <dl>
            {points.map((point, index) => (
              <div key={point.title}>
                <dt>0{index + 1}</dt>
                <dd><strong>{t(point.title)}</strong><span>{t(point.text)}</span></dd>
              </div>
            ))}
          </dl>
          <span className="editorial-spec-foot">ID // CHEN SHUO / 2026</span>
        </aside>
      </section>
    </main>
  );
}

function ToolsIntroPage() {
  const { t } = useSitePreferences();
  return (
    <EditorialCollectionPage
      activeKey="tools"
      pageClass="editorial-tools-page"
      sectionLabel="TOOLS / PRODUCT / LAB"
      kicker="TOOLS LIBRARY / PRODUCT LAB"
      pageNumber="02"
      title={t("工具库")}
      subtitle={t("持续生长的 AI 产品实验室")}
      small={t("验证 / 上线 / 迭代")}
      description={t("这里会集中放我正在验证、已经上线和持续迭代的 AI 工具、小游戏、训练器与知识产品。先看产品方向，再进入具体工具体验。")}
      actionLabel={t("进入工具库")}
      actionHref={productLibraryUrl}
      points={[
        { title: "产品实验", text: "把想法快速做成可访问的页面，用真实使用反馈判断是否继续投入。" },
        { title: "AI 工作流", text: "沉淀能复用的提示词、流程和自动化能力，让工具从一次性项目变成系统。" },
        { title: "可商业化入口", text: "每个工具都服务于学习、训练、测试、内容生产或转化等具体需求。" },
      ]}
    />
  );
}

function ReadingRoomPage() {
  const { t } = useSitePreferences();
  return (
    <EditorialCollectionPage
      activeKey="reading"
      pageClass="editorial-reading-page"
      sectionLabel="READING / GROWTH / SYSTEM"
      kicker="YOU WENDU / READING ROOM"
      pageNumber="03"
      title={t("有温度阅览室")}
      subtitle={t("把“知道”缩短到“做到”")}
      small={t("个人成长系统")}
      description={t("这里不是普通资料库，而是我整理给自己的长期阅读入口：从心理、认知到行动方法，帮助你理解自己、改变状态，并把学习变成可执行的下一步。")}
      actionLabel={t("进入阅览室")}
      actionHref={readingRoomUrl}
      points={[
        { title: "从这里开始", text: "按推荐路径理解情绪、拖延、注意力、行动力和判断偏差。" },
        { title: "推荐与专题", text: "把值得反复阅读的主题整理成入口，减少信息过载，直接进入关键问题。" },
        { title: "个人成长系统", text: "用结构化阅读连接知识、练习和工具，让内容最终服务于行动和改变。" },
      ]}
    />
  );
}

function CommunityPage() {
  const { t } = useSitePreferences();
  return (
    <main className="site-shell editorial-page editorial-community-page community-page">
      <EditorialSiteHeader activeKey="community" sectionLabel="WE30 / AI / CREATION" actionLabel={t("添加微信咨询")} actionHref="#community-contact" />

      <section className="community-intro-section">
        <div className="community-manifesto editorial-reveal" data-reveal-delay="60">
          <div>
            <p className="community-story-kicker">WE30 / AI / CREATION</p>
            <p className="community-member-count"><strong>500</strong>{t(" 位成员，一起做事。")}</p>
            <h1>{t("把想做事的人，聚在一起。")}</h1>
          </div>
          <div className="community-manifesto-copy">
            <p className="community-manifesto-lede">{t("WE30 现在有 500 位成员，面向已跑通商业闭环并拿到结果的 00 后，以及有认知、有思考、已拿到一定结果的人群。围绕 AI 创作、产品与业务交流，分享实践与真实经验。")}</p>
            <div className="community-manifesto-routes" aria-label={t("社区入口")}>
              <a href="#community-contact">
                <span>WE30 / COMMUNITY</span>
                <strong>{t("加入 WE30：")}{t(communityFee)}{t("，需满足入群门槛")}</strong>
                <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="community-story editorial-reveal" data-reveal-delay="100">
          <p>{t("在同一个社群里交流业务、分享认知与实践，把有价值的方法沉淀下来。")}</p>
        </div>

        <div className="community-program-grid" aria-label={t("WE30 社区结构")}>
          <article className="community-program community-program-we30 editorial-reveal" data-reveal-delay="130">
            <div className="community-program-topline">
              <p className="community-story-kicker">WE30 / COMMUNITY</p>
              <span>DEEP CONNECTION</span>
            </div>
            <h2>{t("WE30 社群")}</h2>
            <p className="community-program-lede">{t("围绕业务、产品和内容持续交流。入群费用为 ")}{t(communityFee)}{t("；同时需满足以下两类人群中的任意一类。")}</p>
            <div className="community-program-details">
              <div>
                <span>{t("入群费用")}</span>
                <p>{t("入群费用：")}{t(communityFee)}。</p>
              </div>
              <div>
                <span>{t("入群门槛 / 二选一")}</span>
                <p><strong>{t("00 后商业实践者")}</strong>{t("：已经跑通商业闭环，并拿到实际结果。")}</p>
                <p><strong>{t("有认知、有思考的人群")}</strong>{t("：有自己的判断，愿意独立思考、深入交流，并已拿到一定的实际结果。")}</p>
              </div>
            </div>
            <div className="community-program-proof" aria-label={t("WE30 社群内容")}>
              <span>WHAT HAPPENS HERE</span>
              <p>{t("做业务分享、会议复盘与产品讨论，把有价值的方法沉淀下来。")}</p>
            </div>
            <a className="community-program-link" href="#community-contact">{t("申请加入 WE30")}<ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </article>

        </div>

        <section className="community-boundary editorial-reveal" data-reveal-delay="270" aria-label={t("社区共同边界")}>
          <div>
            <p className="community-story-kicker">ONE STANDARD / REAL WORK</p>
            <h2>{t("不是人很多，")}<br />{t("是一群有创造力的人。")}</h2>
          </div>
          <div className="community-boundary-copy">
            <p>{t("不承诺赚钱、资源或人脉，也不相信加入一个群就能改变人生。这里想留下的是愿意做事的人、被验证过的连接，以及不断累积的结果。")}</p>
            <ul>
              <li>{t("不欢迎广告、骚扰、卖课引流与搬运内部内容。")}</li>
              <li>{t("不鼓励只索取、不行动的参与方式。")}</li>
              <li>{t("具体规则与协作方式，只在匹配后的社区内部展开。")}</li>
            </ul>
          </div>
        </section>
      </section>

      <section className="community-access-section" id="community-contact" aria-label={t("加入社区咨询")}>
        <div className="community-access-inner editorial-reveal" data-reveal-delay="100">
          <div className="community-copy">
            <p className="section-kicker">WE30 / COMMUNITY</p>
            <h1>{t("加入社区")}</h1>
            <p className="community-lede">{t("加我微信，备注姓名、申请加入 WE30、符合哪类门槛，以及你的思考与实际成果。")}<br />{t("未备注清楚，无法判断申请；不备注，不通过。")}</p>
            <a className="community-back-link" href="/#top">{t("回到首页")}<ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <aside className="community-contact-card" aria-label={t("加入社区咨询")}>
            <span>COMMUNITY / CONTACT</span>
            <h2>{t("添加微信咨询")}</h2>
            <p>{t("入群费用为 ")}{t(communityFee)}{t("。扫码加微信请备注：姓名 + 申请加入 WE30 + 符合哪类门槛 + 思考与实际成果。00 后商业实践者请说明已跑通的商业闭环和实际结果；认知与思考类申请者请分享自己的判断、思考，以及已经拿到的实际结果。不备注不通过。")}</p>
            <figure className="community-qr">
              <img src="/assets/community-wechat-qr.jpg" alt={t("陈硕 KAI 的微信咨询二维码")} />
              <figcaption>SCAN TO CONNECT</figcaption>
            </figure>
            <div className="community-wechat" aria-label={t("社区微信号")}>
              <span>{t("微信号")}</span>
              <strong>{t(wechatId)}</strong>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

const adminRangeOptions = [
  { label: "1D", value: "1d" },
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
];

const adminPasswordStorageKey = "cs-admin-password";
const analyticsContextStorageKey = "cs-analytics-session-context-v2";
const analyticsVisitorStorageKey = "cs-analytics-visitor";
const analyticsPendingEventsStorageKey = "cs-analytics-pending-events";
const analyticsPendingEventsLimit = 50;
let analyticsPendingEvents = null;
let analyticsFlushPromise = null;
let analyticsMemoryContext = null;
let analyticsMemoryVisitorId = "";

function readAdminPassword() {
  if (typeof window === "undefined") return "";

  try {
    const storedPassword = window.sessionStorage.getItem(adminPasswordStorageKey) || "";
    window.localStorage.removeItem(adminPasswordStorageKey);
    return storedPassword;
  } catch {
    return "";
  }
}

function formatNumber(value) {
  return new Intl.NumberFormat("zh-CN").format(value || 0);
}

function formatDay(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Shanghai",
  }).format(new Date(value));
}

function formatAdminDateTime(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Shanghai",
  }).format(new Date(value));
}

function formatAdminRange(range, since, until) {
  const rangeLabels = {
    "1d": "今天",
    "7d": "近 7 天",
    "30d": "近 30 天",
    "90d": "近 90 天",
  };

  return rangeLabels[range] || `${since || "-"} — ${until || "-"}`;
}

function getAdminDateError(from, to) {
  if (!from || !to) return "请选择开始和结束日期";
  if (from > to) return "开始日期不能晚于结束日期";

  const days = Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000) + 1;
  if (days > 366) return "自定义区间最多支持 366 天";
  return "";
}

function getDimensionLabel(item, keys, fallback = "Direct / Unknown") {
  const value = keys.map((key) => item[key]).find(Boolean);
  return value || fallback;
}

function formatStorageLabel(storage) {
  if (!storage?.persistent) return "存储状态未知";
  return storage.deduplicated ? `${storage.label} · 已去重保存` : storage.label;
}

function AdminPage() {
  const [range, setRange] = useState("30d");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [password, setPassword] = useState(readAdminPassword);
  const [inputPassword, setInputPassword] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");
  const [dateError, setDateError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDayKey, setSelectedDayKey] = useState("");
  const [lastQuery, setLastQuery] = useState({ range: "30d", from: "", to: "" });
  const requestIdRef = useRef(0);

  async function loadAnalytics(nextRange = range, nextPassword = password, nextFrom = from, nextTo = to) {
    if (!nextPassword?.trim()) return;

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setLastQuery({ range: nextRange, from: nextFrom || "", to: nextTo || "" });
    setIsLoading(true);
    setError("");
    setStatusMessage(analytics ? "正在更新数据…" : "正在连接分析数据…");

    try {
      const params = new URLSearchParams({ range: nextRange });
      if (nextFrom && nextTo) { params.set("from", nextFrom); params.set("to", nextTo); }
      const response = await fetch(`/api/admin-analytics?${params.toString()}`, {
        headers: {
          "x-admin-password": nextPassword,
        },
      });
      const data = await response.json().catch(() => ({}));

      if (
        !response.ok ||
        !data ||
        typeof data !== "object" ||
        typeof data.range !== "string" ||
        typeof data.since !== "string" ||
        typeof data.until !== "string" ||
        !Array.isArray(data.daily) ||
        !data.totals ||
        !data.today
      ) {
        const loadError = new Error(data.error || "分析接口返回了无效数据");
        loadError.status = response.status;
        throw loadError;
      }

      if (requestId !== requestIdRef.current) return;

      setAnalytics(data);
      setPassword(nextPassword);
      setSelectedDayKey(data.daily?.[data.daily.length - 1]?.timestamp || "");
      setStatusMessage(`已更新 · ${formatAdminDateTime(data.updatedAt)}`);
      try {
        window.sessionStorage.setItem(adminPasswordStorageKey, nextPassword);
      } catch {
        // The analytics view still works when browser storage is unavailable.
      }
    } catch (loadError) {
      if (requestId !== requestIdRef.current) return;

      if (loadError.status === 401 || loadError.message?.includes("Invalid")) {
        setAnalytics(null);
        setPassword("");
        setInputPassword("");
        setStatusMessage("");
        setError("密码不正确，请重新输入管理员密码");
        try {
          window.sessionStorage.removeItem(adminPasswordStorageKey);
        } catch {
          // Ignore storage cleanup failures.
        }
      } else {
        setError(loadError.message || "数据加载失败");
        setStatusMessage(analytics ? "上次数据仍然保留，可重试本次查询" : "暂时无法连接数据服务");
      }
    } finally {
      if (requestId === requestIdRef.current) setIsLoading(false);
    }
  }

  useEffect(() => {
    if (password) loadAnalytics("30d", password, "", "");
    // Only restore an existing session once. Range changes are handled explicitly below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const nextPassword = inputPassword.trim();
    if (!nextPassword || isLoading) return;
    setPassword(nextPassword);
    loadAnalytics("30d", nextPassword, "", "");
  }

  function handleRangeChange(nextRange) {
    if (!password || isLoading) return;
    setRange(nextRange);
    setFrom("");
    setTo("");
    setDateError("");
    loadAnalytics(nextRange, password, "", "");
  }

  function handleCustomQuery(event) {
    event.preventDefault();
    const nextDateError = getAdminDateError(from, to);
    setDateError(nextDateError);
    if (nextDateError || !password || isLoading) return;
    setRange("custom");
    loadAnalytics("custom", password, from, to);
  }

  function handleLogout() {
    requestIdRef.current += 1;
    setPassword("");
    setInputPassword("");
    setAnalytics(null);
    setError("");
    setDateError("");
    setStatusMessage("");
    setIsLoading(false);
    try {
      window.sessionStorage.removeItem(adminPasswordStorageKey);
    } catch {
      // Ignore storage cleanup failures.
    }
  }

  const maxDailyPageviews = Math.max(...(analytics?.daily || []).map((item) => item.pageviews || 0), 1);
  const hasTrafficData = analytics?.daily?.some((item) => (item.pageviews || 0) > 0 || (item.clicks || 0) > 0);
  const latestRecordedAt = analytics?.tracking?.latestRecordedAt;
  const isTrackingStale = ["supabase", "cloudflare-d1"].includes(analytics?.storage?.provider) && (!latestRecordedAt || Date.now() - Date.parse(latestRecordedAt) > 48 * 60 * 60 * 1000);
  const selectedDaily = analytics?.daily?.find((item) => item.timestamp === selectedDayKey) || analytics?.daily?.[analytics.daily.length - 1] || null;
  const retryQuery = () => loadAnalytics(lastQuery.range, password, lastQuery.from, lastQuery.to);
  const metricItems = analytics ? [
    { label: "区间访客", englishLabel: "RANGE / SITE UV", value: analytics.totals?.visitors, icon: UserCircle, tone: "accent" },
    { label: "区间访问", englishLabel: "RANGE / PAGEVIEWS", value: analytics.totals?.pageviews, icon: ChartLineUp },
    { label: "今日访客", englishLabel: "TODAY / VISITORS", value: analytics.today?.visitors, icon: UsersThree },
    { label: "今日访问", englishLabel: "TODAY / PAGEVIEWS", value: analytics.today?.pageviews, icon: Eye },
    { label: "区间点击", englishLabel: "RANGE / CLICKS", value: analytics.totals?.clicks, icon: CursorClick },
  ] : [];

  return (
    <main className="admin-shell">
      <section className="admin-panel">
        <div className="admin-header">
          <div>
            <p className="admin-kicker">CS / PRIVATE ANALYTICS</p>
            <h1>站点分析</h1>
            <span>Chen Shuo Personal Site <i /> admin workspace</span>
          </div>
          <div className="admin-header-actions">
            {analytics && (
              <div className={`admin-session-status ${isLoading ? "is-loading" : ""}`} aria-live="polite">
                <span className="admin-status-dot" />
                {isLoading ? "正在同步" : "数据库已连接"}
              </div>
            )}
            <a href="/" className="admin-home-link">
              返回网站
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </a>
            {analytics && (
              <button type="button" className="admin-logout-button" onClick={handleLogout}>
                退出
              </button>
            )}
          </div>
        </div>

        {!analytics && !password && (
          <section className="admin-login-panel" aria-labelledby="admin-login-title">
            <div className="admin-login-copy">
              <p className="admin-section-kicker">PRIVATE ACCESS / 01</p>
              <h2 id="admin-login-title">连接你的数据</h2>
              <p>输入管理员密码，查看站点近期的访问、来源和点击信号。</p>
            </div>
            <form className="admin-login" onSubmit={handleSubmit}>
              <label htmlFor="admin-password">管理员密码 <span>SESSION ONLY</span></label>
              <div className="admin-login-row">
                <input
                  id="admin-password"
                  type="password"
                  value={inputPassword}
                  onChange={(event) => setInputPassword(event.target.value)}
                  placeholder="输入密码"
                  autoComplete="current-password"
                />
                <button type="submit" disabled={isLoading || !inputPassword.trim()}>
                  {isLoading ? "连接中" : "查看数据"}
                  <ArrowRight size={17} weight="bold" aria-hidden="true" />
                </button>
              </div>
              <p className="admin-form-note">密码只保留在当前浏览器会话中。</p>
            </form>
          </section>
        )}

        {!analytics && password && isLoading && <AdminDashboardSkeleton />}

        {!analytics && password && !isLoading && error && (
          <section className="admin-error-state" role="alert">
            <WarningCircle size={22} weight="duotone" aria-hidden="true" />
            <div>
              <strong>暂时无法加载数据</strong>
              <p>{error}</p>
              <div className="admin-error-actions">
                <button type="button" onClick={retryQuery}>重试</button>
                <button type="button" className="admin-error-secondary" onClick={handleLogout}>重新登录</button>
              </div>
            </div>
          </section>
        )}

        {analytics && error && (
          <div className="admin-error" role="alert">
            <WarningCircle size={19} weight="duotone" aria-hidden="true" />
            <span>{error}</span>
            <button type="button" onClick={retryQuery} disabled={isLoading}>重试</button>
          </div>
        )}

        {analytics && (
          <div className="admin-dashboard">
            <section className="admin-toolbar" aria-label="数据筛选">
              <div className="admin-toolbar-intro">
                <p className="admin-section-kicker">VIEW / {analytics.range === "custom" ? "CUSTOM" : analytics.range.toUpperCase()}</p>
                <strong>{formatAdminRange(analytics.range, analytics.since, analytics.until)}</strong>
                <span>{analytics.since} — {analytics.until} <i /> {statusMessage || `更新于 ${formatAdminDateTime(analytics.updatedAt)}`}</span>
              </div>
              <div className="admin-toolbar-controls">
                <div className="admin-range-switch" role="group" aria-label="选择时间范围">
                {adminRangeOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    className={range === option.value ? "active" : ""}
                    onClick={() => handleRangeChange(option.value)}
                    aria-pressed={range === option.value}
                    disabled={isLoading}
                  >
                    {option.label}
                  </button>
                ))}
                </div>
                <form className="admin-date-filter" onSubmit={handleCustomQuery}>
                  <div className="admin-date-input">
                    <CalendarBlank size={16} weight="bold" aria-hidden="true" />
                    <input type="date" value={from} onChange={(event) => { setFrom(event.target.value); setDateError(""); }} aria-label="开始日期" />
                  </div>
                  <span className="admin-date-separator">至</span>
                  <div className="admin-date-input">
                    <CalendarBlank size={16} weight="bold" aria-hidden="true" />
                    <input type="date" value={to} onChange={(event) => { setTo(event.target.value); setDateError(""); }} aria-label="结束日期" />
                  </div>
                  <button type="submit" disabled={!from || !to || isLoading}>查询</button>
                </form>
                <button type="button" className="admin-refresh-button" onClick={retryQuery} disabled={isLoading} aria-label="刷新数据">
                  <ArrowClockwise className={isLoading ? "is-spinning" : ""} size={17} weight="bold" aria-hidden="true" />
                  <span>{isLoading ? "更新中" : "刷新"}</span>
                </button>
              </div>
              {dateError && <p className="admin-date-error" role="alert">{dateError}</p>}
            </section>

            <section className="admin-storage-health" aria-label="数据存储状态">
              <span className="admin-status-dot" aria-hidden="true" />
              <div>
                <p>DATA SOURCE / SITE EVENTS</p>
                <strong>{formatStorageLabel(analytics.storage)} · 本站自建埋点</strong>
                <small>{analytics.retrieval?.complete ? `区间内 ${formatNumber(analytics.retrieval.eventCount)} 条事件` : "正在核对汇总完整性"} <i /> 最近一条入库：{latestRecordedAt ? formatAdminDateTime(latestRecordedAt) : "暂无"} <i /> 访客按本站浏览器标识去重，与 Vercel Analytics UV 分开统计</small>
              </div>
            </section>

            {(isTrackingStale || analytics.tracking?.eventIdReady === false) && (
              <div className="admin-error admin-tracking-warning" role="status">
                <WarningCircle size={19} weight="duotone" aria-hidden="true" />
                <span>
                  <strong>自建统计需要检查。</strong>{" "}
                  {isTrackingStale ? "最近 48 小时没有新事件入库；区间为 0 只代表这套埋点没有记录。" : ""}{" "}
                  {analytics.tracking?.eventIdReady === false ? "数据库缺少 event_id，当前版本使用旧表兼容写入，暂不支持事件去重。" : ""}
                </span>
              </div>
            )}

            <div className="admin-metrics-grid">
              {metricItems.map((item) => <AdminMetricCard key={item.englishLabel} {...item} />)}
            </div>

            <section className="admin-chart-panel" aria-labelledby="admin-chart-title" aria-busy={isLoading}>
              <div className="admin-section-title">
                <div>
                  <p className="admin-section-kicker">01 / TRAFFIC</p>
                  <h2 id="admin-chart-title">每日流量</h2>
                </div>
                {selectedDaily && (
                  <div className="admin-chart-readout" aria-live="polite">
                    <span>{formatDay(selectedDaily.timestamp)} · SELECTED DAY</span>
                    <strong>{formatNumber(selectedDaily.pageviews)} <small>PV</small></strong>
                    <em>{formatNumber(selectedDaily.clicks)} clicks · {formatNumber(selectedDaily.visitors)} visitors</em>
                  </div>
                )}
              </div>
              {hasTrafficData ? (
                <div className="admin-bars" role="group" aria-label="每日访问量" style={{ "--admin-bar-count": analytics.daily.length }}>
                  {analytics.daily.map((item) => {
                    const isSelected = selectedDaily?.timestamp === item.timestamp;
                    return (
                      <button
                        className={`admin-bar-item ${isSelected ? "selected" : ""}`}
                        key={item.timestamp}
                        type="button"
                        aria-pressed={isSelected}
                        aria-label={`${formatDay(item.timestamp)}，${formatNumber(item.pageviews)} PV，${formatNumber(item.clicks)} 次点击，${formatNumber(item.visitors)} 位访客`}
                        onClick={() => setSelectedDayKey(item.timestamp)}
                      >
                        <span className="admin-bar-track">
                          <span style={{ height: `${Math.max(((item.pageviews || 0) / maxDailyPageviews) * 100, 4)}%` }} />
                        </span>
                        <strong>{item.pageviews ? formatNumber(item.pageviews) : "—"}</strong>
                        <small>{formatDay(item.timestamp)}</small>
                      </button>
                    );
                  })}
                </div>
              ) : <AdminEmptyState label="当前时间范围内暂无自建埋点数据" detail={isTrackingStale ? "采集已超过 48 小时没有新记录，请检查写入链路。" : "访问数据会在成功入库后显示在这里。"} />}
            </section>

            <div className="admin-lists-grid">
              <AdminRankList title="热门页面" englishTitle="TOP PAGES" rows={analytics.topPages} labelKeys={["requestPath", "route"]} icon={BookOpenText} />
              <AdminRankList title="来源网站" englishTitle="REFERRERS" rows={analytics.referrers} labelKeys={["referrerHostname"]} icon={ArrowUpRight} />
              <AdminRankList title="渠道来源" englishTitle="SOURCES" rows={analytics.sources} labelKeys={["source"]} icon={Network} />
              <AdminRankList title="点击事件" englishTitle="CLICK EVENTS" rows={analytics.clickEvents} labelKeys={["eventName"]} icon={CursorClick} />
              <AdminRankList title="访问国家" englishTitle="COUNTRIES" rows={analytics.countries} labelKeys={["country"]} icon={UserCircle} />
              <AdminRankList title="设备类型" englishTitle="DEVICES" rows={analytics.devices} labelKeys={["deviceType"]} icon={ChartLineUp} />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function AdminDashboardSkeleton() {
  return (
    <div className="admin-dashboard admin-dashboard-skeleton" aria-busy="true" aria-label="正在加载分析数据">
      <div className="admin-skeleton-toolbar"><span /><span /><span /></div>
      <div className="admin-skeleton-metrics">
        {Array.from({ length: 5 }, (_, index) => <span key={index} />)}
      </div>
      <div className="admin-skeleton-chart"><span /><span /><span /><span /><span /><span /><span /></div>
      <div className="admin-skeleton-lists">
        {Array.from({ length: 6 }, (_, index) => <span key={index} />)}
      </div>
    </div>
  );
}

function AdminMetricCard({ label, englishLabel, value, icon: Icon, tone }) {
  return (
    <article className={`admin-metric-card ${tone ? `is-${tone}` : ""}`}>
      <div className="admin-metric-label">
        <span>{label}</span>
        <Icon size={18} weight="duotone" aria-hidden="true" />
      </div>
      <small>{englishLabel}</small>
      <strong>{formatNumber(value)}</strong>
    </article>
  );
}

function AdminEmptyState({ label, detail }) {
  return (
    <div className="admin-empty-state">
      <span className="admin-empty-mark">—</span>
      <div>
        <strong>{label}</strong>
        <p>{detail}</p>
      </div>
    </div>
  );
}

function AdminRankList({ title, englishTitle, rows, labelKeys, icon: Icon }) {
  return (
    <section className="admin-list-panel" aria-labelledby={`admin-list-${englishTitle.toLowerCase().replaceAll(" ", "-")}`}>
      <div className="admin-section-title">
        <div className="admin-list-heading">
          <Icon size={19} weight="duotone" aria-hidden="true" />
          <div>
            <p className="admin-section-kicker">{englishTitle}</p>
            <h2 id={`admin-list-${englishTitle.toLowerCase().replaceAll(" ", "-")}`}>{title}</h2>
          </div>
        </div>
        <span className="admin-list-legend">PV · 点击 · 访客</span>
      </div>
      <ol className="admin-rank-list">
        {rows?.length > 0 ? (
          rows.map((item, index) => (
            <li key={`${title}-${index}`}>
              <span className="admin-rank-index">{String(index + 1).padStart(2, "0")}</span>
              <div className="admin-rank-label">
                <strong title={getDimensionLabel(item, labelKeys)}>{getDimensionLabel(item, labelKeys)}</strong>
                <small>{formatNumber(item.pageviews)} PV · {formatNumber(item.clicks)} 点击 · {formatNumber(item.visitors)} 访客</small>
              </div>
            </li>
          ))
        ) : (
          <li className="admin-rank-empty">
            <span className="admin-empty-mark">—</span>
            <div>
              <strong>暂无数据</strong>
              <small>当前时间范围内还没有记录</small>
            </div>
          </li>
        )}
      </ol>
    </section>
  );
}

function safeReadStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeWriteStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeReadSessionStorage(key) {
  try { return window.sessionStorage.getItem(key); } catch { return null; }
}

function safeWriteSessionStorage(key, value) {
  try { window.sessionStorage.setItem(key, value); } catch { /* 仍可使用当前页面内存 */ }
}

function createAnalyticsEventId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

function getAnalyticsContext() {
  const params = new URLSearchParams(window.location.search);
  let stored = analyticsMemoryContext || {};
  try {
    const savedContext = safeReadSessionStorage(analyticsContextStorageKey);
    if (savedContext) stored = JSON.parse(savedContext) || stored;
  } catch {
    // Invalid local data should never stop analytics from being sent.
  }
  const context = {
    source: params.get("utm_source") || stored.source || "",
    medium: params.get("utm_medium") || stored.medium || "",
    campaign: params.get("utm_campaign") || stored.campaign || "",
    content: params.get("utm_content") || stored.content || "",
  };
  analyticsMemoryContext = context;
  safeWriteSessionStorage(analyticsContextStorageKey, JSON.stringify(context));
  const storedVisitorId = safeReadStorage(analyticsVisitorStorageKey);
  const visitorId = storedVisitorId || analyticsMemoryVisitorId || createAnalyticsEventId();
  analyticsMemoryVisitorId = visitorId;
  if (!storedVisitorId) safeWriteStorage(analyticsVisitorStorageKey, visitorId);
  return { ...context, visitorId };
}

function getAnalyticsPendingEvents() {
  if (analyticsPendingEvents) return analyticsPendingEvents;
  try {
    const stored = JSON.parse(safeReadStorage(analyticsPendingEventsStorageKey) || "[]");
    analyticsPendingEvents = Array.isArray(stored) ? stored.slice(-analyticsPendingEventsLimit) : [];
  } catch {
    analyticsPendingEvents = [];
  }
  return analyticsPendingEvents;
}

function persistAnalyticsPendingEvents() {
  safeWriteStorage(analyticsPendingEventsStorageKey, JSON.stringify(getAnalyticsPendingEvents()));
}

async function flushAnalyticsEvents() {
  if (analyticsFlushPromise) return analyticsFlushPromise;
  const queue = getAnalyticsPendingEvents();
  analyticsFlushPromise = (async () => {
    while (queue.length > 0) {
      const event = queue[0];
      try {
        const response = await fetch("/api/track-view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(event),
          keepalive: true,
        });
        if (!response.ok) throw new Error(`Analytics request failed: ${response.status}`);
        queue.shift();
        persistAnalyticsPendingEvents();
      } catch {
        break;
      }
    }
  })().finally(() => {
    analyticsFlushPromise = null;
  });
  return analyticsFlushPromise;
}

function sendAnalyticsEvent(event) {
  const queue = getAnalyticsPendingEvents();
  queue.push({ eventId: createAnalyticsEventId(), ...event, ...getAnalyticsContext() });
  if (queue.length > analyticsPendingEventsLimit) queue.splice(0, queue.length - analyticsPendingEventsLimit);
  persistAnalyticsPendingEvents();
  void flushAnalyticsEvents();
}

function usePageViewTracking(pathname) {
  useEffect(() => {
    if (pathname === "/admin") return undefined;
    sendAnalyticsEvent({ eventType: "pageview", path: pathname, title: document.title, referrer: document.referrer });
    const retryPendingAnalytics = () => { void flushAnalyticsEvents(); };
    window.addEventListener("online", retryPendingAnalytics);
    return () => window.removeEventListener("online", retryPendingAnalytics);
  }, [pathname]);
}

function useClickTracking() {
  useEffect(() => {
    function handleClick(event) {
      const target = event.target.closest?.("a,button");
      if (!target || target.closest(".admin-shell")) return;
      const href = target instanceof HTMLAnchorElement ? target.href : "";
      const eventName = target.dataset.analyticsClick || target.getAttribute("aria-label") || target.textContent?.trim().slice(0, 80) || "unknown";
      sendAnalyticsEvent({ eventType: "click", eventName, targetUrl: href, path: window.location.pathname, title: document.title, referrer: document.referrer });
    }
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);
}

export function App() {
  const { language } = useSitePreferences();
  const normalizedPath = window.location.pathname.replace(/\/$/, "") || "/";
  const blogArticle = blogPosts.find((post) => (post.sections || post.markdown) && post.href === normalizedPath);
  useEffect(() => {
    if (normalizedPath === "/admin") return;
    const english = language === "en";
    const pageTitles = {
      "/work": ["业务合作", "Business"], "/community": ["我的社区", "Community"],
      "/media": ["自媒体", "Media"], "/github": ["开源工具", "Open Source"],
      "/blog": ["博客与复盘", "Blog & Notes"], "/knowledge": ["知识地图", "Knowledge Map"],
      "/knowledge-base": ["知识库", "Knowledge Base"], "/tools": ["工具库", "Tool Library"],
      "/reading": ["有温度阅览室", "Reading Room"],
    };
    const title = blogArticle?.title || pageTitles[normalizedPath]?.[english ? 1 : 0];
    document.title = title ? `${title} | ${english ? "Chen Shuo KAI" : "陈硕 KAI"}` : english ? "Chen Shuo KAI | AI serial entrepreneur" : "陈硕｜AI 连续创业者｜写作、产品与知识库";
    const description = blogArticle?.excerpt || (english
      ? "Chen Shuo KAI: AI products, content, knowledge and community. Explore partnerships, WE30, open-source tools and writing."
      : "陈硕 KAI：AI 产品、内容、知识库与社区。了解业务合作、WE30 社群、开源工具与博客复盘。");
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [normalizedPath, blogArticle, language]);
  useEffect(() => {
    if (normalizedPath === "/about") window.history.replaceState(null, "", "/");
  }, [normalizedPath]);
  usePageViewTracking(normalizedPath);
  useClickTracking();
  useEditorialReveal();

  const isKnowledgePage = normalizedPath === "/knowledge";
  const isKnowledgeBasePage = normalizedPath === "/knowledge-base";
  const isGithubPage = normalizedPath === "/github";
  const isToolsPage = normalizedPath === "/tools";
  const isReadingPage = normalizedPath === "/reading";
  const isCommunityPage = normalizedPath === "/community";
  const isWorkPage = normalizedPath === "/work";
  const isMediaPage = normalizedPath === "/media";
  const isBlogPage = normalizedPath === "/blog";
  const isAdminPage = normalizedPath === "/admin";
  if (isAdminPage) {
    return <AdminPage />;
  }

  if (isWorkPage) {
    return <WorkPage />;
  }

  if (isMediaPage) {
    return <MediaPage />;
  }

  if (isBlogPage) {
    return <BlogPage />;
  }

  if (blogArticle) {
    return <BlogArticlePage post={blogArticle} />;
  }

  if (isKnowledgeBasePage) {
    return <KnowledgeBasePage />;
  }

  if (isKnowledgePage) {
    return <KnowledgePage />;
  }

  if (isGithubPage) {
    return <GithubBuildPage />;
  }

  if (isToolsPage) {
    return <ToolsIntroPage />;
  }

  if (isReadingPage) {
    return <ReadingRoomPage />;
  }

  if (isCommunityPage) {
    return <CommunityPage />;
  }

  return <HomePage entries={homeEntries} channels={socialChannels} knowledgeBaseUrl={knowledgeBaseUrl} xProfileUrl={xProfileUrl} />;
}
