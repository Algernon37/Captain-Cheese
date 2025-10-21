import style from './style/welcomeblock.module.sass'
import { Trans, useTranslation } from 'react-i18next';

const WelcomeBlock = () => {
    const { t } = useTranslation();
    return (
        <div className={style.welcomeBlock} id="About">
        <div className={style.firstBlock}>
          <h1 className={style.welcomeTitle}>
            <Trans i18nKey="welcome.title" />
          </h1>
          <h1 className={`${style.welcomeTitle} mb-[7%] mt-[7%]`}>
            <Trans i18nKey="welcome.line1" />
          </h1>
          <h1 className={style.welcomeTitle}>
            <Trans i18nKey="welcome.line2" />
          </h1>
        </div>
        <div className={style.mainImageBox}>
          <img src="/images/main.png" className={style.secondImageLayer } draggable="false" alt="main photo" />
        </div>
      </div>
    )
}

export default WelcomeBlock;    