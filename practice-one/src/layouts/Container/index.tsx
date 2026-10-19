import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

// The page width and side gutters, defined once (design/specs/foundations.md)
const Container: React.FC<ContainerProps> = ({ children, className }) => (
  <div className={clsx('mx-auto max-w-7xl px-4 sm:px-6', className)}>{children}</div>
);

export default Container;
