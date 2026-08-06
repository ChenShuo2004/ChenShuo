import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  Brain,
  CubeFocus,
  EnvelopeSimple,
  GithubLogo,
  Network,
  XLogo,
  UserCircle,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import RotatingText from "./RotatingText.jsx";

const knowledgeBaseUrl = "https://ji2s5x6u9ag.feishu.cn/wiki/ZzFCwIZPNizKTmkZcHucLYcXnPK";
const githubProfileUrl = "https://github.com/ChenShuo2004";
const githubApiUrl = "https://api.github.com/users/ChenShuo2004";
// The X handle was not included in the brief, so keep this single line easy to replace.
const xProfileUrl = "https://x.com/";
const productLibraryUrl = "https://aiyouwendu.com/products";

const fallbackGithubStats = {
  value: "11 repos · 6 followers",
  bars: [5, 7, 8, 9, 11, 12, 14],
};

const editorialNavItems = [
  { key: "home", label: "首页", english: "ABOUT", href: "/#top" },
  { key: "tools", label: "工具库", english: "BUILD", href: "/tools" },
  { key: "reading", label: "阅览室", english: "READ", href: "/reading" },
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
    href: "/reading",
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

function EditorialSiteHeader({ activeKey = "home", sectionLabel = "AI / CONTENT / PRODUCT", actionLabel = "愿景", actionHref = "/community", inHero = false }) {
  return (
    <header className={`editorial-site-header ${inHero ? "editorial-site-header-hero" : ""}`}>
      <a className="editorial-site-brand" href="/" aria-label="返回陈硕个人网站首页">
        <span className="editorial-site-brand-mark">CS</span>
        <span className="editorial-site-brand-copy">
          <strong>CHEN SHUO</strong>
          <small>{sectionLabel}</small>
        </span>
      </a>

      <nav className="editorial-site-nav" aria-label="站点导航">
        {editorialNavItems.map((item) => (
          <a className={activeKey === item.key ? "active" : ""} href={item.href} key={item.key}>
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
      bars: githubStats.bars,
    },
  ];

  return (
    <section className="platform-signal-section" id="platforms" aria-label="全平台信号台">
      <div className="platform-signal-inner">
        <div className="platform-signal-heading">
          <p className="section-kicker">NETWORK / SIGNALS</p>
          <h2>全平台信号台</h2>
          <p>内容、知识库和开源项目，保持在同一条公开轨道上。</p>
        </div>

        <div className="platform-signal-grid">
          {signals.map((signal) => {
            const Icon = signal.icon;

            return (
              <a
                className={`platform-signal-row platform-signal-row-${signal.key}`}
                href={signal.href}
                key={signal.key}
                target="_blank"
                rel="noreferrer"
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
        <div className="knowledge-title-frame">
          <span className="editorial-index-stamp">ORIGIN / 001</span>
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
    <main className="site-shell editorial-page editorial-knowledge-page">
      <EditorialSiteHeader activeKey="knowledge" sectionLabel="KNOWLEDGE / STRUCTURE" actionLabel="打开知识库" actionHref={knowledgeBaseUrl} />
      <section className="editorial-detail-hero editorial-knowledge-hero" id="top" aria-label="知识地图页面介绍">
        <div className="editorial-detail-copy">
          <p className="editorial-page-kicker"><span>01</span> KNOWLEDGE MAP / ORIGIN</p>
          <h1>知识地图<span>把信息变成可执行的路径。</span></h1>
          <p className="editorial-detail-description">
            这里不是资料仓库，而是一个持续生长的结构外脑：把分散的内容、工具和观点，重新组织成可以理解、可以行动的路径。
          </p>
          <div className="editorial-detail-actions">
            <a className="editorial-outline-action editorial-outline-action-fill" href={knowledgeBaseUrl} target="_blank" rel="noreferrer">
              打开 FlowUs 知识库
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a className="editorial-outline-action" href="/#projects">
              返回产品空间
            </a>
          </div>
        </div>
        <aside className="editorial-spec-sheet" aria-label="知识地图规格信息">
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
        <div className="editorial-detail-copy">
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
        <aside className="editorial-spec-sheet" aria-label={`${title}页面规格信息`}>
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
      title="工具库不是作品陈列"
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
      actionHref={knowledgeBaseUrl}
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
      <EditorialSiteHeader activeKey="community" sectionLabel="COMMUNITY / PRACTICE / GROWTH" actionLabel="添加微信咨询" actionHref="#community-contact" />

      <section className="community-intro-section">
        <div className="community-intro-inner">
          <div className="community-copy">
            <p className="section-kicker">CHEN SHUO COMMUNITY</p>
            <h1>加入社群</h1>
            <p className="community-lede">
              一个围绕 AI、产品、内容与个人商业化的实践型社群。
              <br />
              不追求热闹，专注于持续推进真实项目。
            </p>
            <a className="community-back-link" href="/#top">
              回到首页了解我
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>

          <aside className="community-price-card" id="community-contact" aria-label="社群价格">
            <span>COMMUNITY ACCESS</span>
            <strong>¥9.9</strong>
            <p>社群准入</p>
            <small>先了解，再决定是否加入</small>
            <a href="/#top">添加微信咨询</a>
            <div className="community-wechat" aria-label="社群微信号">
              <span>微信号</span>
              <strong>Chen18005977213</strong>
            </div>
          </aside>
        </div>

        <div className="community-story-grid">
          <article className="community-story-card community-story-card-wide">
            <p className="community-story-kicker">THE NEXT AI CO-CREATION COMMUNITY</p>
            <h2>我想做一个属于下一代的 AI 共创社群</h2>
            <p>这个社群暂定价格是 <strong>9.9 元一年</strong>。但这 9.9 元不是课程费，也不是购买人脉和资源的费用，它只是一个很低的门槛。</p>
            <p>我希望用它筛选出一批愿意认真介绍自己、愿意真正参与、愿意长期使用 AI 做事情的人。这里不追求热闹，更不想成为一个每天刷几百条消息、最后所有人都设置免打扰的微信群。</p>
            <p>我更想做一个属于 00 后、10 后，以及未来更多年轻人的 AI 共创空间。我们可以讨论 AI、产品、内容、创业和个人成长，也可以把自己真正遇到的问题拿出来。</p>
          </article>

          <article className="community-story-card">
            <p className="community-story-kicker">OPEN PRACTICE</p>
            <h2>真实复盘</h2>
            <p>我会公开自己的每月复盘：做了什么、做错了什么、哪些项目失败了、最近在为什么事情焦虑，以及我对产品、内容、团队和创业的新理解。</p>
          </article>

          <article className="community-story-card">
            <p className="community-story-kicker">MONTHLY THEME WEEK</p>
            <h2>主题周，不止聊天</h2>
            <p>每个月围绕一个主题一起研究 AI 编程、个人软件工厂、自动化工作流、知识库、内容创作、AI 产品或出海实践。</p>
          </article>

          <article className="community-story-card community-story-card-wide community-story-card-teal">
            <p className="community-story-kicker">FROM DISCUSSION TO KNOWLEDGE</p>
            <h2>把讨论沉淀成可以使用的东西</h2>
            <p>主题不会只停留在聊天。我们会整理资料、提出问题、完成实践任务、分享案例，最后把有价值的内容沉淀进知识库。每一位成员都可以向我提问，具有代表性的问题，我会集中拆解，并整理成其他人也能使用的答案。</p>
          </article>

          <article className="community-story-card community-story-card-wide">
            <p className="community-story-kicker">CO-CREATE THE FUTURE</p>
            <h2>从成员，到共创者</h2>
            <p>社群成员可以免费使用我面向社群开放的自研产品，优先参加新产品内测，提出功能建议，参与产品共创。未来，真正持续行动、持续分享、愿意承担责任的人，也可能成为项目合作者、主题发起人，或者一起做出新的产品。</p>
          </article>

          <article className="community-story-card community-story-card-warning">
            <p className="community-story-kicker">NO EMPTY PROMISES</p>
            <h2>有些事情，提前说清楚</h2>
            <ul>
              <li>不保证你能赚到钱</li>
              <li>不保证你能拿到资源</li>
              <li>不保证你能认识所谓的大佬</li>
              <li>不保证加入之后，人生就会发生变化</li>
            </ul>
            <p>我唯一希望保证的，是这里不会只剩下空话。</p>
          </article>

          <article className="community-story-card community-story-card-apply">
            <p className="community-story-kicker">APPLICATION &amp; REVIEW</p>
            <h2>我们看重什么</h2>
            <p>每一个申请加入的人，都需要填写申请表并经过审核。我们更看重：</p>
            <ul>
              <li>你是否真诚</li>
              <li>你是否正在行动</li>
              <li>你是否愿意分享</li>
              <li>你是否尊重其他成员</li>
              <li>你是否愿意长期参与，而不是只来索取资源</li>
            </ul>
          </article>

          <article className="community-story-card community-story-card-wide community-story-card-final">
            <p className="community-story-kicker">A LONG-TERM COMMUNITY</p>
            <h2>不是围观时代，而是和这个时代共舞</h2>
            <p>广告、骚扰、批量加人、卖课引流、搬运内部内容，以及任何诱导未成年人消费或参与高风险项目的行为，都会被直接清退。</p>
            <p>我最终想做的，是全国最有行动力的年轻人 AI 社群。人数多不应该是它唯一的意义。更重要的是，几年之后回头看，我们能发现一批年轻人在这里认识、成长、合作，一起做出了一些真实存在的东西。</p>
            <p><strong>我希望能和一群同样相信 AI、相信创造、也相信长期主义的人，一起往前走。</strong></p>
          </article>
        </div>
      </section>
    </main>
  );
}

const adminRangeOptions = [
  { label: "1D", value: "1d" },
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
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
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [password, setPassword] = useState(() => localStorage.getItem("cs-admin-password") || "");
  const [inputPassword, setInputPassword] = useState(password);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function loadAnalytics(nextRange = range, nextPassword = password, nextFrom = from, nextTo = to) {
    if (!nextPassword) return;

    setIsLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({ range: nextRange });
      if (nextFrom && nextTo) { params.set("from", nextFrom); params.set("to", nextTo); }
      const response = await fetch(`/api/admin-analytics?${params.toString()}`, {
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
    loadAnalytics(range, password, from, to);
  }, [range, password]);

  function handleSubmit(event) {
    event.preventDefault();
    setPassword(inputPassword);
    loadAnalytics(range, inputPassword, from, to);
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
              <div className="admin-date-filter">
                <input type="date" value={from} onChange={(event) => setFrom(event.target.value)} aria-label="开始日期" />
                <span>至</span>
                <input type="date" value={to} onChange={(event) => setTo(event.target.value)} aria-label="结束日期" />
                <button type="button" onClick={() => loadAnalytics("custom", password, from, to)} disabled={!from || !to || isLoading}>查询</button>
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
              <article>
                <span>Total Clicks</span>
                <strong>{formatNumber(analytics.totals.clicks)}</strong>
              </article>
            </div>

            <section className="admin-chart-panel">
              <div className="admin-section-title">
                <h2>Daily Traffic</h2>
                <span>PV / Clicks by day</span>
              </div>
              <div className="admin-bars">
                {analytics.daily.map((item) => (
                  <div className="admin-bar-item" key={item.timestamp}>
                    <div className="admin-bar-track">
                      <span style={{ height: `${Math.max(((item.pageviews || 0) / maxDailyPageviews) * 100, 4)}%` }} />
                    </div>
                    <strong>{formatNumber(item.pageviews)}</strong>
                    <em>{formatNumber(item.clicks)} clicks</em>
                    <small>{formatDay(item.timestamp)}</small>
                  </div>
                ))}
              </div>
            </section>

            <div className="admin-lists-grid">
              <AdminRankList title="Top Pages" rows={analytics.topPages} labelKeys={["requestPath", "route"]} />
              <AdminRankList title="Referrers" rows={analytics.referrers} labelKeys={["referrerHostname"]} />
              <AdminRankList title="Sources" rows={analytics.sources} labelKeys={["source"]} />
              <AdminRankList title="Click Events" rows={analytics.clickEvents} labelKeys={["eventName"]} />
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
        <span>PV / Clicks / Visitors</span>
      </div>
      <div className="admin-rank-list">
        {rows?.length > 0 ? (
          rows.map((item, index) => (
            <article key={`${title}-${index}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{getDimensionLabel(item, labelKeys)}</strong>
              <em>{formatNumber(item.pageviews)} / {formatNumber(item.clicks)} / {formatNumber(item.visitors)}</em>
            </article>
          ))
        ) : (
          <p>No data yet</p>
        )}
      </div>
    </section>
  );
}

function getAnalyticsContext() {
  const params = new URLSearchParams(window.location.search);
  const stored = JSON.parse(localStorage.getItem("cs-analytics-context") || "{}");
  const context = {
    source: params.get("utm_source") || stored.source || "direct",
    medium: params.get("utm_medium") || stored.medium || "",
    campaign: params.get("utm_campaign") || stored.campaign || "",
    content: params.get("utm_content") || stored.content || "",
  };
  localStorage.setItem("cs-analytics-context", JSON.stringify(context));
  if (!localStorage.getItem("cs-analytics-visitor")) {
    const visitorId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("cs-analytics-visitor", visitorId);
  }
  return { ...context, visitorId: localStorage.getItem("cs-analytics-visitor") };
}

function sendAnalyticsEvent(event) {
  const payload = JSON.stringify({ ...event, ...getAnalyticsContext() });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/track-view", new Blob([payload], { type: "application/json" }));
    return;
  }
  fetch("/api/track-view", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true }).catch(() => {});
}

function usePageViewTracking(pathname) {
  useEffect(() => {
    if (pathname === "/admin") return undefined;
    sendAnalyticsEvent({ eventType: "pageview", path: pathname, title: document.title, referrer: document.referrer });
    return undefined;
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

  const isKnowledgePage = normalizedPath === "/knowledge";
  const isToolsPage = normalizedPath === "/tools";
  const isReadingPage = normalizedPath === "/reading";
  const isCommunityPage = normalizedPath === "/community";
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

        <div className="editorial-hero-inner">
          <div className="editorial-hero-copy">
            <h1>KAI</h1>
            <p className="editorial-kicker"><span aria-hidden="true" />打造全国最大的 AI 社群</p>
            <p className="editorial-lede">
              一个持续生长的知识产品空间
              <span>把想法、工具和方法，沉淀成可复用、可商业化的系统。</span>
            </p>
            <p className="editorial-bio">
              我是陈硕，AI 连续创业者，YouTube 斩获过数十亿流量，Web3 早期项目曾突破 8 位数收入。
            </p>
            <div className="editorial-actions" aria-label="主要入口">
              <a href="#projects" onClick={(event) => scrollToSection(event, "#projects")}>
                查看内容
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
              <a href="/community">
                加入社群
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>

          <figure className="editorial-portrait">
            <img src="/assets/chen-shuo-halftone.png" alt="陈硕半色调肖像" fetchPriority="high" decoding="async" />
          </figure>
        </div>

        <a className="editorial-scroll" href="#projects" onClick={(event) => scrollToSection(event, "#projects")}>
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={17} weight="bold" aria-hidden="true" />
        </a>
      </section>

      <section className="editorial-projects-section" id="projects" aria-label="知识产品空间">
        <div className="editorial-projects-heading">
          <p className="section-kicker">PRODUCT LINES</p>
          <h2>知识产品空间</h2>
          <p>工具库、阅览室和知识地图，连接成一个持续生长的工作台。</p>
        </div>
        <div className="hero-system-frame">
          <div className="hero-project-list">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <a
                  className="hero-project-item"
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
            <div className="contact-wechat" aria-label="微信号">
              <span>微信号</span>
              <strong>Chen18005977213</strong>
            </div>
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
