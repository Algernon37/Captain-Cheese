import './style/gradientTitle.sass';
import { useTranslation } from 'react-i18next';

const ComingSoonComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 px-4 text-center">
      <img
        src="/favicon-96x96.png"
        alt="Captain Cheese Logo"
        className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_0_20px_rgba(72,36,255,0.4)]"
        draggable="false"
      />
      <h2
        className="
          animatedGradient 
          font-[Prata] 
          font-semibold 
          tracking-wide 
          text-center 
          text-[28px] 
          sm:text-[36px] 
          md:text-[40px] 
          leading-snug 
          break-words
        "
      >
        {t('portfolio.comingSoon')}
      </h2>
    </div>
  );
};

export default ComingSoonComponent;
