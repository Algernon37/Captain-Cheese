import style from './style/contact.module.sass';
import { Trans, useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className={style.contactsBlock} id="Contacts">
      <img src="images/BigPictureContacts.png" alt="cheese farm" />
      <div className={style.contactsBlock__inner}>
        <h1 className="text-[52px] pb-[20px]">
          {t('contact.title')}
        </h1>
        <p className="text-[26px] text-center">
          <Trans
            i18nKey="contact.text"
            components={{
              blue: <span className="text-[#4824ff]" />,
              br: <br />
            }}
          />
        </p>
        <div className={style.contactsBlock__social}>
          <a href="https://t.me/capcheese" target="_blank" className={`${style.icon} ${style.telegram}`} />
          <a href="https://www.instagram.com/cap.cheeses" target="_blank" className={`${style.icon} ${style.instagram}`} />
          <a href="https://wa.me/995599226770" target="_blank" className={`${style.icon} ${style.whatsapp}`} />
          <a href="mailto:pliner.irina.1@gmail.com" target="_blank" className={`${style.icon} ${style.gmail}`} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
