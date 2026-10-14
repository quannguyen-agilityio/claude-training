import React from 'react';

import { BookDetailsTitle } from '@enums/Book';
import DetailGroup from './DetailGroup';

interface BookPanelProps {
  author?: string;
  publishedYear?: number;
  publishers?: string;
  category?: string;
  country?: string;
}

const BookPanel: React.FC<BookPanelProps> = ({ author, publishedYear, publishers, category, country }) => {
  return (
    <aside className="h-fit sm:w-[268px] sm:h-full flex flex-col items-center bg-white dark:bg-black sm:border-x border-b sm:border-b-0 border-athens-gray">
      <div className="w-full px-10 py-5 sm:px-5">
        <DetailGroup title={BookDetailsTitle.AUTHOR} content={author} />
        <DetailGroup title={BookDetailsTitle.PUBLISHED_YEAR} content={publishedYear?.toString()} />
        <DetailGroup title={BookDetailsTitle.PUBLISHERS} content={publishers} />
        <DetailGroup title={BookDetailsTitle.CATEGORY} content={category} />
        <DetailGroup title={BookDetailsTitle.COUNTRY} content={country} />
      </div>
    </aside>
  );
};

export default BookPanel;
