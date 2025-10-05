import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ModaleWindow from '../ModalWindow/ModalWindow';
import Button from './Button/Button';
import { useThemeContext } from '../../hooks/ThemeContext/ThemeContext';
import { useLanguageContext } from '../../hooks/LanguageContext/LanguageContext';
import style from './style/header.module.sass';

const Header = () => {
  const { theme, toggleTheme } = useThemeContext();
  const [isFixed, setIsFixed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguageContext();

  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);
  const toggleBurger = () => setIsBurgerOpen(prev => !prev);

  useEffect(() => {
    const handleScroll = () => setIsFixed(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1460 && isBurgerOpen) {
        setIsBurgerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isBurgerOpen]);


  return (
    <header>
      <div className={`${style.headerBlock} ${isFixed ? style.fixed : ''}`}>
      <div className={`${style.burgerIcon} ${theme === 'dark' ? style.dark : style.light}`} onClick={toggleBurger} />
        <div className={style.menu}>
          <a href="#About">{t('menu.about')}</a>
          <a href="#Assortment">{t('menu.assortment')}</a>
          <a href="#Reviews">{t('menu.reviews')}</a>
          <a href="#Guarantees">{t('menu.guarantees')}</a>
          <a href="#FAQ">{t('menu.faq')}</a>
          <a href="#Contacts">{t('menu.contacts')}</a>
        </div>
        {isBurgerOpen && (
          <>
            <div className={style.overlay} onClick={toggleBurger} />
            <div className={style.burgerMenu}>
              <a onClick={toggleBurger} href="#About">{t('menu.about')}</a>
              <a onClick={toggleBurger} href="#Assortment">{t('menu.assortment')}</a>
              <a onClick={toggleBurger} href="#Reviews">{t('menu.reviews')}</a>
              <a onClick={toggleBurger} href="#Guarantees">{t('menu.guarantees')}</a>
              <a onClick={toggleBurger} href="#FAQ">{t('menu.faq')}</a>
              <a onClick={toggleBurger} href="#Contacts">{t('menu.contacts')}</a>
            </div>
          </>
        )}
        <div className={style.headerButtons}>
          <Button onOpen={handleOpenModal} />
          <a href="https://t.me/capcheese" target="_blank" className={`${style.icon} ${style.telegram}`} />
          <a href="https://www.instagram.com/cap.cheeses/" target="_blank" className={`${style.icon} ${style.instagram}`} />
          <div className={style.switch} onClick={toggleTheme}>
            <div
              className={`${style.theme} ${theme === 'light' ? style.light : style.dark}`}
              style={{ transform: theme === 'dark' ? 'translateX(33px)' : 'translateX(0)' }}
            />
          </div>
          <div className={style.switch} onClick={toggleLanguage}>
            <div
              className={`${style.language} ${language === 'en' ? style.languagEn : style.languagRu}`}
              style={{ transform: language === 'en' ? 'translateX(33px)' : 'translateX(0)' }}
            />
          </div>
        </div>
      </div>
      <ModaleWindow show={showModal} onClose={handleCloseModal} />
    </header>
  );
};

export default Header;

