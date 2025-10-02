import style from './style/modalcheesewindow.module.sass';
import { useTranslation } from 'react-i18next';

const ModalCheeseWindow = ({ closeModal, selectedCheese }) => {
  const { t } = useTranslation();

  return (
    <div className={style.modalWindowImage} onClick={closeModal}>
      <div className="flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <img src={selectedCheese.image} alt={selectedCheese.title} className={style.modalImage} />
        <div className={style.cheseInfo}>
          <div className="flex flex-col w-[100%]">
            <h2 className={`${style.cheseInfo__price} text-[#4824ff] text-4xl mb-10`}>
              {selectedCheese.title}
            </h2>
            <p className="text-xl mb-6 text-wrap">{selectedCheese.description}</p>
            <p className="text-xl">
              {t('modal.pricePer100g')}: <span className="text-[#4824ff]">{selectedCheese.price}</span>
            </p>
            <p className="text-xl">{t('modal.contact')}</p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://t.me/capcheese"
                target="_blank"
                rel="noopener noreferrer"
                className={style.socialButton}
              >
                <div className={`${style.social} ${style.telegram}`}></div>
                <p>{t('modal.telegram')}</p>
              </a>
            </div>
          </div>
          <button onClick={closeModal} className={style.modelCloseButton} aria-label="Close modal"></button>
        </div>
      </div>
    </div>
  );
};

export default ModalCheeseWindow;



