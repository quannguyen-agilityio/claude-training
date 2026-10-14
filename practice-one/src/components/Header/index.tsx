import React, { useEffect, useState } from 'react';
import { LocalStorage } from '@helpers/localStorage';
import lightIconUrl from '@assets/images/icons/light.svg';
import darkIconUrl from '@assets/images/icons/moon.svg';
import hamburgerIconUrl from '@assets/images/icons/hamburger-menu.svg';
import searchIconUrl from '@assets/images/icons/search.svg';
import { StorageKeys } from '@enums/StorageKey';
import { ThemeTypes } from '@enums/Theme';
import { ButtonTypes } from '@enums/Button';
import Button from '@components/common/Button';
import SearchBar from '@components/Header/SearchBar';
import Logo from './Logo';

export interface HeaderProps {
  isHome?: boolean;
  hasMenu?: boolean;
  onShowMenu?: () => void;
  onShowSearchBar?: () => void;
}

const setThemeInStorage = (theme: ThemeTypes) => {
  LocalStorage.set(StorageKeys.THEME, theme);
};

const Header: React.FC<HeaderProps> = ({ isHome, hasMenu, onShowMenu, onShowSearchBar }) => {
  const initThemeValue = LocalStorage.get(StorageKeys.THEME);

  const [isDarkMode, toggleDarkMode] = useState<boolean>(initThemeValue === ThemeTypes.DARK);

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isDarkMode) {
      htmlElement.classList.add('dark');
      setThemeInStorage(ThemeTypes.DARK);
    } else {
      htmlElement.removeAttribute('class');
      setThemeInStorage(ThemeTypes.LIGHT);
    }
  }, [isDarkMode]);

  return (
    <header className="relative h-[77px] bg-white dark:bg-black py-2 md:py-3 px-[21px] border-b border-athens-gray">
      <div className="h-full flex justify-between items-center max-w-[1260px] pl-[50px] my-0 mx-auto">
        {hasMenu ? (
          <div className="absolute left-7 flex items-center sm:hidden">
            <Button variant={ButtonTypes.CIRCLE} iconUrl={hamburgerIconUrl} onClick={onShowMenu} />
          </div>
        ) : null}
        <Logo />
        {isHome ? (
          <>
            <div className="hidden sm:flex items-center w-full max-w-[670px] ml-44 mr-[75px]">
              <SearchBar />
            </div>
            <div className="absolute left-36 flex items-center sm:hidden">
              <Button variant={ButtonTypes.CIRCLE} iconUrl={searchIconUrl} onClick={onShowSearchBar} />
            </div>
          </>
        ) : null}
        <div>
          <Button
            variant={ButtonTypes.CIRCLE}
            iconUrl={isDarkMode ? darkIconUrl : lightIconUrl}
            onClick={() => toggleDarkMode(!isDarkMode)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
