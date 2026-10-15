import React, { useContext, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import searchIconUrl from '@assets/images/icons/search.svg';
import Input from '@components/common/Input';
import { BookContext } from '@stores/book';

const SEARCH_DEBOUNCE_DELAY = 300;

const SearchBar: React.FC = () => {
  const { searchInput, setSearchInput } = useContext(BookContext);
  const [value, setValue] = useState<string>(searchInput);
  const debouncedValue = useDebounce<string>(value, SEARCH_DEBOUNCE_DELAY);

  useEffect(() => {
    setSearchInput(debouncedValue.trim());
  }, [debouncedValue, setSearchInput]);

  return (
    <Input
      type="search"
      name="search-input"
      placeholder="Search books"
      iconUrl={searchIconUrl}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};

export default SearchBar;
