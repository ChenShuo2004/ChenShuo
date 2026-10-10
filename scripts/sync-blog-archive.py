"""从只读的文章库生成博客快照：python scripts/sync-blog-archive.py [文章库路径]。"""

import json
import re
import shutil
import sys
from pathlib import Path


DEFAULT_LIBRARY = Path(r"D:\coding\cheat on content\01-文章创作-content\文章库")
LIBRARY = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_LIBRARY
SITE = Path(__file__).resolve().parents[1]
ASSETS = SITE / "public" / "assets" / "blog"
OUTPUT = SITE / "src" / "data" / "blogArchive.json"

# 只收入有明确发表链接的 @ChenshuoAI 文章。旧账号和草稿不在这个清单中。
ARTICLES = [
    ("00.已发布文章/2026-07-12-再也不想输钱了-掼蛋训练产品/2026-07-12-再也不想输钱了-掼蛋训练产品.md", "guandan-memory-training", "产品构建", "2026-07-12", "2076162055812616632", "全文归档"),
    ("00.已发布文章/2026-07-17-免费开源紫微斗数工具/2026-07-17-免费开源紫微斗数工具.md", "ziwei-open-source", "产品构建", "2026-07-17", "2077908729845170432", "全文归档"),
    ("00.已发布文章/2026-07-20-情侣关系复盘小游戏/2026-07-20-情侣关系复盘小游戏.md", "relationship-review-game", "产品构建", "2026-07-20", "2079197866036462047", "全文归档"),
    ("00.已发布文章/2026-07-22-24岁个人复盘/2026-07-22-24岁个人复盘.md", "personal-review-2026-07", "创业复盘", "2026-07-22", "2079837705262014550", "全文归档"),
    ("00.已发布文章/2026-07-23-Codex三种电脑操控方式/2026-07-23-Codex三种电脑操控方式.md", "codex-computer-control", "工具实践", "2026-07-23", "2080137708861825097", "全文归档"),
    ("00.已发布文章/2026-07-24-Codex-Obsidian第二大脑/2026-07-24-Codex-Obsidian第二大脑.md", "codex-obsidian-second-brain", "工具实践", "2026-07-24", "2080555556281122866", "全文归档"),
    ("00.已发布文章/2026-07-27-Graph-Engineering/2026-07-27-Graph-Engineering.md", "graph-engineering", "工具实践", "2026-07-27", "2081628837260239308", "站内整理"),
    ("00.已发布文章/2026-07-28-OSINT工具数字足迹/2026-07-28-OSINT工具数字足迹.md", "osint-digital-footprint", "工具实践", "2026-07-28", "2082086920067428376", "站内整理"),
    ("00.已发布文章/2026-07-28-倪师经方学习助手/2026-07-28-倪师经方学习助手.md", "ni-shi-study-assistant", "产品构建", "2026-07-28", "2081993497339699338", "站内整理"),
    ("00.已发布文章/2026-07-30-Seedance-2.5来了/2026-07-30-Seedance-2.5来了.md", "seedance-2-5", "工具实践", "2026-07-30", "2082739472341569578", "站内整理"),
    ("00.已发布文章/2026-07-30-谜案数独/2026-07-30-谜案数独.md", "murdoku-chinese", "产品构建", "2026-07-30", "2082806131320307782", "站内整理"),
    ("历史文章/2026-08-11-咸鱼副业日入4k实战教学贴.md", "xianyu-ai-picture-book", "创业复盘", "2026-08-11", "2087219652019822791", "公开镜像归档"),
    ("历史文章/2026-08-14-DGX-Spark复盘.md", "dgx-spark-review", "工具实践", "2026-08-14", "2088068900516921543", "公开镜像归档"),
]


def metadata_and_body(raw):
    match = re.match(r"\A---\s*\n(.*?)\n---\s*\n", raw, re.S)
    if not match:
        raise ValueError("文章缺少 frontmatter")
    metadata = dict(re.findall(r'^([a-z_]+):\s*(.+)$', match.group(1), re.M))
    return {key: value.strip().strip('"') for key, value in metadata.items()}, raw[match.end():].strip()


def clean_body(body, slug):
    if slug in {"guandan-memory-training", "ziwei-open-source", "relationship-review-game"}:
        body = body.split("## 二次分发短推", 1)[0]
    if slug == "personal-review-2026-07":
        body = body.split('",content_state:', 1)[0]
        body = body.split("## 本地媒体", 1)[0]
    if slug == "codex-computer-control":
        body = body.split("## 本地媒体", 1)[0]
    body = re.sub(r"\A# [^\n]+\n+", "", body)
    body = re.sub(r"(?m)^(?:原文链接|封面图|X Article ID)：[^\n]*\n?", "", body)
    return body.strip()


def excerpt_from(body):
    for block in re.split(r"\n\s*\n", body):
        value = re.sub(r"\[([^]]+)\]\([^)]+\)", r"\1", block).strip()
        if value and not value.startswith(("#", "!", "原文链接", "封面图", "X Article ID", "产品地址", "---")):
            value = re.sub(r"\s+", " ", re.sub(r"[*`>]", "", value)).strip()
            if len(value) >= 24:
                return value[:112].rstrip("，。、；：") + ("……" if len(value) > 112 else "")
    raise ValueError("文章没有可用摘要")


media_log = (LIBRARY / "00.已发布文章" / "媒体下载日志.md").read_text(encoding="utf-8")
archive = []
for relative, slug, category, date, status_id, quality in ARTICLES:
    source = LIBRARY / relative
    metadata, body = metadata_and_body(source.read_text(encoding="utf-8-sig"))
    body = clean_body(body, slug)
    image_dir = source.parent / "media"
    images = []
    if image_dir.is_dir():
        target_dir = ASSETS / slug
        target_dir.mkdir(parents=True, exist_ok=True)
        for image in sorted(image_dir.iterdir()):
            if image.is_file():
                shutil.copyfile(image, target_dir / image.name)
                images.append(f"/assets/blog/{slug}/{image.name}")
                match = re.search(rf"{re.escape(image_dir.parent.name)}: \./media/{re.escape(image.name)} <- (https://\S+)", media_log)
                if match:
                    body = body.replace(match.group(1), f"/assets/blog/{slug}/{image.name}")
    if images and "![" not in body:
        body += "\n\n## 原帖配图\n\n" + "\n\n".join(f"![原帖配图 {i}]({url})" for i, url in enumerate(images, 1))
    title = metadata.get("title") or re.search(r"(?m)^#\s+(.+)$", body).group(1)
    excerpt = excerpt_from(body)
    if slug == "personal-review-2026-07":
        excerpt = "一篇写于 2026 年 7 月的阶段复盘，记录当时的产品尝试、项目起伏与对长期创造的判断。文中个人信息为历史原文，项目与合作入口请看「业务合作」。"
    archive.append({
        "category": category,
        "date": date.replace("-", "."),
        "title": title,
        "excerpt": excerpt,
        "href": f"/blog/{slug}",
        "originalUrl": f"https://x.com/ChenshuoAI/status/{status_id}",
        "source": quality,
        "markdown": body,
    })

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text(json.dumps(archive, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"写入 {len(archive)} 篇文章：{OUTPUT}")
