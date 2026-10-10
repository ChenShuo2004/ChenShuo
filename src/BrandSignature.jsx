import { useSitePreferences } from "./SitePreferences.jsx";
export default function BrandSignature({ caption = "AI 连续创业者" }) {
  const { t } = useSitePreferences();
  return (
    <a className="brand-signature" href="/" aria-label={t("陈硕 KAI 首页")}>
      <span className="brand-wordmark" aria-hidden="true">KAI<span>.</span></span>
      <span className="brand-copy">
        <strong>CHEN SHUO</strong>
        <small>{t(caption)}</small>
      </span>
    </a>
  );
}
