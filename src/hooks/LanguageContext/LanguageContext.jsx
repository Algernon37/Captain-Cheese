import { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../../../i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const getInitialLang = () => localStorage.getItem('lang') || i18n.language || 'ru';
  const [language, setLanguage] = useState(getInitialLang());

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const toggleLanguage = () => {
    const newLang = language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang); 
    setLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanguageContext);
