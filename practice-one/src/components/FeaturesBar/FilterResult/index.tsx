import React from 'react';
import arrowIconUrl from '@assets/images/icons/arrow-right.svg';
import { CategoryTitle } from '@enums/Category';

interface FilterResultProps {
  category: CategoryTitle;
  results: number;
}

const FilterResult: React.FC<FilterResultProps> = ({ category, results }) => {
  return (
    <div className="lg:absolute lg:left-[265px] px-[9px] flex items-center">
      <span className="min-w-[123px] h-10 px-[30px] bg-link-water text-azure-radiance text-primary font-medium rounded-full flex justify-center items-center">
        {category}
      </span>
      <img src={arrowIconUrl} alt="Icon" className="mx-5" />
      <p className="text-primary font-medium dark:text-white">
        Showing <span>{results}</span> Result(s)
      </p>
    </div>
  );
};

export default FilterResult;
