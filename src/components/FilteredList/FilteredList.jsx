import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from './style/filteredlist.module.sass';
import ModalCheeseWindow from '../ModalCheeseWindow/ModalCheeseWindow';
import cheeseData from '../../json/cheeses.json';

const FilteredList = ({ prefix }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const filteredCheeses = cheeseData.filter((cheese) =>
    cheese.image.split('/').pop().startsWith(prefix)
  );

  const [visibleRows, setVisibleRows] = useState(1);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const imagePerRow = 4;

  const closeModal = () => setSelectedCheese(null);
  const showMoreImages = () => setVisibleRows((prev) => prev + 2);

  const renderImages = () => {
    const visibleImages = filteredCheeses.slice(0, visibleRows * imagePerRow);
    return visibleImages.map((cheese, index) => (
      <img
        key={index}
        src={cheese.image}
        alt={lang === 'en' ? cheese.title_en : cheese.title}
        className={style.galleryImage}
        onClick={() => setSelectedCheese(cheese)}
      />
    ));
  };

  return (
    <div className={`${style.imageGallery} pt-0 pr-0 pb-[30px] pl-0`}>
      <div className={style.imageGrid}>
        {renderImages()}
      </div>

      {visibleRows * imagePerRow < filteredCheeses.length && (
        <button className={style.showMoreButton} onClick={showMoreImages}>
          {t('gallery.showMore')}
          <p className={style.moreIcon}></p>
        </button>
      )}

      {selectedCheese && (
        <ModalCheeseWindow
          closeModal={closeModal}
          selectedCheese={{
            ...selectedCheese,
            title: lang === 'en' ? selectedCheese.title_en : selectedCheese.title,
            description: lang === 'en' ? selectedCheese.description_en : selectedCheese.description
          }}
        />
      )}
    </div>
  );
};

export default FilteredList;
   