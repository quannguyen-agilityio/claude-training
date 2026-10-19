import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { IconNames } from '@enums/Icon';
import { FOCUS_RING } from '@constants/Styles';
import Icon from '@components/common/Icon';

interface BackLinkProps {
  to: string;
  children: ReactNode;
}

// "← All books" above a page title, 44px tall like every control
const BackLink: React.FC<BackLinkProps> = ({ to, children }) => (
  <Link
    to={to}
    className={clsx(
      'inline-flex h-11 items-center gap-2 rounded-lg text-sm font-semibold text-muted transition-colors hover:text-ink',
      FOCUS_RING,
    )}
  >
    <Icon name={IconNames.BACK} />
    {children}
  </Link>
);

export default BackLink;
