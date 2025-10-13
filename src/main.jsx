import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './hooks/ThemeContext/ThemeContext.jsx';
import { LanguageProvider } from './hooks/LanguageContext/LanguageContext.jsx';
import './index.css';
import '../i18n.js';
import App from './App.jsx';

const waitFonts = () => (document.fonts?.ready ?? Promise.resolve());
const nextFrame = () => new Promise((r) => requestAnimationFrame(r));

(async function bootstrap() {
  await waitFonts();

  const root = createRoot(document.getElementById('root'));
  root.render(
    <StrictMode>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </StrictMode>
  );

  await nextFrame();
  window.hidePreloader?.();
})();

