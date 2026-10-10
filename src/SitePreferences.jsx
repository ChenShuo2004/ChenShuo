import { createContext, useContext, useLayoutEffect, useMemo, useState } from "react";
import englishCopy from "./data/englishCopy.json";

export const siteThemes = [
  { id: "cobalt", label: "钴蓝", english: "Cobalt", color: "#164a9c" },
  { id: "forest", label: "松绿", english: "Forest", color: "#244c43" },
  { id: "ink", label: "墨黑", english: "Ink", color: "#252a32" },
];
const storageKey = "kai-site-preferences";
const SitePreferencesContext = createContext(null);

function readPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    return {
      theme: siteThemes.some(({ id }) => id === saved?.theme) ? saved.theme : "cobalt",
      language: saved?.language === "en" ? "en" : "zh",
    };
  } catch {
    return { theme: "cobalt", language: "zh" };
  }
}

export function SitePreferencesProvider({ children }) {
  const [{ theme, language }, setPreferences] = useState(readPreferences);
  const isAdmin = window.location.pathname.replace(/\/$/, "") === "/admin";
  useLayoutEffect(() => {
    if (isAdmin) return;
    document.documentElement.dataset.siteTheme = theme;
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";
    try { localStorage.setItem(storageKey, JSON.stringify({ theme, language })); } catch { /* Choices still work without storage. */ }
    return () => { delete document.documentElement.dataset.siteTheme; };
  }, [theme, language, isAdmin]);

  const value = useMemo(() => ({
    theme,
    language,
    setTheme: (next) => {
      if (siteThemes.some(({ id }) => id === next)) setPreferences((current) => ({ ...current, theme: next }));
    },
    toggleLanguage: () => setPreferences((current) => ({ ...current, language: current.language === "zh" ? "en" : "zh" })),
    t: (text) => {
      if (language !== "en" || typeof text !== "string") return text;
      if (englishCopy[text] !== undefined) return englishCopy[text];
      const trimmed = text.trim();
      if (englishCopy[trimmed] !== undefined) return text.replace(trimmed, englishCopy[trimmed]);
      return text; // Published articles retain their original language.
    },
  }), [theme, language]);
  return <SitePreferencesContext.Provider value={value}>{children}</SitePreferencesContext.Provider>;
}

export function useSitePreferences() {
  const value = useContext(SitePreferencesContext);
  if (!value) throw new Error("Site preferences require SitePreferencesProvider");
  return value;
}
