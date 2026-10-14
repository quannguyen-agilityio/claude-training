import React, { useRef, useState } from 'react';
import { useOnClickOutside, useWindowSize } from 'usehooks-ts';
import filterIconUrl from '@assets/images/icons/filter.svg';
import Button from '@components/common/Button';
import { ButtonTypes } from '@enums/Button';
import FilterTable from '../FilterTable';

const FilterButton: React.FC = () => {
  const filterTableRef = useRef<HTMLDivElement>(null);

  const [showFilterTable, setShowFilterTable] = useState<boolean>(false);

  const { width } = useWindowSize();

  useOnClickOutside(filterTableRef, () => setShowFilterTable(false));

  return (
    <div className="relative z-10" ref={filterTableRef}>
      <Button
        variant={width > 640 ? ButtonTypes.SECONDARY : ButtonTypes.TERTIARY}
        iconUrl={filterIconUrl}
        hasBorder
        onClick={() => setShowFilterTable(!showFilterTable)}
      >
        Filter
      </Button>
      {showFilterTable ? <FilterTable /> : null}
    </div>
  );
};

export default FilterButton;
