import { Check, Palette, Translate } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState } from "react";
import { siteThemes, useSitePreferences } from "./SitePreferences.jsx";

export default function AppearanceControls() {
  const { theme, language, setTheme, toggleLanguage } = useSitePreferences();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const container = useRef(null);
  const trigger = useRef(null);
  const english = language === "en";

  useEffect(() => {
    if (!open) return;
    function outside(event) {
      if (!container.current?.contains(event.target)) setOpen(false);
    }
    function escape(event) {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div className="appearance-controls" ref={container}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <button ref={trigger} className="appearance-button appearance-theme" type="button"
        aria-label={english ? "Choose theme color" : "切换主题色"}
        title={english ? "Theme color" : "主题色"} aria-expanded={open} aria-controls={panelId}
        onClick={() => setOpen(!open)}>
        <Palette size={18} aria-hidden="true" />
        <span className="appearance-current" style={{ backgroundColor: siteThemes.find(({ id }) => id === theme).color }} aria-hidden="true" />
      </button>
      <span className="appearance-divider" aria-hidden="true" />
      <button className="appearance-button appearance-language" type="button" onClick={toggleLanguage}
        lang={english ? "zh-CN" : "en"} aria-label={english ? "切换为中文" : "Switch to English"}
        title={english ? "切换为中文" : "Switch to English"}>
        <Translate size={17} aria-hidden="true" /><span>{english ? "中" : "EN"}</span>
      </button>
      {open && (
        <div className="appearance-panel" id={panelId} role="group" aria-label={english ? "Theme color" : "主题色"}>
          <p>{english ? "THEME COLOR" : "主题色"}</p>
          {siteThemes.map((option) => (
            <button key={option.id} type="button" aria-pressed={theme === option.id}
              onClick={() => { setTheme(option.id); setOpen(false); trigger.current?.focus(); }}>
              <span className="appearance-swatch" style={{ backgroundColor: option.color }} aria-hidden="true" />
              <span>{english ? option.english : option.label}</span>
              {theme === option.id && <Check size={15} aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
