import style from './style/button.module.sass';
import { useTranslation } from "react-i18next";

const  Button = ({onOpen}) => {
  const { t } = useTranslation();
  return (
    <button onClick={onOpen} className={style.headerButton}>
        {t("contactBtn.btn")}
    </button>
  )
}

export default Button

