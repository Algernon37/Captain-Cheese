import style from './style/guarantees.module.sass';
import { Trans, useTranslation } from 'react-i18next';

const Guarantees = () => {
  const { t } = useTranslation();

  return (
    <div className={style.guaranteesBlock} id="Guarantees">
      <h1 className="text-[52px] pb-[20px]">
        {t('guarantees.title')}
      </h1>
      <ol className={style.guaranteesPoints}>
        <li className={style.point}>
          <Trans
            i18nKey="guarantees.point1"
            components={{
              1: <span className="text-[#4824ff]" />,
              2: <br />
            }}
          />
        </li>
        <li className={style.point}>
          <Trans
            i18nKey="guarantees.point2"
            components={{
              1: <span className="text-[#4824ff]" />,
              2: <br />
            }}
          />
        </li>
        <li className={style.point}>
          <Trans
            i18nKey="guarantees.point3"
            components={{
              1: <span className="text-[#4824ff]" />,
              2: <br />,
              3: <span className="text-[#4824ff]" />
            }}
          />
        </li>
        <li className={style.point}>
          <Trans
            i18nKey="guarantees.point4"
            components={{
              1: <span className="text-[#4824ff]" />,
              2: <br />
            }}
          />
        </li>
      </ol>
    </div>
  );
};

export default Guarantees;


