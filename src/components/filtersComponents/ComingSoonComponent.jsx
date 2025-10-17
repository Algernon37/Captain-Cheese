import './style/gradientTitle.sass';
import { useTranslation } from 'react-i18next';

const ComingSoonComponent = () => {
const { t } = useTranslation();
  return (
    <div className="flex items-center gap-4 mb-10">
        <img
          src="/favicon-96x96.png"
          alt="Captain Cheese Logo"
          className="w-16 h-16 drop-shadow-[0_0_20px_rgba(72,36,255,0.4)]"
          draggable="false"
        />
        <h2 className="animatedGradient text-4xl font-[Prata] font-semibold tracking-wide text-center">
          {t('portfolio.comingSoon')}
        </h2>
    </div>
  );
};

export default ComingSoonComponent;