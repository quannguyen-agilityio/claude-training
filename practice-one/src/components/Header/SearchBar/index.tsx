import React from 'react';
import searchIconUrl from '@assets/images/icons/search.svg';
import Input from '@components/common/Input';

const SearchBar: React.FC = () => (
  <Input type="search" name="search-input" placeholder="Search books" iconUrl={searchIconUrl} />
);

export default SearchBar;
