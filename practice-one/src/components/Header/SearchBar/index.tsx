import React, { useContext } from 'react';
import searchIconUrl from '@assets/images/icons/search.svg';
import Input from '@components/common/Input';
import { BookContext } from '@stores/book';

const SearchBar: React.FC = () => {
  const { searchInput, setSearchInput } = useContext(BookContext);

  return (
    <Input
      type="search"
      name="search-input"
      placeholder="Search books"
      iconUrl={searchIconUrl}
      value={searchInput}
      onChange={event => setSearchInput(event.target.value)}
    />
  );
};

export default SearchBar;
