import React from 'react';
import Skeleton from '@components/common/Skeleton';

const BookCardSkeleton: React.FC = () => (
  <li className="flex flex-col">
    <Skeleton className="aspect-cover w-full rounded-md" />
    <Skeleton className="mt-3 h-4 w-4/5" />
    <Skeleton className="mt-2 h-3 w-3/5" />
    <Skeleton className="mt-2 h-3 w-1/4" />
  </li>
);

export default BookCardSkeleton;
