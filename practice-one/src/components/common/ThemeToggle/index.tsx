import React, { useState } from 'react';
import { LocalStorage } from '@helpers/localStorage';
import { StorageKeys } from '@enums/StorageKey';
import { ThemeTypes } from '@enums/Theme';
import { IconButtonVariants } from '@enums/Button';
import { IconNames } from '@enums/Icon';
import IconButton from '@components/common/IconButton';

// index.html sets the first theme before paint; this only switches it
const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => document.documentElement.classList.contains(ThemeTypes.DARK));

  const handleClick = () => {
    const next = !isDark;

    document.documentElement.classList.toggle(ThemeTypes.DARK, next);
    LocalStorage.set(StorageKeys.THEME, next ? ThemeTypes.DARK : ThemeTypes.LIGHT);
    setIsDark(next);
  };

  return (
    <IconButton
      variant={IconButtonVariants.SECONDARY}
      icon={isDark ? IconNames.SUN : IconNames.MOON}
      label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={handleClick}
    />
  );
};

export default ThemeToggle;
