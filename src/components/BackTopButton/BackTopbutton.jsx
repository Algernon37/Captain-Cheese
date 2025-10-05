import { useEffect, useState } from 'react';
import style from './style/backtotopbutton.module.sass'; 

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = document.getElementById('Guarantees').offsetTop;

      if (window.scrollY >= triggerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`${style.backToTop} ${isVisible ? style.backToTop__visible : style.backToTop__hidden}`}
      onClick={scrollToTop}
    >
      <img className="rotate-180" src="/icons/array.png" alt="arrow to top" />
    </button>
  );
}

export default BackToTopButton;
