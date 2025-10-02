import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from './style/portfolioblock.module.sass';
import AllGallery from '../filtersComponents/AllGallery';
import FirstFilter from '../filtersComponents/FirstFilter';
import SecondFilter from '../filtersComponents/SecondFilter';
import ThirdFilter from '../filtersComponents/ThirdFilter';
import FourthFilter from '../filtersComponents/FourthFilter';


const PortfolioBlock = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { t } = useTranslation();

    const renderComponent = () => {
      switch (selectedCategory) {
        case 'All':
          return <AllGallery />;
        case 'First':
          return <FirstFilter />;
        case 'Second':
          return <SecondFilter />;
        case 'Third':
          return <ThirdFilter />;
        case 'Fourth':
          return <FourthFilter />;
        default:
          return <AllGallery />;
      }
    }

    return (
        <div className={style.portfolioBlock} id="Assortment">
          <div className={style.firstBlock}>
            <h1 className={style.mainTitle}>{t('portfolio.title')}</h1>
    
            <div className={`absolute ml-[-660px] ${style.hideInDark}`}>
              <p className={style.gradiantPartOne}></p>
              <p className={style.titleBorder}>{t('portfolio.title').slice(0, 6)}</p>
            </div>
            <div className={`absolute ml-[660px] ${style.hideInDark}`}>
              <p className={style.gradiantPartTwo}></p>
              <p className={style.titleBorder}>{t('portfolio.title').slice(6)}</p>
            </div>
    
            <img className={style.arrayIcon} src="/icons/array.png" alt="array" draggable="false" />
          </div>
    
          <div className="flex justify-center mb-[20px] mt-[20px]">
            <p
              className={`${style.tag} ${selectedCategory === 'All' ? style.selected : ''}`}
              onClick={() => setSelectedCategory('All')}
            >
              {t('portfolio.tags.all')}
            </p>
            <p
              className={`${style.tag} ${selectedCategory === 'First' ? style.selected : ''}`}
              onClick={() => setSelectedCategory('First')}
            >
              {t('portfolio.tags.hard')}
            </p>
            <p
              className={`${style.tag} ${selectedCategory === 'Second' ? style.selected : ''}`}
              onClick={() => setSelectedCategory('Second')}
            >
              {t('portfolio.tags.soft')}
            </p>
            <p
              className={`${style.tag} ${selectedCategory === 'Third' ? style.selected : ''}`}
              onClick={() => setSelectedCategory('Third')}
            >
              {t('portfolio.tags.cheesecake')}
            </p>
            <p
              className={`${style.tag} ${selectedCategory === 'Fourth' ? style.selected : ''}`}
              onClick={() => setSelectedCategory('Fourth')}
            >
              {t('portfolio.tags.brined')}
            </p>
          </div>
    
          <div className={`mx-[-5vw] ${style.content}`}>
            {renderComponent()}
          </div>
        </div>
    );
}

export default PortfolioBlock;