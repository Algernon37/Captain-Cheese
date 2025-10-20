import FilteredList from '../FilteredList/FilteredList';
import ComingSoonComponent from './ComingSoonComponent/ComingSoonComponent'

const SecondFilter = () => {

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <ComingSoonComponent />
      <FilteredList prefix="3-" />
    </div>
  );
};

export default SecondFilter;
