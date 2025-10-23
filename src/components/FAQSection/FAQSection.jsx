import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FAQItem from './FAQItem';
import style from './style/FAQsection.module.sass';
import questions from '../../json/qustions.json';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={style.faqBlock} id="FAQ">
      <div className={style.faqContent}>
        <h1 className={style.faqTitle}>{t('faq.title')}</h1>
        <ul className={style.faqList}>
          {questions.map((q, index) => (
            <FAQItem
              key={index}
              question={lang === 'en' ? q.question_en : q.question_ru}
              answer={lang === 'en' ? q.answer_en : q.answer_ru}
              isOpen={openIndex === index}
              onClick={() => toggle(index)}
            />
          ))}
        </ul>
      </div>

      <div className={style.faqImageBox}>
        <div className={style.imgWrap}>
          <img src="/images/faq-side.webp" alt="Cheese illustration" draggable="false" />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
