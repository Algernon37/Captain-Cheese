import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./hooks/ThemeContext/ThemeContext.jsx";
import { LanguageProvider } from "./hooks/LanguageContext/LanguageContext.jsx";
import "./index.css";
import "../i18n.js";
import App from "./App.jsx";

const onload = new Promise(r =>
  document.readyState === "complete" ? r() : addEventListener("load", r, { once: true })
);
const fonts = () => document.fonts?.ready ?? Promise.resolve();
const frame = () => new Promise(r => requestAnimationFrame(r));

const heroReady = new Promise(r => addEventListener("hero:ready", r, { once: true }));

(async () => {
  const el = document.getElementById("root");
  createRoot(el).render(
    <StrictMode>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </StrictMode>
  );

  await frame();
  await Promise.all([onload, fonts(), heroReady]);
  await frame();
  window.hidePreloader?.();
})();



