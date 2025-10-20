import style from './style/modalcheesewindow.module.sass';
import { useTranslation } from 'react-i18next';

const ModalCheeseWindow = ({ closeModal, selectedCheese }) => {
  const { t } = useTranslation();

  return (
    <div className={style.modalWindowImage} onClick={closeModal}>
      <div
        className="flex flex-col items-center justify-center w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={selectedCheese.image}
          alt={selectedCheese.title}
          className={style.modalImage}
          draggable="false"
        />
        <div className={style.cheseInfo}>
          <button
            onClick={closeModal}
            className={style.modelCloseButton}
            aria-label="Close modal"
          />

          <div className="flex flex-col w-full text-wrap">
            <h2
              className={`${style.cheseInfo__price} text-[#4824ff] text-2xl sm:text-3xl md:text-4xl mb-6`}
            >
              {selectedCheese.title}
            </h2>

            <p className="text-base sm:text-lg md:text-xl mb-4 text-wrap">
              {selectedCheese.description}
            </p>

            <p className="text-base sm:text-lg md:text-xl mb-2">
              {t('modal.pricePer100g')}:{" "}
              <span className="text-[#4824ff]">{selectedCheese.price}</span>
            </p>

            <p className="text-base sm:text-lg md:text-xl">{t('modal.contact')}</p>

            <div className="flex gap-4 mt-4">
              <a
                href="https://t.me/capcheese"
                target="_blank"
                rel="noopener noreferrer"
                className={`${style.socialButton} w-full sm:w-auto`}
              >
                <div className={`${style.social} ${style.telegram}`} />
                <p>{t('modal.telegram')}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCheeseWindow;




