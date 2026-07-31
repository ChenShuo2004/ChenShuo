import {
  ArrowDown,
  ArrowRight,
  Brain,
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
import { useEffect, useState } from "react";
import CardNav from "./CardNav.jsx";
import DotField from "./DotField.jsx";
import RotatingText from "./RotatingText.jsx";
import TextCursor from "./TextCursor.jsx";

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
    ],
  },
  {
    label: "系统",
    bgColor: "#0f5fb8",
    textColor: "#f6f6f1",
    labelColor: "rgba(246, 246, 241, 0.84)",
    links: [
      { label: "工具库", href: "/tools", ariaLabel: "查看工具库说明" },
      { label: "阅览室", href: "/reading", ariaLabel: "查看阅览室说明" },
      { label: "知识地图", href: "/knowledge", ariaLabel: "查看知识地图页面" },
    ],
  },
];

const knowledgePageNavItems = [
  {
    label: "当前页",
    bgColor: "#090a0a",
    textColor: "#f6f6f1",
    labelColor: "rgba(246, 246, 241, 0.82)",
    links: [
      { label: "返回首页", href: "/", ariaLabel: "返回个人网站首页" },
      { label: "联系入口", href: "/#contact", ariaLabel: "回到首页联系陈硕" },
    ],
  },
  {
    label: "核心入口",
    bgColor: "#0f5fb8",
    textColor: "#f6f6f1",
    labelColor: "rgba(246, 246, 241, 0.84)",
    links: [
      { label: "工具库", href: "/tools", ariaLabel: "查看工具库说明" },
      { label: "阅览室", href: "/reading", ariaLabel: "查看阅览室说明" },
      { label: "知识地图", href: "/knowledge", ariaLabel: "查看知识地图页面" },
    ],
  },
  {
    label: "外部入口",
    bgColor: "#ffea75",
    textColor: "#081827",
    labelColor: "rgba(8, 24, 39, 0.72)",
    shineColor: "#000000",
    links: [
      { label: "打开知识库", href: knowledgeBaseUrl, ariaLabel: "打开陈硕的 FlowUs 知识库" },
      { label: "进入产品库", href: productLibraryUrl, ariaLabel: "打开产品库" },
    ],
  },
];

const salesHubNavItems = [
  {
    label: "当前页面",
    bgColor: "#090a0a",
    textColor: "#f6f6f1",
    labelColor: "rgba(246, 246, 241, 0.82)",
    links: [
      { label: "返回首页", href: "/", ariaLabel: "返回个人网站首页" },
      { label: "销售中转", href: "#sales-hub", ariaLabel: "查看销售中转页面" },
    ],
  },
  {
    label: "快速入口",
    bgColor: "#0f5fb8",
    textColor: "#f6f6f1",
    labelColor: "rgba(246, 246, 241, 0.84)",
    links: [
      { label: "商品目录", href: "#catalog", ariaLabel: "查看商品目录" },
      { label: "对接流程", href: "#how-it-works", ariaLabel: "查看对接流程" },
      { label: "对接教程", href: "https://web3chirou.com/usage-docs/tutorial-faka-docking.html", ariaLabel: "打开完整对接教程" },
    ],
  },
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

projects.unshift({
  title: "销售中转",
  tag: "远程商品 / 自动发货",
  image: "/assets/product-line-tools.webp",
  visualClass: "project-visual-sales",
  icon: Lightning,
  metric: "API 中转 / 商品销售",
  href: "/sales-hub",
  description: "把远程商品接进自己的销售路径，统一展示、加价、下单与自动发货。",
});

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
          actionItems={[]}
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
          actionItems={[]}
          onLinkClick={scrollToSection}
        />
      </section>

      <section className="tools-intro-section">
        <div className="tools-intro-inner">
          <p className="section-kicker">TOOLS LIBRARY</p>
          <h1 className="tools-hero-title">
            <span>工具库不是作品陈列</span>
            <span>持续生长的 AI 产品实验室</span>
            <small>验证 / 上线 / 迭代</small>
          </h1>
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
          actionItems={[]}
          onLinkClick={scrollToSection}
        />
      </section>

      <section className="tools-intro-section reading-intro-section">
        <div className="tools-intro-inner">
          <p className="section-kicker">YOU WENDU READING ROOM</p>
          <h1 className="reading-hero-title">
            <span>有温度阅览室</span>
            <span>把“知道”缩短到“做到”</span>
            <small>个人成长系统</small>
          </h1>
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

function CopyableEndpoint({ label, value }) {
  const [copied, setCopied] = useState(false);

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="sales-endpoint-row">
      <div>
        <span>{label}</span>
        <code>{value}</code>
      </div>
      <button type="button" onClick={copyValue}>{copied ? "已复制" : "复制"}</button>
    </div>
  );
}

