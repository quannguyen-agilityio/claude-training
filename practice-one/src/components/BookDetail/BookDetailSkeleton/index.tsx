import React from 'react';
import Skeleton from '@components/common/Skeleton';

// Same shape as BookDetail, shown while the book loads
const BookDetailSkeleton: React.FC = () => (
  <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-14">
    <div className="w-48 shrink-0 md:w-80">
      <Skeleton className="aspect-cover w-full rounded-md" />
    </div>
    <div className="w-full max-w-2xl">
      <Skeleton className="h-6 w-28 rounded-full" />
      <Skeleton className="mt-4 h-10 w-3/4" />
      <Skeleton className="mt-3 h-5 w-1/3" />
      <Skeleton className="mt-8 h-4 w-full" />
      <Skeleton className="mt-3 h-4 w-11/12" />
      <Skeleton className="mt-3 h-4 w-2/3" />
      <Skeleton className="mt-8 h-36 w-full rounded-xl" />
    </div>
  </div>
);

export default BookDetailSkeleton;
