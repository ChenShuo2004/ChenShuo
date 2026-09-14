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

const knowledgeBaseUrl = "https://ji2s5x6u9ag.feishu.cn/wiki/FyDGwZUldiPstLk2xQBc3b3znUg";
const readingRoomUrl = "https://flowus.cn/c712040f-ef98-44b9-b37d-dd187d92fc4d";
const githubProfileUrl = "https://github.com/ChenShuo2004";
const githubApiUrl = "https://api.github.com/users/ChenShuo2004";
const githubReposApiUrl = "https://api.github.com/users/ChenShuo2004/repos?per_page=100&type=owner";
const githubEventsApiUrl = "https://api.github.com/users/ChenShuo2004/events/public?per_page=10";
const xProfileUrl = "https://x.com/ChenshuoAI";
const productLibraryUrl = "https://aiyouwendu.com/products";
const warmSpaceUrl = "https://aiyouwendu.com/home";
const we30IntroUrl = "https://ji2s5x6u9ag.feishu.cn/wiki/FyDGwZUldiPstLk2xQBc3b3znUg";

const fallbackGithubStats = {
  value: "752 Stars",
  repos: 17,
  followers: 46,
  stars: 752,
  bars: [5, 7, 8, 9, 11, 12, 14],
};

const fallbackGithubActivity = [
  { sha: "a1b2c3d", message: "feat: init product system" },
  { sha: "d4e5f6a", message: "feat: knowledge graph" },
  { sha: "f7a8b9c", message: "feat: content model" },
  { sha: "HEAD", message: "build: in public", current: true },
];

const editorialNavItems = [
  { key: "work", label: "在做的事情", english: "WORK", href: "/work" },
  { key: "media", label: "自媒体", english: "MEDIA", href: "/media" },
  { key: "about", label: "自我介绍", english: "ABOUT", href: "/about" },
  { key: "community", label: "我的社区", english: "COMMUNITY", href: "/community" },
  { key: "contact", label: "联系我", english: "CONTACT", href: "/#contact" },
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
  {
    title: "企业培训",
    tag: "企业服务",
    icon: UsersThree,
    metric: "AI 内训 / 培训 / 分享",
    href: "/#contact",
    description:
      "为企业和团队提供 AI 落地培训与内训分享，把实战经验变成可复用的能力。",
  },
  {
    title: "商单 / 企业合作",
    tag: "商业合作",
    icon: ChartLineUp,
    metric: "商单 / 企业服务 / 联创",
    href: "/#contact",
    description:
      "承接 AI 内容、产品与自动化相关的商业合作与企业服务，从需求到交付一起推进。",
  },
  {
    title: "1 对 1 咨询",
    tag: "咨询服务",
    icon: CalendarBlank,
    metric: "999 元 / 小时",
    href: "/#contact",
    description:
      "针对 AI 变现、内容增长、产品与知识库的一对一咨询，报价 999 元 / 小时，先聊清楚需求再开始。",
  },
];

const aboutIntro = [
  "我是陈硕（KAI），AI 连续创业者，也是“国家一级写作专家”（自封）。目前在厦门带着团队，探寻 AI 时代下属于普通人的财富自由之路。",
  "主线聚焦 AI 产品、内容与知识库；支线延伸到跨境、YouTube（数亿播放）与 Crypto，本人也是忠实的 BTC / ETH 持有者。",
  "现在以「一个持续生长的知识产品空间」为核心重新起航：把工具库、阅览室和知识地图连接起来，沉淀可复用、可商业化的系统，并组建 WE30，把真正想做事的人聚在一起。",
];

