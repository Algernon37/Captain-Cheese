import FilteredList from '../FilteredList/FilteredList';
import ComingSoonComponent from './ComingSoonComponent/ComingSoonComponent'
import { useTranslation } from 'react-i18next';

const SecondFilter = () => {
  const { t } = useTranslation();
    
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <p className="text-center font-[Prata] mb-[40px] text-[clamp(18px,2.2vw,24px)]">
        {t('portfolio.candyTitle')}
      </p>
      <ComingSoonComponent />
      <FilteredList prefix="3-" />
    </div>
  );
};

export default SecondFilter;
