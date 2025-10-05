import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "./hooks/ThemeContext/ThemeContext.jsx";
import { LanguageProvider } from "./hooks/LanguageContext/LanguageContext.jsx";
import './index.css'
import '../i18n.js';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
