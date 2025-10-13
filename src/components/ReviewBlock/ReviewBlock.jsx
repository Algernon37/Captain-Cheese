import { useLayoutEffect, useMemo, useRef, useEffect } from 'react';
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
      text_ru:
        'Текст отзыва, оставленного клиентом в Телеграм канале, который можно открыть нажав на кнопку в правом верхнем углу этого блока.',
      text_en:
        'Review text left by the client in the Telegram channel, which you can open by clicking the button in the upper right corner of this block.',
    },
    {
      key: 2,
      name: 'Анастасия',
      link: 'https://t.me/capcheese',
      text_ru:
        'Текст отзыва, оставленного клиентом в Телеграм канале, который можно открыть нажав на кнопку в правом верхнем углу этого блока.',
      text_en:
        'Review text left by the client in the Telegram channel, which you can open by clicking the button in the upper right corner of this block.',
    },
    {
      key: 3,
      name: 'Ольга',
      link: 'https://t.me/capcheese',
      text_ru:
        'Текст отзыва, оставленного клиентом в Телеграм канале, который можно открыть нажав на кнопку в правом верхнем углу этого блока.',
      text_en:
        'Review text left by the client in the Telegram channel, which you can open by clicking the button in the upper right corner of this block.',
    },
  ];

  const visibleReviews = 3; 
  const loops = 3;        

  const repeatedData = useMemo(() => {
    const head = reviews.slice(0, visibleReviews);
    const tail = reviews.slice(-visibleReviews);
    const middle = Array.from({ length: loops }).flatMap(() => reviews);
    return [...tail, ...middle, ...middle, ...head];
  }, []);


  const handleScroll = () => {
    const box = containerRef.current;
    if (!box || reviewWidthRef.current === 0) return;
    const page = reviewWidthRef.current * visibleReviews;

    if (box.scrollLeft <= 0) {
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = box.scrollWidth - 2 * page;
      box.style.scrollBehavior = 'smooth';
    } else if (box.scrollLeft >= box.scrollWidth - page) {
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = page;
      box.style.scrollBehavior = 'smooth';
    }
  };

 
  const btnPrevReview = () => {
    const box = containerRef.current;
    if (!box) return;
    box.scrollLeft -= reviewWidthRef.current;
  };
  const btnNextReview = () => {
    const box = containerRef.current;
    if (!box) return;
    box.scrollLeft += reviewWidthRef.current;
  };


  useLayoutEffect(() => {
    const box = containerRef.current;
    if (!box) return;

    const first = box.querySelector(`.${style.reviewCard}`);
    if (first) {
      reviewWidthRef.current = first.clientWidth;
      const page = reviewWidthRef.current * visibleReviews;
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = (box.scrollWidth - page) / 2;
      box.style.scrollBehavior = 'smooth';
      box.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      box?.removeEventListener('scroll', handleScroll);
    };
    
  }, [lang]);

  
  useEffect(() => {
    const box = containerRef.current;
    if (!box || reviewWidthRef.current === 0) return;
    const page = reviewWidthRef.current * visibleReviews;
    box.style.scrollBehavior = 'auto';
    box.scrollLeft = (box.scrollWidth - page) / 2;
    box.style.scrollBehavior = 'smooth';
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
            {repeatedData.map((item, idx) => (
              <Review
                key={`${lang}-${idx}-${item.key}`} // уникально в рамках списка и языка
                name={item.name}
                link={item.link}
                text={lang === 'en' ? item.text_en : item.text_ru}
              />
            ))}
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


