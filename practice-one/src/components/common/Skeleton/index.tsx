import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  // Size and shape, e.g. "h-4 w-3/5"
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div aria-hidden="true" className={clsx('animate-pulse rounded bg-raised', className)} />
);

export default Skeleton;
