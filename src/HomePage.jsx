import { ArrowUpRight, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import SocialFooter from "./SocialFooter.jsx";
import BrandSignature from "./BrandSignature.jsx";
import { contactEmail, wechatId } from "./data/contactDetails.js";

export default function HomePage({ entries, channels, knowledgeBaseUrl, xProfileUrl }) {
  const [contactOpen, setContactOpen] = useState(() => window.location.hash === "#contact");
  const dialogRef = useRef(null);

  useEffect(() => {
    const syncHash = () => setContactOpen(window.location.hash === "#contact");
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (contactOpen && !dialog.open) dialog.showModal();
    if (!contactOpen && dialog.open) dialog.close();
  }, [contactOpen]);

  function closeContact() {
    setContactOpen(false);
    if (window.location.hash === "#contact") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  }

  const contacts = [
    { label: "邮箱", detail: contactEmail, href: `mailto:${contactEmail}` },
    { label: "X / Twitter", detail: "@ChenshuoAI", href: xProfileUrl },
    { label: "知识库", detail: "我的笔记与方法", href: knowledgeBaseUrl },
    { label: "微信 / 社区", detail: wechatId, href: "/community#community-contact" },
  ];

  return (
    <main className="home-portal" id="top">
      <header className="portal-header">
        <BrandSignature />
        <a className="portal-blog" href="/blog">读我的博客 <ArrowUpRight size={16} aria-hidden="true" /></a>
      </header>

      <section className="portal-main" aria-labelledby="portal-title">
        <div className="portal-identity">
          <p>陈硕 · AI 连续创业者</p>
          <h1 id="portal-title">KAI<span aria-hidden="true">.</span></h1>
          <p className="portal-subtitle">产品 / 内容 / 知识 / 社区</p>
        </div>
        <nav className="portal-entries" aria-label="主要入口">
          {entries.map((entry, index) => (
            <a href={entry.href} key={entry.href} className="portal-entry">
              <span className="portal-entry-number" aria-hidden="true">0{index + 1}</span>
              <span className="portal-entry-copy"><strong>{entry.label}</strong><small>{entry.description}</small></span>
              <ArrowUpRight size={20} weight="light" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </section>

      <SocialFooter channels={channels} />

      <dialog ref={dialogRef} className="portal-contact" aria-labelledby="portal-contact-title"
        onCancel={(event) => { event.preventDefault(); closeContact(); }}
        onClick={(event) => { if (event.target === event.currentTarget) closeContact(); }}>
        <div className="portal-contact-inner">
          <button type="button" className="portal-close" onClick={closeContact} aria-label="关闭联系窗口" autoFocus><X size={21} aria-hidden="true" /></button>
          <p className="portal-contact-kicker">GET IN TOUCH</p>
          <h2 id="portal-contact-title">Let's talk.</h2>
          <p className="portal-contact-lede">产品合作、内容共创，或者聊聊你的 AI 想法。</p>
          <div className="portal-contact-links">
            {contacts.map((contact) => (
              <a key={contact.href} href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel={contact.href.startsWith("http") ? "noreferrer" : undefined}>
                <span><strong>{contact.label}</strong><small>{contact.detail}</small></span><ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="portal-contact-note">添加微信请备注姓名、需求类型和具体问题。</p>
        </div>
      </dialog>
    </main>
  );
}
