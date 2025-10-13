import { useLayoutEffect, useMemo, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import style from './style/review.module.sass';
import Review from './Review';

const ReviewBlock = () => {
  const containerRef = useRef(null);
  const strideRef = useRef(0);
  const snapTimerRef = useRef(null);
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
    const mid  = Array.from({ length: LOOPS }).flatMap(() => reviews);
    // tail | mid | mid | head
    return [...tail, ...mid, ...mid, ...head];
  }, []);

  const calcStride = useCallback(() => {
    const box = containerRef.current;
    if (!box) return 0;
    const cards = box.querySelectorAll(`.${style.reviewCard}`);
    if (!cards.length) return 0;

    let stride = cards[0].clientWidth;
    if (cards[1]) {
      const a = cards[0].getBoundingClientRect();
      const b = cards[1].getBoundingClientRect();
      stride = b.left - a.left; // включает межкарточный зазор, если есть
    }
    return Math.round(stride);
  }, []);

  // жёсткое приведение к ближайшей «ячейке»
  const snapToGrid = useCallback(() => {
    const box = containerRef.current;
    const stride = strideRef.current;
    if (!box || !stride) return;
    const idx = Math.round(box.scrollLeft / stride);
    box.style.scrollBehavior = 'auto';
    box.scrollLeft = idx * stride;
    box.style.scrollBehavior = 'smooth';
  }, []);

 
  const onScroll = useCallback(() => {
    const box = containerRef.current;
    const stride = strideRef.current;
    if (!box || !stride) return;

    const R = reviews.length;
    const startIdx = VISIBLE + R * LOOPS;                 
    const minIdx   = VISIBLE;                              
    const maxIdx   = VISIBLE + R * LOOPS * 2 - 1;          
    let idx = Math.round(box.scrollLeft / stride);

    if (idx < minIdx) {
      idx += R * LOOPS; 
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = idx * stride;
      box.style.scrollBehavior = 'smooth';
    } else if (idx > maxIdx) {
      idx -= R * LOOPS; 
      box.style.scrollBehavior = 'auto';
      box.scrollLeft = idx * stride;
      box.style.scrollBehavior = 'smooth';
    }

    clearTimeout(snapTimerRef.current);
    snapTimerRef.current = setTimeout(snapToGrid, 120);
  }, [snapToGrid]);


  const measureAndCenter = useCallback(() => {
    const box = containerRef.current;
    if (!box) return;
    const stride = calcStride();
    if (!stride) return;
    strideRef.current = stride;

    const R = reviews.length;
    const startIdx = VISIBLE + R * LOOPS; 
    const target = startIdx * stride;

    box.style.scrollBehavior = 'auto';
    box.scrollLeft = target;
    box.style.scrollBehavior = 'smooth';
  }, [calcStride]);


  const scrollBySteps = (steps) => {
    const box = containerRef.current;
    const stride = strideRef.current;
    if (!box || !stride) return;
    const idx = Math.round(box.scrollLeft / stride) + steps;
    box.scrollTo({ left: idx * stride, behavior: 'smooth' });
  };

  useLayoutEffect(() => {
    const box = containerRef.current;
    if (!box) return;

    measureAndCenter();
    box.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => { measureAndCenter(); snapToGrid(); };
    window.addEventListener('resize', onResize);

    return () => {
      box.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(snapTimerRef.current);
    };
  }, [measureAndCenter, onScroll, snapToGrid]);

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
          <button className={style.nextButton} onClick={() => scrollBySteps(-1)}>
            <span className={`${style.arrayNextIcon} rotate-180`} />
          </button>
          <button className={style.nextButton} onClick={() => scrollBySteps(1)}>
            <span className={style.arrayNextIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewBlock;




