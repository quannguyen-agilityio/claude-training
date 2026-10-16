import React, { ChangeEvent, useId } from 'react';
import clsx from 'clsx';
import { DisplayTypes, SortLabels, SortType } from '@enums/Filter';
import { IconNames } from '@enums/Icon';
import { FIELD_STYLES } from '@constants/Styles';
import Icon from '@components/common/Icon';
import SegmentedControl, { SegmentOption } from '@components/common/SegmentedControl';

const SORT_OPTIONS: { value: SortType; label: SortLabels }[] = [
  { value: SortType.NONE, label: SortLabels.NONE },
  { value: SortType.ALPHABETICAL, label: SortLabels.ALPHABETICAL },
  { value: SortType.RELEASE_YEAR, label: SortLabels.RELEASE_YEAR },
  { value: SortType.COUNTRY, label: SortLabels.COUNTRY },
];

const DISPLAY_OPTIONS: SegmentOption<DisplayTypes>[] = [
  { value: DisplayTypes.GRID, label: 'Grid view', icon: IconNames.GRID },
  { value: DisplayTypes.LIST, label: 'List view', icon: IconNames.LIST },
];

interface BookToolbarProps {
  title: string;
  // Read out by screen readers after filtering
  countText: string;
  displayType: DisplayTypes;
  onDisplayTypeChange: (type: DisplayTypes) => void;
  sortType: SortType;
  onSortTypeChange: (type: SortType) => void;
}

const BookToolbar: React.FC<BookToolbarProps> = ({
  title,
  countText,
  displayType,
  onDisplayTypeChange,
  sortType,
  onSortTypeChange,
}) => {
  const sortId = useId();

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const option = SORT_OPTIONS.find(item => item.value === event.target.value);

    onSortTypeChange(option ? option.value : SortType.NONE);
  };

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">{title}</h1>
        <p className="mt-1 min-h-5 text-sm text-muted" aria-live="polite">
          {countText}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <SegmentedControl label="Layout" options={DISPLAY_OPTIONS} value={displayType} onChange={onDisplayTypeChange} />
        <div className="flex items-center gap-2">
          <label htmlFor={sortId} className="text-sm font-medium text-muted">
            Sort
          </label>
          <div className="relative">
            <select
              id={sortId}
              value={sortType}
              onChange={handleSortChange}
              className={clsx(FIELD_STYLES, 'h-11 appearance-none pr-10 text-sm font-semibold')}
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted">
              <Icon name={IconNames.CHEVRON_DOWN} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookToolbar;