const personalReviewLede = [
  "上一篇关于我在 YouTube 上做橘猫账号矩阵、跑创作者收益和音乐商单，三个月两万刀的帖子爆了，说实话我自己也挺意外的。",
  "我参与过的 AI 变现项目还有：AI 漫剧红果打通（已成型，外包给别的团队）、AI 绘本 / 毕业设计 / 接单服务的矩阵账号打法（已停止，人工成本高）、帮厦门一家跨境电商做虾皮的 AI 自动化系统（已落地）、车企服务内容（已与理想汽车建连，仍在推进）、以及 web3 撸毛项目（我本人是忠实的 BTC / ETH 持有者）。",
  "所以我干脆写一篇真正全面的复盘，给在 X 上和我一样努力追赶 AI 时代的同行者们。",
];

const personalReviewChapters = [
  {
    index: "01",
    title: "从做推特说起",
    paragraphs: [
      "我做推特有 20 天了，但本身还有业务在跑，没花太多时间。之前更多是零碎地追热点，看到什么火就用 AI 修饰一下发出去。",
      "但我发现效果并不好——X 上同质化内容太严重，一个热点出来，大量人抄、推广、输出。我不是一个喜欢不断追热点尝试的人，25 年刚接触 AI 时我就吃过这种亏：天天玩不同玩法，却没有任何产出。",
    ],
  },
  {
    index: "02",
    title: "最早的接触：从孙哥的播客开始",
    paragraphs: [
      "我第一次了解推特，是初中时听孙哥的《90 后财富自由之路》，迷茫的时候我到现在还会翻出来听。",
      "印象最深的几点：30 岁之前不急着买房、买车、结婚，积极探索 web3，多接收海外信息。那时年纪小、本金有限，很多潮流没赶上，但我确实认真听完了大部分播客。",
    ],
    image: "/assets/review/review-podcast.jpg",
    imageCaption: "孙宇晨《财富自由革命之路》—— 至今仍存在网盘里，迷茫时会翻出来重听的播客合集。",
  },
  {
    index: "03",
    title: "梦想的开始：高中的创业之路",
    paragraphs: [
      "高中之后我真正从学校里脱离出来，一开始去了 web3 领域。",
      "帮着做撸毛——发账号矩阵、加上算法动作去撸代币，当时做的是 Farcaster，拿到了一些结果。这部分放到现在已经比较过时了。",
    ],
  },
  {
    index: "04",
    title: "AI 旅途第一站：AI 绘本",
    paragraphs: [
      "我做的第一个 AI 变现项目是 AI 绘本，打法还是老路子：账号矩阵，客服统一导到同一个微信私域，然后输出 AI 绘本。",
      "但闲鱼上买家认知其实特别高，很挑。我们 24 页一份报价 700-800，实际普遍 300 左右成交。哪怕堆了 20 多个账号，收益也不高，因为需要多次审稿，人工费用高。",
    ],
    image: "/assets/review/review-xianyu.jpg",
    imageCaption: "闲鱼 AI 绘本 / 代画店铺：账号矩阵陆续成交，店铺累计显示「赚了 95,626 元」。",
  },
  {
    index: "05",
    title: "第二站：YouTube 橘猫账号矩阵",
    paragraphs: [
      "于是转到下一个赛道——YPP，也就是 YouTube Partner Program，这就是我上一篇写的油管账号矩阵打法，三个月做到两万刀。",
      "当时做的 YouTube 直播推流工具现在已经开源，认真去弄月入百刀还是可以的（缺点是比较累、耗时间，我就没继续做）。",
    ],
    image: "/assets/review/review-youtube.jpg",
    imageCaption: "YouTube「potato」橘猫频道：6.49 万订阅、134 条视频，跑创作者收益与音乐商单。",
  },
  {
    index: "06",
    title: "补充：token 生意与代充服务的判断",
    paragraphs: [
      "再往后考虑过 token 生意和代充服务，但和我的愿景价值观不太符合，没有好背书体量也起不来，而且更多是和企业合作。",
      "AI 中转站本质上就是挖矿，个人玩启动成本高、还要考虑分销和封号补号；代充更多是打信息差。想在 AI 时代拿大结果，没必要在这上面浪费太多时间。",
    ],
    image: "/assets/review/review-okx.jpg",
    imageCaption: "早期接触过的交易所 VIP / 代充信息差生意——研究过，但没作为主线去做。",
  },
  {
    index: "07",
    title: "关于推特运营的反思",
    paragraphs: [
      "我 24 年高中毕业就注册了推特，但那时更多是看客。现在 26 年，我有强烈预感——今年可能是推特、或者说个人 IP 创作真正的元年。",
      "这个愿景驱动着我，让我必须做一个真实的推特账号，分享真正的阅历和经验。",
    ],
  },
  {
    index: "08",
    title: "个人习惯：复盘、第二大脑与健康",
    paragraphs: [
      "我看到一些人用 Obsidian 做第二大脑，更好地进行内容输出，有了 AI 之后很多想法和思路可以更好地推进。",
      "这一年创业干得太猛，体重从 140 飙到 170 斤，所以我准备用 Whoop 搭一套个人健康系统——身体才是革命的本钱。我现在尽量每天做日复盘，还有周复盘、月复盘，后面会考虑用飞书知识库或 GitHub 仓库公开出来。",
    ],
    image: "/assets/review/review-knowledge.jpg",
    imageCaption: "抬光 · Everlight AI 团队知识库：把日常待办、会议记录、团队 SOP 与复盘沉淀成结构。",
  },
  {
    index: "09",
    title: "结语",
    paragraphs: [
      "2026 年，我觉得是陈硕 X 之路的元年。我会继续在推特上分享过去做出来的结果，以及现在业务的一些支线展开。",
      "慢慢来，一切都会更好。祝你我在 AI 这个波澜壮阔的时代，都能得到自己想要的结果。",
    ],
    isSummary: true,
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
      fetch(githubReposApiUrl, { headers: { Accept: "application/vnd.github+json" } }).then((response) => {
        if (!response.ok) throw new Error("GitHub repositories unavailable");
        return response.json();
      }),
    ])
      .then(([profileResult, eventsResult, reposResult]) => {
        if (!isCurrent) return;

        const profile = profileResult.status === "fulfilled" ? profileResult.value : {};
        const events = eventsResult.status === "fulfilled" && Array.isArray(eventsResult.value) ? eventsResult.value : [];
        const repositories = reposResult.status === "fulfilled" && Array.isArray(reposResult.value) ? reposResult.value : [];
        const repos = Number.isFinite(profile.public_repos) ? profile.public_repos : fallbackGithubStats.repos;
        const followers = Number.isFinite(profile.followers) ? profile.followers : fallbackGithubStats.followers;
        const stars = repositories.length > 0
          ? repositories.reduce((total, repository) => total + (Number.isFinite(repository.stargazers_count) ? repository.stargazers_count : 0), 0)
          : fallbackGithubStats.stars;
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
          value: `${stars} Stars`,
          repos,
          followers,
          stars,
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
          <span>STARS</span>
          <strong>{githubStats.stars}</strong>
          <small>公开仓库累计 Star</small>
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
          value: `${stars} Stars`,
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
      detail: "AI / 产品 / build log",
      value: "7.1K 粉丝",
      status: "LIVE",
      icon: XLogo,
      href: xProfileUrl,
      bars: [5, 7, 8, 10, 12, 13, 15],
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
      label: "GITHUB / OPEN SOURCE",
      name: "@ChenShuo2004",
      detail: "17 公开仓库 / 46 关注者",
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
    <section className="platform-signal-section" id="platforms" aria-label="自媒体">
      <div className="platform-signal-inner platform-signal-inner-solo">
        <div className="platform-signal-heading editorial-reveal" data-reveal-delay="100">
          <div className="platform-signal-heading-title">
            <p className="section-kicker">MEDIA / SIGNALS</p>
            <h2>自媒体</h2>
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

function WorkPage() {
  return (
    <main className="site-shell editorial-page editorial-work-page">
      <EditorialSiteHeader activeKey="work" sectionLabel="WORK / 在做的事情" actionLabel="联系我" actionHref="/#contact" />
      <section className="editorial-projects-section editorial-page-section" id="work" aria-label="在做的事情">
        <div className="editorial-projects-heading editorial-reveal" data-reveal-delay="60">
          <p className="section-kicker">WHAT I'M DOING / 在做的事情</p>
          <h2>在做的事情</h2>
          <p>产品、内容与社区，还有企业培训和商单合作。工具库、阅览室、知识地图从有温度空间进入，连成一个持续生长的 AI 空间。</p>
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
    </main>
  );
}

function MediaPage() {
  return (
    <main className="site-shell editorial-page editorial-media-page">
      <EditorialSiteHeader activeKey="media" sectionLabel="MEDIA / SIGNALS" actionLabel="联系我" actionHref="/#contact" />
      <PlatformSignalsSection />
    </main>
  );
}

function AboutPage() {
  return (
    <main className="site-shell editorial-page editorial-about-page">
      <EditorialSiteHeader activeKey="about" sectionLabel="ABOUT / 自我介绍" actionLabel="联系我" actionHref="/#contact" />

      <section className="editorial-detail-hero editorial-about-hero" id="top" aria-label="自我介绍">
        <div className="editorial-detail-copy editorial-reveal" data-reveal-delay="80">
          <p className="editorial-page-kicker"><span>01</span> ABOUT / AI MEDIA BUILDER</p>
          <h1>自我介绍</h1>
          <div className="editorial-detail-description about-intro-copy">
            {aboutIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="editorial-detail-actions">
            <a className="editorial-outline-action editorial-outline-action-fill" href={xProfileUrl} target="_blank" rel="noreferrer">
              在 X 上关注我
              <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a className="editorial-outline-action" href="/#contact">联系我</a>
          </div>
        </div>

        <figure className="platform-signal-about-portrait editorial-about-portrait editorial-reveal" data-reveal-delay="180">
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
      </section>

      <section className="knowledge-section editorial-article-section" id="review" aria-label="个人复盘">
        <div className="knowledge-inner">
          <div className="knowledge-title-frame editorial-reveal" data-reveal-delay="80">
            <span className="editorial-index-stamp">REVIEW / 复盘</span>
            <p className="section-kicker">PERSONAL REVIEW / 个人复盘</p>
            <h2>《个人复盘连帖》</h2>
            <div className="knowledge-title-copy">
              {personalReviewLede.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <figure className="review-figure review-figure-portrait">
                <img src="/assets/review/review-ideal.jpg" alt="理想汽车用户运营组主动建联的微信记录" loading="lazy" decoding="async" />
                <figcaption>与理想汽车建联：理想总部用户运营组主动私信，期待长期合作（仍在推进）。</figcaption>
              </figure>
            </div>
            <a className="knowledge-title-link" href="https://x.com/ChenshuoAI/status/2086710313219727862" target="_blank" rel="noreferrer">
              阅读 X 原帖
              <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>

          <div className="knowledge-origin-grid">
            {personalReviewChapters.map((chapter) => (
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
                {chapter.image && (
                  <figure className="review-figure">
                    <img src={chapter.image} alt={chapter.imageCaption || chapter.title} loading="lazy" decoding="async" />
                    {chapter.imageCaption && <figcaption>{chapter.imageCaption}</figcaption>}
                  </figure>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
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
      <EditorialSiteHeader activeKey="community" sectionLabel="WE30 / AI / CREATION" actionLabel="添加微信咨询" actionHref="#community-contact" />

      <section className="community-intro-section">
        <div className="community-manifesto editorial-reveal" data-reveal-delay="60">
          <div>
            <p className="community-story-kicker">WE30 / AI / CREATION</p>
            <h1>把想做事的人，聚在一起。</h1>
          </div>
          <div className="community-manifesto-copy">
            <p className="community-manifesto-lede">我是陈硕，00 后，目前在厦门。现在认真做一件事：把真正想做 AI 创作、做产品、做业务的人，聚在一起。</p>
            <div className="community-manifesto-routes" aria-label="社区入口">
              <a href={we30IntroUrl} target="_blank" rel="noreferrer">
                <span>01 / CORE</span>
                <strong>WE30 核心群：更小、更深的内部连接</strong>
                <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </a>
              <a href="#community-contact">
                <span>02 / GROUP 01 + 02</span>
                <strong>一群做实战，二群做开放孵化</strong>
                <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="community-story editorial-reveal" data-reveal-delay="100">
          <p>不是水群，不是互相吹捧，也不看粉丝数。这里更看重的是创作欲、产品欲，和愿意交流业务、分享认知与踩坑的人。</p>
          <p>这段时间，我一边做 AI 产品和内容工作流，一边在 X 上持续输出、连接同行。一个月里有 5 条商单找来，我只接了一条 GitHub 的合作，因为现在更想先把社区、内容和 AI 业务的基础盘搭好。</p>
          <p>上周，WE30 核心群的言溪来厦门找我。他过着旅居生活，准备在厦门住一段时间。我带他来公司转了转，也聊了很多内容、产品和年轻人做事的状态。一个人很多时候不是不够努力，而是缺少一个能让自己持续向上的环境。希望 WE30 能慢慢成为这样的地方。</p>
        </div>

        <div className="community-program-grid" aria-label="WE30 社区结构">
          <article className="community-program community-program-we30 editorial-reveal" data-reveal-delay="130">
            <div className="community-program-topline">
              <p className="community-story-kicker">01 / WE30 CORE</p>
              <span>DEEP CONNECTION</span>
            </div>
            <h2>WE30<br />核心群</h2>
            <p className="community-program-lede">最早约 30 人，现在留下十几位长期活跃成员。这是一个更小、更深的内部群，后续会逐步扩展到约 500 人，并从一群、二群中挑选第二批核心成员。</p>
            <div className="community-program-details">
              <div>
                <span>WHAT HAPPENS HERE</span>
                <p>做业务分享、会议复盘与产品讨论，把真正有价值的方法沉淀进知识库、项目库和产品集。</p>
              </div>
              <div>
                <span>HOW I PARTICIPATE</span>
                <p>本人线下团队事务较多，主要会在核心群活跃；一群、二群由群管理和核心成员共同维护。</p>
              </div>
            </div>
            <div className="community-program-proof" aria-label="WE30 当前进展">
              <span>NOW IN MOTION</span>
              <p>社区目前约 300 人，基座已经理清，后续会持续迭代。</p>
            </div>
            <a className="community-program-link" href={we30IntroUrl} target="_blank" rel="noreferrer">
              了解 WE30
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </article>

          <article className="community-program community-program-group-one editorial-reveal" data-reveal-delay="200">
            <div className="community-program-topline">
              <p className="community-story-kicker">02 / WE30 GROUP 01</p>
              <span>BUSINESS + GROWTH</span>
            </div>
            <h2>WE30<br />一群</h2>
            <p className="community-program-lede">偏业务与增长的实战群：AI 创作、产品、内容增长、业务合作。欢迎有产品、技能或明确方向的人；技术、创作、运营背景都可以，起步阶段也没关系，但要愿意学习、有自己的思考。</p>
            <div className="community-program-details">
              <div>
                <span>WHAT WE RUN</span>
                <p>已在跑业务会议分享机制。核心群举办过 7 日会议，帮助成员把业务、内容和产品往前推进。</p>
              </div>
              <div>
                <span>HOW WE SELECT</span>
                <p>后续会设置明确门槛筛掉围观者，让愿意创造和互相支持的人留下；相关款项会直接通过红包回给群成员。</p>
              </div>
            </div>
            <div className="community-program-proof" aria-label="WE30 一群参与方式">
              <span>ONE EXPECTATION</span>
              <p>不要求每天高强度输出，但希望每个人都能分享真正做过的东西。</p>
            </div>
            <a className="community-program-link" href="#community-contact">
              申请加入一群
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </article>

          <article className="community-program community-program-group-two editorial-reveal" data-reveal-delay="270">
            <div className="community-program-topline">
              <p className="community-story-kicker">03 / WE30 GROUP 02</p>
              <span>OPEN INCUBATION</span>
            </div>
            <h2>WE30<br />二群</h2>
            <p className="community-program-lede">二群目前接近 300 人，更开放，也更适合孵化。适合刚开始做 X、刚接触 AI、仍在找方向，或暂时经验不多但愿意开始的人。</p>
            <div className="community-program-details">
              <div>
                <span>WHAT YOU GET</span>
                <p>内部已整理近 20 万字知识库，包含内容增长、AI 工具、产品思路与过往复盘；会议分享也会持续归档。</p>
              </div>
              <div>
                <span>WHAT COMES NEXT</span>
                <p>这里不会一开始就设很高门槛，但会持续筛选更适合进入一群和核心群的成员。</p>
              </div>
            </div>
            <div className="community-program-proof" aria-label="WE30 二群定位">
              <span>OPEN, BUT NOT EMPTY</span>
              <p>可以聊天、吹牛、互相链接，也要把文章打磨好，把产品想明白，把业务真正跑起来。</p>
            </div>
            <a className="community-program-link" href="#community-contact">
              申请加入二群
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </article>
        </div>

        <section className="community-boundary editorial-reveal" data-reveal-delay="270" aria-label="社区共同边界">
          <div>
            <p className="community-story-kicker">ONE STANDARD / REAL WORK</p>
            <h2>不是人很多，<br />是一群有创造力的人。</h2>
          </div>
          <div className="community-boundary-copy">
            <p>不承诺赚钱、资源或人脉，也不相信加入一个群就能改变人生。这里想留下的是愿意做事的人、被验证过的连接，以及不断累积的结果。</p>
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
            <p className="section-kicker">WE30 / CORE / GROUP 01 / GROUP 02</p>
            <h1>加入社区</h1>
            <p className="community-lede">
              主页私信我，备注来意。
              <br />
              不备注，不通过；我会根据你的阶段与目标进行匹配。
            </p>
            <a className="community-back-link" href="/#top">
              回到首页了解我
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <aside className="community-contact-card" aria-label="加入社区咨询">
            <span>COMMUNITY / CONTACT</span>
            <h2>添加微信咨询</h2>
            <p>扫码添加微信，备注你想加入 WE30 的原因和正在做的事；不备注不通过。</p>
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
  const isWorkPage = normalizedPath === "/work";
  const isMediaPage = normalizedPath === "/media";
  const isAboutPage = normalizedPath === "/about";
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

  if (isAboutPage) {
    return <AboutPage />;
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
              <a href="/work">
                在做的事情
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
              <a href="/community">
                我的社区
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
              <a href="/media">
                自媒体
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
              <a href="/about">
                自我介绍
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
              <a href="#contact" onClick={(event) => scrollToSection(event, "#contact")}>
                联系我
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>

          <figure className="editorial-portrait editorial-reveal" data-reveal-delay="200">
            <img src="/assets/chen-shuo-halftone.png" alt="陈硕半色调肖像" fetchPriority="high" decoding="async" />
          </figure>
        </div>

        <a className="editorial-scroll editorial-reveal" data-reveal-delay="440" href="#contact" onClick={(event) => scrollToSection(event, "#contact")}>
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={17} weight="bold" aria-hidden="true" />
        </a>
      </section>

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

            <a href="/about" className="contact-channel editorial-reveal" data-reveal-delay="450">
              <span className="contact-channel-top">
                <span className="contact-channel-label">ABOUT / 复盘</span>
                <BookOpenText size={18} weight="regular" aria-hidden="true" />
              </span>
              <strong>读我的自我介绍与复盘</strong>
              <span className="contact-channel-meta">
                我是谁 / 做过什么
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
