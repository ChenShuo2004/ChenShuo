import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./styles.css";
import "./Home.css";
import "./DetailPages.css";
import "./BrandSignature.css";

document.documentElement.classList.add("editorial-motion-ready");

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
