import React, { useContext } from 'react';
import { BookContext } from '@stores/book';
import { IconNames } from '@enums/Icon';
import SearchField from '@components/common/SearchField';
import ThemeToggle from '@components/common/ThemeToggle';
import LinkButton from '@components/common/LinkButton';
import Logo from './Logo';

export interface HeaderProps {
  // Only the home screen searches
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showSearch }) => {
  const { searchInput, setSearchInput } = useContext(BookContext);

  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <Logo />
        {showSearch ? (
          <div className="order-last w-full sm:order-none sm:w-auto sm:max-w-xl sm:flex-1">
            <SearchField
              value={searchInput}
              onChange={setSearchInput}
              label="Search books by title"
              placeholder="Search by title"
            />
          </div>
        ) : null}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <LinkButton to="/add-new-book" icon={IconNames.PLUS} className="max-sm:w-11 max-sm:px-0">
            <span className="max-sm:sr-only">Add book</span>
          </LinkButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
