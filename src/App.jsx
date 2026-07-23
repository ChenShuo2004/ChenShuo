import {
  ArrowDown,
  ArrowRight,
  Brain,
  ChartLineUp,
  Compass,
  CubeFocus,
  EnvelopeSimple,
  Lightning,
  Network,
  Play,
  Sparkle,
  StackSimple,
  Strategy,
  UserCircle,
} from "@phosphor-icons/react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import CardNav from "./CardNav.jsx";
import DotField from "./DotField.jsx";
import PixelCard from "./PixelCard.jsx";
import RotatingText from "./RotatingText.jsx";
import TextCursor from "./TextCursor.jsx";
import TiltedCard from "./TiltedCard.jsx";

const CircularGallery = lazy(() => import("./CircularGallery.jsx"));

const knowledgeBaseUrl = "https://flowus.cn/c712040f-ef98-44b9-b37d-dd187d92fc4d";
const productLibraryUrl = "https://aiyouwendu.com/products";

const cardNavItems = [
  {
    label: "经历",
    bgColor: "#090a0a",
    textColor: "#f6f6f1",
    labelColor: "rgba(246, 246, 241, 0.82)",
    links: [
      { label: "个人介绍", href: "#top", ariaLabel: "查看个人介绍" },
      { label: "关键数据", href: "#top", ariaLabel: "查看关键数据" },
      { label: "联系入口", href: "#contact", ariaLabel: "前往联系入口" },
    ],
  },
  {
    label: "项目",
    bgColor: "#d8ecff",
    textColor: "#081827",
    labelColor: "rgba(8, 24, 39, 0.72)",
    shineColor: "#000000",
    links: [
      { label: "Web3 早期项目", href: "#projects", ariaLabel: "查看 Web3 早期项目" },
      { label: "AI 产品系统", href: "#projects", ariaLabel: "查看 AI 产品系统" },
      { label: "内容商业化引擎", href: "#projects", ariaLabel: "查看内容商业化引擎" },
    ],
  },
  {
    label: "系统",
    bgColor: "#0f5fb8",
    textColor: "#f6f6f1",
    labelColor: "rgba(246, 246, 241, 0.84)",
    links: [
      { label: "信息结构", href: "#strengths", ariaLabel: "查看信息结构能力" },
      { label: "产品系统", href: "#strengths", ariaLabel: "查看产品系统能力" },
      { label: "个人商业化", href: "#strengths", ariaLabel: "查看个人商业化能力" },
      { label: "工具库", href: "/tools", ariaLabel: "查看工具库说明" },
      { label: "阅览室", href: "/reading", ariaLabel: "查看阅览室说明" },
      { label: "知识地图", href: "/knowledge", ariaLabel: "查看知识地图页面" },
    ],
  },
];

const knowledgePageNavItems = [
  {
    label: "知识库",
    bgColor: "#090a0a",
    textColor: "#f6f6f1",
    labelColor: "rgba(246, 246, 241, 0.82)",
    links: [
      { label: "起点介绍", href: "#knowledge-origin", ariaLabel: "查看知识库起点介绍" },
      { label: "打开 FlowUs", href: knowledgeBaseUrl, ariaLabel: "打开陈硕的 FlowUs 知识库" },
    ],
  },
  {
    label: "网站",
    bgColor: "#d8ecff",
    textColor: "#081827",
    labelColor: "rgba(8, 24, 39, 0.72)",
    shineColor: "#000000",
    links: [
      { label: "返回首页", href: "/", ariaLabel: "返回个人网站首页" },
      { label: "精选项目", href: "/#projects", ariaLabel: "回到首页查看精选项目" },
      { label: "联系入口", href: "/#contact", ariaLabel: "回到首页联系陈硕" },
    ],
  },
  {
    label: "系统",
    bgColor: "#0f5fb8",
    textColor: "#f6f6f1",
    labelColor: "rgba(246, 246, 241, 0.84)",
    links: [
      { label: "信息结构", href: "/#strengths", ariaLabel: "回到首页查看信息结构能力" },
      { label: "个人介绍", href: "/#top", ariaLabel: "回到首页查看个人介绍" },
    ],
  },
];

