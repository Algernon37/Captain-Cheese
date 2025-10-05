import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import style from './style/filteredlist.module.sass';
import ModalCheeseWindow from '../ModalCheeseWindow/ModalCheeseWindow';
import cheeseData from '../../json/cheeses.json';


const images = import.meta.glob('../../assets/all/*', { eager: true, as: 'url' });

const FilteredList = ({ prefix }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const getFileName = (imageField) => (imageField || '').split('/').pop() || '';

  const resolveImageSrc = (imageField) => {
    const file = getFileName(imageField);               
    const key  = `../../assets/all/${file}`;            
    return images[key] || '';
  };

  const filteredCheeses = useMemo(
    () => cheeseData.filter((c) => getFileName(c.image).startsWith(prefix)),
    [prefix]
  );

  const [visibleRows, setVisibleRows] = useState(1);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const imagePerRow = 4;

  const closeModal = () => setSelectedCheese(null);
  const showMoreImages = () => setVisibleRows((prev) => prev + 2);

  const visibleImages = useMemo(
    () => filteredCheeses.slice(0, visibleRows * imagePerRow),
    [filteredCheeses, visibleRows]
  );

  return (
    <div className={`${style.imageGallery} pt-0 pr-0 pb-[30px] pl-0`}>
      <div className={style.imageGrid}>
        {visibleImages.map((cheese, index) => {
          const src = resolveImageSrc(cheese.image);
          const alt = lang === 'en' ? (cheese.title_en || cheese.title) : cheese.title;

          return (
            <img
              key={`${cheese.name || getFileName(cheese.image)}-${index}`}
              src={src}
              alt={alt}
              className={style.galleryImage}
              draggable="false"
              onClick={() =>
                setSelectedCheese({
                  ...cheese,
                  image: src,                         
                  title: alt,
                  description:
                    lang === 'en'
                      ? cheese.description_en || cheese.description
                      : cheese.description,
                })
              }
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          );
        })}
      </div>

      {visibleRows * imagePerRow < filteredCheeses.length && (
        <button className={style.showMoreButton} onClick={showMoreImages}>
          {t('gallery.showMore')}
          <span className={style.moreIcon} />
        </button>
      )}

      {selectedCheese && (
        <ModalCheeseWindow
          closeModal={closeModal}
          selectedCheese={selectedCheese}
        />
      )}
    </div>
  );
};

export default FilteredList;


   