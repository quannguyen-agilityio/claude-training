import React from 'react';
import DisplayOptions from './DisplayOptions';
import SortOptions from './SortOptions';

const FilterTable: React.FC = () => {
  return (
    <div className="absolute right-0 top-[64px] w-[268px] h-[350px] border shadow-lg px-[21px] py-[29px] rounded-[5px] bg-white dark:bg-black z-10">
      <DisplayOptions />
      <SortOptions />
    </div>
  );
};

export default FilterTable;
