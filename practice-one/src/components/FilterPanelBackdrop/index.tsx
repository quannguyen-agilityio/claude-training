import React from 'react';
import xmarkIconUrl from '@assets/images/icons/xmark.svg';
import FilterPanel from '@components/FilterPanel';
import Button from '@components/common/Button';
import { ButtonTypes } from '@enums/Button';

interface Props {
  onCloseBackdrop: () => void;
}

const FilterPanelBackdrop: React.FC<Props> = ({ onCloseBackdrop }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10">
      <div className="relative w-[268px] pt-11 pb-5 pl-11 bg-white dark:bg-black dark:border-x">
        <h2 className="text-lg dark:text-white">Categories</h2>
        <div className="absolute right-2 top-2">
          <Button variant={ButtonTypes.CIRCLE} iconUrl={xmarkIconUrl} onClick={onCloseBackdrop} />
        </div>
      </div>
      <FilterPanel />
    </div>
  );
};

export default FilterPanelBackdrop;
