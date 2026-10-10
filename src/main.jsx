import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./styles.css";
import "./Home.css";
import "./DetailPages.css";
import "./BrandSignature.css";
import "./SitePreferences.css";
import { SitePreferencesProvider } from "./SitePreferences.jsx";

document.documentElement.classList.add("editorial-motion-ready");

function StartupReady() {
  React.useEffect(() => {
    window.__siteBoot?.ready();
  }, []);
  return null;
}

createRoot(document.getElementById("root"), {
  onUncaughtError(error) {
    console.error(error);
    window.__siteBoot?.fail();
  },
}).render(
  <React.StrictMode>
    <SitePreferencesProvider>
      <App />
      <StartupReady />
    </SitePreferencesProvider>
  </React.StrictMode>,
);
