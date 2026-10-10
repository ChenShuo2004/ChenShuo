import { useSitePreferences } from "./SitePreferences.jsx";
import { ArrowUpRight, Pause, Play } from "@phosphor-icons/react";
import { useState } from "react";

const marqueeCopy = "一个持续生长的知识产品空间 · AI 社群 · 内容资产 · build in public · ";

export default function SocialFooter({ channels }) {
  const { t } = useSitePreferences();
  const [paused, setPaused] = useState(false);

  return (
    <footer className={`portal-social${paused ? " is-paused" : ""}`} aria-label={t("我的自媒体与公开账号")}>
      <div className="portal-marquee" aria-label={t("一个持续生长的知识产品空间，AI 社群，内容资产，build in public")}>
        <div className="portal-marquee-track" aria-hidden="true">
          <span>{t(marqueeCopy)}</span>
          <span>{t(marqueeCopy)}</span>
        </div>
      </div>
      <div className="portal-social-heading">
        <span>{t("在这些地方，继续认识我 ")}<small>FIND ME ELSEWHERE</small></span>
        <button type="button" className="portal-social-toggle" aria-label={t(paused ? "继续文字滚动" : "暂停文字滚动")}
          aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? <Play size={13} weight="fill" aria-hidden="true" /> : <Pause size={13} weight="fill" aria-hidden="true" />}
          <span>{t(paused ? "继续" : "暂停")}</span>
        </button>
      </div>
      <nav className="portal-social-grid" aria-label={t("账号与联系入口")}>
        {channels.map(({ key, label, detail, href, icon: Icon }) => (
          <a className="portal-social-link" key={key} href={href}
            target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
            <Icon size={25} weight="regular" aria-hidden="true" />
            <span><strong>{t(label)}</strong><small>{t(detail)}</small></span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </footer>
  );
}
