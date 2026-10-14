import React from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '@assets/images/logo.png';

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <h1 className="flex gap-4">
        <img src={logoUrl} alt="Logo" />
        <p className="font-logo text-4xl font-normal dark:text-white hidden md:block">BookShelter</p>
      </h1>
    </Link>
  );
};

export default Logo;
