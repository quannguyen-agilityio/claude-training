import React, { useContext } from 'react';
import Button from '@components/common/Button';
import { ButtonTypes } from '@enums/Button';
import listIconUrl from '@assets/images/icons/list.svg';
import gridIconUrl from '@assets/images/icons/grid.svg';
import { BookContext } from '@stores/book';
import { DisplayTypes } from '@enums/Filter';

interface DisplayOption {
  value: DisplayTypes;
  iconUrl: string;
}

const DISPLAY_OPTIONS: DisplayOption[] = [
  {
    value: DisplayTypes.GRID,
    iconUrl: gridIconUrl,
  },
  {
    value: DisplayTypes.LIST,
    iconUrl: listIconUrl,
  },
];

const DisplayOptions: React.FC = () => {
  const { displayType, setDisplayType } = useContext(BookContext);

  return (
    <>
      <h3 className="text-primary font-medium leading-7 mb-[7px] dark:text-white">Display Options</h3>
      <div className="flex gap-[9px] mb-[15px]">
        {DISPLAY_OPTIONS.map(option => {
          return (
            <Button
              key={option.value}
              variant={ButtonTypes.CIRCLE}
              iconUrl={option.iconUrl}
              hasBorder
              aria-checked={option.value === displayType}
              onClick={() => setDisplayType(option.value)}
            />
          );
        })}
      </div>
    </>
  );
};

export default DisplayOptions;
