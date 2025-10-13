import { useLayoutEffect, useMemo, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import style from './style/review.module.sass';
import Review from './Review';

const ReviewBlock = () => {
  const containerRef = useRef(null);
  const itemStrideRef = useRef(0); 
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const reviews = [
    { key: 1, name: 'Владислав', link: 'https://t.me/capcheese',
      text_ru: 'Текст отзыва, оставленного клиентом в Телеграм канале, который можно открыть нажав на кнопку в правом верхнем углу этого блока.',
      text_en: 'Review text left by the client in the Telegram channel, which you can open by clicking the button in the upper right corner of this block.' },
    { key: 2, name: 'Анастасия', link: 'https://t.me/capcheese',
      text_ru: 'Текст отзыва, оставленного клиентом в Телеграм канале, который можно открыть нажав на кнопку в правом верхнем углу этого блока.',
      text_en: 'Review text left by the client in the Telegram channel, which you can open by clicking the button in the upper right corner of this block.' },
    { key: 3, name: 'Ольга', link: 'https://t.me/capcheese',
      text_ru: 'Текст отзыва, оставленного клиентом в Телеграм канале, который можно открыть нажав на кнопку в правом верхнем углу этого блока.',
      text_en: 'Review text left by the client in the Telegram channel, which you can open by clicking the button in the upper right corner of this block.' },
  ];

  const VISIBLE = 3;      
  const LOOPS = 3;

  const data = useMemo(() => {
    const head = reviews.slice(0, VISIBLE);
    const tail = reviews.slice(-VISIBLE);
    const mid = Array.from({ length: LOOPS }).flatMap(() => reviews);
    return [...tail, ...mid, ...mid, ...head];
  }, []);

  const handleScroll = useCallback(() => {
    const box = containerRef.current;
    const stride = itemStrideRef.current;
    if (!box || !stride) return;

    const page = stride * VISIBLE;
    if (box.scrollLeft <= 0) {
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = box.scrollWidth - 2 * page;
      box.style.scrollBehavior = 'smooth';
    } else if (box.scrollLeft >= box.scrollWidth - page) {
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = page;
      box.style.scrollBehavior = 'smooth';
    }
  }, []);

  const measureAndCenter = useCallback(() => {
    const box = containerRef.current;
    if (!box) return;

    const cards = box.querySelectorAll(`.${style.reviewCard}`);
    if (!cards.length) return;

   
    let stride = cards[0].clientWidth;
    if (cards[1]) {
      const a = cards[0].getBoundingClientRect();
      const b = cards[1].getBoundingClientRect();
      stride = b.left - a.left; 
    } else {
      const cs = getComputedStyle(cards[0]);
      stride += parseFloat(cs.marginLeft) + parseFloat(cs.marginRight);
    }
    itemStrideRef.current = Math.round(stride);

    const page = itemStrideRef.current * VISIBLE;
    box.style.scrollBehavior = 'auto';
    box.scrollLeft = (box.scrollWidth - page) / 2;
    box.style.scrollBehavior = 'smooth';
  }, []);

  const prev = () => {
    const box = containerRef.current;
    if (!box) return;
    box.scrollLeft -= itemStrideRef.current;
  };
  const next = () => {
    const box = containerRef.current;
    if (!box) return;
    box.scrollLeft += itemStrideRef.current;
  };


  useLayoutEffect(() => {
    const box = containerRef.current;
    if (!box) return;

    measureAndCenter();
    box.addEventListener('scroll', handleScroll, { passive: true });

    const onResize = () => measureAndCenter();
    window.addEventListener('resize', onResize);

    return () => {
      box.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [measureAndCenter, handleScroll]);

  
  useEffect(() => {
    measureAndCenter();
  }, [lang, measureAndCenter]);

  return (
    <div className="pt-[200px]" id="Reviews">
      <div className={style.reviewBlock}>
        <h1>{t('reviews.title')}</h1>
        <p className={style.description}>
          {t('reviews.description.part1')}
          <span className={style.selecting}>{t('reviews.description.highlight1')}</span> Telegram.
          {t('reviews.description.part2')}<br />
          {t('reviews.description.part3')}
          <span className={style.selecting}>{t('reviews.description.highlight2')}</span>
          {t('reviews.description.part4')}
          <span className={style.selecting}>{t('reviews.description.highlight3')}</span>
          {t('reviews.description.part5')}
        </p>

        <div className={style.reviewCarousel}>
          <div className={style.reviewContainer} ref={containerRef}>
            {data.map((item, idx) => (
              <Review
                key={`${lang}-${idx}-${item.key}`}
                name={item.name}
                link={item.link}
                text={lang === 'en' ? item.text_en : item.text_ru}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-6 py-4">
          <button className={style.nextButton} onClick={prev}>
            <span className={`${style.arrayNextIcon} rotate-180`} />
          </button>
          <button className={style.nextButton} onClick={next}>
            <span className={style.arrayNextIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewBlock;



