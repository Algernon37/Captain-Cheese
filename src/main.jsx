import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './hooks/ThemeContext/ThemeContext.jsx'
import { LanguageProvider } from './hooks/LanguageContext/LanguageContext.jsx'
import './index.css'
import '../i18n.js'
import App from './App.jsx'

const onload = new Promise(r => document.readyState === 'complete' ? r() : addEventListener('load', r, { once: true }))
const fonts = () => document.fonts?.ready ?? Promise.resolve()
const frame = () => new Promise(r => requestAnimationFrame(r))
const waitImgs = async el => {
  if (!el) return
  const imgs = [...el.querySelectorAll('img')]
  if (!imgs.length) return
  await Promise.all(imgs.map(i => i.complete ? i.decode?.().catch(() => {}) : new Promise(res => {
    const done = () => (i.removeEventListener('load', done), i.removeEventListener('error', done), res())
    i.addEventListener('load', done); i.addEventListener('error', done)
  })))
}

;(async () => {
  const el = document.getElementById('root')
  createRoot(el).render(
    <StrictMode>
      <ThemeProvider>
        <LanguageProvider>
          <App/>
        </LanguageProvider>
      </ThemeProvider>
    </StrictMode>
  )
  await frame()
  await Promise.all([onload, fonts(), waitImgs(el)])
  await frame()
  window.hidePreloader?.()
})()


