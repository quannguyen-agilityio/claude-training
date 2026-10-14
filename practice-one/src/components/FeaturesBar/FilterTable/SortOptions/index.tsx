import React, { useContext } from 'react';
import arrowDownIconUrl from '@assets/images/icons/arrow-down.svg';
import xmarkIconUrl from '@assets/images/icons/xmark.svg';
import { SortType } from '@enums/Filter';
import { BookContext } from '@stores/book';
import Button from '@components/common/Button';
import { ButtonTypes } from '@enums/Button';

interface SortOption {
  name: string;
  value: SortType;
}

const SORT_OPTIONS: SortOption[] = [
  {
    name: 'Alphabetical Order',
    value: SortType.ALPHABETICAL,
  },
  {
    name: 'Release Year',
    value: SortType.RELEASE_YEAR,
  },
  {
    name: 'Country',
    value: SortType.COUNTRY,
  },
];

const SortOptions: React.FC = () => {
  const { currentSortType, setCurrentSortType } = useContext(BookContext);

  return (
    <>
      <h3 className="text-primary font-medium leading-7 mb-[7px] dark:text-white w-full text-left">Sort By</h3>
      {SORT_OPTIONS.map(option => {
        return (
          <button
            type="button"
            key={option.value}
            className="w-full h-[46px] text-paragraph bg-white dark:bg-black dark:text-white dark:hover:bg-blue-yonder dark:aria-checked:bg-blue-yonder flex
            justify-between items-center rounded-[10px] px-3.5 hover:bg-slate-200 aria-checked:bg-link-water aria-checked:text-azure-radiance"
            role="radio"
            aria-checked={option.value === currentSortType}
            onClick={() => setCurrentSortType(option.value)}
          >
            {option.name}
            <img src={arrowDownIconUrl} alt="Icon" className="text-red" />
          </button>
        );
      })}
      <div className="mt-3 w-full flex justify-center">
        <Button variant={ButtonTypes.CIRCLE} iconUrl={xmarkIconUrl} onClick={() => setCurrentSortType(SortType.NONE)} />
      </div>
    </>
  );
};

export default SortOptions;