const metrics = [
  { value: "AI", label: "连续创业者" },
  { value: "8 位数", label: "Web3 早期项目收入" },
  { value: "知识库", label: "信息差 / 知识整理" },
];

const focusAreas = [
  "重新理解 AI 与人的工作方式",
  "把内容、产品和商业化做成系统",
  "用信息结构沉淀可复用的赚钱体系",
];

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
    title: "工具库",
    tag: "产品实验室",
    image: "/assets/project-ai-system-generated.jpg",
    icon: CubeFocus,
    metric: "AI 工具 / 产品库",
    href: "/tools",
    description:
      "集中展示正在验证、已经上线和持续迭代的 AI 工具、训练器与知识产品。",
  },
  {
    title: "阅览室",
    tag: "个人成长系统",
    image: "/assets/project-content-engine-generated.jpg",
    icon: Brain,
    metric: "阅读 / 认知 / 行动",
    href: "/reading",
    description:
      "把心理、认知和行动方法整理成入口，帮助把“知道”缩短到“做到”。",
  },
  {
    title: "知识地图",
    tag: "知识结构入口",
    image: "/assets/project-web3-generated.jpg",
    icon: Network,
    metric: "知识库 / 信息结构",
    href: "/knowledge",
    description:
      "解释知识库的起点、结构和使用路径，让信息从散点变成可持续推进的系统。",
  },
];

const projectGalleryItems = projects.map((project) => ({
  image: project.image,
  text: project.title,
}));

const projectPixelConfigs = [
  { variant: "blue", gap: 7, speed: 58, colors: "#f6f6f1,#2f7dff,#7ac8ff" },
  { variant: "blue", gap: 8, speed: 34, colors: "#f6f6f1,#7af7df,#4c6f9f" },
  { variant: "default", gap: 6, speed: 28, colors: "#f6f6f1,#38d9ff,#2f7dff" },
];

const strengths = [
  {
    icon: Compass,
    title: "信息结构",
    text: "能把复杂经历、想法和资源拆成清晰模块，变成别人能理解、能行动的系统。",
  },
  {
    icon: Strategy,
    title: "产品系统",
    text: "关注从需求、交互、反馈到商业结果的完整链路，而不是只做单点功能。",
  },
  {
    icon: Lightning,
    title: "快速验证",
    text: "习惯用低成本方式测试方向，把不确定性拆成可观察、可复盘的小实验。",
  },
  {
    icon: StackSimple,
    title: "个人商业化",
    text: "把内容、信任、产品和成交连接在一起，长期沉淀属于自己的商业资产。",
  },
];

function scrollToSection(event, href) {
  event.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

function useNearViewport(rootMargin = "500px") {
  const ref = useRef(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (isNear || !ref.current) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isNear, rootMargin]);

  return [ref, isNear];
}

function DeferredCircularGallery(props) {
  const [ref, isNear] = useNearViewport("700px");

  return (
    <div ref={ref} className="deferred-gallery-shell">
      {isNear ? (
        <Suspense fallback={<div className="gallery-placeholder" aria-hidden="true" />}>
          <CircularGallery {...props} />
        </Suspense>
      ) : (
        <div className="gallery-placeholder" aria-hidden="true" />
      )}
    </div>
  );
}

