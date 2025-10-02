import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './src/locales/en/translation.json';
import translationRU from './src/locales/ru/translation.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'ru',
    fallbackLng: 'ru',
    supportedLngs: ['ru', 'en'],
    resources: {
      ru: { translation: translationRU },
      en: { translation: translationEN },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
