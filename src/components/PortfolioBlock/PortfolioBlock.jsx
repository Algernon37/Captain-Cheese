import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from './style/portfolioblock.module.sass';
import AllGallery from '../filtersComponents/AllGallery';
import FirstFilter from '../filtersComponents/FirstFilter';
import SecondFilter from '../filtersComponents/SecondFilter';
import ThirdFilter from '../filtersComponents/ThirdFilter';

const PortfolioBlock = () => {
  const { t } = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState('all');

  const renderComponent = () => {
    switch (selectedCategory) {
      case 'all':
        return <AllGallery />;
      case 'cheese':
        return <FirstFilter />;
      case 'candy':
        return <SecondFilter />;
      case 'jam':
        return <ThirdFilter />;
      default:
        return <AllGallery />;
    }
  };

  return (
    <div className={style.portfolioBlock} id="Assortment">
      <div className={style.firstBlock}>
        <h1 className={style.mainTitle}>{t('portfolio.title')}</h1>

        {/* <div className={`absolute ml-[-660px] ${style.hideInDark}`}>
          <p className={style.gradiantPartOne}></p>
          <p className={style.titleBorder}>{t('portfolio.title').slice(0, 6)}</p>
        </div>
        <div className={`absolute ml-[660px] ${style.hideInDark}`}>
          <p className={style.gradiantPartTwo}></p>
          <p className={style.titleBorder}>{t('portfolio.title').slice(6)}</p>
        </div> */}

        <img className={style.arrayIcon} src="/icons/array.png" alt="array" draggable="false" />
      </div>

      <div className={style.blockSubTitle}>
        <h3 className={style.subTitle}>{t('portfolio.subtitle')}</h3>
        <div
          className="w-10 h-10 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: 'var(--cow-icon)' }}
          aria-label="cow icon"
        />
      </div>

      <div className={style.subCategory}>
        <p
          className={`${style.tag} ${selectedCategory === 'all' ? style.selected : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          {t('portfolio.tags.all')}
        </p>
        <p
          className={`${style.tag} ${selectedCategory === 'cheese' ? style.selected : ''}`}
          onClick={() => setSelectedCategory('cheese')}
        >
          {t('portfolio.tags.cheese')}
        </p>
        <p
          className={`${style.tag} ${selectedCategory === 'candy' ? style.selected : ''}`}
          onClick={() => setSelectedCategory('candy')}
        >
          {t('portfolio.tags.candy')}
        </p>
        <p
          className={`${style.tag} ${selectedCategory === 'jam' ? style.selected : ''}`}
          onClick={() => setSelectedCategory('jam')}
        >
          {t('portfolio.tags.jam')}
        </p>
      </div>

      <div className={`mx-[-5vw] ${style.content}`}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default PortfolioBlock;
