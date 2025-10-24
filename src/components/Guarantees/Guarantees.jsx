import style from './style/guarantees.module.sass';
import { useTranslation } from 'react-i18next';

const Guarantees = () => {
  const { t } = useTranslation();

  const items = Array.from({ length: 7 }, (_, i) => {
    const n = i + 1;
    return {
      title: t(`guarantees.point${n}title`),
      text: t(`guarantees.point${n}`),
      key: `point${n}`,
    };
  });

  return (
    <section className={style.guaranteesBlock} id="Guarantees">
      <h1 className={style.guaranteesTitle}>{t('guarantees.title')}</h1>
      
      <p className={style.guaranteesSubtitle}>{t('guarantees.intro')}</p>

      <ol className={style.guaranteesPoints}>
        {items.map(({ key, title, text }) => (
          <li className={style.point} key={key}>
            <h3 className={style.pointTitle}>{title}</h3>
            <p className={style.pointText}>{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Guarantees;
