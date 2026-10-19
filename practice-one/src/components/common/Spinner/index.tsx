import React from 'react';
import clsx from 'clsx';

interface SpinnerProps {
  className?: string;
}

// Draws with currentColor like Icon, so it follows the text color of its button
const Spinner: React.FC<SpinnerProps> = ({ className = 'h-5 w-5' }) => (
  <svg className={clsx('shrink-0 animate-spin', className)} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="3" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export default Spinner;
