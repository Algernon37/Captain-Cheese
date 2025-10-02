import { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import style from './style/review.module.sass';
import Review from './Review';

const ReviewBlock = () => {
  const containerRef = useRef(null);
  const reviewWidthRef = useRef(0);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const reviews = [
    {
      key: 1,
      name: 'Владислав',
      link: 'https://t.me/capcheese',
      text_ru: 'Текст отзыва, оставленного клиентом в Телеграм канале, который можно открыть нажав на кнопку в правом верхнем углу этого блока.',
      text_en: 'Review text left by the client in the Telegram channel, which you can open by clicking the button in the upper right corner of this block.'
    },
    {
      key: 2,
      name: 'Анастасия',
      link: 'https://t.me/capcheese',
      text_ru: 'Текст отзыва, оставленного клиентом в Телеграм канале, который можно открыть нажав на кнопку в правом верхнем углу этого блока.',
      text_en: 'Review text left by the client in the Telegram channel, which you can open by clicking the button in the upper right corner of this block.'
    },
    {
      key: 3,
      name: 'Ольга',
      link: 'https://t.me/capcheese',
      text_ru: 'Текст отзыва, оставленного клиентом в Телеграм канале, который можно открыть нажав на кнопку в правом верхнем углу этого блока.',
      text_en: 'Review text left by the client in the Telegram channel, which you can open by clicking the button in the upper right corner of this block.'
    }
  ];

  const visibleReviews = 3;

  const reviewElements = reviews.map((review) => (
    <Review
      key={review.key + lang} 
      name={review.name}
      link={review.link}
      text={lang === 'en' ? review.text_en : review.text_ru}
    />
  ));


  const repeatedReviews = [
    ...reviewElements.slice(-visibleReviews),
    ...reviewElements,
    ...reviewElements,
    ...reviewElements,
    ...reviewElements.slice(0, visibleReviews)
  ];

  const handleScroll = () => {
    const box = containerRef.current;
    const width = reviewWidthRef.current * visibleReviews;
    if (box.scrollLeft <= 0) {
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = box.scrollWidth - 2 * width;
      box.style.scrollBehavior = 'smooth';
    } else if (box.scrollLeft >= box.scrollWidth - width) {
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = width;
      box.style.scrollBehavior = 'smooth';
    }
  };

  const btnPrevReview = () => {
    const box = containerRef.current;
    box.scrollLeft -= reviewWidthRef.current;
  };

  const btnNextReview = () => {
    const box = containerRef.current;
    box.scrollLeft += reviewWidthRef.current;
  };

  useLayoutEffect(() => {
    const box = containerRef.current;
    const firstReview = box.querySelector(`.${style.reviewCard}`);
    if (firstReview) {
      reviewWidthRef.current = firstReview.clientWidth;
      const width = reviewWidthRef.current * visibleReviews;
      box.scrollLeft = (box.scrollWidth - width) / 2;
      box.addEventListener('scroll', handleScroll);
    }

    return () => {
      box.removeEventListener('scroll', handleScroll);
    };
  }, [lang]); 

  return (
    <div className="pt-[200px]" id="Reviews">
      <div className={style.reviewBlock}>
        <h1>{t('reviews.title')}</h1>
        <p className={style.description}>
          {t('reviews.description.part1')}
          <span className={style.selecting}>{t('reviews.description.highlight1')}</span> Telegram.
          {t('reviews.description.part2')}
          <br />
          {t('reviews.description.part3')}
          <span className={style.selecting}>{t('reviews.description.highlight2')}</span>
          {t('reviews.description.part4')}
          <span className={style.selecting}>{t('reviews.description.highlight3')}</span>
          {t('reviews.description.part5')}
        </p>

        <div className={style.reviewCarousel}>
          <div className={style.reviewContainer} ref={containerRef}>
            {repeatedReviews}
          </div>
        </div>

        <div className="flex justify-center gap-6 py-4">
          <button className={style.nextButton} onClick={btnPrevReview}>
            <span className={`${style.arrayNextIcon} rotate-180`} />
          </button>
          <button className={style.nextButton} onClick={btnNextReview}>
            <span className={style.arrayNextIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewBlock;