function SalesHubPage() {
  const [markup, setMarkup] = useState("20");
  const previewPrice = (100 * (1 + Number(markup || 0) / 100)).toFixed(2);

  return (
    <main className="site-shell sales-hub-page" id="sales-hub">
      <section className="knowledge-page-top sales-hub-top" id="top" aria-label="销售中转页面导航">
        <CardNav
          className="poster-card-nav"
          items={salesHubNavItems}
          brandMark="CS"
          brandLabel="CHEN SHUO"
          brandKicker="SALES / API / AUTOMATION"
          baseColor="rgba(246, 246, 241, 0.94)"
          menuColor="#081827"
          buttonBgColor="#071c33"
          buttonTextColor="#f6f6f1"
          backHref="/"
          backLabel="返回首页"
          actionItems={[]}
          ctaLabel="打开供应站"
          ctaHref="https://chirou.ai/"
          onLinkClick={scrollToSection}
        />
      </section>

      <section className="sales-hero-section">
        <div className="sales-hero-grid">
          <div className="sales-hero-copy">
            <p className="section-kicker">SALES HUB / REMOTE FULFILLMENT</p>
            <h1>把商品接进来，<span>自动卖出去。</span></h1>
            <p className="sales-hero-lede">销售中转是一个轻量的远程商品入口：你负责展示、定价和获客，供应站负责库存、采购与自动发货。</p>
            <div className="sales-hero-actions">
              <a className="primary-action" href="#catalog">查看可接入商品 <ArrowRight size={18} weight="bold" aria-hidden="true" /></a>
              <a className="secondary-action" href="https://web3chirou.com/usage-docs/tutorial-faka-docking.html" target="_blank" rel="noreferrer">阅读完整教程</a>
            </div>
            <div className="sales-proof-row">
              <span><strong>01</strong> 远程拉取</span>
              <span><strong>02</strong> 自动下单</span>
              <span><strong>03</strong> 返回卡密</span>
            </div>
          </div>
          <aside className="sales-hero-art" aria-label="销售中转流程示意">
            <div className="sales-art-label">LIVE ROUTE</div>
            <div className="sales-art-node sales-art-node-store"><span>你的店铺</span><strong>展示 / 收款</strong></div>
            <div className="sales-art-line"><i /></div>
            <div className="sales-art-node sales-art-node-api"><span>API 中转</span><strong>自动采购</strong></div>
            <div className="sales-art-line sales-art-line-back"><i /></div>
            <div className="sales-art-node sales-art-node-stock"><span>供应站</span><strong>库存 / 发货</strong></div>
            <div className="sales-art-stamp">AUTO<br />DELIVERY</div>
          </aside>
        </div>
      </section>

      <section className="sales-catalog-section" id="catalog">
        <div className="sales-section-heading"><p className="section-kicker">PRODUCT CATALOG</p><h2>先选一个能卖的入口</h2><p>下面是 demo 商品卡。接入真实接口后，这里可以替换成远程商品、库存和实时价格。</p></div>
        <div className="sales-catalog-grid">
          <article className="sales-product-card sales-product-card-blue"><div className="sales-product-visual"><span>AI</span><i>PRO</i></div><p className="sales-product-tag">DIGITAL ACCESS</p><h3>AI 工具订阅</h3><p>适合做成低门槛、高复购的数字商品入口。</p><footer><strong>¥ 100 起</strong><span>可同步库存</span></footer></article>
          <article className="sales-product-card sales-product-card-pink"><div className="sales-product-visual"><span>API</span><i>KEY</i></div><p className="sales-product-tag">TOKEN / API</p><h3>模型 API 资源</h3><p>把复杂的 API 资源包装成清晰可购买的套餐。</p><footer><strong>¥ 50 起</strong><span>自动发货</span></footer></article>
          <article className="sales-product-card sales-product-card-yellow"><div className="sales-product-visual"><span>PLUS</span><i>∞</i></div><p className="sales-product-tag">ACCOUNT / PLAN</p><h3>账号与续费服务</h3><p>适合搭配你的内容、社群和工具库做长期销售。</p><footer><strong>¥ 30 起</strong><span>远程采购</span></footer></article>
        </div>
      </section>

      <section className="sales-workflow-section" id="how-it-works">
        <div className="sales-section-heading sales-section-heading-light"><p className="section-kicker">HOW IT WORKS</p><h2>四步，把中转跑起来</h2><p>按教程完成一次配置，之后用户下单就会自动走完整链路。</p></div>
        <div className="sales-workflow-grid">
          {[['01', '注册供应站', '打开 chirou.ai，注册账号并进入个人中心。'], ['02', '配置远程店铺', '在你的发卡网站新增店铺，填入商户 ID 与密钥。'], ['03', '拉取与加价', '开启同步价格、同步库存，并设置固定或百分比加价。'], ['04', '充值并测试', '使用 USDT 充值余额，完成一次测试下单和自动发货验证。']].map(([index, title, text]) => <article key={index}><span>{index}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="sales-config-section" id="config">
        <div className="sales-config-copy"><p className="section-kicker">READY TO CONNECT</p><h2>把关键配置放在手边</h2><p>根地址要填写供应站首页，不要填到具体接口路径。新版与旧版 SharedStock 接口都兼容。</p><CopyableEndpoint label="店铺根地址" value="https://chirou.ai/" /><CopyableEndpoint label="新版接口前缀" value="https://chirou.ai/shared/" /><CopyableEndpoint label="旧版兼容前缀" value="https://chirou.ai/plugin/SharedStock/api/" /></div>
        <aside className="sales-markup-card"><p className="section-kicker">MARKUP PREVIEW</p><h3>售价预览器</h3><p>以供应价 ¥100 为例，快速估算你的展示售价。</p><label htmlFor="markup-input">加价比例 <strong>{markup}%</strong></label><input id="markup-input" type="range" min="0" max="100" value={markup} onChange={(event) => setMarkup(event.target.value)} onInput={(event) => setMarkup(event.target.value)} /><div className="sales-price-preview"><span>展示售价</span><strong>¥{previewPrice}</strong></div></aside>
      </section>

      <section className="sales-final-cta"><p className="section-kicker">NEXT ACTION</p><h2>先把第一件商品接上。</h2><p>你可以先用 demo 里的结构验证销售路径，再把真实商品 API 接到商品目录。</p><div><a className="primary-action" href="https://chirou.ai/" target="_blank" rel="noreferrer">进入供应站 <ArrowRight size={18} weight="bold" aria-hidden="true" /></a><a className="secondary-action" href="/">回到个人网站</a></div></section>
    </main>
  );
}

function CommunityPage() {
  return (
    <main className="site-shell community-page">
      <section className="knowledge-page-top" id="top" aria-label="加入社群页面导航">
        <CardNav
          className="poster-card-nav"
          items={knowledgePageNavItems}
          brandMark="CS"
          brandLabel="CHEN SHUO"
          brandKicker="COMMUNITY / PRACTICE / GROWTH"
          baseColor="rgba(246, 246, 241, 0.93)"
          menuColor="#081827"
          buttonBgColor="#071c33"
          buttonTextColor="#f6f0cf"
          backHref="/"
          backLabel="返回首页"
          actionItems={[]}
          ctaLabel="添加微信咨询"
          ctaHref="/#top"
          onLinkClick={scrollToSection}
        />
      </section>

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

          <aside className="community-price-card" aria-label="社群价格">
            <span>COMMUNITY ACCESS</span>
            <strong>¥99</strong>
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
            <p>这个社群暂定价格是 <strong>99 元一年</strong>。但这 99 元不是课程费，也不是购买人脉和资源的费用，它只是一个很低的门槛。</p>
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
  const isSalesHubPage = normalizedPath === "/sales-hub";
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

  if (isSalesHubPage) {
    return <SalesHubPage />;
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
          actionItems={[]}
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
            <a className="hero-community-label" href="/community">
              加入社群
            </a>
            <p className="hero-community-definition">下一代的 AI 共创社群</p>
            <div className="hero-subcopy">
              <p>
                我是陈硕，AI 连续创业者，YouTube 斩获过数十亿流量，Web3 早期项目曾突破 8 位数收入。
              </p>
              <p className="hero-highlight">
                <span>现在以「一个持续生长的知识产品空间」为核心，重新起航。</span>
                <span>把工具库、阅览室和知识底图连接起来。</span>
                <span>让想法、工具和方法持续沉淀、复用，并走向商业化。</span>
              </p>
            </div>

          </div>

          <aside className="hero-project-lines" id="projects" aria-label="作品线">
            <p className="section-kicker">PRODUCT LINES</p>
            <h2>知识产品空间</h2>
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
          </aside>
        </div>

        <a className="scroll-cue" href="#projects" onClick={(event) => scrollToSection(event, "#projects")}>
          <ArrowDown size={18} weight="bold" aria-hidden="true" />
          向下
        </a>
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
