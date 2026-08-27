import {
  ArrowDown,
  ArrowClockwise,
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  Brain,
  CalendarBlank,
  ChartLineUp,
  CubeFocus,
  CursorClick,
  EnvelopeSimple,
  Eye,
  Flame,
  GitBranch,
  GithubLogo,
  Network,
  Plus,
  UsersThree,
  XLogo,
  UserCircle,
  WarningCircle,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import EvilEye from "./EvilEye.jsx";

const knowledgeBaseUrl = "https://ji2s5x6u9ag.feishu.cn/wiki/ZzFCwIZPNizKTmkZcHucLYcXnPK";
const readingRoomUrl = "https://flowus.cn/c712040f-ef98-44b9-b37d-dd187d92fc4d";
const githubProfileUrl = "https://github.com/ChenShuo2004";
const githubApiUrl = "https://api.github.com/users/ChenShuo2004";
const githubEventsApiUrl = "https://api.github.com/users/ChenShuo2004/events/public?per_page=10";
const xProfileUrl = "https://x.com/ChenshuoAI";
const productLibraryUrl = "https://aiyouwendu.com/products";
const warmSpaceUrl = "https://aiyouwendu.com/home";
const we30IntroUrl = "https://ji2s5x6u9ag.feishu.cn/wiki/FyDGwZUldiPstLk2xQBc3b3znUg";
const growthCommunityIntroUrl = "https://my.feishu.cn/wiki/Ghn1wTeliiqyKzk1bjIcaND2n2c";

const fallbackGithubStats = {
  value: "11 repos · 6 followers",
  repos: 11,
  followers: 6,
  following: 3,
  bars: [5, 7, 8, 9, 11, 12, 14],
};

const fallbackGithubActivity = [
  { sha: "a1b2c3d", message: "feat: init product system" },
  { sha: "d4e5f6a", message: "feat: knowledge graph" },
  { sha: "f7a8b9c", message: "feat: content model" },
  { sha: "HEAD", message: "build: in public", current: true },
];

const editorialNavItems = [
  { key: "home", label: "首页", english: "ABOUT", href: "/#top" },
  { key: "tools", label: "工具库", english: "BUILD", href: "/tools" },
  { key: "reading", label: "阅览室", english: "READ", href: readingRoomUrl },
  { key: "knowledge", label: "知识地图", english: "WRITE", href: "/knowledge" },
  { key: "community", label: "社群", english: "COMMUNITY", href: "/community" },
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
    image: "/assets/product-line-tools.webp",
    visualClass: "project-visual-tools",
    icon: CubeFocus,
    metric: "AI 工具 / 产品库",
    href: "/tools",
    description:
      "集中展示正在验证、已经上线和持续迭代的 AI 工具、训练器与知识产品。",
  },
  {
    title: "阅览室",
    tag: "个人成长系统",
    image: "/assets/product-line-reading.webp",
    visualClass: "project-visual-reading",
    icon: Brain,
    metric: "阅读 / 认知 / 行动",
    href: readingRoomUrl,
    external: true,
    description:
      "把心理、认知和行动方法整理成入口，帮助把“知道”缩短到“做到”。",
  },
  {
    title: "知识地图",
    tag: "知识结构入口",
    image: "/assets/product-line-knowledge.webp",
    visualClass: "project-visual-knowledge",
    icon: Network,
    metric: "知识库 / 信息结构",
    href: "/knowledge",
    description:
      "解释知识库的起点、结构和使用路径，让信息从散点变成可持续推进的系统。",
  },
];

function scrollToSection(event, href) {
  event.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px" },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function EditorialSiteHeader({ activeKey = "home", sectionLabel = "AI / CONTENT / PRODUCT", actionLabel = "加入社区", actionHref = "/community", inHero = false }) {
  return (
    <header className={`editorial-site-header editorial-reveal ${inHero ? "editorial-site-header-hero" : ""}`}>
      <a className="editorial-site-brand" href="/" aria-label="返回陈硕个人网站首页">
        <span className="editorial-site-brand-mark">CS</span>
        <span className="editorial-site-brand-copy">
          <strong>CHEN SHUO</strong>
          <small>{sectionLabel}</small>
        </span>
      </a>

      <nav className="editorial-site-nav" aria-label="站点导航">
        {editorialNavItems.map((item) => (
          <a
            className={activeKey === item.key ? "active" : ""}
            href={item.href}
            key={item.key}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          >
            <span>{item.label}</span>
            <small>{item.english}</small>
          </a>
        ))}
      </nav>

      <a className="editorial-site-action" href={actionHref} target={actionHref.startsWith("http") ? "_blank" : undefined} rel={actionHref.startsWith("http") ? "noreferrer" : undefined}>
        {actionLabel}
        <ArrowRight size={17} weight="bold" aria-hidden="true" />
      </a>
    </header>
  );
}

