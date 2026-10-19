import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FOCUS_RING } from '@constants/Styles';

const Logo: React.FC = () => (
  <Link
    to="/"
    className={clsx(
      'flex shrink-0 items-center gap-2.5 rounded-lg text-xl font-extrabold tracking-tight text-ink',
      FOCUS_RING,
    )}
  >
    <svg className="h-7 w-7" viewBox="0 0 28 28" aria-hidden="true">
      <rect x="2" y="9" width="15" height="15" rx="3" className="fill-accent" />
      <rect x="11" y="3" width="15" height="15" rx="3" className="fill-accent" opacity=".5" />
    </svg>
    BookShelter
  </Link>
);

export default Logo;
