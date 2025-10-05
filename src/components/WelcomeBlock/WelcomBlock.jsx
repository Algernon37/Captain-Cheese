import style from './style/welcomeblock.module.sass'
import { Trans, useTranslation } from 'react-i18next';

const WelcomeBlock = () => {
    const { t } = useTranslation();
    return (
        <div className={style.welcomeBlock} id="About">
        <div className={style.firstBlock}>
          <h1>
            <Trans i18nKey="welcome.title">
              Мастер по изготовлению <span className={style.title}>Сыра</span>
            </Trans>
          </h1>
          <h2 className="mb-[7%] mt-[7%]">
            <Trans i18nKey="welcome.line1">
              Создаю <span className="text-[#4824ff]">изумительные</span> и <span className="text-[#4824ff]">уникальные</span> сыры под заказ
            </Trans>
          </h2>
          <h3>
            <Trans i18nKey="welcome.line2">
              Занимаюсь производством сыров на протяжении <span className="text-[#4824ff]">10 лет</span>
            </Trans>
          </h3>
        </div>
  
        <div className={style.mainImageBox}>
          <img src="/images/Background.png" className={style.firstImageLayer} draggable="false" alt="farm" />
          <img src="/images/main.png" className={style.secondImageLayer} draggable="false" alt="main photo" />
          <img src="/images/bottomBackground.png" className={style.thirdImageLayer} draggable="false" alt="bottom farm" />
        </div>
      </div>
    )
}

export default WelcomeBlock;