function GithubBuildPage() {
  const [githubStats, setGithubStats] = useState(fallbackGithubStats);
  const [githubActivity, setGithubActivity] = useState(fallbackGithubActivity);

  useEffect(() => {
    let isCurrent = true;

    Promise.allSettled([
      fetch(githubApiUrl, { headers: { Accept: "application/vnd.github+json" } }).then((response) => {
        if (!response.ok) throw new Error("GitHub profile unavailable");
        return response.json();
      }),
      fetch(githubEventsApiUrl, { headers: { Accept: "application/vnd.github+json" } }).then((response) => {
        if (!response.ok) throw new Error("GitHub events unavailable");
        return response.json();
      }),
    ])
      .then(([profileResult, eventsResult]) => {
        if (!isCurrent) return;

        const profile = profileResult.status === "fulfilled" ? profileResult.value : {};
        const events = eventsResult.status === "fulfilled" && Array.isArray(eventsResult.value) ? eventsResult.value : [];
        const repos = Number.isFinite(profile.public_repos) ? profile.public_repos : fallbackGithubStats.repos;
        const followers = Number.isFinite(profile.followers) ? profile.followers : fallbackGithubStats.followers;
        const following = Number.isFinite(profile.following) ? profile.following : fallbackGithubStats.following;
        const activity = Math.min(16, Math.max(6, Math.round(Math.log10(repos + followers + 1) * 6)));
        const commits = events
          .filter((event) => event.type === "PushEvent")
          .flatMap((event) => event.payload?.commits || [])
          .filter((commit) => commit?.sha && commit?.message)
          .slice(0, 3)
          .map((commit) => ({
            sha: commit.sha.slice(0, 7),
            message: commit.message.split("\n")[0],
          }))
          .reverse();

        setGithubStats({
          value: `${repos} repos · ${followers} followers`,
          repos,
          followers,
          following,
          bars: [5, 7, 8, 9, 11, 12, activity],
        });

        if (commits.length > 0) {
          setGithubActivity([...commits, { sha: "HEAD", message: "build: in public", current: true }]);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <main className="site-shell editorial-page editorial-github-page">
      <EditorialSiteHeader activeKey="home" sectionLabel="GITHUB / OPEN SOURCE" actionLabel="打开 GitHub" actionHref={githubProfileUrl} />

      <section className="github-build-hero" id="top" aria-label="GitHub 公开建造页面">
        <div className="github-build-guides" aria-hidden="true">
          <span className="github-build-guide github-build-guide-left" />
          <span className="github-build-guide github-build-guide-center" />
          <span className="github-build-guide github-build-guide-right" />
          <span className="github-build-guide-mark github-build-guide-mark-top" />
          <span className="github-build-guide-mark github-build-guide-mark-bottom" />
        </div>

        <div className="github-build-copy editorial-reveal" data-reveal-delay="80">
          <p className="github-build-kicker"><span>创</span> — BUILD</p>
          <h1>Build</h1>
          <p className="github-build-status"><span />公开建造中 <b>·</b> 持续开源</p>
          <a className="github-build-link" href={githubProfileUrl} target="_blank" rel="noreferrer">
            关注我的 GitHub
            <GithubLogo size={20} weight="fill" aria-hidden="true" />
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <div className="github-build-stage editorial-reveal" data-reveal-delay="160" aria-label="GitHub build activity">
          <div className="github-build-commit-rail">
            <div className="github-build-branch-label"><GitBranch size={15} weight="regular" aria-hidden="true" /> main ——</div>
            <div className="github-build-commit-list">
              {githubActivity.map((commit) => (
                <div className={`github-build-commit ${commit.current ? "is-current" : ""}`} key={`${commit.sha}-${commit.message}`}>
                  <span className="github-build-commit-node" />
                  <code>{commit.sha}</code>
                  <span>{commit.message}</span>
                </div>
              ))}
              <span className="github-build-commit-ghost" />
              <span className="github-build-commit-ghost github-build-commit-ghost-last" />
            </div>
          </div>

          <Plus className="github-build-plus" size={22} weight="regular" aria-hidden="true" />

          <div className="github-build-terminal" aria-label="Build terminal">
            <div className="github-build-terminal-bar" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="github-build-terminal-body">
              <p className="github-build-terminal-command">$ sac build --in-public</p>
              <p><time>10:12:01</time> checking workspace</p>
              <p><time>10:12:02</time> loading modules</p>
              <p><time>10:12:03</time> resolving dependencies</p>
              <p><time>10:12:05</time> generating</p>
              <span className="github-build-terminal-caret" aria-hidden="true" />
              <div className="github-build-terminal-progress">
                <span>v0.1.0&nbsp; · &nbsp;compiling...</span>
                <div><i /></div>
                <strong>55%</strong>
              </div>
            </div>
          </div>

          <div className="github-build-queue">
            <span className="github-build-queue-label">queued</span>
            <div className="github-build-queue-list">
              <GitBranch size={29} weight="regular" aria-hidden="true" />
              <div>
                <span><i />Sac skill</span>
                <span><i />HyperFrames</span>
                <span><i />crosspost</span>
              </div>
            </div>
          </div>

          <div className="github-build-axis" aria-hidden="true">
            <div className="github-build-axis-caption">
              <span>build area</span>
              <strong>960 × 540</strong>
            </div>
            <div className="github-build-axis-line">
              {[0, 240, 480, 720, 960].map((mark) => (
                <span key={mark} style={{ "--axis-position": `${(mark / 960) * 100}%` }}>
                  <i />
                  <b>{mark}</b>
                </span>
              ))}
            </div>
            <div className="github-build-axis-progress">
              <span>progress</span>
              <strong>55%</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="github-build-metrics editorial-reveal" data-reveal-delay="100" aria-label="GitHub 公开数据">
        <div className="github-build-metric">
          <span>PUBLIC REPOSITORIES</span>
          <strong>{githubStats.repos}</strong>
          <small>公开仓库</small>
        </div>
        <div className="github-build-metric">
          <span>FOLLOWERS</span>
          <strong>{githubStats.followers}</strong>
          <small>关注者</small>
        </div>
        <div className="github-build-metric">
          <span>FOLLOWING</span>
          <strong>{githubStats.following}</strong>
          <small>正在关注</small>
        </div>
        <a className="github-build-metric github-build-metric-link" href={githubProfileUrl} target="_blank" rel="noreferrer">
          <span>OPEN SOURCE / LOG</span>
          <strong><GithubLogo size={26} weight="fill" aria-hidden="true" /> @ChenShuo2004</strong>
          <small>查看完整 GitHub 主页 <ArrowUpRight size={15} weight="bold" aria-hidden="true" /></small>
        </a>
      </section>
    </main>
  );
}

function PlatformSignalsSection() {
  const [githubStats, setGithubStats] = useState(fallbackGithubStats);

  useEffect(() => {
    let isCurrent = true;

    fetch(githubApiUrl, { headers: { Accept: "application/vnd.github+json" } })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub stats unavailable");
        return response.json();
      })
      .then((profile) => {
        if (!isCurrent) return;
        const repos = Number.isFinite(profile.public_repos) ? profile.public_repos : 11;
        const followers = Number.isFinite(profile.followers) ? profile.followers : 6;
        const activity = Math.min(16, Math.max(6, Math.round(Math.log10(repos + followers + 1) * 6)));

        setGithubStats({
          value: `${repos} repos · ${followers} followers`,
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
      detail: "AI / 产品 / build log",
      value: "持续更新",
      status: "LIVE",
      icon: XLogo,
      href: xProfileUrl,
      bars: [5, 7, 8, 10, 12, 13, 15],
    },
    {
      key: "feishu",
      label: "FEISHU / WIKI",
      name: "飞书知识库",
      detail: "路径 / 模块 / 行动",
      value: "持续生长",
      status: "OPEN",
      icon: BookOpenText,
      href: knowledgeBaseUrl,
      bars: [4, 5, 7, 8, 10, 11, 13],
    },
    {
      key: "github",
      label: "GITHUB / OPEN SOURCE",
      name: "@ChenShuo2004",
      detail: "公开项目 / 产品实验",
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
      value: "开放加入",
      status: "OPEN",
      icon: UserCircle,
      href: "/community",
      pageHref: "/community",
      bars: [4, 6, 7, 9, 11, 12, 14],
    },
  ];

  return (
    <section className="platform-signal-section" id="platforms" aria-label="全平台信号台">
      <div className="platform-signal-inner">
        <div className="platform-signal-about editorial-reveal" data-reveal-delay="60">
          <p className="platform-signal-about-kicker">ABOUT / AI MEDIA BUILDER</p>
          <h2>About me</h2>
          <div className="platform-signal-about-copy">
            <p>我是陈硕，AI 连续创业者，也是“国家一级写作专家”（自封）。</p>
            <p>现在以「一个持续生长的知识产品空间」为核心，重新起航。</p>
            <p>把工具库、阅览室和知识地图连接起来，沉淀可复用、可商业化的系统。</p>
          </div>

          <figure className="platform-signal-about-portrait">
            <span className="platform-about-mark platform-about-mark-top-left">AI MEDIA / BUILDER</span>
            <span className="platform-about-mark platform-about-mark-top-right">ID // KAI</span>
            <span className="platform-about-mark platform-about-mark-bottom-left">FOCUS / CONTENT · PRODUCT · KNOWLEDGE</span>
            <span className="platform-about-mark platform-about-mark-bottom-right">EST. 2023</span>
            <span className="platform-about-cross platform-about-cross-top-left" aria-hidden="true" />
            <span className="platform-about-cross platform-about-cross-top-right" aria-hidden="true" />
            <span className="platform-about-cross platform-about-cross-bottom-left" aria-hidden="true" />
            <span className="platform-about-cross platform-about-cross-bottom-right" aria-hidden="true" />
            <img src="/assets/chen-shuo-halftone.png" alt="陈硕半色调肖像" loading="lazy" decoding="async" />
          </figure>
        </div>
        <div className="platform-signal-heading editorial-reveal" data-reveal-delay="100">
          <div className="platform-signal-heading-title">
            <p className="section-kicker">NETWORK / SIGNALS</p>
            <h2>全平台信号台</h2>
          </div>
          <div className="platform-signal-heading-side">
            <span>LIVE / OPEN</span>
            <p>内容、知识库、开源项目和 AI 社群，保持在同一条公开轨道上。</p>
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
                    <p>{signal.label}</p>
                    <strong>{signal.name}</strong>
                    <small>{signal.detail}</small>
                  </div>
                </div>
                <div className="platform-signal-data">
                  <strong>{signal.value}</strong>
                  <div className="platform-signal-bars" aria-hidden="true">
                    {signal.bars.map((bar, index) => <span key={`${signal.key}-${index}`} style={{ "--signal-bar-height": `${bar * 3}px` }} />)}
                  </div>
                  <small className="platform-signal-status"><span />{signal.status}</small>
                </div>
                <ArrowUpRight className="platform-signal-arrow" size={22} weight="bold" aria-hidden="true" />
              </a>
            );
          })}
        </div>

        <p className="platform-signal-note">DATA // GITHUB PUBLIC API · X / FEISHU // OPEN ENTRY</p>
      </div>
    </section>
  );
}

function KnowledgeOriginSection() {
  return (
    <section className="knowledge-section editorial-article-section" id="knowledge-origin">
      <div className="knowledge-inner">
        <div className="knowledge-title-frame editorial-reveal" data-reveal-delay="80">
          <span className="editorial-index-stamp">ORIGIN / 001</span>
          <p className="section-kicker">KNOWLEDGE BASE ORIGIN</p>
          <h2>《关于这个知识库的起点》</h2>
          <div className="knowledge-title-copy">
            {knowledgeOriginIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a className="knowledge-title-link" href={knowledgeBaseUrl} target="_blank" rel="noreferrer">
            打开飞书知识库
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <div className="knowledge-origin-grid">
          {knowledgeOriginChapters.map((chapter) => (
            <article
              className={`knowledge-origin-card editorial-reveal ${chapter.isSummary ? "knowledge-origin-card-summary" : ""}`}
              data-reveal-delay={`${Math.min(Number(chapter.index) * 70, 420)}`}
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
    <main className="site-shell editorial-page editorial-knowledge-page">
      <EditorialSiteHeader activeKey="knowledge" sectionLabel="KNOWLEDGE / STRUCTURE" actionLabel="打开飞书知识库" actionHref={knowledgeBaseUrl} />
      <section className="editorial-detail-hero editorial-knowledge-hero" id="top" aria-label="知识地图页面介绍">
        <div className="editorial-detail-copy editorial-reveal" data-reveal-delay="80">
          <p className="editorial-page-kicker"><span>01</span> KNOWLEDGE MAP / ORIGIN</p>
          <h1>知识地图</h1>
          <p className="editorial-detail-description">
            这里不是资料仓库，而是一个持续生长的结构外脑：把分散的内容、工具和观点，重新组织成可以理解、可以行动的路径。
          </p>
          <div className="editorial-detail-actions">
            <a className="editorial-outline-action editorial-outline-action-fill" href={knowledgeBaseUrl} target="_blank" rel="noreferrer">
              打开飞书知识库
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a className="editorial-outline-action" href="/knowledge-base">
              查看知识库起点
            </a>
          </div>
        </div>
        <aside className="editorial-spec-sheet editorial-reveal" data-reveal-delay="180" aria-label="知识地图规格信息">
          <p>SPEC.001</p>
          <dl>
            <div><dt>FOCUS</dt><dd>信息结构 / 知识产品</dd></div>
            <div><dt>FORMAT</dt><dd>路径 / 模块 / 行动</dd></div>
            <div><dt>VALUE</dt><dd>从看过到可以使用</dd></div>
            <div><dt>STATUS</dt><dd>持续生长中</dd></div>
          </dl>
          <span className="editorial-spec-foot">ID // CHEN SHUO / 2026</span>
        </aside>
      </section>
    </main>
  );
}

function KnowledgeBasePage() {
  return (
    <main className="site-shell editorial-page editorial-knowledge-base-page">
      <EditorialSiteHeader activeKey="knowledge" sectionLabel="KNOWLEDGE BASE / ORIGIN" actionLabel="打开飞书知识库" actionHref={knowledgeBaseUrl} />
      <section className="editorial-detail-hero editorial-knowledge-hero" id="top" aria-label="知识库页面介绍">
        <div className="editorial-detail-copy editorial-reveal" data-reveal-delay="80">
          <p className="editorial-page-kicker"><span>01</span> KNOWLEDGE BASE / ORIGIN</p>
          <h1>知识库</h1>
          <p className="editorial-detail-description">
            这是把正在使用的内容、工具和判断路径持续沉淀下来的结构外脑。先了解它从哪里开始，再进入完整知识库。
          </p>
          <div className="editorial-detail-actions">
            <a className="editorial-outline-action editorial-outline-action-fill" href={knowledgeBaseUrl} target="_blank" rel="noreferrer">
              打开飞书知识库
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a className="editorial-outline-action" href="/knowledge">
              返回知识地图
            </a>
          </div>
        </div>
        <aside className="editorial-spec-sheet editorial-reveal" data-reveal-delay="180" aria-label="知识库规格信息">
          <p>SPEC.002</p>
          <dl>
            <div><dt>FOCUS</dt><dd>结构化沉淀 / 可复用</dd></div>
            <div><dt>FORMAT</dt><dd>起点 / 章节 / 路径</dd></div>
            <div><dt>VALUE</dt><dd>从阅读到执行</dd></div>
            <div><dt>STATUS</dt><dd>持续维护中</dd></div>
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
  return (
    <main className={`site-shell editorial-page editorial-collection-page ${pageClass}`}>
      <EditorialSiteHeader activeKey={activeKey} sectionLabel={sectionLabel} actionLabel={actionLabel} actionHref={actionHref} />
      <section className="editorial-detail-hero editorial-collection-hero" id="top" aria-label={`${title}页面介绍`}>
        <div className="editorial-detail-copy editorial-reveal" data-reveal-delay="80">
          <p className="editorial-page-kicker"><span>{pageNumber}</span> {kicker}</p>
          <h1>
            <span>{title}</span>
            <span>{subtitle}</span>
            <small>{small}</small>
          </h1>
          <p className="editorial-detail-description">{description}</p>
          <div className="editorial-detail-actions">
            <a className="editorial-outline-action editorial-outline-action-fill" href={actionHref} target={actionHref.startsWith("http") ? "_blank" : undefined} rel={actionHref.startsWith("http") ? "noreferrer" : undefined}>
              {actionLabel}
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a className="editorial-outline-action" href="/#projects">返回产品空间</a>
          </div>
        </div>
        <aside className="editorial-spec-sheet editorial-reveal" data-reveal-delay="180" aria-label={`${title}页面规格信息`}>
          <p>SPEC.{pageNumber}</p>
          <dl>
            {points.map((point, index) => (
              <div key={point.title}>
                <dt>0{index + 1}</dt>
                <dd><strong>{point.title}</strong><span>{point.text}</span></dd>
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
  return (
    <EditorialCollectionPage
      activeKey="tools"
      pageClass="editorial-tools-page"
      sectionLabel="TOOLS / PRODUCT / LAB"
      kicker="TOOLS LIBRARY / PRODUCT LAB"
      pageNumber="02"
      title="工具库"
      subtitle="持续生长的 AI 产品实验室"
      small="验证 / 上线 / 迭代"
      description="这里会集中放我正在验证、已经上线和持续迭代的 AI 工具、小游戏、训练器与知识产品。先看产品方向，再进入具体工具体验。"
      actionLabel="进入工具库"
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
  return (
    <EditorialCollectionPage
      activeKey="reading"
      pageClass="editorial-reading-page"
      sectionLabel="READING / GROWTH / SYSTEM"
      kicker="YOU WENDU / READING ROOM"
      pageNumber="03"
      title="有温度阅览室"
      subtitle="把“知道”缩短到“做到”"
      small="个人成长系统"
      description="这里不是普通资料库，而是我整理给自己的长期阅读入口：从心理、认知到行动方法，帮助你理解自己、改变状态，并把学习变成可执行的下一步。"
      actionLabel="进入阅览室"
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
  return (
    <main className="site-shell editorial-page editorial-community-page community-page">
      <EditorialSiteHeader activeKey="community" sectionLabel="COMMUNITY / DENSITY / GROWTH" actionLabel="添加微信咨询" actionHref="#community-contact" />

      <section className="community-intro-section">
        <div className="community-manifesto editorial-reveal" data-reveal-delay="60">
          <div>
            <p className="community-story-kicker">TWO COMMUNITIES / ONE STANDARD</p>
            <h1>不追求规模，先追求密度。</h1>
          </div>
          <div className="community-manifesto-copy">
            <p className="community-manifesto-lede">两个独立社区，为两类正在行动的人，建立更有结果的连接。</p>
            <div className="community-manifesto-routes" aria-label="社区入口">
              <a href={we30IntroUrl} target="_blank" rel="noreferrer">
                <span>01 / WE30</span>
                <strong>30 个愿意彼此成就的行动者</strong>
                <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </a>
              <a href={growthCommunityIntroUrl} target="_blank" rel="noreferrer">
                <span>02 / X AI 创作者增长群</span>
                <strong>让发布、协作、复盘成为增长循环</strong>
                <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="community-program-grid" aria-label="社区选择">
          <article className="community-program community-program-we30 editorial-reveal" data-reveal-delay="130">
            <div className="community-program-topline">
              <p className="community-story-kicker">01 / WE30</p>
              <span>HIGH-DENSITY NETWORK</span>
            </div>
            <h2>先做对的 30 个人。</h2>
            <p className="community-program-lede">WE30 不急着做成 100 人。先把真正对的 30 个人做出来，让每个人都有结果、有影响力，也有可以彼此连接的资源和圈子。</p>
            <div className="community-program-details">
              <div>
                <span>WHAT WE BUILD</span>
                <p>围绕创作、创业与协作，推动真实项目往前走，让成员的成果持续延伸。</p>
              </div>
              <div>
                <span>WHAT WE VALUE</span>
                <p>长期参与、真实贡献与彼此匹配。不是每个人都要留下，但每一次连接都要对得起彼此的时间。</p>
              </div>
            </div>
            <div className="community-program-proof" aria-label="WE30 当前进展">
              <span>NOW IN MOTION</span>
              <p>增长机制已经在内部跑起来，也开始收到品牌主动对接。</p>
            </div>
            <a className="community-program-link" href={we30IntroUrl} target="_blank" rel="noreferrer">
              了解 WE30
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </article>

          <article className="community-program community-program-x editorial-reveal" data-reveal-delay="200">
            <div className="community-program-topline">
              <p className="community-story-kicker">02 / X AI CREATOR GROWTH</p>
              <span>LONG-TERM COLLABORATION</span>
            </div>
            <h2>让内容增长，<br />成为一套协作系统。</h2>
            <p className="community-program-lede">面向 X 平台 AI 创作者，把发布、协作与复盘连成稳定的增长循环；不是泛聊天，而是持续把内容往前推进。</p>
            <ol className="community-growth-loop" aria-label="增长协作闭环">
              <li><span>01</span>发出你的内容</li>
              <li><span>02</span>完成协作互助</li>
              <li><span>03</span>盯数据，做复盘</li>
            </ol>
            <div className="community-program-details">
              <div>
                <span>GROUP 01</span>
                <p>面向 1K 粉以上、愿意持续执行的核心创作者；成员大多处在 1K–2W 粉区间。</p>
              </div>
              <div>
                <span>GROUP 02</span>
                <p>观察／孵化群，围绕内容基建、OPC（一人公司）交流与行动准备持续成长。</p>
              </div>
            </div>
            <div className="community-program-proof" aria-label="X AI 创作者增长群当前进展">
              <span>INTERNAL PROOF</span>
              <p>WE30 已完成 27 人内部测试，验证协作会带来明显的内容流速差异。</p>
            </div>
            <a className="community-program-link" href={growthCommunityIntroUrl} target="_blank" rel="noreferrer">
              了解增长群
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </article>
        </div>

        <section className="community-boundary editorial-reveal" data-reveal-delay="270" aria-label="社区共同边界">
          <div>
            <p className="community-story-kicker">ONE STANDARD / REAL WORK</p>
            <h2>不贩卖信息，<br />沉淀关系。</h2>
          </div>
          <div className="community-boundary-copy">
            <p>我们不承诺赚钱、资源或人脉，也不相信加入一个群就能改变人生。能被留下的，应该是愿意做事的人、被验证过的连接，以及不断累积的结果。</p>
            <ul>
              <li>不欢迎广告、骚扰、卖课引流与搬运内部内容。</li>
              <li>不鼓励只索取、不行动的参与方式。</li>
              <li>具体规则与协作方式，只在匹配后的社区内部展开。</li>
            </ul>
          </div>
        </section>
      </section>

      <section className="community-access-section" id="community-contact" aria-label="加入社区咨询">
        <div className="community-access-inner editorial-reveal" data-reveal-delay="100">
          <div className="community-copy">
            <p className="section-kicker">WE30 / X AI CREATOR GROWTH</p>
            <h1>加入社区</h1>
            <p className="community-lede">
              不用急着判断该加入哪一个。
              <br />
              先告诉我你正在做什么，我们一起找到更合适的位置。
            </p>
            <a className="community-back-link" href="/#top">
              回到首页了解我
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <aside className="community-contact-card" aria-label="加入社区咨询">
            <span>COMMUNITY / CONTACT</span>
            <h2>添加微信咨询</h2>
            <p>扫码添加微信，备注「WE30」或「增长群」；我会根据你的阶段与目标进行匹配。</p>
            <figure className="community-qr">
              <img src="/assets/community-wechat-qr.jpg" alt="陈硕 KAI 的微信咨询二维码" />
              <figcaption>SCAN TO CONNECT</figcaption>
            </figure>
            <div className="community-wechat" aria-label="社区微信号">
              <span>微信号</span>
              <strong>Chen18005977213</strong>
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
const analyticsContextStorageKey = "cs-analytics-context";
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
  const [range, setRange] = useState("7d");
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
  const [lastQuery, setLastQuery] = useState({ range: "7d", from: "", to: "" });
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
    if (password) loadAnalytics("7d", password, "", "");
    // Only restore an existing session once. Range changes are handled explicitly below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const nextPassword = inputPassword.trim();
    if (!nextPassword || isLoading) return;
    setPassword(nextPassword);
    loadAnalytics("7d", nextPassword, "", "");
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
  const selectedDaily = analytics?.daily?.find((item) => item.timestamp === selectedDayKey) || analytics?.daily?.[analytics.daily.length - 1] || null;
  const retryQuery = () => loadAnalytics(lastQuery.range, password, lastQuery.from, lastQuery.to);
  const metricItems = analytics ? [
    { label: "今日访问", englishLabel: "TODAY / PAGEVIEWS", value: analytics.today?.pageviews, icon: Eye, tone: "accent" },
    { label: "今日访客", englishLabel: "TODAY / VISITORS", value: analytics.today?.visitors, icon: UsersThree },
    { label: "区间访问", englishLabel: "RANGE / PAGEVIEWS", value: analytics.totals?.pageviews, icon: ChartLineUp },
    { label: "区间访客", englishLabel: "RANGE / VISITORS", value: analytics.totals?.visitors, icon: UserCircle },
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
                {isLoading ? "正在同步" : "已连接"}
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
                <p>DATA STORAGE / PERSISTENT</p>
                <strong>{formatStorageLabel(analytics.storage)}</strong>
              </div>
              <small>{analytics.retrieval?.complete ? `已完整汇总 ${formatNumber(analytics.retrieval.eventCount)} 条事件` : "正在核对汇总完整性"} <i /> {analytics.lastRecordedAt ? `最近入库：${formatAdminDateTime(analytics.lastRecordedAt)}` : "当前查询区间内尚无入库记录"}</small>
            </section>

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
              ) : <AdminEmptyState label="当前时间范围内暂无流量数据" detail="访问数据会在成功入库后显示在这里。" />}
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

function createAnalyticsEventId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

function getAnalyticsContext() {
  const params = new URLSearchParams(window.location.search);
  let stored = analyticsMemoryContext || {};
  try {
    stored = JSON.parse(safeReadStorage(analyticsContextStorageKey) || "{}") || {};
  } catch {
    // Invalid local data should never stop analytics from being sent.
  }
  const context = {
    source: params.get("utm_source") || stored.source || "direct",
    medium: params.get("utm_medium") || stored.medium || "",
    campaign: params.get("utm_campaign") || stored.campaign || "",
    content: params.get("utm_content") || stored.content || "",
  };
  analyticsMemoryContext = context;
  safeWriteStorage(analyticsContextStorageKey, JSON.stringify(context));
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
  const normalizedPath = window.location.pathname.replace(/\/$/, "") || "/";
  usePageViewTracking(normalizedPath);
  useClickTracking();
  useEditorialReveal();

  const isKnowledgePage = normalizedPath === "/knowledge";
  const isKnowledgeBasePage = normalizedPath === "/knowledge-base";
  const isGithubPage = normalizedPath === "/github";
  const isToolsPage = normalizedPath === "/tools";
  const isReadingPage = normalizedPath === "/reading";
  const isCommunityPage = normalizedPath === "/community";
  const isAdminPage = normalizedPath === "/admin";
  if (isAdminPage) {
    return <AdminPage />;
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

  return (
    <main className="site-shell">
      <section className="hero editorial-hero" id="top" aria-label="陈硕个人介绍">
        <div className="editorial-hero-guides" aria-hidden="true">
          <span className="editorial-guide editorial-guide-left" />
          <span className="editorial-guide editorial-guide-center" />
          <span className="editorial-guide editorial-guide-right" />
        </div>

        <EditorialSiteHeader inHero activeKey="home" sectionLabel="AI / CONTENT / PRODUCT" />

        <div className="editorial-hero-eye" aria-hidden="true">
          <EvilEye
            eyeColor="#FF744C"
            intensity={1.25}
            glowIntensity={0.28}
            scale={0.78}
            noiseScale={1.05}
            flameSpeed={0.85}
            backgroundColor="#F4F0E8"
          />
        </div>

        <div className="editorial-hero-inner">
          <div className="editorial-hero-copy">
            <h1 className="editorial-reveal" data-reveal-delay="140">KAI</h1>
            <p className="editorial-kicker editorial-reveal" data-reveal-delay="80"><span aria-hidden="true" />打造全国最大的 AI 社群</p>
            <p className="editorial-lede editorial-reveal" data-reveal-delay="220">
              一个持续生长的知识产品空间
              <span>把想法、工具和方法，沉淀成可复用、可商业化的系统。</span>
            </p>
            <p className="editorial-bio editorial-reveal" data-reveal-delay="290">
              我是陈硕，AI 连续创业者，YouTube 斩获过数十亿流量，Web3 早期项目曾突破 8 位数收入。
            </p>
            <div className="editorial-actions editorial-reveal" data-reveal-delay="360" aria-label="主要入口">
              <a href="#projects" onClick={(event) => scrollToSection(event, "#projects")}>
                查看内容
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
              <a href="/community">
                加入社区
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>

          <figure className="editorial-portrait editorial-reveal" data-reveal-delay="200">
            <img src="/assets/chen-shuo-halftone.png" alt="陈硕半色调肖像" fetchPriority="high" decoding="async" />
          </figure>
        </div>

        <a className="editorial-scroll editorial-reveal" data-reveal-delay="440" href="#projects" onClick={(event) => scrollToSection(event, "#projects")}>
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={17} weight="bold" aria-hidden="true" />
        </a>
      </section>

      <section className="editorial-projects-section" id="projects" aria-label="共建中的社区生态">
        <div className="editorial-projects-heading editorial-reveal" data-reveal-delay="60">
          <p className="section-kicker">PRODUCT LINES</p>
          <h2>构建ing</h2>
          <p>从有温度空间进入。工具库、阅览室和知识地图，连接成一个持续生长的ai社区。</p>
        </div>
        <div className="hero-system-frame">
          <a
            className="hero-project-feature editorial-reveal"
            data-reveal-delay="90"
            href={warmSpaceUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span className="hero-project-index">00</span>
            <div className="hero-project-feature-copy">
              <strong>
                <Flame size={20} weight="duotone" aria-hidden="true" />
                有温度空间
              </strong>
              <em>主入口 / 产品空间</em>
              <p>从一个入口开始，在工具、阅读和知识地图之间慢慢找到自己的路径。</p>
            </div>
            <span className="hero-project-feature-cta">
              进入空间
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </span>
          </a>
          <div className="hero-project-list">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <a
                  className="hero-project-item editorial-reveal"
                  data-reveal-delay={`${index * 80 + 180}`}
                  href={project.href}
                  key={project.title}
                  target={project.external ? "_blank" : undefined}
                  rel={project.external ? "noreferrer" : undefined}
                >
                  <span className="hero-project-index">0{index + 1}</span>
                  <div>
                    <strong>
                      <Icon size={18} weight="duotone" aria-hidden="true" />
                      {project.title}
                    </strong>
                    <em>{project.metric}</em>
                    <p>{project.description}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <PlatformSignalsSection />

      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <div className="contact-hero editorial-reveal" data-reveal-delay="60">
            <p className="section-kicker">GET IN TOUCH / 联系</p>
            <h2>Let's talk.</h2>
            <p className="contact-lede">聊聊 AI、内容，或者一起搞点事情。</p>
            <p className="contact-availability">
              <span aria-hidden="true" />
              当前开放合作 · Available
            </p>
          </div>

          <div className="contact-marquee editorial-reveal" data-reveal-delay="120" aria-hidden="true">
            <div className="contact-marquee-track">
              <span>一个持续生长的知识产品空间 · AI 社群 · 内容资产 · build in public · </span>
              <span>一个持续生长的知识产品空间 · AI 社群 · 内容资产 · build in public · </span>
            </div>
          </div>

          <div className="contact-grid" aria-label="联系陈硕">
            <a href="mailto:pdqqqylqxx00321@gmail.com" className="contact-channel editorial-reveal" data-reveal-delay="180">
              <span className="contact-channel-top">
                <span className="contact-channel-label">EMAIL</span>
                <EnvelopeSimple size={18} weight="regular" aria-hidden="true" />
              </span>
              <strong>pdqqqylqxx00321@gmail.com</strong>
              <span className="contact-channel-meta">
                直接邮件联系
                <ArrowRight size={18} weight="regular" aria-hidden="true" />
              </span>
            </a>

            <a href={xProfileUrl} className="contact-channel editorial-reveal" data-reveal-delay="250" target="_blank" rel="noreferrer">
              <span className="contact-channel-top">
                <span className="contact-channel-label">X / TWITTER</span>
                <XLogo size={18} weight="regular" aria-hidden="true" />
              </span>
              <strong>通过 X 交流</strong>
              <span className="contact-channel-meta">
                公开动态 / DM
                <ArrowRight size={18} weight="regular" aria-hidden="true" />
              </span>
            </a>

            <a href={knowledgeBaseUrl} className="contact-channel editorial-reveal" data-reveal-delay="320" target="_blank" rel="noreferrer">
              <span className="contact-channel-top">
                <span className="contact-channel-label">KNOWLEDGE BASE</span>
                <Brain size={18} weight="regular" aria-hidden="true" />
              </span>
              <strong>打开知识库</strong>
              <span className="contact-channel-meta">
                Feishu / Structure
                <ArrowRight size={18} weight="regular" aria-hidden="true" />
              </span>
            </a>

            <a href="/community#community-contact" className="contact-channel editorial-reveal" data-reveal-delay="390">
              <span className="contact-channel-top">
                <span className="contact-channel-label">WECHAT / 社群</span>
                <UserCircle size={18} weight="regular" aria-hidden="true" />
              </span>
              <strong>Chen18005977213</strong>
              <span className="contact-channel-meta">
                微信咨询 / 加入社区
                <ArrowRight size={18} weight="regular" aria-hidden="true" />
              </span>
            </a>
          </div>

          <div className="contact-footer-line editorial-reveal" data-reveal-delay="460">
            <span>CHEN SHUO / KAI</span>
            <a href="#top" onClick={(event) => scrollToSection(event, "#top")}>回到顶部 ↑</a>
            <span>AI · CONTENT · PRODUCT</span>
          </div>
        </div>
      </section>
    </main>
  );
}