function KnowledgeOriginSection() {
  return (
    <section className="knowledge-section" id="knowledge-origin">
      <div className="knowledge-inner">
        <div className="knowledge-title-frame">
          <div className="knowledge-title-cursor" aria-hidden="true">
            <TextCursor
              text="起点"
              spacing={72}
              followMouseDirection
              randomFloat
              exitDuration={0.34}
              removalInterval={24}
              maxPoints={9}
            />
          </div>
          <p className="section-kicker">KNOWLEDGE BASE ORIGIN</p>
          <h2>《关于这个知识库的起点》</h2>
          <div className="knowledge-title-copy">
            {knowledgeOriginIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a className="knowledge-title-link" href={knowledgeBaseUrl} target="_blank" rel="noreferrer">
            打开 FlowUs 知识库
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <div className="knowledge-origin-grid">
          {knowledgeOriginChapters.map((chapter) => (
            <article
              className={`knowledge-origin-card ${chapter.isSummary ? "knowledge-origin-card-summary" : ""}`}
              key={chapter.index}
            >
              <span>{chapter.index}</span>
              <h3>{chapter.title}</h3>
              {chapter.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {chapter.points?.length > 0 && (
                <ul>
                  {chapter.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
              {chapter.quote && <strong>{chapter.quote}</strong>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function KnowledgePage() {
  return (
    <main className="site-shell knowledge-page-shell">
      <section className="knowledge-page-top" id="top" aria-label="知识库页面导航">
        <CardNav
          className="poster-card-nav"
          items={knowledgePageNavItems}
          brandMark="CS"
          brandLabel="CHEN SHUO"
          brandKicker="KNOWLEDGE / STRUCTURE"
          baseColor="rgba(246, 246, 241, 0.93)"
          menuColor="#080909"
          buttonBgColor="#080909"
          buttonTextColor="#f6f6f1"
          backHref="/"
          backLabel="返回首页"
          actionItems={[
            { label: "工具库", href: "/tools", variant: "secondary" },
            { label: "阅览室", href: "/reading", variant: "secondary" },
            { label: "知识地图", href: "/knowledge", variant: "secondary" },
          ]}
          ctaLabel="打开知识库"
          ctaHref={knowledgeBaseUrl}
          onLinkClick={scrollToSection}
        />
      </section>
      <KnowledgeOriginSection />
    </main>
  );
}

function ToolsIntroPage() {
  return (
    <main className="site-shell tools-intro-page">
      <section className="knowledge-page-top" id="top" aria-label="工具库页面导航">
        <CardNav
          className="poster-card-nav"
          items={knowledgePageNavItems}
          brandMark="CS"
          brandLabel="CHEN SHUO"
          brandKicker="TOOLS / PRODUCT / LAB"
          baseColor="rgba(216, 236, 255, 0.94)"
          menuColor="#081827"
          buttonBgColor="#071c33"
          buttonTextColor="#f6f6f1"
          backHref="/"
          backLabel="返回首页"
          actionItems={[
            { label: "进入工具库", href: productLibraryUrl, variant: "primary" },
            { label: "阅览室", href: "/reading", variant: "secondary" },
            { label: "知识地图", href: "/knowledge", variant: "secondary" },
          ]}
          onLinkClick={scrollToSection}
        />
      </section>

      <section className="tools-intro-section">
        <div className="tools-intro-inner">
          <p className="section-kicker">TOOLS LIBRARY</p>
          <h1>工具库不是作品陈列，而是一个持续生长的 AI 产品实验室。</h1>
          <p>
            这里会集中放我正在验证、已经上线和持续迭代的 AI 工具、小游戏、训练器与知识产品。你可以把它理解成一个入口：先看产品方向，再进入具体工具体验。
          </p>

          <div className="tools-intro-actions">
            <a className="primary-action" href={productLibraryUrl} target="_blank" rel="noreferrer">
              进入工具库
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a className="secondary-action" href="/" >
              返回首页
            </a>
          </div>

          <div className="tools-intro-points" aria-label="工具库说明">
            <article>
              <span>01</span>
              <strong>产品实验</strong>
              <p>把想法快速做成可访问的页面，用真实使用反馈判断是否继续投入。</p>
            </article>
            <article>
              <span>02</span>
              <strong>AI 工作流</strong>
              <p>沉淀能复用的提示词、流程和自动化能力，让工具从一次性项目变成系统。</p>
            </article>
            <article>
              <span>03</span>
              <strong>可商业化入口</strong>
              <p>每个工具都服务于更具体的需求：学习、训练、测试、内容生产或转化。</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

function ReadingRoomPage() {
  return (
    <main className="site-shell reading-intro-page">
      <section className="knowledge-page-top" id="top" aria-label="阅览室页面导航">
        <CardNav
          className="poster-card-nav"
          items={knowledgePageNavItems}
          brandMark="CS"
          brandLabel="CHEN SHUO"
          brandKicker="READING / GROWTH / SYSTEM"
          baseColor="rgba(246, 246, 241, 0.93)"
          menuColor="#081827"
          buttonBgColor="#071c33"
          buttonTextColor="#f6f6f1"
          backHref="/"
          backLabel="返回首页"
          actionItems={[
            { label: "工具库", href: "/tools", variant: "secondary" },
            { label: "进入阅览室", href: knowledgeBaseUrl, variant: "secondary" },
            { label: "知识地图", href: "/knowledge", variant: "secondary" },
          ]}
          onLinkClick={scrollToSection}
        />
      </section>

      <section className="tools-intro-section reading-intro-section">
        <div className="tools-intro-inner">
          <p className="section-kicker">YOU WENDU READING ROOM</p>
          <h1>有温度阅览室，是把“知道”缩短到“做到”的个人成长系统。</h1>
          <p>
            这里不是普通资料库，而是我整理给自己的长期阅读入口：从心理、认知到行动方法，帮助你理解自己、改变状态，并把学习变成可执行的下一步。
          </p>

          <div className="tools-intro-actions">
            <a className="primary-action" href={knowledgeBaseUrl} target="_blank" rel="noreferrer">
              进入阅览室
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a className="secondary-action" href="/" >
              返回首页
            </a>
          </div>

          <div className="tools-intro-points" aria-label="阅览室说明">
            <article>
              <span>01</span>
              <strong>从这里开始</strong>
              <p>第一次进入时，先按推荐路径理解情绪、拖延、注意力、行动力和判断偏差。</p>
            </article>
            <article>
              <span>02</span>
              <strong>推荐与专题</strong>
              <p>把值得反复阅读的主题整理成入口，减少信息过载，直接进入关键问题。</p>
            </article>
            <article>
              <span>03</span>
              <strong>个人成长系统</strong>
              <p>用结构化阅读连接知识、练习和工具，让内容最终服务于行动和改变。</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

const adminRangeOptions = [
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
];

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

function getDimensionLabel(item, keys, fallback = "Direct / Unknown") {
  const value = keys.map((key) => item[key]).find(Boolean);
  return value || fallback;
}

function AdminPage() {
  const [range, setRange] = useState("7d");
  const [password, setPassword] = useState(() => localStorage.getItem("cs-admin-password") || "");
  const [inputPassword, setInputPassword] = useState(password);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function loadAnalytics(nextRange = range, nextPassword = password) {
    if (!nextPassword) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/admin-analytics?range=${nextRange}`, {
        headers: {
          "x-admin-password": nextPassword,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "数据加载失败");
      }

      setAnalytics(data);
      localStorage.setItem("cs-admin-password", nextPassword);
    } catch (loadError) {
      setAnalytics(null);
      setError(loadError.message || "数据加载失败");
      if (loadError.message?.includes("Invalid")) {
        localStorage.removeItem("cs-admin-password");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadAnalytics(range, password);
  }, [range, password]);

  function handleSubmit(event) {
    event.preventDefault();
    setPassword(inputPassword);
    loadAnalytics(range, inputPassword);
  }

  const maxDailyPageviews = Math.max(...(analytics?.daily || []).map((item) => item.pageviews || 0), 1);

  return (
    <main className="admin-shell">
      <section className="admin-panel">
        <div className="admin-header">
          <div>
            <p className="admin-kicker">SITE ANALYTICS</p>
            <h1>Admin PV</h1>
            <span>Chen Shuo Personal Site</span>
          </div>
          <a href="/" className="admin-home-link">
            Back Home
          </a>
        </div>

        <form className="admin-login" onSubmit={handleSubmit}>
          <input
            type="password"
            value={inputPassword}
            onChange={(event) => setInputPassword(event.target.value)}
            placeholder="Admin password"
            autoComplete="current-password"
          />
          <button type="submit" disabled={isLoading || !inputPassword}>
            {isLoading ? "Loading" : "View Data"}
          </button>
        </form>

        {error && <p className="admin-error">{error}</p>}

        {analytics && (
          <div className="admin-dashboard">
            <div className="admin-toolbar">
              <div>
                <strong>{analytics.since} - {analytics.until}</strong>
                <span>Updated {new Date(analytics.updatedAt).toLocaleString("zh-CN")}</span>
              </div>
              <div className="admin-range-switch" aria-label="Select analytics range">
                {adminRangeOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    className={range === option.value ? "active" : ""}
                    onClick={() => setRange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="admin-metrics-grid">
              <article>
                <span>Today PV</span>
                <strong>{formatNumber(analytics.today.pageviews)}</strong>
              </article>
              <article>
                <span>Today Visitors</span>
                <strong>{formatNumber(analytics.today.visitors)}</strong>
              </article>
              <article>
                <span>Total PV</span>
                <strong>{formatNumber(analytics.totals.pageviews)}</strong>
              </article>
              <article>
                <span>Total Visitors</span>
                <strong>{formatNumber(analytics.totals.visitors)}</strong>
              </article>
            </div>

            <section className="admin-chart-panel">
              <div className="admin-section-title">
                <h2>Daily Traffic</h2>
                <span>PV by day</span>
              </div>
              <div className="admin-bars">
                {analytics.daily.map((item) => (
                  <div className="admin-bar-item" key={item.timestamp}>
                    <div className="admin-bar-track">
                      <span style={{ height: `${Math.max(((item.pageviews || 0) / maxDailyPageviews) * 100, 4)}%` }} />
                    </div>
                    <strong>{formatNumber(item.pageviews)}</strong>
                    <small>{formatDay(item.timestamp)}</small>
                  </div>
                ))}
              </div>
            </section>

            <div className="admin-lists-grid">
              <AdminRankList title="Top Pages" rows={analytics.topPages} labelKeys={["requestPath", "route"]} />
              <AdminRankList title="Referrers" rows={analytics.referrers} labelKeys={["referrerHostname"]} />
              <AdminRankList title="Countries" rows={analytics.countries} labelKeys={["country"]} />
              <AdminRankList title="Devices" rows={analytics.devices} labelKeys={["deviceType"]} />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function AdminRankList({ title, rows, labelKeys }) {
  return (
    <section className="admin-list-panel">
      <div className="admin-section-title">
        <h2>{title}</h2>
        <span>PV / Visitors</span>
      </div>
      <div className="admin-rank-list">
        {rows?.length > 0 ? (
          rows.map((item, index) => (
            <article key={`${title}-${index}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{getDimensionLabel(item, labelKeys)}</strong>
              <em>{formatNumber(item.pageviews)} / {formatNumber(item.visitors)}</em>
            </article>
          ))
        ) : (
          <p>No data yet</p>
        )}
      </div>
    </section>
  );
}

export function App() {
  const normalizedPath = window.location.pathname.replace(/\/$/, "") || "/";
  const isKnowledgePage = normalizedPath === "/knowledge";
  const isToolsPage = normalizedPath === "/tools";
  const isReadingPage = normalizedPath === "/reading";
  const isAdminPage = normalizedPath === "/admin";
  if (isAdminPage) {
    return <AdminPage />;
  }

  if (isKnowledgePage) {
    return <KnowledgePage />;
  }

  if (isToolsPage) {
    return <ToolsIntroPage />;
  }

  if (isReadingPage) {
    return <ReadingRoomPage />;
  }


  return (
    <main className="site-shell">
      <section className="hero hero-poster" id="top" aria-label="陈硕个人介绍">
        <div className="hero-media" aria-hidden="true">
          <img src="/assets/hero-cinematic-reference.jpg" alt="" fetchPriority="high" decoding="async" />
          <div className="hero-dot-field">
            <DotField
              dotRadius={2.2}
              dotSpacing={17}
              bulgeStrength={72}
              glowRadius={210}
              sparkle
              waveAmplitude={1.15}
              cursorRadius={520}
              gradientFrom="rgba(124, 200, 255, 0.42)"
              gradientTo="rgba(47, 125, 255, 0.34)"
              glowColor="rgba(124, 200, 255, 0.24)"
            />
          </div>
          <div className="scan-layer" />
          <div className="motion-field">
            <span />
            <span />
            <span />
          </div>
        </div>

        <CardNav
          className="poster-card-nav"
          items={cardNavItems}
          brandMark="CS"
          brandLabel="CHEN SHUO"
          brandKicker="AI / CONTENT / PRODUCT"
          baseColor="rgba(216, 236, 255, 0.94)"
          menuColor="#081827"
          buttonBgColor="#071c33"
          buttonTextColor="#f6f6f1"
          actionItems={[
            { label: "工具库", href: "/tools", variant: "secondary" },
            { label: "阅览室", href: "/reading", variant: "secondary" },
            { label: "知识地图", href: "/knowledge", variant: "primary" },
          ]}
          onLinkClick={scrollToSection}
        />

        <div className="hero-stage">
          <aside className="poster-rail" aria-label="首屏侧边信息">
            <span className="rail-title">CHENSHUO · EPISODE 01</span>
            <a className="rail-play" href="#projects" onClick={(event) => scrollToSection(event, "#projects")}>
              <Play size={24} weight="fill" aria-hidden="true" />
              <span>PLAY</span>
            </a>
            <span className="rail-caption">AI / PRODUCT / SYSTEM</span>
          </aside>

          <div className="poster-copy">
            <div className="episode-mark">
              <span>01</span>
              <i />
              <span>AI</span>
            </div>
            <div className="eyebrow">
              <Sparkle size={17} weight="fill" aria-hidden="true" />
              PERSONAL PROFILE
            </div>
            <h1>
              陈硕
              <span>CHEN SHUO</span>
            </h1>
            <p className="hero-lede">
              AI 连续创业者，用产品、内容和知识系统重新组织个人商业。
            </p>
            <div className="hero-subcopy">
              <p>
                我是陈硕，AI 连续创业者，YouTube 斩获过数十亿流量，Web3 早期项目曾突破 8 位数收入。
              </p>
              <p>
                现在以「一个持续生长的知识产品空间」为核心，重新起航：把工具库、阅览室和知识底图连接起来，让想法、工具和方法可以被持续沉淀、复用和商业化。
              </p>
            </div>
          </div>

          <aside className="poster-meta" aria-label="当前系统">
            <p>AI SYSTEM BUILDER</p>
            <div className="poster-meta-list">
              {focusAreas.map((item, index) => (
                <div className="poster-meta-item" key={item}>
                  <span>0{index + 1}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="metric-strip poster-metrics" aria-label="关键数据">
          {metrics.map((metric) => (
            <div className="metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>

        <a className="scroll-cue" href="#projects" onClick={(event) => scrollToSection(event, "#projects")}>
          <ArrowDown size={18} weight="bold" aria-hidden="true" />
          向下
        </a>
      </section>

      <section className="projects-section" id="projects">
        <div className="section-heading">
          <p className="section-kicker">PRODUCT LINES</p>
          <h2>三条正在形成的作品线。</h2>
        </div>

        <div className="project-showcase">
          <div className="project-gallery-stage">
            <DeferredCircularGallery
              items={projectGalleryItems}
              bend={2.8}
              textColor="#f6f6f1"
              borderRadius={0.035}
              scrollSpeed={1.65}
              scrollEase={0.045}
              font={'900 34px "Noto Serif SC"'}
            />
            <div className="gallery-frame-lines" aria-hidden="true">
              <span />
              <span />
            </div>
            <div className="gallery-caption" aria-hidden="true">
              DRAG / SCROLL
            </div>
          </div>

          <div className="project-detail-grid">
            {projects.map((project, index) => {
              const Icon = project.icon;
              const pixelConfig = projectPixelConfigs[index % projectPixelConfigs.length];
              return (
                <article className="project-detail-card-shell" key={project.title}>
                  <a className="project-card-link" href={project.href} aria-label={`进入${project.title}`}>
                    <TiltedCard
                      imageSrc={project.image}
                      altText={`${project.title}视觉图`}
                      captionText={project.title}
                      containerHeight="clamp(340px, 27vw, 410px)"
                      containerWidth="100%"
                      imageHeight="100%"
                      imageWidth="100%"
                      rotateAmplitude={8}
                      scaleOnHover={1.035}
                      showMobileWarning={false}
                      showTooltip={false}
                      displayOverlayContent
                      className="project-tilted-card"
                      overlayContent={
                        <PixelCard
                          className="project-detail-card"
                          ariaLabel={`${project.title}项目卡片`}
                          variant={pixelConfig.variant}
                          gap={pixelConfig.gap}
                          speed={pixelConfig.speed}
                          colors={pixelConfig.colors}
                          noFocus
                        >
                          <div className="project-detail-content">
                            <span className="project-detail-index">0{index + 1}</span>
                            <div className="project-detail-title">
                              <Icon size={25} weight="duotone" aria-hidden="true" />
                              <h3>{project.title}</h3>
                            </div>
                            <strong>{project.metric}</strong>
                            <p>{project.description}</p>
                            <span className="project-detail-tag">{project.tag} / 点击进入</span>
                          </div>
                        </PixelCard>
                      }
                    />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="strengths-section" id="strengths">
        <div className="section-heading compact">
          <p className="section-kicker">ADVANTAGES</p>
          <h2 className="strength-heading-title">
            我擅长把
            <RotatingText
              texts={["模糊机会", "复杂信息", "内容资产", "商业线索"]}
              mainClassName="strength-rotating-text"
              splitLevelClassName="strength-rotating-word"
              elementLevelClassName="strength-rotating-char"
              animatePresenceMode="sync"
              staggerFrom="last"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              staggerDuration={0.018}
              transition={{ type: "spring", damping: 30, stiffness: 420 }}
              rotationInterval={1900}
            />
            变成可推进的结构。
          </h2>
        </div>
        <div className="strength-grid">
          {strengths.map((strength) => {
            const Icon = strength.icon;
            return (
              <article className="strength-card" key={strength.title}>
                <Icon size={30} weight="duotone" aria-hidden="true" />
                <h3>{strength.title}</h3>
                <p>{strength.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <div className="contact-copy">
            <p className="section-kicker">CONTACT</p>
            <h2>
              把个人经历，做成一个能被
              <RotatingText
                texts={["看见", "理解"]}
                mainClassName="contact-rotating-text"
                splitLevelClassName="contact-rotating-word"
                elementLevelClassName="contact-rotating-char"
                animatePresenceMode="sync"
                staggerFrom="last"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                staggerDuration={0.022}
                transition={{ type: "spring", damping: 30, stiffness: 420 }}
                rotationInterval={2200}
              />
              、能持续生长的系统。
            </h2>
          </div>
          <div className="contact-actions">
            <a href="mailto:pdqqqylqxx00321@gmail.com" className="primary-action">
              <EnvelopeSimple size={18} weight="bold" aria-hidden="true" />
              pdqqqylqxx00321@gmail.com
            </a>
            <a href="#top" className="secondary-action" onClick={(event) => scrollToSection(event, "#top")}>
              <UserCircle size={18} weight="bold" aria-hidden="true" />
              回到顶部
            </a>
            <a href={knowledgeBaseUrl} className="secondary-action" target="_blank" rel="noreferrer">
              <Brain size={18} weight="bold" aria-hidden="true" />
              打开知识库
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
